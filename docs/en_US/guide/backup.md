---
description: Use the encrypted backup and restore built into Nezha Monitoring Dashboard - configure S3-compatible storage (Cloudflare R2 as an example), keep the backup password and recovery key safe, schedule backups with retention, download, and restore on the same or a new host.
outline: deep
---

# Built-in backup and restore

Dashboard can back up its own data from the admin panel and upload it to S3-compatible storage (AWS S3, Cloudflare R2, MinIO, and others). Backups are taken while the dashboard keeps running, and files are encrypted before upload. You can restore a backup from storage or from an uploaded file, also on a freshly installed dashboard.

**Where to find it:** sign in as an administrator, click your avatar → System settings → the **Backup** tab. Only administrators can use it, and API tokens cannot call the backup API.

::: tip Supported versions
This feature requires Dashboard vX.Y.Z or later. For earlier versions, use the [manual migration, backup, and restore](/en_US/guide/q5.html) method.
:::

## What a backup contains

| Included | Not included |
| --- | --- |
| The dashboard database (users, servers, services, alerts, tasks, notifications, DDNS, and all other settings) | Monitoring time-series data (TSDB) |
| `data/config.yaml` | Deployment files such as Compose files, reverse proxy configuration, certificates, and systemd/OpenRC service files |
| | The settings of the backup feature itself (`data/backup.yaml`) |

To keep TSDB history or deployment files, back them up separately or use the [manual method](/en_US/guide/q5.html).

Backup files use the `.nzbak` extension. They are only staged temporarily in the data directory and removed after upload, so Docker deployments need no extra volume.

## First-time setup

The Backup tab guides you through three steps in order: **S3 storage → backup password → schedule**. Backups are available once storage and the password are set up.

![First-time setup](/images/backup/1_en_US.png)

### 1. Configure S3 storage

| Field | Description |
| --- | --- |
| Endpoint | The storage service URL. It must start with `https://` and must not contain a path. |
| Bucket | The bucket that holds the backups. Create it beforehand. |
| Region | The region. If your provider has no regions, follow its documentation (use `auto` for R2). |
| Key prefix | Defaults to `nezha-backup/`, which is also used when the field is empty. Letters, digits, `/`, `_`, and `-` only. **Dashboards sharing one bucket must use different prefixes**, otherwise retention cleanup deletes each other's backups. |
| Path-style addressing | On by default. Turn it off only if the service supports nothing but virtual-hosted `bucket.endpoint` addressing. |
| Access Key ID / Secret Access Key | The access key. The secret is never shown again after saving and must be entered again when the endpoint or bucket changes. |

During first-time setup you must pass **Test connection** before saving; when changing an existing configuration, testing before saving is still recommended. The test writes a temporary object under the prefix, reads it back, and deletes it, so it needs at least permission to read, write, and delete objects. The backup list and retention cleanup also list the objects under the prefix, so for regular use the key needs permission to list objects as well.

#### Example: Cloudflare R2

1. In the Cloudflare dashboard, open **R2** and create a bucket, for example `nezha-backup`.
2. Under **Manage API tokens** in R2, create an API token with **Object Read & Write** permission, scoped to this bucket only. Note the **Access Key ID**, the **Secret Access Key**, and the S3 endpoint shown on the page.
3. Fill in the Backup tab:
   - Endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
   - Bucket: `nezha-backup`
   - Region: `auto`
   - Key prefix: keep the default `nezha-backup/` or change it as needed
   - Path-style addressing: keep it on (the default); R2 supports both addressing styles
4. Click **Test connection**, then save once it passes.

![R2 storage filled in, connection test passed](/images/backup/2_en_US.png)

Do not use an account-wide token with full permissions; object read and write on this one bucket is all the token needs.

### 2. Set the backup password and save the recovery key

The backup password must be at least 12 characters. When you set it, the dashboard creates a key pair:

- Backups are encrypted to the public key, so scheduled backups run without the password.
- The private key is stored only protected by the backup password; the password itself is never stored in plain text.
- A **recovery key** is created at the same time and shown only once. You can copy it or download it as a `.txt` file, and must tick "I have stored the recovery key safely" before closing the dialog. It can replace the password to restore every backup of the same key.

![Save the recovery key](/images/backup/3_en_US.png)

::: danger Keep them safe
If you forget the backup password and do not have the recovery key, the backups **cannot be restored** - nobody can decrypt them.

- Store the backup password in a password manager.
- Keep the recovery key offline and separate from the backup files.
- Do not keep the recovery key in the same bucket as the backups.
:::

**Change password:** keeps the same key and only changes the password that protects the private key. New backups use the new password; older backups open with the old password, or with the new one on this dashboard.

**Reset password:** creates a new key. Use it only if the password is lost or may have leaked. Afterwards, earlier backups are marked **Old key** in the list and can only be restored with the old password or the old recovery key. Resetting asks you to type `RESET` to confirm. Before resetting, make sure you still have one of them, or no longer need those backups.

### 3. Scheduled backups and retention

- The schedule uses a 6-field cron expression (seconds first), in the same time zone as scheduled tasks. The default `0 0 3 * * *` runs every day at 03:00.
- **Scheduled backups to keep** defaults to 7 and can be set from 1 to 100. Scheduled backups beyond that number are deleted automatically after a new scheduled backup completes.
- Retention **only removes scheduled backups**. Manual backups are never deleted automatically; the last 3 "Before restore" backups are kept.
- Failed uploads are retried automatically; if a backup still fails, it is shown as "Failed" in the list together with the reason.

## Manual backups and downloads

Click **Back up now** in the backup list. The list is read from the configured bucket and shows each backup's creation time, size, trigger (Manual, Scheduled, Before restore), status, dashboard version, and SHA-256.

![Backup list](/images/backup/4_en_US.png)

Click **Download** to save the `.nzbak` file locally. Downloads go through the dashboard, so the storage address and keys are never exposed. The downloaded file stays encrypted; you can keep it offline and restore it later by uploading it.

Select backups you no longer need and delete them. Deleted backups cannot be recovered.

## Restore

A restore replaces the current database and configuration and then restarts the dashboard, signing out every user. It has two steps, and the first one changes nothing.

::: warning The dashboard must run under a supervisor
After a restore is applied, the dashboard exits and swaps in the data on its next start. The official installation methods (`restart: always` for Docker, `Restart=always` for systemd, and `supervise-daemon` for OpenRC) all restart it automatically. If you run it yourself, make sure the process is restarted when it exits.
:::

### Step 1: Check the backup

- **From the list:** click **Restore** next to a backup.
- **From a file:** click **Restore from file** and choose a `.nzbak` file (up to 256 MiB).

Enter the backup password, or switch to the recovery key, then click **Check backup**. The dashboard downloads and verifies the backup: checksum, decryption, contents, origin, version compatibility, database integrity, and the presence of an administrator account.

![Check the backup](/images/backup/5_en_US.png)

The check also lists what to be aware of, for example:

- Agents added after the backup will go offline.
- API tokens and OAuth grants revoked after the backup become valid again.
- TSDB data is not restored and stays as it is.
- The origin cannot be verified (the backup was not made by this dashboard).

Some warnings must be acknowledged with **I understand and want to continue** before you can proceed. The check is valid for 10 minutes; after that, run it again.

### Step 2: Confirm and apply

Enter the backup password (or recovery key) again, the last 6 characters of the backup name, and your login password. Accounts that only sign in with OAuth and have no local password must have signed in within the last 10 minutes.

![Confirm and apply](/images/backup/6_en_US.png)

After you click **Replace current data and restart**:

1. If storage and the backup password are set up, the dashboard first backs up the current data, kept as a "Before restore" backup.
2. The dashboard exits, restarts, and swaps in the backup data before opening the database.
3. The page shows the restart progress and takes you to the sign-in page when the dashboard is back. Sign in with an account **from the backup**.

If the start fails with a database migration error, an unavailable port or TLS certificate, or if the process exits midway, the dashboard rolls back to the data from before the restore. The result of the last restore (succeeded, or failed and rolled back) is shown at the top of the Backup tab.

To prevent online password guessing, each user can run at most 5 checks or applies within 15 minutes. Every backup and restore operation is recorded in `backup-audit.log` in the data directory.

### Restore on a new host

Use this when moving to another server or when the original host is gone:

1. [Install Dashboard](/en_US/guide/dashboard.html) on the new host, at a version no older than the backup (see the version rules below), and sign in with the default administrator created by the installation.
2. Choose how to restore:
   - **You have the backup file:** upload the `.nzbak` file under "Restore from a backup file" on the Backup tab. **Storage and a password do not need to be set up first.**
   - **The backup is only in storage:** [configure S3 storage](#_1-configure-s3-storage) with the original bucket and prefix first, then restore from the list.
3. Enter the original backup password or recovery key and complete both steps. Because the new host has a different key, the check reports that the origin cannot be verified; acknowledge it once you are sure the file is trustworthy. While backups are not set up on the new host, no pre-restore backup is taken, and the page says so.
4. Sign in with your original account. `config.yaml` is restored as well, including the agents' connection secret, so agents reconnect on their own as long as they can still reach the original address; if the address changed, update DNS or the agents' connection address.
5. **The backup settings are not restored.** Configure storage, the backup password, and the schedule again on the new host. Setting a password creates a new key, so the backups already in storage are marked "Old key"; they can still be restored with the original password or recovery key.

::: warning Listening address and certificates
After the restore, the dashboard uses the `config.yaml` from the backup. At start, the effective listening address and port must be bindable on the new host, and with TLS enabled the effective certificate and private key files must be readable; otherwise the start fails and rolls back. A port or certificate path that differs from the original host is not a problem in itself; prepare the new host accordingly, for example by placing the certificate at the same path or adjusting the Docker port mapping.
:::

Once the new host is live, stop the old dashboard so that the two do not run tasks or send notifications at the same time. If the old dashboard keeps running and uses the same bucket, give the two dashboards different prefixes.

## Compatibility and version rules

The check compares the core version `X.Y.Z` of the backup with the current dashboard:

| Case | Result |
| --- | --- |
| The backup is from an older version | Restores. The database schema is upgraded at start, and settings missing from an older `config.yaml` use their defaults; a failed upgrade rolls back. |
| Same version | Restores. |
| Same core version, different build (different version suffix) | Needs an acknowledgement. Builds can differ in database changes; continue only if you know the difference is safe. |
| Versions cannot be compared (for example a development build) | Needs an acknowledgement. |
| The backup is from a newer core version | **Refused.** Upgrade the dashboard to at least the backup's version first, then restore. |

Backup files carry a format version. A dashboard refuses formats it does not recognize instead of trying to read them.

## Configure storage with environment variables

The S3 storage fields can also be set with environment variables, for example to inject them from a container orchestrator or secret manager:

| Environment variable | Field |
| --- | --- |
| `NZ_BACKUP_S3_ENDPOINT` | Endpoint |
| `NZ_BACKUP_S3_BUCKET` | Bucket |
| `NZ_BACKUP_S3_REGION` | Region |
| `NZ_BACKUP_S3_PREFIX` | Key prefix |
| `NZ_BACKUP_S3_ACCESS_KEY_ID` | Access Key ID |
| `NZ_BACKUP_S3_SECRET_ACCESS_KEY` | Secret Access Key |

Fields set by an environment variable are shown as "Set by an environment variable" and cannot be changed in the admin panel. When the secret comes from an environment variable, the endpoint and bucket are read-only as well, so the secret cannot be sent to another address entered in the admin panel. The other backup settings are kept in a separate `backup.yaml` in the data directory (mode 0600), not in `config.yaml`. These names do not follow the [environment variable naming rules](/en_US/configuration/environment.html) of `config.yaml` fields; use them exactly as listed above.

## FAQ

**How is this different from backing up the data directory by hand?**
Built-in backups need no downtime, are encrypted and uploaded to off-site storage automatically, and restores are verified and roll back on failure. They cover only the dashboard itself. Use the [manual method](/en_US/guide/q5.html) to also move TSDB data or deployment files, or on dashboard versions without this feature.

**Agents are offline after a restore?**
Agents added after the backup do not exist in the backup data and must be added again. Other agents reconnect automatically; if the dashboard address changed, update the agents' connection address.

**The dashboard did not come back after applying a restore?**
Check that it runs under a supervisor, then start it manually. The swap happens at start, nothing else is needed.
