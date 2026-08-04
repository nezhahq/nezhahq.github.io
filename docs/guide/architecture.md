---
title: 哪吒监控 V2 架构与数据流
description: 哪吒监控 V2 的文本架构说明，覆盖 Dashboard、Agent、前端、SQLite、可选 TSDB、gRPC 连接、服务探测、告警和远程运维数据流。
outline: deep
---

# 哪吒监控 V2 架构与数据流

哪吒监控 V2 使用“一个 Dashboard 管理多个 Agent”的集中式拓扑。Dashboard 是控制面和展示入口，Agent 是部署在被监控节点上的数据采集与任务执行端。理解这条边界有助于正确设计域名、反向代理、权限、备份和故障排查。

## 逻辑拓扑

```text
浏览器 / API 客户端
          |
          | HTTPS / WebSocket
          v
+------------------------+        通知提供商 / DNS API
| Dashboard              |---------------------> 外部集成
| - 用户与管理前端       |
| - REST API / MCP       |
| - 告警与任务调度       |
| - 实时状态与权限控制   |
+-----------+------------+
            |        |
            |        +------> SQLite（配置、用户和业务数据）
            |        +------> 可选 TSDB（指标与服务监控历史）
            |
            | gRPC（可由 HTTPS 反向代理承载）
            v
     +------+------+------+
     | Agent | Agent | ... |
     +-------+-------+-----+
        |       |
        +-------> 本机指标、网络检查、授权任务
```

这是逻辑关系，不要求每个组件位于同一网络。关键条件是浏览器能够访问 Dashboard，且每个 Agent 能够访问 Dashboard 的 Agent 对接地址。

## Dashboard 是什么角色？

Dashboard 承担以下职责：

- 验证用户、API Token 和 Agent 连接身份。
- 接收 Agent 上报的主机信息、实时状态和任务结果。
- 维护服务器、分组、用户、服务、通知、任务、DDNS 和系统配置。
- 向用户前端、管理前端、REST API 和可选 MCP 入口提供数据。
- 评估服务状态与告警条件，并调用已配置的通知方式。
- 将终端、文件、任务、NAT 等授权请求转交到目标 Agent。

因此，Dashboard 不只是只读图表。启用远程运维能力后，它属于高权限控制面，应限制管理入口、使用 TLS、保护密钥并保持更新。

## Agent 是什么角色？

Agent 运行在每台被监控设备上，主要负责：

- 读取操作系统可提供的主机和网络状态。
- 使用连接密钥与自身 UUID 接入 Dashboard。
- 按 `report_delay` 等配置报告状态。
- 执行被分配的 HTTP、Ping 或 TCP 服务检查。
- 在没有被禁用且调用者有权限时执行终端、文件、任务、更新或 NAT 相关操作。

不需要远程操作的节点应使用 Agent 的 `disable_command_execute`、`disable_force_update`、`disable_nat` 等配置缩小能力范围。完整字段见 [Agent 配置](/configuration/agent.html)。

## 连接与反向代理

V2 的 Web 访问和 Agent 通信可以共用 Dashboard 监听端口，默认是 `8008`。实际部署通常有两种方式：

1. **直接访问 Dashboard 端口**：浏览器和 Agent 连接 `host:8008`。
2. **通过反向代理提供 HTTPS**：代理将普通 HTTP、WebSocket 和 gRPC 请求转发到 Dashboard。

反向代理必须正确支持 gRPC 和 WebSocket。当前 Agent/Dashboard 兼容 `Authorization` 和 `Grpc-Metadata-Authorization` 两种 gRPC 认证头；完整 Nginx、Caddy 和 CDN 注意事项见 [Dashboard 反向代理配置](/guide/q3.html)及 [WebSocket 排障](/guide/q4.html)。

如果公开访问域名和 Agent 通信域名不同，应分别设置 `dashboard_host` 和 `install_host`。它们还参与 OAuth2 回调 Host 与 NAT 保留域名判断，详见 [Dashboard 配置](/configuration/dashboard.html#dashboard-host)。

## 状态数据如何流动？

### 主机状态

Agent 将主机信息和状态流发送给 Dashboard。Dashboard 在内存中维护实时状态供页面和 API 查询；启用 TSDB 后，服务器历史指标会写入本地 TSDB。没有启用 TSDB 时，实时状态仍可使用，但服务器历史指标不可用，前端会锁定相应历史周期。

### 服务监控

Dashboard 根据服务的覆盖范围和特定服务器配置，将检查任务分配给 Agent。Agent 从自身网络位置访问 HTTP、ICMP 或 TCP 目标并返回结果。这样可以比较不同线路或地域到同一目标的可用性与延迟。

未启用 TSDB 时，服务监控历史从 SQLite 读取；启用 TSDB 后改为从 TSDB 查询。启用步骤和迁移限制见[如何启用 TSDB](/guide/q15.html)。

### 远程操作

浏览器或 API 发起终端、文件、任务等请求后，Dashboard 先验证用户或 Token 权限，再通过 Agent 的任务或 IOStream 通道转发。终端、文件管理、NAT 和 MCP 文件传输会使用有限的 IOStream 配额；需要时应关闭闲置会话。

## 数据存在哪里？

- **SQLite**：Dashboard 默认使用本地 SQLite 文件保存用户、配置和业务数据。
- **内存**：当前在线状态和运行时对象会在 Dashboard 内存中维护，进程重启后由 Agent 重新连接并报告。
- **可选 TSDB**：配置 `tsdb.data_path` 后启用内置时序存储，用于服务器指标和服务监控历史。
- **外部服务**：只有在配置相应通知、OAuth2 或 DDNS 提供商时，Dashboard 才会向这些服务发送请求；发送内容取决于具体模板和配置。

备份时不能只保存容器定义。安装脚本部署通常需要备份 `/opt/nezha`，并在迁移前停止 Dashboard 以获得一致数据，见[备份与恢复](/guide/q5.html)。

## 常见架构选择

### 单域名部署

同一 HTTPS 域名同时服务浏览器和 Agent，配置最简单。反向代理必须同时正确处理 WebSocket 和 gRPC。

### 访问域名与通信域名分离

公开访问域名可接入 CDN，Agent 通信域名直接回源或使用明确支持 gRPC 的代理。该方式能绕开部分 CDN 对长连接或 gRPC 的限制，但需要正确设置两个 Host。

### 私有 Dashboard

通过 VPN、私有网络或访问控制层限制 Dashboard，适合不需要公开状态页的场景。必须确保所有 Agent 和管理员客户端仍能到达所需入口。

## 上线前检查

- [安装 Dashboard](/guide/dashboard.html)并替换默认密码。
- 为公开入口启用 HTTPS，正确配置真实 IP 请求头和可信 Host。
- 只向必要用户开放终端、文件、任务、NAT、API 与 MCP 权限。
- 为 Agent 关闭不需要的执行能力。
- 备份 SQLite、配置和 TSDB 目录，并验证恢复过程。
- 阅读[安全与隐私](/guide/security.html)和[版本与兼容性](/guide/version-compatibility.html)。
