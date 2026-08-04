---
title: 哪吒监控 V2 安全与隐私指南
description: 哪吒监控 V2 上线安全清单，覆盖 TLS、反向代理、真实 IP、账号、OAuth2、连接密钥、API Token、Agent 权限、远程运维、通知、备份和更新。
outline: deep
---

# 哪吒监控 V2 安全与隐私指南

哪吒监控 V2 可以读取服务器状态并执行授权运维操作，因此 Dashboard 和 Agent 都应按高权限基础设施组件管理。本页描述安全边界和加固检查，不代表某种配置自动满足合规要求，也不能替代你所在组织的风险评估。

## 先理解信任边界

| 边界 | 可能接触的数据或能力 | 主要控制手段 |
| --- | --- | --- |
| 浏览器 → Dashboard | 公开状态、登录凭据、管理与运维请求 | HTTPS、强密码、用户角色、WAF、访问控制 |
| Agent → Dashboard | 主机信息、IP、资源状态、检查与任务结果 | 连接密钥、TLS、可信通信地址、Agent 更新 |
| Dashboard → Agent | 终端、文件、任务、更新、NAT 等操作 | 用户权限、PAT scope、Agent 禁用选项、审计与最小授权 |
| Dashboard → 外部服务 | OAuth2 身份、通知内容、DNS 更新 | 供应商凭据、模板、回调 Host、最小权限 API Key |
| Dashboard 本地存储 | 用户、配置、密钥、监控数据、历史指标 | 文件权限、磁盘与备份加密、主机隔离、恢复测试 |

## 安装后立即完成

1. 修改 Dashboard 默认 `admin` 密码，不要继续使用安装默认值。
2. 为公开入口配置 HTTPS；如果 TLS 在反向代理终止，确保到 Dashboard 的网络链路受控。
3. 限制 Dashboard 管理入口，只对需要管理或查看的用户开放。
4. 配置备份并测试恢复，而不只是确认备份文件存在。
5. 更新到受支持的 Dashboard 和 Agent 稳定版本。

## TLS、域名与反向代理

- 浏览器和 Agent 经公网连接时应使用 TLS，避免凭据和监控数据以明文传输。
- 反向代理必须正确转发普通 HTTP、WebSocket 和 gRPC，错误拆分可能导致部分功能看似正常但 Agent 或终端不可用。
- `dashboard_host` 应填写固定的公开访问 Host；`install_host` 用于生成 Agent 连接地址。两个入口不同时不要混用。
- 多个公开入口应加入 `reserved_hosts`，防止普通成员创建与 Dashboard 入口冲突的 NAT 域名。
- OAuth2 提供商登记的回调地址应与 Dashboard 信任的 Host 匹配，避免根据不可信请求 Host 构造回调。

配置字段见 [Dashboard 配置](/configuration/dashboard.html)，代理示例见 [Dashboard 反向代理](/guide/q3.html)。

## 真实 IP 与内置 WAF

只有在反向代理确实覆盖 Dashboard 且会重写指定 Header 时，才应信任 `web_real_ip_header` 或 `agent_real_ip_header`。如果客户端能绕过代理直连 Dashboard，它可能伪造该 Header。

- 限制 Dashboard 源站端口，只允许可信代理或内部网络访问。
- 使用代理实际写入的固定 Header，不要盲目复制 CDN 示例。
- 变更 `web_real_ip_header` 会影响 WAF 的访问者识别；误配可能把所有用户识别为同一 IP，或信任伪造地址。
- 恢复和验证步骤见[前端真实 IP 请求头](/guide/q12.html)。

## 账号、OAuth2 与会话

- 每位操作者使用独立账号，不共享管理员密码。
- 只向需要系统设置、用户或 WAF 管理的人授予管理员权限。
- OAuth2 是本地账号的绑定登录方式，不会消除本地账号和回调配置的安全责任。
- 生产环境优先通过 `NZ_JWTSECRETKEY` 注入 JWT 签名密钥，避免将密钥明文保存到 YAML；轮换后现有登录态可能失效。
- 对无需公开状态的站点启用 `force_auth`，并同时检查服务和服务器的“对游客隐藏”设置。

## Agent 连接密钥

连接密钥用于 Agent 身份验证，应像密码一样处理：

- 不要把包含 `NZ_CLIENT_SECRET` 的安装命令粘贴到公开 Issue、聊天或日志。
- 不要在不同用户或不相关环境之间共享连接密钥。
- 怀疑泄露时应更新受影响凭据并重新部署对应 Agent。
- 每个 Agent 使用唯一 UUID；复制配置时必须重新生成，避免身份冲突。
- `insecure_tls` 只应用于明确理解风险的临时或受控环境，公网部署不要用它绕过证书校验。

## API Token 与 MCP

API Token（PAT）面向脚本和自动化，使用 `Authorization: Bearer ...`。创建 Token 时：

- 只授予任务所需的最小 scope，不要默认使用 `nezha:*`。
- 设置到期时间并建立轮换流程。
- 将 Token 保存在秘密管理系统或受保护的环境变量中，不写入公开仓库和客户端页面。
- 将自动化专用账号与日常管理员账号分开，便于撤销和追踪影响范围。

MCP 默认关闭，并且只接受 PAT。启用后，模型或自动化客户端能够调用哪些工具取决于 Token scope；文件传输还会创建临时流。先阅读 [API Token 与 MCP](/guide/api.html#mcp-接入)，再设置 `enable_mcp`。

## 远程终端、文件、任务与 NAT

这些功能可能在 Agent 所在主机执行命令、读取或写入文件、建立连接或改变 DNS/转发状态：

- 不需要远程命令的 Agent 设置 `disable_command_execute: true`。
- 不允许 Dashboard 强制更新的 Agent 设置 `disable_force_update: true`，同时自行负责安全更新。
- 不使用 NAT 的 Agent 设置 `disable_nat: true`。
- 通过用户角色和 PAT scope 限制服务器执行、文件、删除和写入权限。
- 关闭不用的终端和文件会话，避免占用 IOStream 配额和扩大暴露时间。
- 将 Dashboard 管理员权限视为能够影响全部已连接 Agent 的高权限角色。

## 通知、DDNS 与第三方凭据

- 通知正文可能包含服务器名称、IP、资源状态或自定义模板数据。发送到第三方前先审查模板和接收范围。
- `enable_plain_ip_in_notification` 默认为关闭；只有确有需要时才发送完整 IP。
- 通知和 DDNS 凭据在列表接口中会脱敏，但编辑时留空是否保留旧值应以对应页面说明为准。脱敏不等于磁盘或备份中不存在凭据。
- DNS 提供商 Token 只授予目标域名所需权限，不使用账户级全权限密钥。
- 删除通知或 DDNS 配置前确认没有规则仍引用它。

## 数据、日志与备份

- 限制 Dashboard 数据目录、配置文件、SQLite 和 TSDB 的文件权限。
- 备份可能包含账号、密钥、IP、服务器名称和监控历史，应加密并限制读取者。
- 在迁移或一致性备份前停止 Dashboard；恢复后验证用户、Agent、服务、通知和历史数据。
- 调试日志可能包含内部路径、错误上下文或请求信息。只在排障期间启用 `debug`，收集后安全保存或删除。
- 为 TSDB 设置合理保留期和磁盘空间阈值；保留更久意味着更多数据暴露面和存储责任。

## 更新与供应链

- 只从 [Dashboard Releases](https://github.com/nezhahq/nezha/releases)、[Agent Releases](https://github.com/nezhahq/agent/releases)或官方安装脚本引用的来源获取程序。
- 升级前阅读两个仓库的说明并备份，先在少量节点验证。
- 不运行来源不明的主题、社区脚本或修改版 Agent；社区项目不属于官方兼容性保证。
- 如果关闭 Agent 自动更新或强制更新能力，必须建立自己的版本盘点和修复时限。

## 最小化部署建议

如果只需要监控，不需要远程运维，可以从以下最小能力开始：

1. Dashboard 仅通过 HTTPS 或私有网络访问。
2. 启用 `force_auth`，只创建必要用户。
3. Agent 禁用命令执行、强制更新和 NAT。
4. 不启用 MCP，不创建广泛 scope 的 PAT。
5. 只配置必要的通知和服务检查。
6. 建立离线或异地加密备份与恢复演练。

需要定位具体连接问题时，继续阅读[架构与数据流](/guide/architecture.html)、[Dashboard 排障](/guide/dashboardq.html)和 [Agent 排障](/guide/agentq.html)。
