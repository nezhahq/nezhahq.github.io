---
outline: deep
---

# DDNS

The DDNS functionality is designed for servers with dynamic IP addresses. When the Agent server reports a new IP (every 10 minutes), Dashboard will automatically update the DNS record based on the configuration.

### Why should I use Nezha's DDNS functionality?

- Convenient centralized management of DDNS settings, instead of deploying a DDNS service on every server.
- Your confidential information is only stored on the Dashboard server, preventing leaks.

### Configuration

You can directly add DDNS configurations in the Dashboard management page.

1. Click on the "Dynamic DNS" option in the menu bar to enter the configuration page.
2. Click the "New Profile" button and fill in the required information in the pop-up window. Option details:
    - **Name**: The name of the configuration.
    - **DDNS Provider**: The type of provider, determining the method used to update DNS records.
    - **Domains (separate with comma)**: The domain(s), if you enter multiple domains, they should be separated by commas. IDNs (Internationalized Domain Names) are supported.
    - **Maximum retry attempts**: The number of attempts for updating DDNS, default is 3, and the range is between 1 and 10.
    - **DDNS Credential 1** and **DDNS Credential 2** are optional. Typically, at least one needs to be provided. The [table](#provider-list) below lists the options for all providers.
3. If using the `webhook` provider, the corresponding options need to be filled out as required. For detailed instructions, see [Webhook Configuration](#webhook-configuration).
4. You need to check at least one of **IPv4 Enabled** and **IPv6 Enabled**; otherwise, no update operations will be performed.
5. After adding a new configuration, you also need to modify the server settings to activate DDNS. Server-related options include:
    - **Enable DDNS**: Enable DDNS functionality for this server.
    - **DDNS Profiles**: The list of DDNS configuration IDs to use, searchable by configuration name.

## Webhook Configuration

Webhook requires manually constructing HTTP requests, suitable for using other provider services when operations are simple.

Webhook option descriptions:
- **Webhook URL**: The URL for the HTTP request, where parameters can use placeholders.
- **Webhook Request Method**: The HTTP request method. Supported methods include `GET`, `POST`, `PATCH`, `DELETE`, and `PUT`.
- **Webhook Request Type**: The format of the HTTP request body, either `JSON` or `Form`.
- **Webhook Request Headers**: HTTP request headers, filled in JSON format, but nesting is not supported.
- **Webhook Request Body**: The HTTP request body. It won't be used for `GET` and `DELETE`. If you need to use a nested format, you must choose `JSON` as the request type.

Supported Webhook placeholders:
- `#ip#`: Host IP.
- `#domain#`: DDNS domain. Each request is made separately for each domain, so this value will be a single domain string.
- `#type#`: IP type, either `"ipv4"` or `"ipv6"`.
- `#record#`: Record type, either `"A"` or `"AAAA"`.
- `#access_id#`: DDNS Credential 1.
- `#access_secret#`: DDNS Credential 2.

### Oray Webhook Example
<details>
  <summary>Click to expand/collapse</summary>

- URL：`http://ddns.oray.com/ph/update?hostname=#domain#&myip=#ip#`
- Request Method: `GET`
- Request Header：`{"Authorization": "Basic pass"}`, replace `pass` with the Base64-encoded userpass (e.g., `user:pass` becomes `dXNlcjpwYXNzCg==`).
- Oray only supports A records, so only enable IPv4. Other Webhook options are not required.

</details>

## Provider List

| Provider      | Credential 1 (ID) | Credential 2 (Secret) |
| ------------ | ----------- | --------------- |
| `dummy`      | ❌️         | ❌️             |
| `webhook`    | Optional       | Optional            |
| `cloudflare` | ❌️         | ✅             |
| `tencentcloud`| ✅        | ✅             |

## Viewing Logs

In the Dashboard logs, you can see the relevant logs for the DDNS functionality. When configured correctly, there will be corresponding log entries when updating DNS records.

```shell
dashboard_1  | 2024/03/16 23:16:25 NEZHA>> 正在尝试更新域名(ddns.example.com)DDNS(1/3)
dashboard_1  | 2024/03/16 23:16:28 NEZHA>> 尝试更新域名(ddns.example.com)DDNS成功
```
