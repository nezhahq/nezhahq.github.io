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
* Note: Server notes, visible only after verification.
* Public Note: Server public notes, visible on the frontend. You can customize frontend theme based on this field; see [Public Note Example](#public-note-example) for details.
* Installation commands: Click the corresponding system button to copy the command and execute it on the server for an instant installation.
* Management: Connects to WebShell, modifies server configuration, or deletes the server.

## WebSSH Terminal

This is WebShell; the feature will not work if `disable-command-execute` is enabled.  
It is available for both Linux and Windows and supports Ctrl+Shift+V for pasting.  
If the connection fails, refer to [Real-Time Channel Disconnection/Online Terminal Connection Failure](/en_US/guide/q4.html).

## FM

Added in Dashboard v0.19.1 / Agent v0.19.0. A pseudo file manager embedded in WebShell, supports file download/upload, directory navigation and copying current path. Access it by clicking the blue button in the bottom-right corner of the WebShell.

## Public Note Example

### ServerStatus Theme Agent Billing Information Display
<details>
  <summary>Click to expand/collapse</summary>

See https://github.com/naiba/nezha/pull/425.
</details>