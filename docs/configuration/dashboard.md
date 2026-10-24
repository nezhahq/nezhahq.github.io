---
description: 哪吒监控 V2 Dashboard 完整 YAML 配置参考，覆盖域名、TLS、真实 IP、OAuth2、JWT、用户前端、MCP、TSDB、内存和通知隐私选项。
outline: deep
---

# 管理面板 (Dashboard) 配置

管理面板配置格式为 YAML，其中标记 \* 的项目只能通过配置文件修改，而其它配置项在界面支持时推荐通过管理后台修改，详见 [使用指南-管理面板配置-设置](/guide/settings.html)。

---

## 文件、默认值与修改方式

Dashboard 默认读取工作目录下的 `data/config.yaml`，用 `-c` 指定其它文件；`-db` 单独指定 SQLite 数据库。混用来源前先读[配置加载与环境变量](/configuration/environment.html)。下文默认值指缺省或程序规定的零值回退；空字符串和空映射明确列出。完整场景见[场景配置](/configuration/examples.html)。

文件专属项修改后需重启。后台支持项可由界面保存，但 API 可写不代表一定有对应界面控件。特别是 `admin_template` 不在 `SettingForm` 中，应修改文件。

## 选项

- ##### **`language`**

  - 类型：`string`；默认：`en_US`。

  - Dashboard 本体程序的语言设置。
  - 需要填写 POSIX 风格的区域代码，例如 `en_US`。支持的语言列表详见 <https://hosted.weblate.org/projects/nezha/nezha-dashboard>。
  - YAML 配置使用下划线格式，例如 `zh_CN`、`en_US`；前端界面可能显示为连字符格式，例如 `zh-CN`、`en-US`，保存时会转换为 YAML 使用的格式。

- ##### **`site_name`**

  - 类型：`string`；默认：`""`。

  - 站点名称，例如 `Nezha`。

- ##### **`custom_code`**

  - 类型：`string`；默认：`""`。

  - 用户前端的自定义代码，会注入公开访问的用户前端。
  - `window.ForceShowServices`、`window.ForceShowMap`、`window.ForceCardInline` 等用户前端变量只在这里生效。

- ##### **`custom_code_dashboard`**

  - 类型：`string`；默认：`""`。

  - 管理前端的自定义代码，作用于管理前端页面（不是用户主题配置，也不是保密存储）。

- ##### **`install_host`**

  - 类型：`string`；默认：`""`。

  - 指定安装命令的服务器地址，格式为 `host:port`。
  - 前端使用此项生成 Agent 安装命令；Dashboard 还会将其中的 Host 视为可信的 OAuth2 回调 Host 和 NAT 保留域名。

- ##### **`dashboard_host`**

  - 类型：`string`；默认：`""`。

  - 指定 Dashboard 对外访问并用于 OAuth2 回调的地址，格式为 `域名/IP[:端口]`，不要包含协议或路径；使用 HTTP/HTTPS 默认端口时可省略端口。
  - 有固定公网入口时建议显式设置此项；当 Dashboard 的公网访问地址与 `install_host` 不同时尤其需要设置。
  - 收到 OAuth2 回调时，如果请求中的 Host 不属于 `dashboard_host`、`install_host`、`listen_host` 或 `reserved_hosts`，Dashboard 会将回调地址的 Host 替换为此值；留空则信任请求中的 Host。
  - 此地址也会自动作为 NAT 保留域名，防止普通成员创建冲突的 NAT 规则。

- ##### **`reserved_hosts`**

  - 类型：`string`；默认：`""`。

  - 用逗号分隔声明 Dashboard 对外访问使用的域名或主机名，例如 `nezha.example.com,status.example.com`。
  - 该配置用于阻止普通成员创建与 Dashboard 入口冲突的 NAT 域名，避免在反向代理部署中抢占面板访问路由。
  - 当 Dashboard 运行在反向代理后面，进程本身无法可靠推断公网域名时，建议显式填写所有公网入口域名。
  - 这些域名也会被视为可信的 OAuth2 回调 Host；使用多个入口时，请同时在 OAuth2 提供方登记对应的回调地址。

- ##### **`tls`**

  - 类型：`bool`；默认：`false`。

  - 布尔值，指定安装命令是否启用 TLS。
  - 只有 Agent 通过 HTTPS、Dashboard 内置 HTTPS 或反向代理/CDN TLS 终结连接时才应设置为 `true`；如果 `install_host` 是明文直连的 `host:port`，不要启用。
  - 这个选项的实际效果由前端实现，Dashboard 本体不会使用。

- ##### **`debug`** \*

  - 类型：`bool`；默认：`false`。

  - 布尔值，是否打开调试模式。
  - 开启后，会额外显示数据库日志及部分功能未正常工作时的错误日志。
  - 同时 WebSocket 同源策略将允许来自回环地址的连接。

- ##### **`web_real_ip_header`**

  - 类型：`string`；默认：`""`。

  - 指定访客访问 Dashboard 的真实 IP 请求头，例如 `X-Real-Ip`。
  - 填写之后将会自动启用内置 WAF，详见 [Web 应用防火墙](/guide/settings.html#web-%E5%BA%94%E7%94%A8%E9%98%B2%E7%81%AB%E5%A2%99)。
  - 如果选项值为 `NZ::Use-Peer-IP`，WAF 将会直接使用连接 IP，不再需要上层应用传递请求头。
  - 完整使用说明、反向代理示例和恢复方法见 [前端真实 IP 请求头](/guide/q12.html)。

- ##### **`agent_real_ip_header`**

  - 类型：`string`；默认：`""`。

  - 指定 Agent 连接 Dashboard 的真实 IP 请求头，例如 `X-Real-Ip`。
  - 如果选项值为 `NZ::Use-Peer-IP`，Dashboard 将会直接使用连接 IP，不再需要上层应用传递请求头。

- ##### **`enable_mcp`**

  - 类型：`bool`；默认：`false`。

  - 布尔值，是否启用 Dashboard 内置的 MCP (Model Context Protocol) HTTP 入口。
  - 默认关闭。启用后，客户端可通过 `POST /mcp` 使用 API Token 调用 MCP 工具；该入口不接受 JWT。
  - 从开启切换为关闭时，Dashboard 会触发 kill switch，清理 MCP 文件传输临时 URL、撤销 MCP 传输流并取消正在执行的 MCP RPC。
  - API Token 的 scope 与使用方法详见 [API 接口](/guide/api.html#api-token-pat)。

- ##### **`user_template`**

  - 类型：`string`；默认：`user-dist`。

  - 用户前端默认使用的主题。选择值受 manifest 校验；已选主题支持工作目录中的本地文件覆盖，见[主题开发](/developer/theme-development.html)。
  - 只支持填写已经内置的主题路径，详见 [service/singleton/frontend-templates.yaml](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml)。

- ##### **`admin_template`** \*

  - 类型：`string`；默认：`admin-dist`。

  - 管理前端默认使用的主题。设置 API 不提供此字段，应通过 YAML 修改。
  - 只支持填写已经内置的主题路径，详见 [service/singleton/frontend-templates.yaml](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml)。

- ##### **`location`** \*

  - 类型：`string`；默认：`Asia/Shanghai`。

  - 程序使用的时区，主要影响通知及数据库查询。
  - 默认为 `Asia/Shanghai`。

- ##### **`force_auth`** \*

  - 类型：`bool`；默认：`false`。

  - 布尔值，是否启用 “强制验证”。
  - 启用后需要登录才能查看服务器及服务监控相关数据。

- ##### **`agent_secret_key`** \*

  - 类型：`string`；默认：自动生成的兼容密钥。

  - Agent 的连接密钥。
  - 此字段用于兼容历史 Agent；当前部署应使用与用户绑定的连接密钥，详见 [连接密钥 ](/guide/user.html#%E8%BF%9E%E6%8E%A5%E5%AF%86%E9%92%A5)。

- ##### **`jwt_timeout`** \*

  - 类型：`integer`；默认：`1`。

  - 整数，指定 JWT 的过期时间（小时）。
  - 默认值为 `1`。

- ##### **`allow_jwt_ip_change`**

  - 类型：`bool`；默认：`false`。

  - 布尔值，默认 `false`。
  - 默认情况下，浏览器登录会话绑定登录时的客户端 IP；IP 改变后需要重新登录。设为 `true` 可允许同一 JWT 会话在 IP 变化后继续使用，适合频繁切换网络的场景，但会放宽会话保护。
  - 当前管理前端没有此项开关。可修改 YAML 后重启，或通过管理员设置 API 的 `allow_jwt_ip_change` 字段更新；它不改变 PAT 的 scope、服务器白名单、过期或吊销规则。

- ##### **`jwt_secret_key`** \*

  - 类型：`string`；默认：文件和环境均未设置时自动生成。

  - JWT 签名密钥。生产环境推荐通过环境变量 `NZ_JWTSECRETKEY` 注入，而不是写入配置文件。
  - 如果配置文件和环境变量都没有提供密钥，Dashboard 首次启动会自动生成密钥并写回 `config.yaml`。
  - 当设置了 `NZ_JWTSECRETKEY` 时，Dashboard 会使用环境变量中的值，不会把它写入 YAML，并且版本驱动的自动轮转会跳过，由运维自行通过更新环境变量和重启 Dashboard 完成轮转。

- ##### **`jwt_secret_key_last_rotated_version`** \*

  - 类型：`string`；默认：自动维护的轮转元数据。

  - 记录 Dashboard 上次完成 JWT 密钥版本轮转的版本号。
  - 如果没有使用 `NZ_JWTSECRETKEY`，且记录的轮转版本为空或低于当前轮转基线 `v2.0.13`，Dashboard 会生成新的 `jwt_secret_key` 并更新此字段。
  - 手动修改该字段可能导致不必要的登录态失效；一般只需要在排查升级轮转问题时查看。

- ##### **`enable_plain_ip_in_notification`**

  - 类型：`bool`；默认：`false`。

  - 布尔值，通知是否发送原始 IP。
  - 默认为 `false`，即发送脱敏后的 IP（例如 1.\*\*.1）。

- ##### **`enable_ip_change_notification`**

  - 类型：`bool`；默认：`false`。

  - 布尔值，是否启用 IP 变更通知。

- ##### **`ip_change_notification_group_id`**

  - 类型：`integer`；默认：`0`。

  - 整数，指定 IP 变更通知的通知组。

- ##### **`cover`**

  - 类型：`integer`；默认：`1`。

  - 整数，指定 IP 变更通知的覆盖范围。
  - `1` 为覆盖全部，`ignored_ip_notification` 中的服务器会被排除。
  - `2` 为忽略全部，只监控 `ignored_ip_notification` 中的服务器。

- ##### **`ignored_ip_notification`**

  - 类型：`string`；默认：`""`。

  - 指定 IP 变更通知的服务器 ID，如覆盖范围为 覆盖全部 则排除这些服务器，如为 忽略全部 则只会监控这些服务器。
  - 使用逗号分隔，例如 `1,2,3`。

- ##### **`avg_ping_count`** \*

  - 类型：`integer`；默认：`2`。

  - 整数，当内存中 TCPing / ICMP Ping 服务数据条目达到此值时将会取平均值并写入数据库。
  - 默认为 `2`，调高此值可以减少数据库的存储量。

- ##### **`online_stats_days`**

  - 类型：`integer`；默认：`7`。

  - 整数，默认 `7`，有效范围 `7`–`3650`（天）。
  - 同时控制服务器在线会话的历史保留范围和在线历史 API 的最大查询窗口；不控制 CPU、网络等 TSDB 指标的保留期。
  - 可在管理前端的系统设置中修改。设置 API 会拒绝范围外的值；启动时 YAML 中缺省、为 `0` 或越界的值会回退为 `7`。
  - 缩短范围后，超出窗口的已结束会话会被定期清理；再次延长范围不会恢复已清理的历史。详情见[服务器在线历史](/guide/servers.html#在线历史)。

- ##### **`dns_servers`**

  - 类型：`string`；默认：`""`。

  - DDNS 使用的 DNS 服务器字符串，多个地址用逗号分隔，例如 `1.1.1.1:53,8.8.8.8:53`。这与 Agent 的 `dns` 数组不是同一个字段。
  - 如不填则使用内置列表。

- ##### **`listen_port`** \*

  - 类型：`integer`；默认：`8008`。

  - Dashboard 监听端口（HTTP）。

- ##### **`listen_host`** \*

  - 类型：`string`；默认：`""`。

  - Dashboard 监听地址，空字符串表示通配绑定；限制本机访问时显式填写 `127.0.0.1`。容器部署需按网络方式选择，不能无条件使用回环。

- ##### **`oauth2`** \*

  - 类型：`map`；默认：`{}`。

  - 按提供方名称索引的映射。每项包含 `client_id`、`client_secret`、`scopes`；自建提供方还使用 `endpoint.auth_url`、`endpoint.token_url`、`user_info_url`、`user_id_path`。完整配置见[设置 OAuth 2.0 绑定](/guide/q14.html)。

- ##### **`https`** \*

  - 类型：`object`；默认：`{}`。
  - HTTPS 服务器配置；`listen_port: 0`（默认）不启用，非零时额外监听，不会关闭原 HTTP 端口。
  - 需填写以下字段：
    - `listen_port`: 监听端口
    - `tls_cert_path`: TLS 证书路径
    - `tls_key_path`: TLS 证书私钥路径
    - `insecure_tls`：布尔值，默认 `false`；服务端 TLS 配置的保留项，不是 Agent 或浏览器信任自签名证书的开关。通常保持默认

- ##### **`tsdb`** \*

  - 类型：`object`；默认：`{}`。
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
  - 也可以使用环境变量 `NZ_TSDB_DATAPATH` 等价设置 `tsdb.data_path`。启动日志出现 `TSDB initialized successfully` 表示已启用；若日志显示 `TSDB is disabled (tsdb.data_path not configured)`，说明仍处于关闭状态。
  - 详细说明见 [如何启用 TSDB](/guide/q15.html)。

- ##### **`memory`** \*

  - 类型：`object`；默认：`{}`。
  - 内存配置。
  - 需填写以下字段：
    - `go_mem_limit_mb`：Go 运行时内存软限制（MB），默认 `0` 表示不额外设置该限制；不是进程 RSS 或容器硬上限
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


## 运行细节

布尔值默认关闭不表示对应功能没有其它权限限制。修改真实 IP 或 TLS 之前，请核对[场景配置](/configuration/examples.html)并保留本机恢复方式。`agent_secret_key` 和 JWT 轮转标记属于自动生成/兼容元数据，不应复制到不同部署作为共享身份。

## 相关文档

- [架构与数据流](/guide/architecture.html)
- [安全与隐私](/guide/security.html)
- [版本与兼容性](/guide/version-compatibility.html)
- [Dashboard 常见问题](/guide/dashboardq.html)
