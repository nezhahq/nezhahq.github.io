---
outline: deep
---

# API Interface

Since v1, the Nezha Monitor Dashboard primarily uses the `/api/v1` path. APIs return JSON and are suitable for custom frontends, bots, automation scripts, and internal operations tools.

If you need a complete API list synchronized with the source code, use the Dashboard's built-in Swagger documentation first. This page keeps common APIs and calling rules for quick reference.

---

## Get Complete API Documentation

The Dashboard mounts Swagger UI when debug mode is enabled:

1. Edit the Dashboard configuration file and enable debug mode:

   ```yaml
   debug: true
   ```

2. Restart the Dashboard.

3. Check the Dashboard logs for the address. The default is similar to:

   ```text
   http://localhost:8008/swagger/index.html
   ```

If you are developing from source, you can also generate Swagger files in the repository root:

```shell
./script/bootstrap.sh
```

The generated files are located in `cmd/dashboard/docs`.

::: warning
`debug: true` exposes additional debug information and Swagger UI. It is not recommended to keep it enabled long-term in a public production environment. For online troubleshooting, enable it temporarily, then disable it and restart the Dashboard after finishing.
:::

---

## Authentication

### Log In to Get a Token

Request:

```http
POST /api/v1/login
Content-Type: application/json
```

Request body:

```json
{
  "username": "admin",
  "password": "your-password"
}
```

Successful response:

```json
{
  "success": true,
  "data": {
    "token": "JWT_TOKEN",
    "expire": "2026-05-18T12:00:00+02:00"
  }
}
```

For later APIs that require login, include this request header:

```http
Authorization: Bearer JWT_TOKEN
```

### Personal Access Token (PAT)

JWT is mainly used for browser and admin-frontend sessions. For automation scripts, CI, LLM tools, and MCP clients, use a Personal Access Token (PAT). The PAT request header format is:

```http
Authorization: Bearer nzp_<secret>
```

Create and revoke PATs from **System Settings → API Tokens** in the admin frontend. When creating a PAT, fill in:

- `name`: Token name, up to 128 characters.
- `scopes`: Permission list, at least 1 item and at most 32 items.
- `server_ids`: Optional server ID whitelist, up to 1000 items. Leave it empty to add no extra whitelist beyond the owner's existing server permissions.
- `expires_in_days`: Optional expiration in days. Empty or `0` means never expires; the maximum is `3650`.

After creation, the plaintext token is returned only once. Copy and store it immediately. Later list APIs only return masked token metadata, such as scopes, server whitelist, expiration time, last used time, and last used IP.

::: warning
The `/api/v1/api-tokens` token-management APIs are JWT-only. A PAT cannot create, modify, or delete PATs by itself.
:::

### PAT Scopes

PAT scopes use the `nezha:{resource}:{verb}` naming scheme. JWT-authenticated requests do not go through PAT scope enforcement; PAT-authenticated requests must carry the scope required by each endpoint.

Resources include:

- `server`
- `service`
- `alertrule`
- `cron`
- `ddns`
- `nat`
- `notification`
- `notification-group`
- `transfer`
- `admin`

Verbs include:

- `read`
- `write`
- `delete`
- `exec`

Common examples:

- `nezha:inventory:read`: List servers and server groups (`server.list`, `GET /api/v1/server`, `GET /api/v1/server-group`).
- `nezha:inventory:delete`: Delete servers and server groups (`batch-delete/server`, `batch-delete/server-group`).
- `nezha:server:read`: Inspect a single server, read its metrics and files, and read server-related service monitors.
- `nezha:server:exec`: Create online terminals or call MCP remote-execution tools.
- `nezha:cron:exec`: Manually trigger scheduled tasks.
- `nezha:transfer:write`: Cancel or retry server transfer tasks.
- `nezha:admin:*`: Admin resources such as users, WAF, online users, system settings, and maintenance.

Wildcard scopes:

- `nezha:<resource>:*`: Allows all actions under one resource, such as `nezha:server:*`.
- `nezha:admin:*`: Allows admin resources and can only be issued by administrators.
- `nezha:*`: Full access and can only be issued by administrators.

### PAT-Forbidden APIs

The following APIs are personal-account self-management flows. They explicitly reject PATs and must be called with a login JWT:

- `POST /api/v1/refresh-token`
- `GET /api/v1/profile`
- `POST /api/v1/profile`
- `POST /api/v1/oauth2/{provider}/unbind`
- `GET /api/v1/api-tokens`
- `POST /api/v1/api-tokens`
- `DELETE /api/v1/api-tokens/{id}`

### Guest-Accessible APIs

Some read-only APIs support guest access, but they are limited by site configuration and server hidden settings:

- After `force_auth` is enabled, guests cannot access server and service monitoring data.
- If a server is hidden from guests, guests cannot access that server's data.
- In service history and server metrics APIs, guests can only query `1d` period data.

### API Token (PAT)

An API Token is another authentication method for the same `/api/v1` REST API. It is also a PAT (Personal Access Token). It uses the same `Authorization: Bearer ...` header as the JWT returned by login, and it uses the same response format and routes below. The difference is that JWT is for browser login sessions, while API Tokens are for scripts, automation tools, and MCP clients.

Plaintext tokens always start with `nzp_`. The Dashboard stores only a hash. The plaintext token is shown once after creation; after closing the dialog, you cannot reveal it again and must create a new one.

Log in to the admin frontend, open **Settings > API Tokens**, then click **Create API Token**. Fill in:

| Field | Description |
| --- | --- |
| Name | A human-readable purpose, for example `homepage-readonly` or `mcp-maintenance`. Maximum 128 characters. |
| Scopes | Which resources and actions the token can call. At least one scope is required. |
| Server IDs | Optional server ID allowlist, separated by commas, for example `1,2,3`. Leave it empty to add no extra server restriction; the user's own permissions still apply. |
| Expires in days | Optional expiry in days. The frontend defaults to `90`; blank or `0` means never expires. Maximum 3650 days. |

Normal users can create, list, and revoke their own tokens. Administrators use the same page for their own tokens, and only administrators can issue admin scopes such as `nezha:admin:*` or `nezha:*`.

REST API calls use the same header as JWT:

```http
Authorization: Bearer nzp_xxxxxxxxxxxxxxxxxxxx
```

API Tokens are controlled by `nezha:{resource}:{verb}` scopes and only narrow the current user's original permissions. Even if a token has a scope, it still cannot bypass the user's own server, administrator, or resource ownership restrictions. When creating a token, you can also fill in a server ID allowlist; leaving it empty means there is no additional server restriction.

Common errors:

| Status | Meaning |
| --- | --- |
| `401 Unauthorized` | The token is invalid, expired, owned by a missing user, or the `Authorization` header is malformed. |
| `403 Forbidden` | The token is valid, but it lacks the required scope, the server is outside the allowlist, the user has no permission for the server, or the endpoint explicitly rejects API Tokens. |

Common scopes:

| Scope | Description |
| --- | --- |
| `nezha:inventory:read` | Read the server inventory, server groups, and real-time server status stream |
| `nezha:inventory:delete` | Delete servers and server groups |
| `nezha:server:read` | Read known server details, metrics, service status, file lists, and file contents |
| `nezha:server:write` | Modify servers, push configuration, force updates, move servers, and write files |
| `nezha:server:delete` | Delete files on servers |
| `nezha:server:exec` | Open online terminals and run commands |
| `nezha:service:read/write/delete` | Read, create/edit, or delete service monitors |
| `nezha:alertrule:read/write/delete` | Read, create/edit, or delete alert rules |
| `nezha:cron:read/write/delete/exec` | Read, create/edit, delete, or manually trigger scheduled tasks |
| `nezha:ddns:read/write/delete` | Read, create/edit, or delete DDNS profiles |
| `nezha:nat:read/write/delete` | Read, create/edit, or delete NAT rules |
| `nezha:notification:read/write/delete` | Read, create/edit, or delete notification methods |
| `nezha:notification-group:read/write/delete` | Read, create/edit, or delete notification groups |
| `nezha:transfer:read/write/delete` | Read, cancel/retry, or delete server transfer records |
| `nezha:<resource>:*` | All actions on one resource, for example `nezha:server:*` |
| `nezha:admin:*` | User, WAF, settings, online-user, and other admin APIs; admin only |
| `nezha:*` | Full access; admin only |

`inventory` and `server` are separate resource domains. `inventory` controls which machine records can be listed or deleted, while `server` controls runtime operations on known servers. For example, a token with only `nezha:server:exec` can run commands on an allowed server, but cannot enumerate the server list; listing servers also requires `nezha:inventory:read`.

Common REST route scope mapping:

| Route | Required API Token scope |
| --- | --- |
| `GET /api/v1/server`, `GET /api/v1/ws/server`, `GET /api/v1/server-group` | `nezha:inventory:read` |
| `POST /api/v1/batch-delete/server`, `POST /api/v1/batch-delete/server-group` | `nezha:inventory:delete` |
| `PATCH /api/v1/server/{id}`, `GET /api/v1/server/config/{id}`, `POST /api/v1/server/config`, `POST /api/v1/batch-move/server`, `POST /api/v1/force-update/server` | `nezha:server:write` |
| `POST /api/v1/file`, `GET /api/v1/ws/file/{id}` | Requires all of `nezha:server:read`, `nezha:server:write`, and `nezha:server:delete` |
| `GET /api/v1/transfer`, `GET /api/v1/ws/transfer` | `nezha:transfer:read` |
| `POST /api/v1/transfer/{id}/cancel`, `POST /api/v1/transfer/{id}/retry` | `nezha:transfer:write` |
| `GET/POST/PATCH/DELETE` resource management APIs | The matching resource `read`, `write`, or `delete` scope |
| `/api/v1/user`, `/api/v1/waf`, `/api/v1/online-user`, `PATCH /api/v1/setting`, `POST /api/v1/maintenance` | `nezha:admin:*` or `nezha:*`, and the calling user must be an administrator |

Common scope sets:

| Scenario | Recommended scopes |
| --- | --- |
| External dashboard showing only the server inventory | `nezha:inventory:read` |
| External dashboard reading server details and metrics | `nezha:inventory:read`, `nezha:server:read` |
| MCP client that lists servers and reads small files | `nezha:inventory:read`, `nezha:server:read` |
| MCP client that runs maintenance commands | `nezha:inventory:read`, `nezha:server:read`, `nezha:server:exec`, plus a server ID allowlist |
| MCP client that writes or uploads files | `nezha:server:read`, `nezha:server:write`, plus a server ID allowlist |
| CI/CD job that only triggers selected cron tasks | `nezha:cron:read`, `nezha:cron:exec` |
| Operations script managing service monitors | `nezha:service:read`, `nezha:service:write`, and add `nezha:service:delete` only if deletion is needed |
| Admin automation for system settings | `nezha:admin:*`, available only to administrator tokens |

If the token is for one or a few servers, always set the `Server IDs` allowlist. That way, even broad scopes can only act on those servers.

Legacy `mcp:*` scopes are no longer used as runtime permissions. When creating a token, `mcp:server:read`, `mcp:server:exec`, and `mcp:fs:read` are rewritten to the corresponding `nezha:*` scopes for compatibility; `mcp:fs:write`, `mcp:fs:delete`, and `mcp:*` are rejected. During startup migration, dangerous legacy scopes left in the database are cleaned up, and tokens with no scopes left after cleanup are deleted.

::: warning
API Tokens cannot call account self-management APIs, such as `/api/v1/profile`, `/api/v1/refresh-token`, `/api/v1/oauth2/{provider}/unbind`, and `/api/v1/api-tokens`. These APIs only accept the JWT produced by browser login.
:::

In **Settings > API Tokens**, click **Revoke** to revoke a token. After revocation, new requests fail immediately. Long-lived connections using that token are cancelled, including real-time server status streams, transfer streams, online terminals, file manager connections, in-flight MCP `tools/call` requests, file upload/download transfers, and temporary transfer URLs.

---

## MCP Access

Dashboard provides a standalone MCP endpoint:

```http
POST /mcp
Authorization: Bearer nzp_<secret>
```

MCP is outside `/api/v1` and accepts PAT only, not JWT. Before using it, enable [`enable_mcp`](/en_US/configuration/dashboard.html#enable_mcp) in Dashboard configuration or the admin frontend. When disabled, Dashboard rejects new MCP calls and interrupts related MCP transfer tasks.

For Streamable HTTP client compatibility, `GET /mcp` and `DELETE /mcp` explicitly return method-not-allowed. Actual calls should use `POST /mcp`. File transfer tools use `GET /mcp/download/:token` and `POST /mcp/upload/:token` as temporary transfer URLs.

The MCP endpoint has an Origin guard to reduce browser cross-site call and DNS rebinding risks. Still, issue least-privilege PATs for MCP clients, and keep `enable_mcp` disabled when MCP is not in use.

### MCP Tool Scopes

| Tool | Required scope |
| --- | --- |
| `meta.whoami` | Any valid PAT |
| `server.list` | `nezha:inventory:read` |
| `server.get` | `nezha:server:read` |
| `server.exec` | `nezha:server:exec` |
| `fs.list` / `fs.read` / `fs.download_url` | `nezha:server:read` |
| `fs.write` / `fs.upload_url` | `nezha:server:write` |
| `fs.delete` | `nezha:server:delete` |

## Response Format

Normal APIs return:

```json
{
  "success": true,
  "data": {}
}
```

Failures usually return:

```json
{
  "success": false,
  "error": "error message"
}
```

Paginated list APIs return:

```json
{
  "success": true,
  "data": {
    "value": [],
    "pagination": {
      "offset": 0,
      "limit": 10,
      "total": 100
    }
  }
}
```

---

## Common APIs

### Get System Settings

Request:

```http
GET /api/v1/setting
```

Notes:

- Reads basic information such as site name, language, frontend templates, OAuth2 providers, and whether TSDB is enabled.
- When accessed without login, only configuration allowed for guests is returned.

### Get Server List

Request:

```http
GET /api/v1/server
Authorization: Bearer JWT_TOKEN
```

Notes:

- Returns the list of servers that the current user has permission to manage.
- Administrators can see all servers. Normal users can only see servers under their own account.
- For real-time status streams, use the `GET /api/v1/ws/server` WebSocket API.

### Get Server Real-Time Status Stream

Request:

```http
GET /api/v1/ws/server
Authorization: Bearer JWT_TOKEN
```

Notes:

- Returns a WebSocket data stream for real-time server online status and resource usage updates.
- If `force_auth` is not enabled, guests can also connect, but hidden servers are not included in guest data.

### Get Service Monitoring Overview

Request:

```http
GET /api/v1/service
```

Notes:

- Returns current service monitoring status and cycle traffic statistics.
- Logged-in users can see data they have permission to view. Guest access is limited by `force_auth` and hidden settings.

### Get Service Monitoring History

Request:

```http
GET /api/v1/service/{id}/history?period=1d
```

Parameters:

- `id`: Service monitor ID.
- `period`: Query period. Optional values are `1d`, `7d`, and `30d`; default is `1d`.

The `1d` period uses 30-second granularity, suitable for detailed curves over the last 24 hours. The `7d` and `30d` periods use coarser aggregation to reduce query and transfer overhead.

Response example:

```json
{
  "success": true,
  "data": {
    "service_id": 1,
    "service_name": "HTTPS",
    "servers": [
      {
        "server_id": 1,
        "server_name": "Server 1",
        "stats": {
          "avg_delay": 68.2,
          "up_percent": 99.9,
          "total_up": 1440,
          "total_down": 1,
          "data_points": [
            {
              "ts": 1760000000000,
              "delay": 68.2,
              "status": 1
            }
          ]
        }
      }
    ]
  }
}
```

::: tip
If TSDB is not enabled, service monitoring history is read from the database. After TSDB is enabled, it is queried from TSDB.
:::

### Get Server Metrics History

Request:

```http
GET /api/v1/server/{id}/metrics?metric=cpu&period=1d
```

Parameters:

- `id`: Server ID.
- `metric`: Metric name. Required.
- `period`: Query period. Optional values are `1d`, `7d`, and `30d`; default is `1d`.

The `1d` period uses 30-second granularity, suitable for detailed curves over the last 24 hours. The `7d` and `30d` periods use coarser aggregation to reduce query and transfer overhead.

Supported `metric` values:

- `cpu`
- `memory`
- `swap`
- `disk`
- `net_in_speed`
- `net_out_speed`
- `net_in_transfer`
- `net_out_transfer`
- `load1`
- `load5`
- `load15`
- `tcp_conn`
- `udp_conn`
- `process_count`
- `temperature`
- `uptime`
- `gpu`

Response example:

```json
{
  "success": true,
  "data": {
    "server_id": 1,
    "server_name": "Server 1",
    "metric": "cpu",
    "data_points": [
      {
        "ts": 1760000000000,
        "value": 12.34
      }
    ]
  }
}
```

::: warning
This API depends on TSDB. If TSDB is not enabled, the API still returns success, but `data_points` is empty. For TSDB configuration, see [Dashboard Configuration](/en_US/configuration/dashboard.html#tsdb).
:::

### Get Servers Under a Service

Request:

```http
GET /api/v1/service/{id}/server
```

Notes:

- Returns the server list associated with a service monitor.
- Commonly used by custom frontends to display node-level status for a monitor.

### Get Service Monitors Under a Server

Request:

```http
GET /api/v1/server/{id}/service
```

Notes:

- Returns the service monitor list associated with a server.
- Commonly used on server detail pages to display HTTP, TCP, Ping, and other monitors that the server participates in.

---

## Management APIs

Management APIs require login. JWT requests are authorized by user role and resource ownership; PAT requests additionally require the matching scope. Common paths and PAT scopes are listed below. Use Swagger as the source of truth for fields and request bodies.

| Feature | Common paths | PAT scope |
| --- | --- | --- |
| Users and profiles | `/api/v1/profile`, `/api/v1/user`, `/api/v1/batch-delete/user` | Profile APIs forbid PAT; user management requires `nezha:admin:*` |
| Server inventory | `GET /api/v1/server`, `/api/v1/batch-delete/server`, `GET /api/v1/server-group`, `/api/v1/batch-delete/server-group` | `nezha:inventory:read` / `delete` |
| Servers | `/api/v1/server/config`, `/api/v1/batch-move/server`, `/api/v1/force-update/server`, `PATCH /api/v1/server/{id}` | `nezha:server:read` / `write` |
| Server groups | `POST /api/v1/server-group`, `PATCH /api/v1/server-group/{id}` | `nezha:server:write` |
| Server transfers | `/api/v1/transfer`, `/api/v1/transfer/{id}/cancel`, `/api/v1/transfer/{id}/retry`, `/api/v1/ws/transfer` | `nezha:transfer:read` / `write` |
| Notification methods | `/api/v1/notification`, `/api/v1/batch-delete/notification` | `nezha:notification:read` / `write` / `delete` |
| Notification groups | `/api/v1/notification-group`, `/api/v1/batch-delete/notification-group` | `nezha:notification-group:read` / `write` / `delete` |
| Alert rules | `/api/v1/alert-rule`, `/api/v1/batch-delete/alert-rule` | `nezha:alertrule:read` / `write` / `delete` |
| Service monitoring | `/api/v1/service/list`, `/api/v1/service`, `/api/v1/batch-delete/service` | `nezha:service:read` / `write` / `delete` |
| Scheduled tasks | `/api/v1/cron`, `/api/v1/cron/{id}/manual`, `/api/v1/batch-delete/cron` | `nezha:cron:read` / `write` / `exec` / `delete` |
| DDNS | `/api/v1/ddns`, `/api/v1/ddns/providers`, `/api/v1/batch-delete/ddns` | `nezha:ddns:read` / `write` / `delete` |
| NAT | `/api/v1/nat`, `/api/v1/batch-delete/nat` | `nezha:nat:read` / `write` / `delete` |
| Online terminal | `/api/v1/terminal`, `/api/v1/ws/terminal/{id}` | `nezha:server:exec` |
| File management | `/api/v1/file`, `/api/v1/ws/file/{id}` | Requires all of `nezha:server:read`, `nezha:server:write`, and `nezha:server:delete` |
| WAF and online users | `/api/v1/waf`, `/api/v1/batch-delete/waf`, `/api/v1/online-user`, `/api/v1/online-user/batch-block` | `nezha:admin:*` |
| System settings and maintenance | `PATCH /api/v1/setting`, `POST /api/v1/maintenance` | `nezha:admin:*` |

Before writing management automation scripts, test them in a staging environment to avoid bulk changes to servers, notifications, tasks, or user configuration.

---

## MCP Endpoint

The Dashboard includes an MCP (Model Context Protocol) HTTP endpoint for automation clients and LLM tool calls:

For client configuration, tool argument examples, and file transfer details, see the [MCP guide](/en_US/guide/mcp.html).

```http
POST /mcp
Authorization: Bearer nzp_xxxxxxxxxxxxxxxxxxxx
Content-Type: application/json
```

Enable `enable_mcp` in the Dashboard configuration or admin frontend before using it. This endpoint only accepts API Tokens and does not accept JWT; `GET /mcp` and `DELETE /mcp` return 405.

The current implementation supports Streamable HTTP request/response over POST and does not provide SSE sessions. The JSON-RPC request body is capped at 8 MiB, and each token is rate limited to about 10 requests per second and 120 requests per minute by default. Common JSON-RPC methods:

- `initialize`
- `tools/list`
- `tools/call`
- `notifications/initialized`
- `ping`

`tools/list` returns both `inputSchema` and `outputSchema` for each tool. On successful `tools/call`, structured data is returned in `structuredContent` and the same result is also provided as JSON text in `content[0].text`. On tool errors, the response only includes `isError: true` and text error content, so strict MCP clients do not validate an error object against the success output schema.

Registered MCP tools and required scopes:

| Tool | Required scope |
| --- | --- |
| `meta.whoami` | Any valid API Token |
| `server.list` | `nezha:inventory:read` |
| `server.get` | `nezha:server:read` |
| `server.exec` | `nezha:server:exec` |
| `fs.list`, `fs.read`, `fs.download_url` | `nezha:server:read` |
| `fs.write`, `fs.upload_url` | `nezha:server:write` |
| `fs.delete` | `nezha:server:delete` |

MCP tools that call the Agent require the target Agent version to be at least `v2.1.0`. `server.exec` is a non-interactive one-shot command, does not allocate a PTY, defaults to a 30-second timeout, and has a hard `timeout_seconds` limit of 300 seconds. If you need shell syntax such as pipes or redirection, explicitly use `cmd: "sh"` and `args: ["-c", "..."]`.

File tools are split into two groups:

- `fs.read` / `fs.write` are suitable for small files or ranged reads and writes. `fs.read` returns up to about 1 MiB by default and supports `offset`, `length`, and `encoding: "utf8" | "base64"`.
- `fs.download_url` / `fs.upload_url` issue one-time temporary URLs through `GET /mcp/download/{token}` or `POST /mcp/upload/{token}` for Dashboard-to-Agent IOStream transfers. The hard per-file limit is 100 MiB, and `ttl_seconds` ranges from 30 to 600 seconds. Uploads must send `Content-Length`; you can append `sha256=<64 hex chars>` to the URL for end-to-end verification. `fs.upload_url` also supports `mode`, `create_dirs`, and `if_match_sha256`.

MCP calls are also limited by the API Token's server ID allowlist and the user's original permissions. Temporary upload/download URLs re-check the token, scope, server allowlist, and server ownership when used. When the token is revoked or `enable_mcp` is disabled, the Dashboard revokes MCP transfer streams, removes temporary URLs, and cancels in-flight MCP RPC calls.

---

## Usage Examples

### Get Server List

```python
import requests

base_url = "https://nezha.example.com"
token = "JWT_TOKEN_OR_NZP_API_TOKEN"

response = requests.get(
    f"{base_url}/api/v1/server",
    headers={"Authorization": f"Bearer {token}"},
    timeout=10,
)
response.raise_for_status()

payload = response.json()
if not payload.get("success"):
    raise RuntimeError(payload.get("error", "unknown error"))

for server in payload["data"]:
    print(server["id"], server["name"])
```

### Query 24-Hour CPU History

```python
import requests

base_url = "https://nezha.example.com"
server_id = 1

response = requests.get(
    f"{base_url}/api/v1/server/{server_id}/metrics",
    params={"metric": "cpu", "period": "1d"},
    timeout=10,
)
response.raise_for_status()

payload = response.json()
if not payload.get("success"):
    raise RuntimeError(payload.get("error", "unknown error"))

for point in payload["data"]["data_points"]:
    print(point["ts"], point["value"])
```
