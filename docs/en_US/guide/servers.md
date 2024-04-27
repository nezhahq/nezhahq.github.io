# Servers
## Introduction
The Servers area is responsible for managing the Agent, the most basic area in Nezha Monitoring, and the basis for other functions.  

## Add a server
The first step is to add a servers, which can be customized with names, groups, display index and notes.  
Servers in the same group will be displayed in groups in supported themes, and notes will only be displayed in the admin panel, no need to worry about leaking information.  

## Install Agent
Please refer to the previous article: [Install Agent](/en_US/guide/agent.html)  
We recommend using one-click installation, that is, **after configuring the communication domain name**, click the button on the column **one-click installation** and copy it to the monitored servers for installation.

## Forced Updates
The flags related to the update of the Agent are: `--disable-auto-update` and `--disable-force-update`. Please refer to [Customize Agent](/en_US/guide/agent.html#customize-agent)  
By default, the Agent is updated automatically, but when the user turns off automatic updates, the specified servers can also be selected for forced updates.  
This feature does not take effect when `-disable-force-update` is turned on.

## Data List
* Version number: Record the current version of Agent
* Secret: Used when configuring the Agent
* One-Click Installation: A more convenient way to install Agent
* Manage: WebShell on the left, Edit in the middle, Delete on the right

## Webshell
This feature does not take effect when `disable-command-execute` is turned on.  
Both Linux and Windows are available and can be pasted using Ctrl+Shift+V.    
For connection failure, please refer to [Real-time channel disconnection/online terminal connection failure](/en_US/guide/q4.html).  
Note that in theWebShell function, the Agent also connects to the **Domain names for public access** via WebSocket, not via grpc.

## DDNS
DDNS feature is suitable for servers that have dynamic IP addresses. When a different IP is reported by Agent, Dashboard will update DNS record automatically using configured settings.

### Why choose Nezha's DDNS feature
- Manage your DDNS configuration centrally, without deploying a single service on every server.
- Save your credentials only on the Dashboard server to prevent data leaks.

### 配置说明
Currently, DDNS supports two types of configurations: Single and Multiple. If Single is chosen, all Agent servers will use the same configuration to update DNS records, whereas selecting Multiple allows each server to use a specified configuration.

#### Single
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
Boolean value indicating whether the DDNS function is enabled.
##### Provider
Name of the DDNS provider, currently support `webhook`, `cloudflare` and `tencentcloud`.
##### AccessID
Secret ID associated with DDNS provider.
Only applied to `tencentcloud`.
##### AccessSecret
Secret key associated with DDNS provider.
Only applied to `cloudflare` and `tencentcloud`.
##### WebhookMethod
Request method of Webhook.
For example, `GET` and `POST`.
Only applied to `webhook`.
##### WebhookURL
Request URL of Webhook.
Only applied to `webhook`.
##### WebhookRequestBody
Request body of Webhook.
Only applied to `webhook`.
##### WebhookHeaders
Request headers of Webhook.
Only applied to `webhook`.
##### MaxRetries
The number of retry attempts after an update request has failed.
##### Profiles
Multiple configuration setting. Will be ignored in Single configuration setting.

#### Multiple
Please leave `DDNS.Provider` field blank while using Multiple configuration. If not, the Multiple configuration will be ignored.
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
##### Enable
Boolean value indicating whether the DDNS function is enabled.
##### MaxRetries
The number of retry attempts after an update request has failed.
##### Profiles
Multiple configuration setting.
##### Provider
Name of the DDNS provider, currently support `webhook`, `cloudflare` and `tencentcloud`.
##### example
Name of DDNS configuration, can be any string.
##### AccessID
Secret ID associated with DDNS provider.
Only applied to `tencentcloud`.
##### AccessSecret
Secret key associated with DDNS provider.
Only applied to `cloudflare` and `tencentcloud`.
##### WebhookMethod
Request method of Webhook.
For example, `GET` and `POST`.
Only applied to `webhook`.
##### WebhookURL
Request URL of Webhook.
Only applied to `webhook`.
##### WebhookRequestBody
Request body of Webhook.
Only applied to `webhook`.
##### WebhookHeaders
Request headers of Webhook.
Only applied to `webhook`.

### Dashboard configuration
修改好配置文件后，还需要在 Dashboard 中修改服务器设置才能使 DDNS 生效。
After configuring `config.yaml`, you will need to modify server settings in Dashboard to make DDNS function effective.

Explanation of DDNS-related options:
- Enable DDNS
Enable the DDNS functionality for this server.
- Enable DDNS IPv4
Enable IPv4 resolution when updating DDNS records.
- Enable DDNS IPv6
Enable IPv6 resolution when updating DDNS records.
- DDNS Domain
The domain name the record points to.
- DDNS Configuration
The DDNS configuration to use in case of multiple configurations.

::: tip
When modifying settings in the Dashboard and saving them, default configuration options will be filled into the `config.yaml` file. At this time, in the DDNS field, there will be both single configuration and multiple configurations options available. 
If you need to use a single configuration, please ignore the content related to the Profiles option. 
Please leave `DDNS.Provider` field blank while using Multiple configuration. If not, the Multiple configuration will be ignored.
:::

### View log
   In the Dashboard's logs, you can view the relevant logs for the DDNS. When configured correctly, there will be corresponding log entries when the DNS records are updated.
   ```shell
   dashboard_1  | 2024/03/16 23:16:25 NEZHA>> 正在尝试更新域名(ddns.example.com)DDNS(1/3)
   dashboard_1  | 2024/03/16 23:16:28 NEZHA>> 尝试更新域名(ddns.example.com)DDNS成功
   ```