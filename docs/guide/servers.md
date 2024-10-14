---
outline: deep
---

# 服务器

## 介绍

服务器区域负责管理 Agent，是哪吒探针中最基础的区域，也是其他功能的基础。

## 新增服务器

第一步是新增服务器，可以自定义名称、分组、排序和备注。  
拥有相同分组的服务器会在受支持的主题中划分到一起进行显示，备注仅会在后台显示，无需担心泄露信息。

## 安装 Agent

请参考前文[安装 Agent](/guide/agent.html)。  
推荐使用一键安装，即**配置好参数后**，点击服务器**一键安装**列上的对应的系统图标即可复制安装命令，在相应服务器上进行安装。

## 强制更新

Agent 更新相关的参数是 [自定义 Agent 监控项目](/guide/q7.html) 中的 `--disable-auto-update` 和 `--disable-force-update`。  
默认情况下，Agent 会自动更新，无需干预。但当用户关闭自动更新后，也可以选中指定服务器进行强制更新。  
`disable-force-update` 开启时此功能不生效。

## 数据列

* 版本号：记录 Agent 当前版本。
* 对游客隐藏：为 True 时，游客在面板中无法查看到此服务器。
* 启用 DDNS：为 True 时，当该服务器 IP 发生变化，Dashboard 会自动更新 DNS 记录。
* DDNS 域名：为该服务器配置的 DDNS 域名。
* 密钥：即 secret/key，配置 Agent 时会用到，用于验证 Agent 与 Dashboard 的通信。
* 一键安装：点击相应的系统按钮，复制命令到服务器执行即可一键安装。
* 管理：分别为连接 WebShell，修改服务器配置，删除服务器。

## 在线终端

即 WebShell，`disable-command-execute` 开启时此功能不生效。  
Linux 和 Windows 均可用，可使用 Ctrl+Shift+V 粘贴。  
连接失败请参考[实时通道断开/在线终端连接失败](/guide/q4.html)。

## FM

Dashboard v0.19.1 / Agent v0.19.0 加入的新功能，是嵌入 WebShell 的一个伪文件管理器，提供文件下载和上传功能，也可以进行目录跳转或者复制路径。点击 WebShell 右下角的蓝色按钮就可以打开。

## DDNS 功能

DDNS 功能适用于使用动态 IP 的服务器，当 Agent 上报了一个新的 IP（10分钟一次），Dashboard 会根据配置自动更新 DNS 记录。

### 为什么我要使用哪吒监控的 DDNS 功能？

- 方便集中管理 DDNS 设置，而不是在每台服务器上都部署一个 DDNS 服务。
- 仅在面板服务器上保存您的机密信息，防止外泄。

### 配置说明

目前 DDNS 功能支持两种形式的配置：**单配置** 和 **多配置**。如使用 **单配置**，则所有 Agent 服务器都使用相同的信息更新 DDNS；如使用 **多配置**，则可为每台服务器指定一个配置更新 DDNS，灵活性更强。

#### 单配置
::: warning
此功能已废弃，并将在之后的版本中删除，请尽快迁移至 **多配置** 方式。
:::

```yaml
DDNS:
  Enable: true
  Provider: "webhook"
  AccessID: ""
  AccessSecret: ""
  WebhookMethod: ""
  WebhookURL: ""
  WebhookRequestBody: ""
  WebhookHeaders: ""
  MaxRetries: 3
  Profiles: null
```

- `Enable`：布尔值，选择是否开启 DDNS 功能。
- `Provider`：DDNS 供应商的名称；目前支持 `webhook`、`cloudflare` 以及 `tencentcloud`。
- `AccessID`：DDNS 供应商的令牌 ID；仅适用于供应商 `tencentcloud`。
- `AccessSecret`：DDNS 供应商的令牌 Secret；仅适用于供应商 `cloudflare` 及 `tencentcloud`。
- `WebhookMethod`：Webhook 的请求方法。例如 `GET`、`POST` 等；仅适用于供应商 `webhook`。
- `WebhookURL`：Webhook 的请求地址；仅适用于供应商 `webhook`。
- `WebhookRequestBody`：Webhook 的请求体；仅适用于供应商 `webhook`。
- `WebhookHeaders`：Webhook 的请求头；仅适用于供应商 `webhook`。
- `MaxRetries`：当请求失败时，重试请求的次数。
- `Profiles`：多配置设定；在单配置设定中，此项忽略。

`WebhookURL`（仅对参数生效）、`WebhookRequestBody` 以及 `WebhookHeaders` 可以包含以下占位符：

- `{ip}`：主机当前 IP，开启 IPv4 则为 IPv4 地址，开启 IPv6 则为 IPv6 地址。
- `{domain}`：ddns 域名。
- `{type}`：IP 类型，可能为 "ipv4" 和 "ipv6"。
- `{access_id}`：凭据 1。
- `{access_secret}`：凭据 2。

配置示例：

```yaml
WebhookHeaders: |
    a:{access_id}
    b:{access_secret}
WebhookRequestBody: '{"domain": "{domain}", "ip": "{ip}", "type": "{type}"}'
```

#### 多配置

当使用 **多配置** 时，请将 `DDNS.Provider` 留空。如 `DDNS.Provider` 的值不为空，**多配置** 设定将被忽略。

```yaml
DDNS:
  Enable: true
  MaxRetries: 3
  Profiles:
    example:
      Provider: ""
      AccessID: ""
      AccessSecret: ""
      WebhookMethod: ""
      WebhookURL: ""
      WebhookRequestBody: ""
      WebhookHeaders: ""
```

- `Profiles`：配置字段。
- `example`：可替换为 DDNS 配置名，可填任意字符串。

其它选项请参考[单配置](#单配置)段。

#### Dashboard 配置

修改配置文件后，还需要在 Dashboard 中修改服务器设置才能使 DDNS 生效。

DDNS 相关选项说明：

- `启用 DDNS`：为此服务器启用 DDNS 功能。
- `启用 DDNS IPv4`：更新 DDNS 记录时，启用 IPv4 解析。
- `启用 DDNS IPv6`：更新 DDNS 记录时，启用 IPv6 解析。
- `DDNS 域名`：记录指向的域名。
- `DDNS 配置`：在 **多配置** 情况下，要使用的 DDNS 配置名。

::: warning
在 Dashboard 设置中修改配置并保存时，会在 `config.yaml` 中填入默认配置选项，此时 DDNS 段中会同时存在 **单配置** 和 **多配置** 字段。

- 如使用 **单配置**，请配置 `DDNS.Provider`，并忽略 `Profiles` 选项相关内容。
- 如使用 **多配置**，请将 `DDNS.Provider` 留空。如 `DDNS.Provider` 的值不为空，多配置设定将被忽略。
:::

#### 查看日志

在 Dashboard 的日志中，可以看到 DDNS 功能的相关日志，配置正确时，更新 DNS 记录时会有相应的日志记录。

```shell
dashboard_1  | 2024/03/16 23:16:25 NEZHA>> 正在尝试更新域名(ddns.example.com)DDNS(1/3)
dashboard_1  | 2024/03/16 23:16:28 NEZHA>> 尝试更新域名(ddns.example.com)DDNS成功
```