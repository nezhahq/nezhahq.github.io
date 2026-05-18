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

### 游客可访问接口

部分只读接口支持游客访问，但会受到站点配置和服务器隐藏设置限制：

- 开启 `force_auth` 后，游客不能访问服务器和服务监控数据。
- 如果服务器启用了“对游客隐藏”，游客不能访问该服务器的数据。
- 服务历史和服务器指标接口中，游客只能查询 `1d` 周期数据。

---

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

管理类接口均需要登录，部分接口还需要管理员权限。常见路径如下：

- 用户和个人资料：`/api/v1/profile`、`/api/v1/user`
- 服务器：`/api/v1/server`、`/api/v1/server/config`、`/api/v1/batch-move/server`
- 服务器分组：`/api/v1/server-group`
- 通知方式：`/api/v1/notification`
- 通知组：`/api/v1/notification-group`
- 警报规则：`/api/v1/alert-rule`
- 服务监控：`/api/v1/service`
- 定时任务：`/api/v1/cron`
- DDNS：`/api/v1/ddns`
- NAT：`/api/v1/nat`
- 在线终端：`/api/v1/terminal`、`/api/v1/ws/terminal/{id}`
- 文件管理：`/api/v1/file`、`/api/v1/ws/file/{id}`
- WAF 和在线用户：`/api/v1/waf`、`/api/v1/online-user`
- 系统设置和维护：`/api/v1/setting`、`/api/v1/maintenance`

字段、请求体和权限要求请以 Swagger 文档为准。直接写管理类自动化脚本前，建议先在测试环境验证，避免批量修改服务器、通知、任务或用户配置。

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
