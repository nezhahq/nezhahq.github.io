---
outline: deep
---

# Frequently Asked Questions about the Agent

## The IP Displayed in the Admin Panel is Different from the Actual Agent IP?

Please refer to [Dashboard Related - Why is the IP Displayed in the Admin Panel Different from the Actual Agent IP?](/en_US/guide/dashboardq.html#why-is-the-ip-displayed-in-the-admin-panel-different-from-the-actual-agent-ip). This will not be repeated here.

## Errors During One-Click Script Installation

### curl: Failed to connect to raw.githubusercontent.com......

This mostly occurs on servers in mainland China. Currently, the one-click script fetches the installation script directly from Github. You may try several times, or [manually install the Agent](/en_US/guide/agent.html#other-ways-to-install-agent). Additionally, you can find third-party Github acceleration services or mirrors and set them in the one-click installation script.

### sudo: command not found

Please manually install sudo first, for example, in Ubuntu:

```shell
apt install sudo
```