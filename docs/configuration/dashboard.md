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

- ##### **`site_name`**

  - 站点名称，例如 `Nezha`。

- ##### **`custom_code / custom_code_dashboard`**

  - 用户前端 / 管理前端的自定义代码。

- ##### **`install_host`**

  - 指定安装命令的服务器地址，格式为 `host:port`。
  - 这个选项的实际效果由前端实现，Dashboard 本体不会使用。

- ##### **`tls`**

  - 布尔值，指定安装命令是否启用 TLS。
  - 这个选项的实际效果由前端实现，Dashboard 本体不会使用。

- ##### **`debug`** \*

  - 布尔值，是否打开调试模式。
  - 开启后，会额外显示数据库日志及部分功能未正常工作时的错误日志。
  - 同时 WebSocket 同源策略将允许来自回环地址的连接。

- ##### **`real_ip_header`**

  - 指定 Dashboard 的真实 IP 请求头，例如 `X-Real-Ip`。
  - 填写之后将会自动启用内置 WAF，详见 [Web 应用防火墙](/guide/settings.html#web-%E5%BA%94%E7%94%A8%E9%98%B2%E7%81%AB%E5%A2%99)。
  - 如果选项值为 `NZ::Use-Peer-IP`，WAF 将会直接使用连接 IP，不再需要上层应用传递请求头。

- ##### **`user_template / admin_template`**

  - 默认使用的前端主题。
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

- ##### **`enable_plain_ip_in_notification`**

  - 布尔值，通知是否发送原始 IP。
  - 默认为 `false`，即发送脱敏后的 IP（例如 1.\*\*.1）。

- ##### **`enable_ip_change_notification`**

  - 布尔值，是否启用 IP 变更通知。

- ##### **`ip_change_notification_group_id`**

  - 整数，指定 IP 变更通知的通知组。

- ##### **`cover`**

  - 整数，指定 IP 变更通知的覆盖范围。
  - `0` 为覆盖全部，`1` 为忽略全部。

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
