---
outline: deep
---

# DDNS

The DDNS feature is designed for servers using dynamic IP addresses. When an Agent server reports a new IP, the Dashboard automatically updates the DNS records based on your configuration.

## Why Use Nezha's DDNS Feature?

- **Centralized Management**: Conveniently manage DDNS settings in the Dashboard without deploying separate DDNS services on each server.
- **Enhanced Security**: Sensitive information is only stored on the Dashboard server, reducing the risk of data leaks.

## Configuration Instructions

DDNS can be configured directly in the Dashboard's admin panel.

1. **Access the DDNS Configuration Page**  
   Navigate to the **DDNS** option in the menu to open the configuration page.  

2. **Create a New Configuration**  
   Click **New Configuration** and fill in the following details:
   - **Name**: A unique name for identifying the configuration.
   - **DDNS Provider**: Select the DNS provider.
   - **Domain (comma-separated)**: Enter the domains to be updated, separated by commas if multiple. Supports IDNs (Internationalized Domain Names).
   - **Max Retry Attempts**: The maximum number of retries for DDNS updates (default: 3, range: 1–10).
   - **DDNS Credential 1** and **DDNS Credential 2**: Optional credentials depending on the provider (see [Provider List](#provider-list)).

3. **Webhook-Specific Configuration**  
   If using the `webhook` provider, follow the [Webhook Configuration Instructions](#webhook-configuration-instructions).

4. **Enable Options**  
   Enable at least one of **DDNS for IPv4** or **DDNS for IPv6**; otherwise, updates will not occur.

5. **Associate with Servers**  
   After adding a DDNS configuration, modify the server settings to enable DDNS functionality:
   - **Enable DDNS**: Go to the `Servers` page and enable DDNS for the target server.
   - **DDNS Configuration**: Select the appropriate DDNS configuration ID, which can be searched by name.

---

## Webhook Configuration Instructions

Webhooks allow you to customize HTTP requests for third-party services or other specialized needs.

### Options

- **Webhook URL**: The URL for the HTTP request, supporting placeholder substitution.
- **Webhook Request Method**: Choose from `GET`, `POST`, `PATCH`, `DELETE`, or `PUT`.
- **Webhook Request Type**: The request body format, either `JSON` or `Form`.
- **Webhook Request Headers**: Input headers in JSON format (nested headers are not supported).
- **Webhook Request Body**: Not used for `GET` and `DELETE`. For nested formats, use `JSON`.

---

### Placeholders

| Placeholder      | Description                      |
| ---------------- | -------------------------------- |
| `#ip#`           | Host IP address                 |
| `#domain#`       | Domain (one domain per request) |
| `#type#`         | IP type: `"ipv4"` or `"ipv6"`   |
| `#record#`       | Record type: `"A"` or `"AAAA"`  |
| `#access_id#`    | DDNS Credential 1               |
| `#access_secret#`| DDNS Credential 2               |

---

### Oray Webhook Example
<details>
  <summary>Click to Expand/Collapse</summary>

- **URL**: `http://ddns.oray.com/ph/update?hostname=#domain#&myip=#ip#`
- **Request Method**: `GET`
- **Request Headers**:  
  ```json
  {
    "Authorization": "Basic pass"
  }
  ```
  Here, `pass` is the Base64-encoded value of your `username:password`. For example, `user:pass` becomes `dXNlcjpwYXNzCg==`.
- **Notes**: Oray only supports A records, so only enable IPv4.

</details>

---

## Provider List

| Provider         | Credential 1 (ID) | Credential 2 (Secret) |
| ---------------- | ---------------- | --------------------- |
| `dummy`          | ❌               | ❌                    |
| `webhook`        | Optional         | Optional              |
| `cloudflare`     | ❌               | ✅                    |
| `tencentcloud`   | ✅               | ✅                    |

### `cloudflare` Token Permissions

The Token needs to assign the following permissions to the target domain name:
   `Zone.Zone:Read`, `Zone.DNS:Edit`

---

## Viewing Logs

The DDNS logs can be accessed on the Dashboard logs page. If configured correctly, logs will display update statuses. For example:

```shell
dashboard_1  | 2024/03/16 23:16:25 NEZHA>> Attempting to update domain (ddns.example.com) DDNS (1/3)
dashboard_1  | 2024/03/16 23:16:28 NEZHA>> Successfully updated domain (ddns.example.com) DDNS
```