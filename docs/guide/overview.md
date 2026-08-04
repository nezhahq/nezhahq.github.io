---
title: 什么是哪吒监控 V2？
description: 哪吒监控 V2 官方概览：了解 Dashboard 与 Agent 如何完成多服务器状态监控、网络服务探测、告警通知和授权运维，以及它适合哪些使用场景。
outline: deep
---

# 什么是哪吒监控 V2？

**哪吒监控 V2（Nezha Monitoring V2）是一套开源、自托管的服务器监控与运维工具。** 它由集中部署的 Dashboard 和安装在被监控设备上的 Agent 组成，用于统一查看多台服务器的运行状态、检查网站与网络服务可用性、发送告警，并在获得授权后执行终端、文件和任务等运维操作。

哪吒监控面向希望用一套简洁 Web 界面管理 VPS、云服务器、家庭实验室、NAS 或分散节点的个人与团队。它强调快速部署和日常运维闭环，不以替代日志分析平台、应用性能监控（APM）或通用指标查询平台为目标。

## 核心组件

| 组件 | 部署位置 | 主要职责 | 官方源码 |
| --- | --- | --- | --- |
| Dashboard | 一台可被管理员和 Agent 访问的服务器 | 接收 Agent 状态、存储配置、展示数据、调度服务检查和任务、发送通知、提供 API 与管理界面 | [nezhahq/nezha](https://github.com/nezhahq/nezha) |
| Agent | 每台被监控的服务器或设备 | 采集主机状态、向 Dashboard 报告数据、执行分配的服务检查，并按配置接受授权任务 | [nezhahq/agent](https://github.com/nezhahq/agent) |
| 用户前端与管理前端 | 由 Dashboard 提供 | 分别用于公开或登录后的状态展示，以及服务器、服务、通知、任务和系统设置管理 | 随 Dashboard 发布 |

Dashboard 与 Agent 分别发布版本，升级时应分别查看 [Dashboard Releases](https://github.com/nezhahq/nezha/releases) 和 [Agent Releases](https://github.com/nezhahq/agent/releases)。“V2”表示当前产品代际，不等于任一组件的完整版本号，详见[版本与兼容性](/guide/version-compatibility.html)。

## 可以监控什么？

### 服务器状态

Agent 会报告服务器的在线状态，以及 CPU、内存、交换空间、磁盘、网络流量、负载、连接数、进程数、运行时间等可用指标。部分数据依赖操作系统、权限或 Agent 配置；GPU、温度等项目需要设备和配置支持。

### 网站与网络服务

服务监控支持 HTTP GET、ICMP Ping 和 TCPing。可以从选定 Agent 发起检查，观察可用性和延迟，并为 HTTPS 目标检查证书状态。具体字段和展示周期见[服务监控](/guide/services.html)。

### 告警与通知

可以为离线、资源使用、流量、服务失败、延迟变化和证书状态等条件配置通知。通知方式、通知组和模板由管理员维护，详见[通知配置](/guide/notifications.html)。

### 授权运维

哪吒提供 Web 终端、文件管理、定时与触发任务、DDNS、NAT、API 和 MCP 等能力。这些功能会扩大 Dashboard 与 Agent 的权限边界，应结合用户角色、API Token scope、Agent 禁用选项和网络访问控制按需启用。

## 一次数据流如何完成？

1. Agent 使用服务器页面生成的连接信息接入 Dashboard。
2. Agent 持续报告主机信息和运行状态。
3. Dashboard 在内存中维护实时状态，并按配置保存业务数据；启用 TSDB 后可保存和查询更长周期的指标历史。
4. Dashboard 将状态提供给用户前端、管理前端和授权 API 调用者。
5. 服务检查或任务需要 Agent 执行时，Dashboard 通过现有连接下发请求，Agent 返回结果。
6. 告警规则满足条件时，Dashboard 调用配置的通知方式。

更完整的连接、存储和反向代理说明见[架构与数据流](/guide/architecture.html)。

## 适合哪些场景？

- 在一个页面查看多地域 VPS、云服务器或家庭服务器是否在线及资源使用情况。
- 从不同网络位置检查网站、端口、链路延迟和 TLS 证书。
- 为小型运维团队建立自托管状态页、告警和常用远程操作入口。
- 用 REST API 或 MCP 将服务器台账、指标查询和有限操作接入内部自动化。

如果主要需求是公开状态页、秒级深度可观测性、PromQL 生态或大规模企业网络管理，请先阅读[监控工具选型对比](/guide/comparison.html)，再决定使用哪吒、其他工具，或组合部署。

## 从哪里开始？

1. 阅读[架构与数据流](/guide/architecture.html)，确认网络和信任边界。
2. [安装 Dashboard](/guide/dashboard.html) 并立即修改默认密码。
3. [安装 Agent](/guide/agent.html) 并确认节点上线。
4. 配置[服务监控](/guide/services.html)和[通知](/guide/notifications.html)。
5. 上线前检查[安全与隐私清单](/guide/security.html)。

## 常见问题

### 哪吒监控是免费和开源的吗？

Dashboard 与 Agent 的源代码在 NezhaHQ 的 GitHub 仓库公开。实际部署还会产生服务器、域名、存储和通知服务等成本，并受各仓库许可证及第三方服务条款约束。

### 哪吒监控必须使用云服务吗？

不必须。Dashboard 和 Agent 可以自托管。你仍需要确保 Agent 能访问 Dashboard；OAuth2、外部通知、CDN 或 DNS 提供商等集成只有在你选择使用时才会连接相应服务。

### 一个 Dashboard 可以监控多台服务器吗？

可以。每台服务器安装 Agent 后接入同一个 Dashboard，再通过分组、用户权限和服务覆盖范围组织节点。

### `/api/v1` 是否表示我还在使用哪吒 V1？

不是。`/api/v1` 是接口路径的版本命名；当前产品代际是 V2。产品代际、Dashboard 版本、Agent 版本和 API 路径应分别理解。

### 哪吒会自动保证服务器安全吗？

不会。哪吒提供认证、权限和安全配置能力，但部署者仍需负责 TLS、反向代理、密钥、用户权限、防火墙、备份和更新。请按[安全与隐私](/guide/security.html)进行加固。
