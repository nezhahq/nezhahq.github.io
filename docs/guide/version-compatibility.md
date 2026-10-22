---
title: 哪吒监控 V2 版本与兼容性
description: 解释哪吒监控 V2 产品代际、Dashboard 与 Agent 独立版本、/api/v1 接口路径、旧 V0/V1 文档和升级兼容性的区别。
outline: deep
---

# 哪吒监控 V2 版本与兼容性

当前文档面向 **哪吒监控 V2**。理解“产品代际”“组件版本”和“接口版本”的区别，可以避免把 `/api/v1`、旧教程或某个组件标签误认为当前产品仍是 V1。

## 四种版本标识分别表示什么？

| 标识 | 示例 | 含义 |
| --- | --- | --- |
| 产品代际 | 哪吒监控 V2 | 当前整体产品与文档代际 |
| Dashboard 版本 | `v2.x.y` | [Dashboard 仓库](https://github.com/nezhahq/nezha/releases)独立发布的服务端版本 |
| Agent 版本 | `v2.x.y` | [Agent 仓库](https://github.com/nezhahq/agent/releases)独立发布的客户端版本，版本号不要求与 Dashboard 完全相同 |
| API 路径版本 | `/api/v1/...` | REST API 路由命名，用于接口兼容；不代表产品代际 |

因此，当前使用 V2 Dashboard 时看到 `/api/v1/server` 是正常的。不要把 API 路径批量替换成 `/api/v2`；只有官方代码和 API 文档明确新增路径时才能使用新地址。

## Dashboard 与 Agent 是否必须同版本？

两者独立发布，不要求补丁版本完全一致，但不应据此假设任意跨版本组合都兼容。推荐做法是：

1. 生产环境使用两个仓库各自的稳定 Release。
2. 升级前分别阅读 Dashboard 和 Agent 的 Release Notes。
3. 先备份 Dashboard 数据和配置。
4. 小规模节点先升级并观察连接、状态上报、服务检查和远程操作。
5. 再逐步升级其余 Agent，避免一次性失去全部节点可见性。

如果 Dashboard 页面要求强制更新 Agent，或日志出现协议、认证或字段错误，应以当前 Release 说明和 Issue 为准，不要只比较版本号字符串。

## 组件职责与功能边界

管理前端与用户前端独立发布。官方 Dashboard 发布包中的前端由构建时的模板清单决定；第三方主题不一定实现相同功能。本指南直接描述当前稳定版的行为。

| 功能 | 当前行为与边界 |
| --- | --- |
| 移动端终端 | 管理前端提供按键操作栏和剪贴板按钮；Agent 执行终端输入、尺寸调整与颜色显示 |
| GPU 显存 | Agent 上报逐卡显存，Dashboard 转发，默认用户前端展示；当前仅 Linux NVIDIA 支持显存采集 |
| JWT 会话跨 IP 使用 | `allow_jwt_ip_change` 默认关闭；当前管理前端无开关，可通过配置文件或设置 API 修改 |
| 在线历史 | Dashboard 在数据库中保存在线会话，不依赖 TSDB；默认用户前端提供“在线”标签，默认查询 1 天 |
| 在线统计范围 | `online_stats_days` 默认 7 天，范围 7–3650 天，同时控制保留与最大查询窗口 |

在线历史从收到状态上报开始积累，不回填此前未记录的时段。默认用户前端提供 1/7/30 天选项，API 最大窗口与后台保留范围一致；各组件的独立版本号不要求相同。

## V0、V1 和 V2 文档如何处理？

- **V2**：当前安装、配置、API 与排障页面的默认目标。
- **V1**：历史产品代际；当前安装和使用应按 V2 文档操作，不套用旧版配置或命令。
- **V0**：旧配置格式、数据库和登录流程可能与当前版本不兼容。保留旧 URL 的页面只用于解释历史，不应直接用于新部署。
- **社区项目名称中的 V1**：如果上游项目仓库或名称明确写有 V1，文档会保留原名并标记为第三方或历史项目，而不会把它改成并不存在的 V2 兼容版本。

## 常见的“版本看起来不一致”

### 为什么 API 仍然是 `/api/v1`？

接口版本和产品代际是独立的。当前 [API 文档](/guide/api.html)仍以实际 Dashboard 路由为准。

### 当前文档采用什么行为口径？

安装、配置、API 和排障页面直接描述当前稳定版行为。例如，Web 与 Agent 通信使用统一端口，本地账号支持绑定 OAuth2。历史发布记录用于审查与追溯，不作为当前使用步骤的前置条件。

### 为什么社区项目页面仍然写 V1？

社区页面记录第三方项目。名称或兼容范围由其维护者决定；官方文档不能在没有上游证据时宣称它支持 V2。部署前必须检查项目最近提交、Release 和 Issue。

## 升级前检查清单

- 查看 [Dashboard Releases](https://github.com/nezhahq/nezha/releases)和 [Agent Releases](https://github.com/nezhahq/agent/releases)。
- 备份 `/opt/nezha` 或实际映射的数据、配置和 TSDB 目录。
- 记录当前 Dashboard 与 Agent 版本、安装方式、域名和反向代理配置。
- 确认数据库迁移、配置字段变更和废弃功能说明。
- 测试登录、Agent 上线、WebSocket、gRPC、通知和授权运维功能。
- 不要用旧版 Docker Compose、配置样例或二进制覆盖当前部署。

安装与更新流程见[安装 Dashboard](/guide/dashboard.html)、[安装 Agent](/guide/agent.html)和[备份与恢复](/guide/q5.html)。
