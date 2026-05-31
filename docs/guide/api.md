---
outline: deep
---

# API 接口

哪吒监控 Dashboard 从 v1 起主要使用 `/api/v1` 路径。接口返回 JSON，适合自定义前端、机器人、自动化脚本和内部运维工具使用。

如果需要完整、随源码同步的接口列表，建议优先使用 Dashboard 内置 Swagger 文档；本页保留常用接口和调用规则，方便快速上手。

---

## 获取完整 API 文档

Dashboard 在调试模式下会挂载 Swagger UI：

1. 编辑 Dashboard 配置文件，开启调试模式：

   ```yaml
   debug: true
   ```

2. 重启 Dashboard。

3. 查看 Dashboard 日志中的提示，默认地址类似：

   ```text
   http://localhost:8008/swagger/index.html
   ```

如果你是从源码开发，也可以在仓库根目录生成 Swagger 文件：

```shell
./script/bootstrap.sh
```

生成结果位于 `cmd/dashboard/docs`。

::: warning
`debug: true` 会额外暴露调试信息和 Swagger UI，不建议在公网生产环境长期开启。需要线上排查时，建议临时开启，完成后关闭并重启 Dashboard。
:::

---

## 认证方式

### 登录获取 Token

请求：

```http
POST /api/v1/login
Content-Type: application/json
```

请求体：

```json
{
  "username": "admin",
  "password": "your-password"
}
```

成功后返回：

```json
{
  "success": true,
  "data": {
    "token": "JWT_TOKEN",
    "expire": "2026-05-18T12:00:00+02:00"
  }
}
```

后续需要登录的接口，在请求头中携带：

```http
Authorization: Bearer JWT_TOKEN
```

### Personal Access Token (PAT)

JWT 主要用于浏览器和管理前端的登录态；自动化脚本、CI、LLM 工具和 MCP 客户端建议使用 Personal Access Token（PAT）。PAT 请求头格式为：

```http
Authorization: Bearer nzp_<secret>
```

可以在管理前端的 **系统设置 → API Tokens** 中创建和吊销 PAT。创建 PAT 时需要填写：

- `name`：Token 名称，最长 128 个字符。
- `scopes`：权限列表，至少 1 项，最多 32 项。
- `server_ids`：可选的服务器 ID 白名单，最多 1000 项；留空表示不在用户原有服务器权限之外再加限制。
- `expires_in_days`：可选的过期天数，留空或 `0` 表示永不过期，最大值为 `3650`。

创建成功后，明文 Token 只会在响应中返回一次，请立即复制并妥善保存。之后列表接口只会返回脱敏后的 Token 元信息，例如权限、服务器白名单、过期时间、最后使用时间和最后使用 IP。

::: warning
`/api/v1/api-tokens` 这组 Token 管理接口只能使用登录 JWT 调用，不能用 PAT 自己创建、更改或删除 PAT。
:::

### PAT 权限范围

PAT 使用 `nezha:{resource}:{verb}` 命名权限范围。JWT 登录请求不走 PAT scope 校验；PAT 请求必须携带对应接口所需的 scope。

资源名包括：

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

动作名包括：

- `read`
- `write`
- `delete`
- `exec`

常见示例：

- `nezha:server:read`：读取服务器列表、服务器指标和服务器相关服务监控。
- `nezha:server:exec`：创建在线终端或调用 MCP 的远程执行工具。
- `nezha:cron:exec`：手动触发计划任务。
- `nezha:transfer:write`：取消或重试服务器转移任务。
- `nezha:admin:*`：用户、WAF、在线用户、系统设置和维护等管理员资源。

通配 scope：

- `nezha:<resource>:*`：允许某个资源下的所有动作，例如 `nezha:server:*`。
- `nezha:admin:*`：允许管理员资源，只有管理员可以签发。
- `nezha:*`：完整权限，只有管理员可以签发。

### PAT 禁用接口

以下接口属于个人账户自我管理流程，会显式拒绝 PAT，必须使用登录 JWT 调用：

- `POST /api/v1/refresh-token`
- `GET /api/v1/profile`
- `POST /api/v1/profile`
- `POST /api/v1/oauth2/{provider}/unbind`
- `GET /api/v1/api-tokens`
- `POST /api/v1/api-tokens`
- `DELETE /api/v1/api-tokens/{id}`

### 游客可访问接口

部分只读接口支持游客访问，但会受到站点配置和服务器隐藏设置限制：

- 开启 `force_auth` 后，游客不能访问服务器和服务监控数据。
- 如果服务器启用了“对游客隐藏”，游客不能访问该服务器的数据。
- 服务历史和服务器指标接口中，游客只能查询 `1d` 周期数据。

---

## MCP 接入

Dashboard 提供独立的 MCP 入口：

```http
POST /mcp
Authorization: Bearer nzp_<secret>
```

MCP 不在 `/api/v1` 下，并且只接受 PAT，不接受 JWT。启用前需要在 Dashboard 配置或管理前端中打开 [`enable_mcp`](/configuration/dashboard.html#enable_mcp)。关闭后，Dashboard 会拒绝新的 MCP 调用，并中断相关的 MCP 传输任务。

为兼容 Streamable HTTP 客户端，`GET /mcp` 和 `DELETE /mcp` 会明确返回 method-not-allowed；实际调用应使用 `POST /mcp`。文件传输类工具会使用 `GET /mcp/download/:token` 和 `POST /mcp/upload/:token` 作为临时传输地址。

MCP 入口带有 Origin 防护，用于降低浏览器跨站调用和 DNS rebinding 风险。仍然建议只给 MCP 客户端签发最小权限 PAT，并在不使用 MCP 时关闭 `enable_mcp`。

### MCP 工具权限

| 工具 | 所需 scope |
| --- | --- |
| `meta.whoami` | 任意有效 PAT |
| `server.list` / `server.get` | `nezha:server:read` |
| `server.exec` | `nezha:server:exec` |
| `fs.list` / `fs.read` / `fs.download_url` | `nezha:server:read` |
| `fs.write` / `fs.upload_url` | `nezha:server:write` |
| `fs.delete` | `nezha:server:delete` |

## 返回格式

普通接口返回：

```json
{
  "success": true,
  "data": {}
}
```

失败时通常返回：

```json
{
  "success": false,
  "error": "error message"
}
```

带分页的列表接口返回：

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

## 常用接口

### 获取系统设置

请求：

```http
GET /api/v1/setting
```

说明：

- 可用于读取站点名称、语言、前端模板、OAuth2 提供方、TSDB 是否启用等基础信息。
- 未登录访问时只返回允许游客读取的配置。

### 获取服务器列表

请求：

```http
GET /api/v1/server
Authorization: Bearer JWT_TOKEN
```

说明：

- 返回当前用户有权限管理的服务器列表。
- 管理员可见所有服务器，普通用户只能看到自己名下的服务器。
- 如需实时状态流，请使用 `GET /api/v1/ws/server` WebSocket 接口。

### 获取服务器实时状态流

请求：

```http
GET /api/v1/ws/server
Authorization: Bearer JWT_TOKEN
```

说明：

- 返回 WebSocket 数据流，用于实时刷新服务器在线状态和资源占用。
- 如果站点未开启 `force_auth`，游客也可以连接，但隐藏服务器不会出现在游客数据中。

### 获取服务监控概览

请求：

```http
GET /api/v1/service
```

说明：

- 返回服务监控当前状态和周期流量统计。
- 登录用户可以看到自己有权限查看的数据；游客访问会受到 `force_auth` 和隐藏配置限制。

### 获取服务监控历史

请求：

```http
GET /api/v1/service/{id}/history?period=1d
```

参数：

- `id`：服务监控 ID。
- `period`：查询周期，可选 `1d`、`7d`、`30d`，默认 `1d`。

`1d` 周期使用 30 秒粒度，适合展示最近 24 小时的细粒度曲线；`7d` 和 `30d` 周期会使用更粗的聚合粒度，以减少查询和传输开销。

返回示例：

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
如果 Dashboard 未启用 TSDB，服务监控历史会从数据库读取；启用 TSDB 后会从 TSDB 查询。
:::

### 获取服务器指标历史

请求：

```http
GET /api/v1/server/{id}/metrics?metric=cpu&period=1d
```

参数：

- `id`：服务器 ID。
- `metric`：指标名称，必填。
- `period`：查询周期，可选 `1d`、`7d`、`30d`，默认 `1d`。

`1d` 周期使用 30 秒粒度，适合展示最近 24 小时的细粒度曲线；`7d` 和 `30d` 周期会使用更粗的聚合粒度，以减少查询和传输开销。

支持的 `metric`：

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

返回示例：

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
该接口依赖 TSDB。未启用 TSDB 时，接口仍会返回成功，但 `data_points` 为空。TSDB 配置详见 [管理面板配置](/configuration/dashboard.html#tsdb)。
:::

### 获取服务下的服务器

请求：

```http
GET /api/v1/service/{id}/server
```

说明：

- 返回某个服务监控关联的服务器列表。
- 常用于自定义前端展示某个监控项的节点维度状态。

### 获取服务器下的服务监控

请求：

```http
GET /api/v1/server/{id}/service
```

说明：

- 返回某台服务器关联的服务监控列表。
- 常用于服务器详情页展示该服务器参与的 HTTP、TCP、Ping 等监控项。

---

## 管理类接口

管理类接口均需要登录。使用 JWT 时按用户角色和资源归属判断权限；使用 PAT 时，还会额外校验所需 scope。常见路径和 PAT scope 如下，字段和请求体请以 Swagger 文档为准。

| 功能 | 常见路径 | PAT scope |
| --- | --- | --- |
| 用户和个人资料 | `/api/v1/profile`、`/api/v1/user`、`/api/v1/batch-delete/user` | 个人资料接口禁止 PAT；用户管理需要 `nezha:admin:*` |
| 服务器 | `/api/v1/server`、`/api/v1/server/config`、`/api/v1/batch-delete/server`、`/api/v1/batch-move/server`、`/api/v1/force-update/server` | `nezha:server:read` / `write` / `delete` |
| 服务器分组 | `/api/v1/server-group`、`/api/v1/batch-delete/server-group` | `nezha:server:read` / `write` / `delete` |
| 服务器转移 | `/api/v1/transfer`、`/api/v1/transfer/{id}/cancel`、`/api/v1/transfer/{id}/retry`、`/api/v1/ws/transfer` | `nezha:transfer:read` / `write` |
| 通知方式 | `/api/v1/notification`、`/api/v1/batch-delete/notification` | `nezha:notification:read` / `write` / `delete` |
| 通知组 | `/api/v1/notification-group`、`/api/v1/batch-delete/notification-group` | `nezha:notification-group:read` / `write` / `delete` |
| 警报规则 | `/api/v1/alert-rule`、`/api/v1/batch-delete/alert-rule` | `nezha:alertrule:read` / `write` / `delete` |
| 服务监控 | `/api/v1/service/list`、`/api/v1/service`、`/api/v1/batch-delete/service` | `nezha:service:read` / `write` / `delete` |
| 定时任务 | `/api/v1/cron`、`/api/v1/cron/{id}/manual`、`/api/v1/batch-delete/cron` | `nezha:cron:read` / `write` / `exec` / `delete` |
| DDNS | `/api/v1/ddns`、`/api/v1/ddns/providers`、`/api/v1/batch-delete/ddns` | `nezha:ddns:read` / `write` / `delete` |
| NAT | `/api/v1/nat`、`/api/v1/batch-delete/nat` | `nezha:nat:read` / `write` / `delete` |
| 在线终端 | `/api/v1/terminal`、`/api/v1/ws/terminal/{id}` | `nezha:server:exec` |
| 文件管理 | `/api/v1/file`、`/api/v1/ws/file/{id}` | 同时需要 `nezha:server:read`、`nezha:server:write`、`nezha:server:delete` |
| WAF 和在线用户 | `/api/v1/waf`、`/api/v1/batch-delete/waf`、`/api/v1/online-user`、`/api/v1/online-user/batch-block` | `nezha:admin:*` |
| 系统设置和维护 | `PATCH /api/v1/setting`、`POST /api/v1/maintenance` | `nezha:admin:*` |

直接写管理类自动化脚本前，建议先在测试环境验证，避免批量修改服务器、通知、任务或用户配置。

---

## 使用案例

### 获取服务器列表

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

### 查询 24 小时 CPU 历史

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
