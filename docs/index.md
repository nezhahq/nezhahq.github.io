---
layout: home

title: 哪吒监控 V2 - 开源服务器监控与运维平台
titleTemplate: 官方文档
description: 哪吒监控 V2 官方文档：自托管多服务器监控、网站与端口探测、告警通知、Web 终端、文件管理、任务、DDNS、API 的安装配置和排障指南。

hero:
  name: 哪吒监控 V2
  text: 开源、自托管的服务器监控与运维平台
  tagline: 用一个 Dashboard 连接多台 Agent，统一查看服务器状态、检查网站与网络服务、发送告警并执行授权运维。
  image: https://raw.githubusercontent.com/nezhahq/nezha/master/.github/brand.svg
  actions:
    - theme: brand
      text: 预览
      link: https://qio.ng
    - theme: alt
      text: 安装 Dashboard →
      link: /guide/dashboard.html

features:
  - title: 多服务器状态
    details: 集中查看 Linux、Windows、macOS、OpenWRT、群晖等设备的在线状态、CPU、内存、磁盘、网络流量和可用系统指标。
  - title: 服务探测与告警
    details: 从指定 Agent 执行 HTTP GET、ICMP Ping 和 TCPing，观察可用性、延迟与证书状态，并通过通知组发送告警。
  - title: 日常远程运维
    details: 按权限使用 Web 终端、文件管理、定时与触发任务、DDNS、NAT、REST API 和可选 MCP。
  - title: 自托管与开源
    details: Dashboard 与 Agent 均由 NezhaHQ 开源发布；数据、访问入口、用户、存储和集成由部署者自行控制。
---

## 哪吒监控 V2 是什么？

哪吒监控 V2（Nezha Monitoring V2）由一个集中式 **Dashboard** 和安装在被监控设备上的 **Agent** 组成。Agent 报告主机状态并执行分配的网络检查或授权任务；Dashboard 负责身份与权限、数据展示、服务监控、告警通知、API 和配置管理。

- [产品概览：能力、受众与常见问题](/guide/overview.html)
- [架构与数据流：Dashboard、Agent、存储和连接](/guide/architecture.html)
- [版本与兼容性：V2、组件版本与 `/api/v1`](/guide/version-compatibility.html)
- [安全与隐私：生产部署检查清单](/guide/security.html)

## 典型使用场景

| 场景 | 哪吒 V2 提供的入口 |
| --- | --- |
| 多地域 VPS 与云服务器 | 集中在线状态、资源、流量、分组、告警和授权远程操作 |
| 网站与端口可用性 | HTTP、Ping、TCP、延迟、丢包、HTTPS 证书状态和失败通知 |
| 家庭实验室、NAS 与小型团队 | 自托管 Dashboard、用户权限、公开或登录状态页、任务和文件操作 |
| 内部自动化与 AI 工具 | 带 scope 的 API Token、REST API，以及默认关闭的 MCP 入口 |

如果你的主要目标是公开状态页、秒级深度可观测性、PromQL 生态或企业网络设备管理，请先阅读[哪吒与 Uptime Kuma、Netdata、Prometheus/Grafana、Zabbix 的对比](/guide/comparison.html)。

## 五步开始使用

1. 阅读[架构与数据流](/guide/architecture.html)，准备域名、端口、TLS 和备份位置。
2. [安装 Dashboard](/guide/dashboard.html)，登录后立即修改默认密码。
3. [安装 Agent](/guide/agent.html)，确认第一台服务器上线并能持续报告。
4. 配置[服务监控](/guide/services.html)和[通知方式](/guide/notifications.html)。
5. 上线前完成[安全与隐私清单](/guide/security.html)，再逐步增加用户、API 和远程运维能力。

## 官方资源

- [Dashboard 源码与 Release](https://github.com/nezhahq/nezha)
- [Agent 源码与 Release](https://github.com/nezhahq/agent)
- [文档源码与问题反馈](https://github.com/nezhahq/nezhahq.github.io)
- [Telegram 中文通知频道](https://t.me/nezhanews)
- [Telegram 中文交流群](https://t.me/nezhamonitoring)

## 常见问题

### 哪吒监控 V2 能监控哪些系统？

官方安装与文档覆盖 Linux、Windows、macOS，并提供 OpenWRT、群晖等场景说明。具体指标取决于操作系统、权限、硬件和 Agent 配置。

### Dashboard 和 Agent 必须使用相同版本吗？

两者独立发布，版本号不要求完全一致，但升级前应分别阅读 Release Notes，并在少量节点验证。详见[版本与兼容性](/guide/version-compatibility.html)。

### 哪吒 V2 可以监控网站和 SSL 证书吗？

可以。HTTP GET 服务监控会检查 URL 可用性；HTTPS 目标还会检查证书状态。也可以使用 Ping 和 TCPing 观察网络与端口。

### 数据是否必须上传到第三方云？

不必须。Dashboard 与 Agent 可以自托管。只有启用 OAuth2、外部通知、DDNS、CDN 等集成时，相关请求才会发送到相应服务。

### 为什么当前接口路径仍然是 `/api/v1`？

API 路径版本与产品代际独立。哪吒当前产品是 V2，实际 REST API 继续使用 `/api/v1` 路径。不要自行改成 `/api/v2`。
