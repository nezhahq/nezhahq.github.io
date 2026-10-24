---
description: 哪吒监控 V2 实用配置示例：HTTPS 反向代理、内置 TLS、低开销 Agent、受限远程操作、TSDB 与在线历史，以及逐项验收和回退。
outline: deep
---

# 场景配置与验证

以下示例是**合并到现有文件的片段**，不是可以覆盖生产配置的完整文件。先确认[配置加载方式](/configuration/environment.html)，保留现有密钥和 UUID。示例域名应换成自己的入口。

## HTTPS 反向代理

假设反向代理与 Dashboard 在同一主机，公网使用 `https://monitor.example.com`：

```yaml
listen_host: "127.0.0.1"
listen_port: 8008
install_host: "monitor.example.com:443"
dashboard_host: "monitor.example.com"
reserved_hosts: "monitor.example.com"
tls: true
web_real_ip_header: "X-Real-IP"
agent_real_ip_header: "X-Real-IP"
```

Agent 对应配置片段：

```yaml
server: "monitor.example.com:443"
tls: true
insecure_tls: false
report_delay: 3
```

反向代理必须同时转发 HTTP/WebSocket 和 gRPC（HTTP/2），设置可信的真实 IP 请求头，并限制对后端的绕过访问。完整服务器配置见[反向代理指南](/guide/q3.html)，不要仅凭首页能打开判定成功。

Docker 中 `127.0.0.1` 是容器自己的回环地址。若通过容器端口映射访问，应让 Dashboard 在容器内监听可达地址，并在宿主机发布端口时限制为回环，例如 `127.0.0.1:8008:8008`；独立代理容器则使用其共享容器网络。不要直接照搬裸机的监听设置。

**验收：** 用户页和 `/dashboard/` 能打开；WebSocket 返回 `101` 并持续收到状态；Agent 保持在线；IP 展示与预期一致。**回退：** 恢复原文件和代理配置，重启相关服务；不要通过关闭证书校验掩盖证书错误。

## 使用 Dashboard 内置 HTTPS

```yaml
listen_host: "0.0.0.0"
listen_port: 8008
https:
  listen_port: 8443
  tls_cert_path: "/etc/nezha/tls/fullchain.pem"
  tls_key_path: "/etc/nezha/tls/privkey.pem"
install_host: "monitor.example.com:8443"
dashboard_host: "monitor.example.com:8443"
reserved_hosts: "monitor.example.com"
tls: true
```

证书和私钥必须在进程或容器内可读，且证书匹配域名。内置 HTTPS **额外开启**监听，不会自动关闭 `listen_port` 的 HTTP 监听；用防火墙或容器映射限制明文端口。`https.insecure_tls` 不是客户端信任自签名证书的开关。

**验收：** 用 HTTPS 访问指定端口，检查证书链，令测试 Agent 使用相同地址且 `insecure_tls: false`；日志应同时反映实际监听端口。

## 轻量采集与精确网卡

```yaml
report_delay: 4
ip_report_period: 1800
skip_connection_count: true
skip_procs_count: true
gpu: false
temperature: false
nic_allowlist:
  eth0: true
hard_drive_partition_allowlist:
  - "/"
```

将 `eth0` 和挂载点替换为实际名称。非空网卡列表是允许列表，不是“只排除值为 false 的网卡”；未列出的接口也不会统计。空列表使用内置过滤规则，并非无条件计入所有虚拟网卡。分区筛选参见[自定义采集](/guide/q7.html)。

**验收：** 对比主机实际负载、网络速度和容量，确认没有遗漏主要网卡或重复统计容器桥接流量。降低上报频率会减少图表细节，也可能影响短时异常的观测。

## 只采集、不接受远程操作

```yaml
disable_command_execute: true
disable_nat: true
disable_send_query: true
disable_auto_update: true
disable_force_update: true
```

这组配置适用于自行维护二进制、只需主机指标的节点：命令、终端、文件操作、远程配置、NAT 和 TCP/ICMP/HTTP 服务探测均受限。它也会阻止正常的服务监控和 MCP 修复操作，并不是适用于所有服务器的推荐默认值。

**验收：** 主机指标继续更新，受限任务被拒绝。**回退：** 通过主机本地编辑配置并重启；禁用命令后不能指望面板远程解除。

## 在线历史与时序存储

```yaml
online_stats_days: 30
tsdb:
  data_path: "data/tsdb"
  retention_days: 30
  min_free_disk_space_gb: 1
  max_memory_mb: 256
  write_buffer_size: 512
  write_buffer_flush_interval: 5
memory:
  go_mem_limit_mb: 768
```

示例内存预算需要按机器和节点规模调整，不是容量保证。`go_mem_limit_mb` 是 Go 运行时软限制，不是进程或容器硬上限；TSDB 的缓存预算不是整个进程内存。

首次启用 TSDB 会删除旧 `service_histories` 表且不迁移其中历史，先备份。在线会话仍存于数据库，不依赖 TSDB。相对 `data_path` 基于工作目录，容器中要持久化对应目录。

**验收：** 日志出现 `TSDB initialized successfully`，设置响应中 `tsdb_enabled` 为 `true`，新采集的历史指标能查询，磁盘有充足余量。游客的在线历史窗口仍受公开接口限制；后台保留 30 天不代表游客能看 30 天。

**回退：** 停机后恢复配置及备份。仅清空 `data_path` 不能恢复已被删除的旧表数据。完整行为见[TSDB 指南](/guide/q15.html)。

## 常见症状速查

| 症状 | 优先检查 |
| --- | --- |
| 首页正常，Agent 离线 | gRPC/HTTP2 转发、Agent 地址和 TLS、用户连接密钥 |
| 页面能开但数据不更新 | WebSocket 连接与代理升级头，不是先改上报频率 |
| 容器重建后设置丢失 | 实际配置/数据库/TSDB 是否都有持久化挂载 |
| 远程配置提示成功但值未变 | 10 秒应用窗口、写文件日志、启动读取项、环境变量覆盖 |
| 虚拟网卡未统计 | 默认过滤与 `nic_allowlist`，而不是权限或 Dashboard 图表 |
| 启用 TSDB 后查不到旧历史 | 不自动迁移旧表；确认新数据、实际路径和磁盘状态 |
