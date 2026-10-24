---
description: Complete Nezha Monitoring V2 Dashboard YAML configuration reference for domains, TLS, real IP, OAuth2, JWT, frontends, MCP, TSDB, memory, and notification privacy.
outline: deep
---

# Dashboard Configuration

Dashboard configuration is in YAML format, where items marked with \* can only be modified through the configuration file, while other configuration items should use the admin frontend when it exposes them. See [Settings](/en_US/guide/settings.html) for details.

---

## Files, defaults, and editing

Dashboard defaults to `data/config.yaml` relative to its working directory; `-c` selects another file and `-db` independently selects the SQLite database. See [loading and environment variables](/en_US/configuration/environment.html) before mixing sources. Missing/zero values use the defaults below where implemented; empty strings and maps are shown explicitly. For complete scenarios, see [configuration recipes](/en_US/configuration/examples.html).

File-only settings require restart. Admin-supported settings can be saved through the UI, but availability in the settings API does not guarantee a visible UI control. In particular, `admin_template` is not in `SettingForm` and must be edited in the file.

## Options

- ##### **`language`**

  - Type: `string`; default: `en_US`.

  - Language setting for Dashboard.
  - Requires filling in POSIX-style locale codes, such as `en_US`. For a list of supported languages, see <https://hosted.weblate.org/projects/nezha/nezha-dashboard>.
  - YAML uses underscore locale codes, such as `zh_CN` and `en_US`. The frontend may display hyphenated tags such as `zh-CN` and `en-US`, which are converted back to the YAML format when saved.

- ##### **`site_name`**

  - Type: `string`; default: `""`.

  - Site name, such as `Nezha`.

- ##### **`custom_code`**

  - Type: `string`; default: `""`.

  - Custom code for the user frontend, injected into the public user frontend.
  - User frontend variables such as `window.ForceShowServices`, `window.ForceShowMap`, and `window.ForceCardInline` only take effect here.

- ##### **`custom_code_dashboard`**

  - Type: `string`; default: `""`.

  - Custom code for the admin frontend, used by admin frontend pages, including their login flow; not secret storage.

- ##### **`install_host`**

  - Type: `string`; default: `""`.

  - Specifies the server address for the installation command, in the format `host:port`.
  - The frontend uses this value to generate Agent installation commands. Dashboard also treats its Host as a trusted OAuth2 callback Host and a reserved NAT hostname.

- ##### **`dashboard_host`**

  - Type: `string`; default: `""`.

  - Specifies the public Dashboard address used for OAuth2 callbacks, in the format `domain/IP[:port]`. Do not include a scheme or path; omit the port when using the default HTTP/HTTPS port.
  - Set this explicitly when Dashboard has a fixed public entry point, especially when its public address differs from `install_host`.
  - During an OAuth2 callback, if the request Host does not match `dashboard_host`, `install_host`, `listen_host`, or `reserved_hosts`, Dashboard replaces the callback Host with this value. When empty, Dashboard trusts the request Host.
  - This address is also reserved automatically for NAT, preventing normal members from creating a conflicting NAT rule.

- ##### **`reserved_hosts`**

  - Type: `string`; default: `""`.

  - Comma-separated public Dashboard hostnames, for example `nezha.example.com,status.example.com`.
  - This prevents normal members from creating NAT domains that collide with Dashboard entry hosts and hijack the panel route in reverse-proxy deployments.
  - When Dashboard runs behind a reverse proxy and cannot reliably infer its public hostnames, explicitly list every public entry hostname here.
  - These hostnames are also trusted as OAuth2 callback Hosts. If you use multiple public entry points, register the corresponding callback URLs with the OAuth2 provider as well.

- ##### **`tls`**

  - Type: `bool`; default: `false`.

  - Boolean value, specifies whether the installation command enables TLS.
  - Set this to `true` only when Agents connect through HTTPS, Dashboard built-in HTTPS, or a reverse proxy/CDN that terminates TLS. Do not enable it when `install_host` is a plaintext direct `host:port`.
  - The actual effect of this option is implemented by the frontend, and Dashboard itself does not use it.

- ##### **`debug`** \*

  - Type: `bool`; default: `false`.

  - Boolean value, whether to turn on debug mode.
  - When enabled, additional database logs and error logs when some functions do not work properly will be displayed.
  - At the same time, WebSocket same-origin policy will allow connections from loopback addresses.

- ##### **`web_real_ip_header`**

  - Type: `string`; default: `""`.

  - Specifies visitor's real IP request header for the Dashboard, such as `X-Real-Ip`.
  - After filling in, the built-in WAF will be automatically enabled, see [Web Application Firewall](/en_US/guide/settings.html#web-application-firewall).
  - If the option value is `NZ::Use-Peer-IP`, WAF will directly use the connection IP, and no longer need the upper-layer application to pass the request header.
  - For complete usage instructions, reverse proxy examples, and recovery steps, see [Frontend Real IP Header Configuration](/en_US/guide/q12.html).

- ##### **`agent_real_ip_header`**

  - Type: `string`; default: `""`.

  - Specifies Agent's real IP request header for the Dashboard, such as `X-Real-Ip`.
  - If the option value is `NZ::Use-Peer-IP`, Dashboard will directly use the connection IP, and no longer need the upper-layer application to pass the request header.

- ##### **`enable_mcp`**

  - Type: `bool`; default: `false`.

  - Boolean value, whether to enable the Dashboard's built-in MCP (Model Context Protocol) HTTP endpoint.
  - Disabled by default. When enabled, clients can call MCP tools through `POST /mcp` with an API Token; this endpoint does not accept JWT.
  - When switching from enabled to disabled, the Dashboard fires a kill switch that removes MCP file-transfer temporary URLs, revokes MCP transfer streams, and cancels in-flight MCP RPC calls.
  - For API Token scopes and usage, see [API Interface](/en_US/guide/api.html#api-token-pat).

- ##### **`user_template`**

  - Type: `string`; default: `user-dist`.

  - Default theme used by the user frontend.
  - Only filling in the built-in theme path is supported, see [service/singleton/frontend-templates.yaml](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml).

- ##### **`admin_template`** \*

  - Type: `string`; default: `admin-dist`.

  - Default theme used by the admin frontend.
  - Only filling in the built-in theme path is supported, see [service/singleton/frontend-templates.yaml](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml).

- ##### **`location`** \*

  - Type: `string`; default: `Asia/Shanghai`.

  - Time zone used by the program, mainly affecting notifications and database queries.
  - Defaults to `Asia/Shanghai`.

- ##### **`force_auth`** \*

  - Type: `bool`; default: `false`.

  - Boolean value, whether to enable "force authentication".
  - After enabling, you need to log in to view server and service monitoring related data.

- ##### **`agent_secret_key`** \*

  - Type: `string`; default: Generated compatibility secret.

  - Connection secret key for the Agent.
  - This field is retained for legacy Agent compatibility. Current deployments should use user-bound connection secrets; see [Connection Secret](/en_US/guide/user.html#connection-secret).

- ##### **`jwt_timeout`** \*

  - Type: `integer`; default: `1`.

  - Integer, specifies the expiration time of JWT (hours).
  - The default value is `1`.

- ##### **`allow_jwt_ip_change`**

  - Type: `bool`; default: `false`.

  - Boolean, default `false`.
  - By default, browser login sessions are bound to the client's IP at login; an IP change requires signing in again. Set this to `true` to keep a JWT session usable after an IP change, for example when frequently switching networks. This relaxes session protection.
  - The current admin frontend has no switch for this option. Edit YAML and restart, or update `allow_jwt_ip_change` through the administrator settings API. PAT scopes, server allowlists, expiration, and revocation are unchanged.

- ##### **`jwt_secret_key`** \*

  - Type: `string`; default: Generated if absent from file and environment.

  - JWT signing key. In production, inject it with the `NZ_JWTSECRETKEY` environment variable instead of writing it to the configuration file.
  - If neither the configuration file nor the environment variable provides a key, Dashboard generates one on first startup and writes it back to `config.yaml`.
  - When `NZ_JWTSECRETKEY` is set, Dashboard uses the environment value, does not write it to YAML, and skips version-driven automatic rotation. Operators should rotate it by updating the environment variable and restarting Dashboard.

- ##### **`jwt_secret_key_last_rotated_version`** \*

  - Type: `string`; default: Automatically managed rotation metadata.

  - Records the Dashboard version that last completed JWT key rotation.
  - If `NZ_JWTSECRETKEY` is not used and the recorded rotation version is empty or below the current rotation baseline `v2.0.13`, Dashboard generates a new `jwt_secret_key` and updates this field.
  - Editing this field manually may invalidate sessions unnecessarily. Normally you only need to inspect it while troubleshooting upgrade rotation.

- ##### **`enable_plain_ip_in_notification`**

  - Type: `bool`; default: `false`.

  - Boolean value, whether the notification sends the original IP.
  - The default is `false`, that is, send the desensitized IP (such as 1.\*\*.1).

- ##### **`enable_ip_change_notification`**

  - Type: `bool`; default: `false`.

  - Boolean value, whether to enable IP change notification.

- ##### **`ip_change_notification_group_id`**

  - Type: `integer`; default: `0`.

  - Integer, specifies the notification group for IP change notification.

- ##### **`cover`**

  - Type: `integer`; default: `1`.

  - Integer, specifies the coverage of IP change notification.
  - `1` means full coverage, excluding the servers listed in `ignored_ip_notification`.
  - `2` means ignore all, monitoring only the servers listed in `ignored_ip_notification`.

- ##### **`ignored_ip_notification`**

  - Type: `string`; default: `""`.

  - Specifies the server ID for IP change notification, if the coverage is full coverage, then exclude these servers, if it is ignore all, then only monitor these servers.
  - Separated by commas, such as `1,2,3`.

- ##### **`avg_ping_count`** \*

  - Type: `integer`; default: `2`.

  - Integer, when the number of TCPing / ICMP Ping service data entries in memory reaches this value, the average value will be taken and written to the database.
  - The default is `2`, increasing this value can reduce the storage of the database.

- ##### **`online_stats_days`**

  - Type: `integer`; default: `7`.

  - Integer, default `7`, valid range `7`–`3650` days.
  - Controls both online-session history retention and the online-history API's maximum query window. It does not control retention of CPU, network, or other TSDB metrics.
  - This field can be changed in the admin frontend system settings. The settings API rejects out-of-range values; at startup, a missing, `0`, or out-of-range YAML value falls back to `7`.
  - After reducing the range, closed sessions outside the window are periodically pruned. Increasing the range later cannot recover deleted history. See [Server online history](/en_US/guide/servers.html#online-history).

- ##### **`dns_servers`**

  - Type: `string`; default: `""`.

  - List of DNS servers used by the DDNS module.
  - If not filled, the built-in list is used.

- ##### **`listen_port`** \*

  - Type: `integer`; default: `8008`.

  - Dashboard listening port (HTTP).

- ##### **`listen_host`** \*

  - Type: `string`; default: `""`.

  - Dashboard bind address. Empty means wildcard binding; use `127.0.0.1` for loopback-only access. Container networking may require a different bind address.

- ##### **`oauth2`** \*

  - Type: `map`; default: `{}`.

  - OAuth 2.0 related configuration, see [Setting OAuth 2.0 Binding](/en_US/guide/q14.html).

- ##### **`https`** \*

  - Type: `object`; default: `{}`.
  - HTTPS server configuration.
  - The following fields need to be filled in:
    - `listen_port`: Listening port
    - `tls_cert_path`: TLS certificate path
    - `tls_key_path`: TLS certificate private key path
    - `insecure_tls`: Boolean, default `false`; a server-side setting, not a client trust switch

- ##### **`tsdb`** \*

  - Type: `object`; default: `{}`.
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
  - You can also set `tsdb.data_path` with the `NZ_TSDB_DATAPATH` environment variable. `TSDB initialized successfully` in the startup log means TSDB is enabled; `TSDB is disabled (tsdb.data_path not configured)` means it is still disabled.
  - For details, see [How to Enable TSDB](/en_US/guide/q15.html).

- ##### **`memory`** \*

  - Type: `object`; default: `{}`.
  - Memory configuration.
  - The following fields need to be filled in:
    - `go_mem_limit_mb`: Go runtime soft memory limit (MB); `0` sets no additional limit, not an RSS/container hard cap
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


## Operational details

`https.listen_port` defaults to `0` (disabled). Enabling it adds a listener without closing HTTP. Certificate/key paths default to empty; provide readable paths. `https.insecure_tls` defaults to `false` and does not configure client trust.

`memory.go_mem_limit_mb` defaults to `0`: no additional runtime memory limit is set. A positive value is a Go soft limit, not an RSS or container hard cap.

`dns_servers` is a comma-separated string for Dashboard DDNS, unlike the Agent `dns` array. OAuth2 is a provider-name map containing `client_id`, `client_secret`, `scopes`, and, for custom providers, `endpoint.auth_url`, `endpoint.token_url`, `user_info_url`, and `user_id_path`. See [OAuth2 configuration](/en_US/guide/q14.html).

Selected templates are validated against the bundled manifest. Local file overrides for the selected directory are described in [theme development](/en_US/developer/theme-development.html).

## Related documentation

- [Architecture and data flow](/en_US/guide/architecture.html)
- [Security and privacy](/en_US/guide/security.html)
- [Version and compatibility](/en_US/guide/version-compatibility.html)
- [Dashboard troubleshooting](/en_US/guide/dashboardq.html)
