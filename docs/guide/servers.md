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
请参考前文[安装 Agent](/guide/agent.html)  
推荐使用一键安装，即**配置好参数后**，点击服务器**一键安装**列上的对应的系统图标即可复制安装命令，在相应服务器上进行安装。

## 强制更新
Agent 更新相关的参数是 [自定义 Agent 监控项目](/guide/agent.html#自定义agent监控项目) 中的 `--disable-auto-update` 和 `--disable-force-update`。  
默认情况下，Agent 会自动更新，无需干预。但当用户关闭自动更新后，也可以选中指定服务器进行强制更新。  
`disable-force-update` 开启时此功能不生效。

## 数据列
* 版本号: 记录 Agent 当前版本
* 对游客隐藏： 为 True 时，游客在面板中无法查看到此服务器
* 启用DDNS: 为 True 时，当该服务器IP发生变化，Dashboard 会自动更新 DNS 记录
* DDNS域名：为该服务器配置的 DDNS 域名
* 密钥: 即 secret\key，配置 Agent 时会用到，用于验证 Agent 与 Dashboard 的通信
* 一键安装: 点击相应的系统按钮，复制命令到服务器执行即可一键安装
* 管理: 分别为连接 WebShell，修改服务器配置，删除服务器

## 在线终端
即 WebShell，`disable-command-execute`开启时此功能不生效。  
Linux 和 Windows 均可用，可使用 Ctrl+Shift+V 粘贴。  
连接失败请参考[实时通道断开/在线终端连接失败](/guide/q4.html)。  
注意在线终端功能中，Agent 也是通过 WebSocket 连接到**公开访问域名**，而非通过 gRPC 交互。

## DDNS 功能
DDNS 功能适用于使用动态 IP 的服务器，当 Agent 上报了一个新的 IP，Dashboard 会根据配置自动更新 DNS 记录。

### 为什么我要使用哪吒监控的 DDNS 功能？
- 方便集中管理 DDNS 设置，而不是在每台机器上都部署一个 DDNS 服务；
- 仅在面板机上保存您的机密信息，防止外泄。

### 配置说明
目前 DDNS 功能支持两种形式的配置：单配置和多配置。如使用单配置，则所有 Agent 服务器都使用相同的配置更新 DDNS；如使用多配置，则可为每台服务器指定一个配置更新 DDNS，灵活性更强。

#### 单配置
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
##### Enable
布尔值，选择是否开启 DDNS 功能。
##### Provider
DDNS 供应商的名称。目前支持 `webhook`、`cloudflare` 以及 `tencentcloud`。
##### AccessID
DDNS 供应商的令牌 ID。

仅适用于供应商 `tencentcloud`。
##### AccessSecret
DDNS 供应商的令牌 Secret。

仅适用于供应商 `cloudflare` 及 `tencentcloud`。
##### WebhookMethod
Webhook 的请求方法。例如 `GET`、`POST`等。

仅适用于供应商 `webhook`。
##### WebhookURL
Webhook 的请求地址。

仅适用于供应商 `webhook`。
##### WebhookRequestBody
Webhook 的请求体。

仅适用于供应商 `webhook`。
##### WebhookHeaders
Webhook 的请求头。

仅适用于供应商 `webhook`。
##### MaxRetries
当请求失败时，重试请求的次数。
##### Profiles
多配置设定。在单配置设定中，此项不进行处理。

:::tip
`WebhookURL`、`WebhookRequestBody` 以及`WebhookHeaders`可以使用如下参数：

`{ip}` - 主机当前IP

`{domain}` - ddns域名

`{type}` - IP类型，可能为"ipv4"和"ipv6"

`{access_id}` - 凭据1

`{access_secret}` - 凭据2

例如以下配置：
```
WebhookHeaders: |
    a:{access_id}
    b:{access_secret}
WebhookRequestBody: '{"domain": "{domain}", "ip": "{ip}", "type": "{type}"}'
```
:::

#### 多配置
当使用多配置时，请将 `DDNS.Provider` 留空。如 `DDNS.Provider` 的值不为空，多配置设定将被无视。
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
##### Profiles
多配置设定。
##### example
你的 DDNS 配置名，可填任意字符串。

其它选项请参考[单配置](#单配置)段。

### Dashboard 配置
修改好配置文件后，还需要在 Dashboard 中修改服务器设置才能使 DDNS 生效。
DDNS 相关选项说明：
- 启用DDNS
为此服务器启用 DDNS 功能。
- 启用DDNS IPv4
更新 DDNS 记录时，启用 IPv4 解析。
- 启用DDNS IPv6
更新 DDNS 记录时，启用 IPv6 解析。
- DDNS域名
记录指向的域名。
- DDNS配置
在多配置情况下，要使用的 DDNS 配置。

::: tip
在 Dashboard 设置中修改配置并保存时，会在 `config.yaml` 中填入默认配置选项，此时 DDNS 段中会同时存在单配置和多配置的选项。

如需使用单配置，请无视 `Profiles` 选项相关内容。

如需使用多配置，请将 `DDNS.Provider` 留空。如 `DDNS.Provider` 的值不为空，多配置设定将被无视。
:::

### 查看日志
   在 Dashboard 的日志中，可以看到 DDNS 功能的相关日志，配置正确时，更新 DNS 记录时会有相应的日志记录。
   ```shell
   dashboard_1  | 2024/03/16 23:16:25 NEZHA>> 正在尝试更新域名(ddns.example.com)DDNS(1/3)
   dashboard_1  | 2024/03/16 23:16:28 NEZHA>> 尝试更新域名(ddns.example.com)DDNS成功
   ```