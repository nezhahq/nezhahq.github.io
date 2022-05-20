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