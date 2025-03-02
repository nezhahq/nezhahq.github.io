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

- ##### **`site_name`**

  - Site name, such as `Nezha`.

- ##### **`custom_code / custom_code_dashboard`**

  - Custom code for the user frontend / management frontend.

- ##### **`install_host`**

  - Specifies the server address for the installation command, in the format `host:port`.
  - The actual effect of this option is implemented by the frontend, and Dashboard itself does not use it.

- ##### **`tls`**

  - Boolean value, specifies whether the installation command enables TLS.
  - The actual effect of this option is implemented by the frontend, and Dashboard itself does not use it.

- ##### **`debug`** \*

  - Boolean value, whether to turn on debug mode.
  - When enabled, additional database logs and error logs when some functions do not work properly will be displayed.
  - At the same time, WebSocket same-origin policy will allow connections from loopback addresses.

- ##### **`real_ip_header`**

  - Specifies the real IP request header for the Dashboard, such as `X-Real-Ip`.
  - After filling in, the built-in WAF will be automatically enabled, see [Web Application Firewall](/en_US/guide/settings.html#web-application-firewall).
  - If the option value is `NZ::Use-Peer-IP`, WAF will directly use the connection IP, and no longer need the upper-layer application to pass the request header.

- ##### **`user_template / admin_template`**

  - Default frontend theme used.
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

- ##### **`enable_plain_ip_in_notification`**

  - Boolean value, whether the notification sends the original IP.
  - The default is `false`, that is, send the desensitized IP (such as 1.\*\*.1).

- ##### **`enable_ip_change_notification`**

  - Boolean value, whether to enable IP change notification.

- ##### **`ip_change_notification_group_id`**

  - Integer, specifies the notification group for IP change notification.

- ##### **`cover`**

  - Integer, specifies the coverage of IP change notification.
  - `0` is full coverage, `1` is ignore all.

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
