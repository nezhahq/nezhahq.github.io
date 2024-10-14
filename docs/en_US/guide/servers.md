---
outline: deep
---

# Server Management

## Introduction

The server section is responsible for managing Agents, forming the most fundamental part of Nezha monitoring and serving as the basis for other functionalities.

## Adding a Server

The first step is to add a server, where you can customize the name, group, sorting, and notes.  
Servers in the same group will be displayed together in supported themes. Notes will only be visible in the Admin Panel, so there's no need to worry about leaking information.

## Installing the Agent

Please refer to the previous section on [installing the Agent](/en_US/guide/agent.html).  
It is recommended to use the one-click installation. After configuring the parameters, click the corresponding system icon in the **one-click installation** column of the server to copy the installation command and execute it on the respective server.

## Forced Update

Agent update-related parameters include `--disable-auto-update` and `--disable-force-update` as described in [Custom Agent Monitoring Projects](/en_US/guide/q7.html).  
By default, the Agent will update automatically without intervention. However, if the user disables automatic updates, you can select specific servers for a forced update.  
The forced update will not work if `disable-force-update` is enabled.

## Data Columns

* Version: Records the current version of the Agent.
* Hide from Guests: When true, guests cannot see this server in the Dashboard.
* Enable DDNS: When true, if the server IP changes, the Dashboard will automatically update the DNS records.
* DDNS Domain: The DDNS domain configured for this server.
* Secret: The secret/key used for configuring the Agent, which is used to verify communication between the Agent and the Dashboard.
* One-Click Install: Click the corresponding system button to copy the command and execute it on the server for a one-click installation.
* Management: Connects to WebShell, modifies server configuration, or deletes the server.

## WebSSH Terminal

This is WebShell; the feature will not work if `disable-command-execute` is enabled.  
It is available for both Linux and Windows and supports Ctrl+Shift+V for pasting.  
If the connection fails, refer to [Real-Time Channel Disconnection/Online Terminal Connection Failure](/en_US/guide/q4.html).

## FM

Added in Dashboard v0.19.1 / Agent v0.19.0. A pseudo file manager embedded in WebShell, supports file download/upload, directory navigation and copying current path. Access it by clicking the blue button in the bottom-right corner of the WebShell.

## DDNS Functionality

The DDNS functionality is suitable for servers with dynamic IPs. When the Agent reports a new IP (every 10 minutes), the Dashboard will automatically update the DNS records based on the configuration.

### Why Use Nezha Monitoring's DDNS Functionality?

- Centralized management of DDNS settings instead of deploying a DDNS service on each server.
- Confidential information is only stored on the Dashboard server, preventing leakage.

### Configuration Instructions

You can choose to use profiles or not; If no profile is set, all Agent servers will use the same configuration to update DDNS. If profiles are used, each server can have a specific configuration for updating DDNS, providing greater flexibility.

#### Without Profiles
::: warning
This configuration is deprecated and will be removed in a future release. Please switch to using profiles instead.
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

- `Enable`: Boolean value to enable or disable the DDNS functionality.
- `Provider`: The name of the DDNS provider; currently supports `webhook`, `cloudflare`, and `tencentcloud`.
- `AccessID`: Token ID for the DDNS provider; only applicable to the `tencentcloud` provider.
- `AccessSecret`: Token Secret for the DDNS provider; only applicable to the `cloudflare` and `tencentcloud` providers.
- `WebhookMethod`: The request method for the webhook, such as `GET` or `POST`; only applicable to the `webhook` provider.
- `WebhookURL`: The request URL for the webhook; only applicable to the `webhook` provider.
- `WebhookRequestBody`: The request body for the webhook; only applicable to the `webhook` provider.
- `WebhookHeaders`: The request headers for the webhook; only applicable to the `webhook` provider.
- `MaxRetries`: The number of retry attempts when a request fails.
- `Profiles`: Multi-configuration settings; ignored in single configuration settings.

The `WebhookURL`, `WebhookRequestBody`, and `WebhookHeaders` can include the following placeholders:

- `{ip}`: The current IP of the server.
- `{domain}`: The DDNS domain. If used with `WebhookURL`, only query values will be replaced.
- `{type}`: The IP type, either "ipv4" or "ipv6".
- `{access_id}`: Credential 1.
- `{access_secret}`: Credential 2.

Example Configuration:

```yaml
WebhookHeaders: |
    a:{access_id}
    b:{access_secret}
WebhookRequestBody: '{"domain": "{domain}", "ip": "{ip}", "type": "{type}"}'
```

#### With Profiles

When using profiles, leave the `DDNS.Provider` value empty. If `DDNS.Provider` is not empty, this configuration will be ignored.

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

- `Profiles`: Profile field.
- `example`: Can be replaced with any string as the DDNS configuration name.

Other options can be referenced from the [Without Profiles](#Without-Profiles) section.

#### Dashboard Configuration

After modifying the configuration file, you also need to modify the server settings in the Dashboard for the DDNS to take effect.

DDNS related options:

- `Enable DDNS`: Enable the DDNS functionality for this server.
- `Enable DDNS IPv4`: Enable IPv4 resolution when updating DDNS records.
- `Enable DDNS IPv6`: Enable IPv6 resolution when updating DDNS records.
- `DDNS Domain`: The domain the record points to.
- `DDNS Configuration`: The DDNS configuration name to use in multiple configurations.

::: warning
When you modify the configuration and save it in the Dashboard settings, it will populate the default configuration options in `config.yaml`, and all options in the DDNS field will be set with a default value (see [Without Profiles](#Without-Profiles)).

- If not using profiles, configure `DDNS.Provider` and ignore the `Profiles` options.
- To use profiles, leave `DDNS.Provider` empty. If `DDNS.Provider` is not empty, the `Profiles` field will be ignored.
:::

#### Viewing Logs

In the Dashboard logs, you can see the relevant logs for the DDNS functionality. When configured correctly, there will be corresponding log entries when updating DNS records.

```shell
dashboard_1  | 2024/03/16 23:16:25 NEZHA>> 正在尝试更新域名(ddns.example.com)DDNS(1/3) # Attempting to update domain (ddns.example.com) DDNS (1/3)
dashboard_1  | 2024/03/16 23:16:28 NEZHA>> 尝试更新域名(ddns.example.com)DDNS成功 # Successfully updated domain (ddns.example.com) DDNS
```