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

- `nezha:server:read`: Read server lists, server metrics, and server-related service monitors.
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
| `server.list` / `server.get` | `nezha:server:read` |
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
| Servers | `/api/v1/server`, `/api/v1/server/config`, `/api/v1/batch-delete/server`, `/api/v1/batch-move/server`, `/api/v1/force-update/server` | `nezha:server:read` / `write` / `delete` |
| Server groups | `/api/v1/server-group`, `/api/v1/batch-delete/server-group` | `nezha:server:read` / `write` / `delete` |
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

## Usage Examples

### Get Server List

```python
import requests

base_url = "https://nezha.example.com"
token = "JWT_TOKEN"

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
