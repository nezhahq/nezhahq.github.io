---
outline: deep
---

# 管理面板 (Dashboard) 配置

管理面板配置格式为 YAML，其中标记 \* 的项目只能通过配置文件修改，而其它的配置项则推荐通过管理后台修改，详见 [使用指南-管理面板配置-设置](/guide/settings.html)。

---

## 选项

- ##### **`language`**

  - Dashboard 本体程序的语言设置。
  - 需要填写 POSIX 风格的区域代码，例如 `en_US`。支持的语言列表详见 <https://hosted.weblate.org/projects/nezha/nezha-dashboard>。
  - YAML 配置使用下划线格式，例如 `zh_CN`、`en_US`；前端界面可能显示为连字符格式，例如 `zh-CN`、`en-US`，保存时会转换为 YAML 使用的格式。

- ##### **`site_name`**

  - 站点名称，例如 `Nezha`。

- ##### **`custom_code`**

  - 用户前端的自定义代码，会注入公开访问的用户前端。
  - `window.ForceShowServices`、`window.ForceShowMap`、`window.ForceCardInline` 等用户前端变量只在这里生效。

- ##### **`custom_code_dashboard`**

  - 管理前端的自定义代码，只会注入登录后的管理前端。

- ##### **`install_host`**

  - 指定安装命令的服务器地址，格式为 `host:port`。
  - 这个选项的实际效果由前端实现，Dashboard 本体不会使用。

- ##### **`reserved_hosts`**

  - 用逗号分隔声明 Dashboard 对外访问使用的域名或主机名，例如 `nezha.example.com,status.example.com`。
  - 该配置用于阻止普通成员创建与 Dashboard 入口冲突的 NAT 域名，避免在反向代理部署中抢占面板访问路由。
  - 当 Dashboard 运行在反向代理后面，进程本身无法可靠推断公网域名时，建议显式填写所有公网入口域名。

- ##### **`tls`**

  - 布尔值，指定安装命令是否启用 TLS。
  - 只有 Agent 通过 HTTPS、Dashboard 内置 HTTPS 或反向代理/CDN TLS 终结连接时才应设置为 `true`；如果 `install_host` 是明文直连的 `host:port`，不要启用。
  - 这个选项的实际效果由前端实现，Dashboard 本体不会使用。

- ##### **`debug`** \*

  - 布尔值，是否打开调试模式。
  - 开启后，会额外显示数据库日志及部分功能未正常工作时的错误日志。
  - 同时 WebSocket 同源策略将允许来自回环地址的连接。

- ##### **`web_real_ip_header`**

  - 指定访客访问 Dashboard 的真实 IP 请求头，例如 `X-Real-Ip`。
  - 填写之后将会自动启用内置 WAF，详见 [Web 应用防火墙](/guide/settings.html#web-%E5%BA%94%E7%94%A8%E9%98%B2%E7%81%AB%E5%A2%99)。
  - 如果选项值为 `NZ::Use-Peer-IP`，WAF 将会直接使用连接 IP，不再需要上层应用传递请求头。
  - 完整使用说明、反向代理示例和恢复方法见 [前端真实 IP 请求头](/guide/q12.html)。

- ##### **`agent_real_ip_header`**

  - 指定 Agent 连接 Dashboard 的真实 IP 请求头，例如 `X-Real-Ip`。
  - 如果选项值为 `NZ::Use-Peer-IP`，Dashboard 将会直接使用连接 IP，不再需要上层应用传递请求头。

- ##### **`enable_mcp`**

  - 布尔值，是否启用 Dashboard 内置的 MCP (Model Context Protocol) HTTP 入口。
  - 默认关闭。启用后，客户端可通过 `POST /mcp` 使用 API Token 调用 MCP 工具；该入口不接受 JWT。
  - 从开启切换为关闭时，Dashboard 会触发 kill switch，清理 MCP 文件传输临时 URL、撤销 MCP 传输流并取消正在执行的 MCP RPC。
  - API Token 的 scope 与使用方法详见 [API 接口](/guide/api.html#api-token-pat)。

- ##### **`user_template`**

  - 用户前端默认使用的主题。
  - 只支持填写已经内置的主题路径，详见 [service/singleton/frontend-templates.yaml](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml)。

- ##### **`admin_template`**

  - 管理前端默认使用的主题。
  - 只支持填写已经内置的主题路径，详见 [service/singleton/frontend-templates.yaml](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml)。

- ##### **`location`** \*

  - 程序使用的时区，主要影响通知及数据库查询。
  - 默认为 `Asia/Shanghai`。

- ##### **`force_auth`** \*

  - 布尔值，是否启用 “强制验证”。
  - 启用后需要登录才能查看服务器及服务监控相关数据。

- ##### **`agent_secret_key`** \*

  - Agent 的连接密钥。
  - 较新的版本中已不再使用，而是改为将连接密钥与用户进行绑定，详见 [连接密钥 ](/guide/user.html#%E8%BF%9E%E6%8E%A5%E5%AF%86%E9%92%A5)。

- ##### **`jwt_timeout`** \*

  - 整数，指定 JWT 的过期时间（小时）。
  - 默认值为 `1`。

- ##### **`jwt_secret_key`** \*

  - JWT 签名密钥。生产环境推荐通过环境变量 `NZ_JWTSECRETKEY` 注入，而不是写入配置文件。
  - 如果配置文件和环境变量都没有提供密钥，Dashboard 首次启动会自动生成密钥并写回 `config.yaml`。
  - 当设置了 `NZ_JWTSECRETKEY` 时，Dashboard 会使用环境变量中的值，不会把它写入 YAML，并且版本驱动的自动轮转会跳过，由运维自行通过更新环境变量和重启 Dashboard 完成轮转。

- ##### **`jwt_secret_key_last_rotated_version`** \*

  - 记录 Dashboard 上次完成 JWT 密钥版本轮转的版本号。
  - 从 `v2.0.13` 版本基线开始，如果没有使用 `NZ_JWTSECRETKEY` 且该字段为空或低于基线版本，Dashboard 会生成新的 `jwt_secret_key` 并更新此字段。
  - 手动修改该字段可能导致不必要的登录态失效；一般只需要在排查升级轮转问题时查看。

- ##### **`enable_plain_ip_in_notification`**

  - 布尔值，通知是否发送原始 IP。
  - 默认为 `false`，即发送脱敏后的 IP（例如 1.\*\*.1）。

- ##### **`enable_ip_change_notification`**

  - 布尔值，是否启用 IP 变更通知。

- ##### **`ip_change_notification_group_id`**

  - 整数，指定 IP 变更通知的通知组。

- ##### **`cover`**

  - 整数，指定 IP 变更通知的覆盖范围。
  - `1` 为覆盖全部，`ignored_ip_notification` 中的服务器会被排除。
  - `2` 为忽略全部，只监控 `ignored_ip_notification` 中的服务器。

- ##### **`ignored_ip_notification`**

  - 指定 IP 变更通知的服务器 ID，如覆盖范围为 覆盖全部 则排除这些服务器，如为 忽略全部 则只会监控这些服务器。
  - 使用逗号分隔，例如 `1,2,3`。

- ##### **`avg_ping_count`** \*

  - 整数，当内存中 TCPing / ICMP Ping 服务数据条目达到此值时将会取平均值并写入数据库。
  - 默认为 `2`，调高此值可以减少数据库的存储量。

- ##### **`dns_servers`**

  - DDNS 功能使用的 DNS 服务器列表。
  - 如不填则使用内置列表。

- ##### **`listen_port`** \*

  - Dashboard 监听端口（HTTP）。

- ##### **`listen_host`** \*

  - Dashboard 监听地址。

- ##### **`oauth2`** \*

  - OAuth 2.0 的相关配置，详见 [设置 OAuth 2.0 绑定](/guide/q14.html)。

- ##### **`https`** \*
  - HTTPS 服务器配置。
  - 需填写以下字段：
    - `listen_port`: 监听端口
    - `tls_cert_path`: TLS 证书路径
    - `tls_key_path`: TLS 证书私钥路径
    - `insecure_tls`：布尔值，是否关闭证书完整性检查

- ##### **`tsdb`** \*
  - TSDB (时序数据库) 配置，基于 VictoriaMetrics 存储引擎，用于替代默认的数据库存储服务监控历史和服务器指标数据。
  - 默认关闭。只有配置了 `tsdb.data_path` 并重启 Dashboard 后才会启用；留空时不会打开 TSDB。
  - 启用后将自动删除旧的 `service_histories` 数据库表，历史数据不会被迁移。
  - 如未配置 `data_path`，TSDB 不会启用，服务监控历史将继续使用数据库存储。
  - 需填写以下字段：
    - `data_path`：数据存储路径，例如 `data/tsdb`。此项为空则不启用 TSDB
    - `retention_days`：数据保留天数，默认 `30`
    - `min_free_disk_space_gb`：最小磁盘剩余空间（GB），低于此值时停止写入，默认 `1`
    - `max_memory_mb`：最大内存使用量（MB），用于限制缓存，默认 `256`
    - `write_buffer_size`：写入缓冲区大小，达到此数量后批量写入，默认 `512`
    - `write_buffer_flush_interval`：写入缓冲区刷新间隔（秒），默认 `5`
  - 配置示例：
    ```yaml
    tsdb:
      data_path: "data/tsdb"
      retention_days: 30
      max_memory_mb: 256
    ```
  - 也可以使用环境变量 `NZ_TSDB_DATA_PATH` 等价设置 `tsdb.data_path`。启动日志出现 `TSDB initialized successfully` 表示已启用；若日志显示 `TSDB is disabled (tsdb.data_path not configured)`，说明仍处于关闭状态。
  - 详细说明见 [如何启用 TSDB](/guide/q15.html)。

- ##### **`memory`** \*
  - 内存配置。
  - 需填写以下字段：
    - `go_mem_limit_mb`：Go 运行时内存限制（MB），`0` 表示不限制
---

## 应用

在修改了配置文件后，需要手动重启 Dashboard 以应用，不同的安装方式的重启方法不同，详情如下：

### Docker 安装

可以直接重启 Docker 容器：

```shell
docker restart nezha-dashboard
```

或是重新创建容器：

```shell
cd /opt/nezha/dashboard
docker compose down
docker compose up -d
```

### 独立安装

以 `systemd` 为例：

```shell
systemctl restart nezha-dashboard.service
```
