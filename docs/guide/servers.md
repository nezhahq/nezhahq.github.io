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
DDNS 功能适用于使用动态IP的服务器，当检测到当前的服务器 IP 发生变更，Dashboard 会根据配置自动更新 DNS 记录。

### 配置说明
DDNS 功能依赖于 DNS 供应商的 API，目前支持 `cloudflare`。你需要提前在 Cloudflare 上添加一个域名，并创建一个拥有 `编辑区域 DNS` 权限的令牌。  
如果您还不知道如何创建令牌，请参考 [Cloudflare API Token](https://developers.cloudflare.com/api/tokens/create)。
1. **基本配置**  
   在配置文件 `/opt/nezha/dashboard/data/config.yaml` 中，可以修改 DNS 供应商的 API 信息，如果配置文件中没有 `DDNS` 配置项，可以手动添加。
    ```yaml
    DDNS:
      AccessID: ""
      AccessSecret: ""
      Enable: true 
      MaxRetries: 3 
      Provider: cloudflare
      WebhookHeaders: ""
      WebhookMethod: POST
      WebhookRequestBody: ""
      WebhookURL: ""
   ```
  * `AccessID` 是 DNS 供应商的登录账号
  * `AccessSecret` 是 DNS 供应商中创建好的令牌
  * `Enable` 布尔值，选择是否开启 DDNS 功能
  * `MaxRetries` 整数，失败时的重试次数
  * `Provider` DNS 供应商的名称
  * `WebhookHeaders` 字符串，Webhook 的请求头
  * `WebhookMethod` 字符串，Webhook 的请求方法
  * `WebhookRequestBody` 字符串，Webhook 的请求体
  * `WebhookURL` 字符串，Webhook 的请求地址   
配置完成后，重启 Dashboard 即可生效。   
  ::: tip   
  Webhook 相关配置是可选的，如果不需要可以不填写。   
  :::

2. **Dashboard 配置**  
   在 Dashboard 中，可以在服务器列表中看到 `启用DDNS` 和 `DDNS域名` 两个字段，分别表示是否开启 DDNS 功能和当前的 DDNS 域名。  
   如果需要开启 DDNS 功能，可以在服务器列表中点击 `修改` 按钮，然后在弹出的对话框中填写 `DDNS域名`，并勾选`启用DDNS`，然后点击 `保存` 按钮即可。

### 查看日志
   在 Dashboard 的日志中，可以看到 DDNS 功能的相关日志，配置正确时，更新 DNS 记录时会有相应的日志记录。
   ```shell
   dashboard_1  | 2024/03/16 23:16:25 NEZHA>> 正在尝试更新域名(ddns.example.com)DDNS(1/3)
   dashboard_1  | 2024/03/16 23:16:28 NEZHA>> 尝试更新域名(ddns.example.com)DDNS成功
   ```