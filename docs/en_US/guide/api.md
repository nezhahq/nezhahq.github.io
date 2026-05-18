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

### Guest-Accessible APIs

Some read-only APIs support guest access, but they are limited by site configuration and server hidden settings:

- After `force_auth` is enabled, guests cannot access server and service monitoring data.
- If a server is hidden from guests, guests cannot access that server's data.
- In service history and server metrics APIs, guests can only query `1d` period data.

---

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

Management APIs require login, and some also require administrator privileges. Common paths:

- Users and profiles: `/api/v1/profile`, `/api/v1/user`
- Servers: `/api/v1/server`, `/api/v1/server/config`, `/api/v1/batch-move/server`
- Server groups: `/api/v1/server-group`
- Notification methods: `/api/v1/notification`
- Notification groups: `/api/v1/notification-group`
- Alert rules: `/api/v1/alert-rule`
- Service monitoring: `/api/v1/service`
- Scheduled tasks: `/api/v1/cron`
- DDNS: `/api/v1/ddns`
- NAT: `/api/v1/nat`
- Online terminal: `/api/v1/terminal`, `/api/v1/ws/terminal/{id}`
- File management: `/api/v1/file`, `/api/v1/ws/file/{id}`
- WAF and online users: `/api/v1/waf`, `/api/v1/online-user`
- System settings and maintenance: `/api/v1/setting`, `/api/v1/maintenance`

Use the Swagger documentation as the source of truth for fields, request bodies, and permission requirements. Before writing management automation scripts, test them in a staging environment to avoid bulk changes to servers, notifications, tasks, or user configuration.

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
