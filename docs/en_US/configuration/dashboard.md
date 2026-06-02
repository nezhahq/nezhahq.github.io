---
outline: deep
---

# Dashboard Configuration

Dashboard configuration is in YAML format, where items marked with \* can only be modified through the configuration file, while other configuration items are recommended to be modified through the admin frontend. See [Settings](/en_US/guide/settings.html) for details.

---

## Options

- ##### **`language`**

  - Language setting for Dashboard.
  - Requires filling in POSIX-style locale codes, such as `en_US`. For a list of supported languages, see <https://hosted.weblate.org/projects/nezha/nezha-dashboard>.
  - YAML uses underscore locale codes, such as `zh_CN` and `en_US`. The frontend may display hyphenated tags such as `zh-CN` and `en-US`, which are converted back to the YAML format when saved.

- ##### **`site_name`**

  - Site name, such as `Nezha`.

- ##### **`custom_code`**

  - Custom code for the user frontend, injected into the public user frontend.
  - User frontend variables such as `window.ForceShowServices`, `window.ForceShowMap`, and `window.ForceCardInline` only take effect here.

- ##### **`custom_code_dashboard`**

  - Custom code for the admin frontend, injected only into the logged-in admin frontend.

- ##### **`install_host`**

  - Specifies the server address for the installation command, in the format `host:port`.
  - The actual effect of this option is implemented by the frontend, and Dashboard itself does not use it.

- ##### **`reserved_hosts`**

  - Comma-separated public Dashboard hostnames, for example `nezha.example.com,status.example.com`.
  - This prevents normal members from creating NAT domains that collide with Dashboard entry hosts and hijack the panel route in reverse-proxy deployments.
  - When Dashboard runs behind a reverse proxy and cannot reliably infer its public hostnames, explicitly list every public entry hostname here.

- ##### **`tls`**

  - Boolean value, specifies whether the installation command enables TLS.
  - Set this to `true` only when Agents connect through HTTPS, Dashboard built-in HTTPS, or a reverse proxy/CDN that terminates TLS. Do not enable it when `install_host` is a plaintext direct `host:port`.
  - The actual effect of this option is implemented by the frontend, and Dashboard itself does not use it.

- ##### **`debug`** \*

  - Boolean value, whether to turn on debug mode.
  - When enabled, additional database logs and error logs when some functions do not work properly will be displayed.
  - At the same time, WebSocket same-origin policy will allow connections from loopback addresses.

- ##### **`web_real_ip_header`**

  - Specifies visitor's real IP request header for the Dashboard, such as `X-Real-Ip`.
  - After filling in, the built-in WAF will be automatically enabled, see [Web Application Firewall](/en_US/guide/settings.html#web-application-firewall).
  - If the option value is `NZ::Use-Peer-IP`, WAF will directly use the connection IP, and no longer need the upper-layer application to pass the request header.

- ##### **`agent_real_ip_header`**

  - Specifies Agent's real IP request header for the Dashboard, such as `X-Real-Ip`.
  - If the option value is `NZ::Use-Peer-IP`, Dashboard will directly use the connection IP, and no longer need the upper-layer application to pass the request header.

- ##### **`enable_mcp`**

  - Boolean value, whether to enable the Dashboard's built-in MCP (Model Context Protocol) HTTP endpoint.
  - Disabled by default. When enabled, clients can call MCP tools through `POST /mcp` with an API Token; this endpoint does not accept JWT.
  - When switching from enabled to disabled, the Dashboard fires a kill switch that removes MCP file-transfer temporary URLs, revokes MCP transfer streams, and cancels in-flight MCP RPC calls.
  - For API Token scopes and usage, see [API Interface](/en_US/guide/api.html#api-token-pat).

- ##### **`user_template`**

  - Default theme used by the user frontend.
  - Only filling in the built-in theme path is supported, see [service/singleton/frontend-templates.yaml](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml).

- ##### **`admin_template`**

  - Default theme used by the admin frontend.
  - Only filling in the built-in theme path is supported, see [service/singleton/frontend-templates.yaml](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml).

- ##### **`location`** \*

  - Time zone used by the program, mainly affecting notifications and database queries.
  - Defaults to `Asia/Shanghai`.

- ##### **`force_auth`** \*

  - Boolean value, whether to enable "force authentication".
  - After enabling, you need to log in to view server and service monitoring related data.

- ##### **`agent_secret_key`** \*

  - Connection secret key for the Agent.
  - No longer used in newer versions, instead, the connection secret key is bound to the user, see [Connection Secret](/en_US/guide/user.html#connection-secret).

- ##### **`jwt_timeout`** \*

  - Integer, specifies the expiration time of JWT (hours).
  - The default value is `1`.

- ##### **`jwt_secret_key`** \*

  - JWT signing key. In production, inject it with the `NZ_JWTSECRETKEY` environment variable instead of writing it to the configuration file.
  - If neither the configuration file nor the environment variable provides a key, Dashboard generates one on first startup and writes it back to `config.yaml`.
  - When `NZ_JWTSECRETKEY` is set, Dashboard uses the environment value, does not write it to YAML, and skips version-driven automatic rotation. Operators should rotate it by updating the environment variable and restarting Dashboard.

- ##### **`jwt_secret_key_last_rotated_version`** \*

  - Records the Dashboard version that last completed JWT key rotation.
  - Starting from the `v2.0.13` baseline, if `NZ_JWTSECRETKEY` is not used and this field is empty or lower than the baseline, Dashboard generates a new `jwt_secret_key` and updates this field.
  - Editing this field manually may invalidate sessions unnecessarily. Normally you only need to inspect it while troubleshooting upgrade rotation.

- ##### **`enable_plain_ip_in_notification`**

  - Boolean value, whether the notification sends the original IP.
  - The default is `false`, that is, send the desensitized IP (such as 1.\*\*.1).

- ##### **`enable_ip_change_notification`**

  - Boolean value, whether to enable IP change notification.

- ##### **`ip_change_notification_group_id`**

  - Integer, specifies the notification group for IP change notification.

- ##### **`cover`**

  - Integer, specifies the coverage of IP change notification.
  - `1` means full coverage, excluding the servers listed in `ignored_ip_notification`.
  - `2` means ignore all, monitoring only the servers listed in `ignored_ip_notification`.

- ##### **`ignored_ip_notification`**

  - Specifies the server ID for IP change notification, if the coverage is full coverage, then exclude these servers, if it is ignore all, then only monitor these servers.
  - Separated by commas, such as `1,2,3`.

- ##### **`avg_ping_count`** \*

  - Integer, when the number of TCPing / ICMP Ping service data entries in memory reaches this value, the average value will be taken and written to the database.
  - The default is `2`, increasing this value can reduce the storage of the database.

- ##### **`dns_servers`**

  - List of DNS servers used by the DDNS module.
  - If not filled, the built-in list is used.

- ##### **`listen_port`** \*

  - Dashboard listening port (HTTP).

- ##### **`listen_host`** \*

  - Dashboard listening address.

- ##### **`oauth2`** \*

  - OAuth 2.0 related configuration, see [Setting OAuth 2.0 Binding](/en_US/guide/q14.html).

- ##### **`https`** \*
  - HTTPS server configuration.
  - The following fields need to be filled in:
    - `listen_port`: Listening port
    - `tls_cert_path`: TLS certificate path
    - `tls_key_path`: TLS certificate private key path
    - `insecure_tls`: Boolean value, whether to turn off certificate integrity check

- ##### **`tsdb`** \*
  - TSDB (Time Series Database) configuration, powered by VictoriaMetrics storage engine, used as an alternative to the default database for storing service monitoring history and server metrics.
  - Disabled by default. TSDB is enabled only after `tsdb.data_path` is configured and the Dashboard is restarted; leaving it empty keeps TSDB disabled.
  - Once enabled, the legacy `service_histories` database table will be automatically dropped. Historical data will NOT be migrated.
  - If `data_path` is not configured, TSDB will not be enabled and service monitoring history will continue to use database storage.
  - The following fields need to be filled in:
    - `data_path`: Data storage path, e.g. `data/tsdb`. Leave empty to disable TSDB
    - `retention_days`: Data retention period in days, default `30`
    - `min_free_disk_space_gb`: Minimum free disk space (GB), stops writing when below this value, default `1`
    - `max_memory_mb`: Maximum memory usage (MB) for caching, default `256`
    - `write_buffer_size`: Write buffer size, batch writes when reaching this count, default `512`
    - `write_buffer_flush_interval`: Write buffer flush interval (seconds), default `5`
  - Example configuration:
    ```yaml
    tsdb:
      data_path: "data/tsdb"
      retention_days: 30
      max_memory_mb: 256
    ```
  - You can also set `tsdb.data_path` with the `NZ_TSDB_DATA_PATH` environment variable. `TSDB initialized successfully` in the startup log means TSDB is enabled; `TSDB is disabled (tsdb.data_path not configured)` means it is still disabled.
  - For details, see [How to Enable TSDB](/en_US/guide/q15.html).

- ##### **`memory`** \*
  - Memory configuration.
  - The following fields need to be filled in:
    - `go_mem_limit_mb`: Go runtime memory limit (MB), `0` means no limit
---

## Apply Config

After modifying the configuration file, you need to manually restart the Dashboard to apply the changes. The restart methods for different installation methods are different, as follows:

### Docker Installation

You can directly restart the Docker container:

```shell
docker restart nezha-dashboard
```

Or recreate the container:

```shell
cd /opt/nezha/dashboard
docker compose down
docker compose up -d
```

### Standalone Installation

Taking `systemd` as an example:

```shell
systemctl restart nezha-dashboard.service
```
