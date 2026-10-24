---
description: 扩展哪吒 Dashboard 的 REST、MCP 和异步任务时，如何沿现有架构实现权限、输入校验、API 契约、取消、审计与回归测试。
outline: deep
---

# Dashboard 与 MCP 扩展

优先复用现有 REST API 和能力层。新增一个接口不仅是注册路由，还包括资源权限、输入约束、响应语义和生命周期。

## 按职责定位

| 层 | 位置 | 修改范围 |
| --- | --- | --- |
| HTTP 路由和中间件 | `cmd/dashboard/controller/controller.go` | 鉴权组、scope、CSRF、路由注册 |
| 请求/响应与持久模型 | `model` | 表单、校验、JSON、数据库结构 |
| 处理器 | `cmd/dashboard/controller` | HTTP/MCP 协议与业务调用 |
| 共享业务与存储 | `service/singleton`、`pkg/tsdb` | 缓存、历史、告警、任务生命周期 |
| Agent 通信 | `cmd/dashboard/rpc`、`service/rpc`、`proto` | gRPC、任务派发、流与回执 |

避免让 UI 提交 ORM 模型中的所有字段。请求、数据库和公开响应应有各自明确的字段边界。

## 新增 REST 能力的顺序

1. 定义调用者、输入、返回和资源访问规则；确定是游客可读、成员资源还是管理员能力。
2. 在 `model` 定义表单与响应，使用明确的 JSON 字段，验证大小、范围和枚举。
3. 复用路由的 JWT/PAT 鉴权，并添加真实的 scope 门禁。浏览器 cookie 写请求继续受 CSRF 保护。
4. 逐资源检查归属/可见性及 PAT 服务器范围，不能只检查“已登录”。不存在与不可访问资源避免泄漏差异。
5. 使用现有响应包装，区分空结果、权限错误、暂不可用及任务接受；添加 Swagger 注释并重新生成。
6. 补成功、越权、缺失 scope、白名单外 ID、无效输入和并发/取消测试，再同步前端及双语文档。

**读权限不等于管理权限。** 多用户公开服务器可以被成员看见，但并不因此允许修改或执行任务。历史查询同样要执行可见性和 PAT 限制。

## 增加 MCP 工具

现有原生 MCP 工具集中在身份、服务器清单/状态、命令和文件；告警配置、历史与任务管理不是自动存在的 MCP 方法。先查[当前工具清单](/guide/mcp.html)，不要仅在宣传或客户端中起一个名字就当作服务端已实现。

源码入口为 `controller/mcp.go`、`mcp_tools_*.go`、`mcp_transfer.go` 及 `service/rpc` 相关实现。扩展时同时完成：

- JSON-RPC 参数 schema、工具注册与调用分发，协议版本/错误处理遵循现有实现。
- `enable_mcp` 总开关、PAT-only 鉴权、Origin 限制，不能退回浏览器 JWT。
- 工具最小 scope、用户资源权限、PAT 服务器范围，以及 Agent 对应能力开关。
- 输入/输出上限、超时和取消、PAT 吊销、MCP 关闭时的在途操作回收。
- 命令退出码与执行失败的不同语义；任务应答不能冒充进程执行成功。
- 审计记录工具、目标、结果与必要元数据，但不记录 PAT、文件敏感正文或多余命令输出。

对文件工具复用路径限制、大小限制与传输完整性检查。不要自己增加绕过既有权限的文件下载 URL，也不要把新接口当成任意公网代理。

当前传输是 `POST /mcp` 请求/响应，不提供独立 SSE 推送；`GET`/`DELETE /mcp` 返回 `405` 是接口约定，不是故障。让客户端适配真实传输，而不是仅修改文档承诺 SSE。

## 状态变更与失败恢复

设计清楚“接受”“执行中”“终态”和“实际生效”。带副作用的请求超时后先查询状态，不盲目重试。需要多阶段提交时明确持久状态、重放/幂等规则和恢复入口。

配置或密钥切换应先可靠持久化，再推进不可逆的清理或运行时状态。并发共享数据使用已有同步机制；不要把 `sync`/原子字段放进经常按值复制的响应结构。

## 贡献时附带什么

提交接口契约、权限矩阵、回归案例、必要数据迁移/回退说明，以及[测试证据](/developer/testing.html)。涉及 Agent/protobuf 时列出配对提交；新增 UI 路由还要检查[SPA HTTP 状态回退](/developer/theme-development.html)。

权威实现参考：[路由](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/controller.go)、[scope 对照](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/scope_doc.go)、[MCP 实现](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/mcp.go)。
