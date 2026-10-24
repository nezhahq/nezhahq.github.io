---
description: 哪吒监控 V2 配置指南入口：理解配置文件、环境变量与后台设置的关系，选择 Dashboard 和 Agent 配置，按场景部署并验证生效。
outline: deep
---

# 配置指南

配置哪吒分为两部分：Dashboard 决定入口、鉴权和数据存储；Agent 决定连接方式、采集项目及远程操作能力。两者使用独立 YAML 文件，字段和环境变量规则不能互换。

## 从哪里开始

| 目标 | 阅读 |
| --- | --- |
| 找到正在使用的文件，理解加载与持久化 | [配置加载与环境变量](/configuration/environment.html) |
| 查询面板的全部配置项和默认值 | [Dashboard 配置](/configuration/dashboard.html) |
| 查询节点的全部配置项和默认值 | [Agent 配置](/configuration/agent.html) |
| 配置反向代理、内置 HTTPS、轻量采集或存储 | [场景配置与验证](/configuration/examples.html) |
| 修改通知、告警、任务和分组 | [使用指南：设置](/guide/settings.html)及相邻功能页 |
| 开发或部署自己的用户主题 | [主题开发](/developer/theme-development.html) |

## 推荐工作流

1. **确认实际运行方式。** 检查容器挂载、进程参数或服务定义。Dashboard 默认读 `data/config.yaml`；Agent 默认读其可执行文件旁的 `config.yml`。安装脚本可能指定其它位置。
2. **备份当前状态。** 保存配置和服务定义；涉及存储变更时按[备份与恢复](/guide/q5.html)处理数据库和 TSDB。不要在多人可读的位置保存密钥。
3. **只改一个配置来源。** 后台支持的选项优先使用后台；文件配置不要与环境变量重复定义。改监听、TLS 或密钥前保留本机恢复入口。
4. **应用并读回。** 后台设置通常立即生效；本地文件修改需要重启对应进程。Agent 远程配置存在延迟，提交成功不等于已重连。
5. **验证实际链路。** 页面能打开、Agent 持续上报、历史可查询、预期功能可用且禁用项确实被拒绝，才算完成。

## 不要混淆这些配置

- Dashboard 的 `tls` 仅影响安装命令；真正的服务端 HTTPS 由 `https` 或反向代理提供。Agent 的 `tls` 则决定实际连接是否使用 TLS。
- `install_host` 是 Agent 入口，`dashboard_host` 是面板公网访问及 OAuth2 回调 Host，`listen_host` 是本地绑定地址。
- 用户连接密钥用于 Agent 注册，不是 REST/MCP 的 PAT，也不是浏览器 JWT。
- `online_stats_days` 控制在线会话历史；`tsdb.retention_days` 控制时序数据；它们不能互相替代。
- 用户主题的 `window.*` 变量不是 Dashboard YAML 字段，放在 `custom_code` 中，由所选主题解释。

## 配置之外的边界

Agent 能执行的操作还取决于进程操作系统权限；Dashboard 的用户权限、PAT scope 和服务器白名单仍然生效。关闭强制登录不等于公开所有服务器，也不等于取消管理接口鉴权。详见[安全与隐私](/guide/security.html)。
