---
outline: deep
---

# MCP 使用指南

Dashboard 内置一个 MCP (Model Context Protocol) HTTP 入口，适合把哪吒监控接入支持 MCP 的自动化客户端或大模型工具客户端。客户端可以列出服务器、读取服务器详情、执行一次性命令、读写文件，以及为大文件申请临时上传/下载 URL。

MCP 功能默认关闭。使用前需要在 Dashboard 配置文件或管理前端设置中启用：

```yaml
enable_mcp: true
```

启用后，入口地址为：

```http
POST /mcp
Authorization: Bearer nzp_xxxxxxxxxxxxxxxxxxxx
Content-Type: application/json
```

`/mcp` 只接受 API Token，不接受网页登录 JWT。关于创建 `nzp_` Token、选择 scope 和服务器白名单，请先阅读 [API 接口：API Token (PAT)](/guide/api.html#api-token-pat)。

---

## 协议行为

当前实现面向 MCP Streamable HTTP 的 POST 请求/响应，不提供独立 SSE 会话：

- `POST /mcp`：JSON-RPC 请求入口。
- `GET /mcp`：返回 `405 Method Not Allowed`。
- `DELETE /mcp`：返回 `405 Method Not Allowed`。

支持的 JSON-RPC 方法：

| 方法 | 说明 |
| --- | --- |
| `initialize` | 初始化 MCP 会话，返回协议版本、能力和服务端信息。 |
| `notifications/initialized` | 初始化完成通知；无 `id` 时返回 `202 Accepted`。 |
| `ping` | 心跳；带 `id` 时返回空结果。 |
| `tools/list` | 列出工具，包含每个工具的 `inputSchema` 和 `outputSchema`。 |
| `tools/call` | 调用具体工具。 |

请求体最大为 8 MiB。每个 Token 默认限流约为每秒 10 次、每分钟 120 次。超过限流时，普通 JSON-RPC 方法返回 429；`tools/call` 会以 MCP 工具错误形式返回 `isError: true`。

`tools/call` 成功时，结构化结果放在 `structuredContent`，同一结果也会以 JSON 文本形式放入 `content[0].text`。工具执行失败时只返回 `isError: true` 和文本错误信息，不带成功结果 schema，避免严格 MCP 客户端误用成功 schema 校验错误对象。

---

## 客户端配置示例

不同 MCP 客户端的配置字段可能不同。对于支持 Streamable HTTP URL 和自定义请求头的客户端，可以按以下形态配置：

```json
{
  "mcpServers": {
    "nezha": {
      "url": "https://nezha.example.com/mcp",
      "headers": {
        "Authorization": "Bearer nzp_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

如果客户端要求显式声明 transport，可使用 HTTP 或 streamable-http 类型，具体字段以客户端文档为准。不要把网页登录 JWT、Cookie 或 OAuth 浏览器会话用于 `/mcp`。

---

## 简单使用案例

下面这些是 MCP 客户端里更贴近用户的常见用法。实际使用时通常不需要手写 JSON-RPC，只要让客户端调用相应工具即可。

### 查看哪些服务器在线

可以直接问 MCP 客户端：“列出当前在线服务器，并查看某台服务器的状态。”客户端通常会先调用 `server.list` 找到可见服务器，再对目标服务器调用 `server.get` 读取状态、系统信息和 GeoIP 快照。Token 至少需要 `nezha:inventory:read` 和 `nezha:server:read`。

### 执行一次巡检命令

可以让客户端对指定服务器执行一次非交互巡检命令，例如查看磁盘、负载或某个服务状态。对应工具是 `server.exec`，需要 `nezha:server:exec`。建议给这类 Token 绑定服务器 ID 白名单，只允许操作明确授权的服务器。

### 读取日志或配置文件

当需要让 AI 帮忙判断 nginx、Caddy 或应用日志时，可以先用 `fs.list` 浏览目录，再用 `fs.read` 读取小日志片段或配置文件。Token 需要 `nezha:server:read`。大日志建议分段读取，避免一次返回过多内容。

### 更新一个小配置文件

如果要改一段小配置、写入临时脚本或生成诊断文件，可以使用 `fs.write`；如果客户端更适合先上传文件，也可以使用 `fs.upload_url`。这类操作需要 `nezha:server:write`。建议使用 `if_match_sha256` 防止覆盖已被别人修改的文件，并为 Token 设置服务器 ID 白名单。

### 传输较大的文件

对于日志包、备份片段或构建产物，不要把文件内容塞进 JSON-RPC 请求体。使用 `fs.download_url` 或 `fs.upload_url` 获取一次性 HTTP URL，再用普通 HTTP 客户端传输文件。单文件上限为 100 MiB，URL 只能使用一次，并会在过期、Token 被吊销或 MCP 被关闭时失效。

---

## 工具和权限

MCP 工具同时受三层限制：

1. API Token 必须有效且未过期。
2. API Token 必须包含工具所需 scope。
3. 目标服务器必须在 Token 的服务器 ID 白名单内，并且所属用户本身有该服务器权限。

已注册工具：

| 工具 | 所需 scope | 用途 |
| --- | --- | --- |
| `meta.whoami` | 任意有效 API Token | 返回当前用户 ID、是否管理员、Token ID、Token 名称、scope 和服务器白名单。 |
| `server.list` | `nezha:inventory:read` | 列出当前 Token 可见服务器的精简信息。 |
| `server.get` | `nezha:server:read` | 读取单台服务器的 Host/State/GeoIP 快照。 |
| `server.exec` | `nezha:server:exec` | 在目标服务器执行非交互一次性命令。 |
| `fs.list` | `nezha:server:read` | 列出目录。 |
| `fs.read` | `nezha:server:read` | 读取文件内容，适合小文件或分段读取。 |
| `fs.write` | `nezha:server:write` | 原子写入文件。 |
| `fs.delete` | `nezha:server:delete` | 删除文件或目录。 |
| `fs.download_url` | `nezha:server:read` | 签发一次性 HTTP 下载 URL，适合最多 100 MiB 的文件。 |
| `fs.upload_url` | `nezha:server:write` | 签发一次性 HTTP 上传 URL，适合最多 100 MiB 的文件。 |

需要调用 Agent 的工具要求目标 Agent 版本不低于 `v2.1.0`。Agent 上报 `2.1.0` 或 `v2.1.0` 都会被接受；低于该版本会返回不支持 MCP 的工具错误。

---

## 调用示例

### 初始化

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {},
    "clientInfo": {
      "name": "my-client",
      "version": "1.0.0"
    }
  }
}
```

### 查看当前 Token

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "meta.whoami",
    "arguments": {}
  }
}
```

### 列出在线服务器

需要 `nezha:inventory:read`：

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "server.list",
    "arguments": {
      "online_only": true
    }
  }
}
```

### 读取服务器详情

需要 `nezha:server:read`：

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "server.get",
    "arguments": {
      "server_id": 1
    }
  }
}
```

### 执行命令

需要 `nezha:server:exec`：

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "server.exec",
    "arguments": {
      "server_id": 1,
      "cmd": "uname",
      "args": ["-a"],
      "timeout_seconds": 30,
      "max_output_bytes": 65536
    }
  }
}
```

`server.exec` 是非交互一次性命令：

- 不分配 PTY。
- 默认超时 30 秒。
- `timeout_seconds` 最大 300 秒。
- stdout/stderr 默认各最多约 64 KiB，可通过 `max_output_bytes` 调整，但 Agent 有硬上限。
- 如果需要管道、重定向、变量展开等 shell 语法，请显式调用 shell：

```json
{
  "server_id": 1,
  "cmd": "sh",
  "args": ["-c", "df -h | grep /data"],
  "timeout_seconds": 30
}
```

### 列目录

需要 `nezha:server:read`：

```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "tools/call",
  "params": {
    "name": "fs.list",
    "arguments": {
      "server_id": 1,
      "path": "/var/log",
      "show_hidden": false
    }
  }
}
```

### 读取文件

需要 `nezha:server:read`：

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "fs.read",
    "arguments": {
      "server_id": 1,
      "path": "/etc/hostname",
      "offset": 0,
      "length": 4096,
      "encoding": "utf8"
    }
  }
}
```

`fs.read` 适合小文件或分段读取，默认最多返回约 1 MiB。`encoding` 可选 `utf8` 或 `base64`。

### 写入文件

需要 `nezha:server:write`：

```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "method": "tools/call",
  "params": {
    "name": "fs.write",
    "arguments": {
      "server_id": 1,
      "path": "/tmp/nezha-note.txt",
      "content": "hello from nezha mcp\n",
      "encoding": "utf8",
      "mode": "0644",
      "create_dirs": true
    }
  }
}
```

可使用 `if_match_sha256` 做乐观锁，避免覆盖已经改变的文件。

### 删除文件或目录

需要 `nezha:server:delete`：

```json
{
  "jsonrpc": "2.0",
  "id": 9,
  "method": "tools/call",
  "params": {
    "name": "fs.delete",
    "arguments": {
      "server_id": 1,
      "path": "/tmp/nezha-note.txt",
      "recursive": false
    }
  }
}
```

删除非空目录时需要设置 `recursive: true`。

---

## 大文件上传和下载

`fs.download_url` 和 `fs.upload_url` 会先通过 MCP 工具调用签发一次性临时 URL，再由普通 HTTP 客户端传输文件。文件内容不会进入 MCP JSON-RPC 请求体，适合较大的文件。

限制和行为：

- URL 默认有效期 300 秒。
- 默认 TTL 为 300 秒；工具 schema 建议 `ttl_seconds` 使用 30 到 600 秒，服务端会把超过 600 的值截断为 600。
- URL 只能使用一次，使用后立即失效。
- 单个文件最大 100 MiB。
- 传输最长 10 分钟。
- 使用临时 URL 时会重新校验 `enable_mcp`、Token、scope、服务器白名单和用户服务器权限。
- Token 被吊销或管理员关闭 `enable_mcp` 时，未使用 URL 和进行中的传输会被撤销。

### 下载 URL

需要 `nezha:server:read`：

```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "method": "tools/call",
  "params": {
    "name": "fs.download_url",
    "arguments": {
      "server_id": 1,
      "path": "/var/log/syslog",
      "ttl_seconds": 300
    }
  }
}
```

返回结果包含：

```json
{
  "url": "https://nezha.example.com/mcp/download/<token>",
  "method": "GET",
  "expires_at": "2026-05-31T19:30:00+02:00"
}
```

随后用普通 HTTP GET 下载该 URL。

### 上传 URL

需要 `nezha:server:write`：

```json
{
  "jsonrpc": "2.0",
  "id": 11,
  "method": "tools/call",
  "params": {
    "name": "fs.upload_url",
    "arguments": {
      "server_id": 1,
      "path": "/tmp/upload.bin",
      "ttl_seconds": 300,
      "mode": "0644",
      "create_dirs": true,
      "if_match_sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    }
  }
}
```

返回结果中的 `method` 为 `POST`。上传时必须发送 `Content-Length`：

```shell
curl -X POST --data-binary @upload.bin \
  -H "Content-Length: $(wc -c < upload.bin)" \
  "https://nezha.example.com/mcp/upload/<token>"
```

如需端到端校验，可在上传 URL 后追加 `?sha256=<64位十六进制>`。Agent 会在接收后校验实际内容哈希。

---

## 安全建议

- MCP Token 建议单独创建，不要和普通 REST 自动化共用。
- 为 MCP Token 设置服务器 ID 白名单，尤其是带 `server.exec` 或 `server.write` 的 Token。
- 只给需要的 scope。能读就不要给写，能写就不要给 `exec`。
- 不再需要时及时吊销 Token。
- 关闭 `enable_mcp` 可以立即阻断 `/mcp` 新请求，并撤销 MCP 临时 URL、传输流和正在执行的 MCP RPC。

---

## 相关页面

- [API 接口：API Token (PAT)](/guide/api.html#api-token-pat)
- [API 接口](/guide/api.html)
- [Dashboard 配置：enable_mcp](/configuration/dashboard.html#enable-mcp)
