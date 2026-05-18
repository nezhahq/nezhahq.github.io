---
outline: deep
---

# Servers

## Overview

The servers area manages Agents. It is the most basic functional module of Nezha Monitor and the core foundation for other features.

---

## Installation Commands

See [Install Agent](/en_US/guide/agent.html).
The **one-click installation method** is recommended:

1. Configure the required parameters.
2. Click the `Installation Command` icon on the Dashboard server page.
3. Copy the generated installation command and run it on the corresponding server to complete installation.

---

## Forced Updates

Agent update behavior is controlled by these two parameters:

- `disable-auto-update`: disables automatic updates.
- `disable-force-update`: disables forced updates.

### Default Behavior

By default, Agents update automatically without manual intervention.

### Manual Forced Updates

If automatic updates have been disabled, select the target servers and execute **Force Update** to update Agents.
**Note**: When `disable-force-update` is enabled, the force update function is unavailable.

---

## Data Column Descriptions

Server page columns in the Dashboard:

- **Version**: Shows the current Agent version.
- **Enable DDNS**: When `True`, the Dashboard automatically updates DNS records when the server IP changes.
- **Hide for Guests**: When `True`, this server is hidden from guests in the panel.
- **Note**:
  - **Private Note**: Visible only to authenticated users.
  - **Public Note**: Visible to all users and suitable for general information.
  - Users can customize note content as needed. See [Public Note Configuration](#public-note-configuration).
- **Command Line**: Provides WebShell and file list features. Users can remotely run commands, manage files, and upload or download files directly through the Dashboard.

---

## Edit Configuration

Click the gear icon in the action column to edit the Agent configuration for a server.

If you use batch edit, the corresponding Agent configuration is not fetched automatically; you need to fill in the configuration items manually.

After a task is sent to the server successfully, the Agent applies the configuration and reloads the service after 10 seconds.

---

## Batch Move Servers

Administrators can select multiple servers on the server page and transfer them to another user.

Use cases:

- Assign existing servers in a multi-user panel to a new maintainer.
- Migrate accounts or organize resource ownership.
- Transfer servers that were automatically registered under the administrator account to a normal user for maintenance.

After transfer, the target user becomes the owner of these servers. Normal users can only see and manage resources under their own account. Before running a batch move, confirm that the target user has been created and can log in normally.

---

## User Frontend Display

The user frontend homepage displays servers by server group. Server groups come from the Dashboard server group configuration, and the group selected by the user on the homepage is saved in the browser session.

The top of the homepage shows total servers, online count, offline count, total traffic, and real-time inbound/outbound rates. Click the total, online, or offline cards to quickly filter the corresponding status.

The server list supports these sorting modes:

- Default order
- Name
- Uptime
- System type
- CPU
- Memory
- Disk
- Upload rate
- Download rate
- Total upload traffic
- Total download traffic

Except for name sorting, online servers are shown first during sorting. Sort direction can be ascending or descending.

The homepage also provides map, service monitoring panel, and horizontal list layout switches. User choices are saved in browser local storage. You can also force default display through `window.ForceShowMap`, `window.ForceShowServices`, and `window.ForceCardInline` in [Custom Code](/en_US/guide/settings.html#custom-code).

Click a server card to enter the `/server/{id}` detail page. The detail page includes:

- **Details**: Shows CPU, memory, disk, process count, TCP/UDP connection count, inbound/outbound rates, and other metrics, with realtime, 1-day, 7-day, and 30-day charts.
- **Network**: Shows service-monitoring latency charts that this server participates in, with 1-day, 7-day, and 30-day periods and multi-monitor selection.

Historical charts depend on TSDB. When TSDB is not enabled, non-realtime historical periods are locked in the frontend. Guests can only view realtime and 1-day data; 7-day and 30-day data require login.

---

## Online Terminal

The online terminal (WebShell) allows users to remotely access a server command-line interface through the Dashboard. It supports Linux and Windows systems.

- **Shortcut**: Use `Ctrl+Shift+V` to paste commands.
- **Limit**: When `disable-command-execute` is enabled, the online terminal is unavailable.
- **Connection Issues**: If the connection fails, see [WebSocket Connection Failure](/en_US/guide/q4.html).

---

## File List

::: info

This feature only supports \*nix systems.

:::

The file list provides a file-manager-like interface for browsing files and uploading or downloading files in the current directory.
It supports directory navigation, refresh, and copying the current path, making it convenient to use together with the online terminal.

---

## DDNS

After checking the `DDNS` checkbox, you can fill in these two fields:

### DDNS Configuration ID

Add a basic configuration first according to the [DDNS](/en_US/guide/ddns.html) document. After adding it, you can see the corresponding `DDNS Configuration ID` in the panel.

### Override DDNS Domain

This feature lets you reuse a DDNS configuration without copying the token multiple times.

It should be a simple JSON object. Provide key-value pairs where the key is a `DDNS Configuration ID` wrapped in double quotes. The ID specified here must already be specified in the `DDNS Configuration ID` field. The value should be an array of domains. You can provide multiple domains, and this setting overrides the default domains configured in `DDNS Configuration`.

```json
{
  "1": ["sub.example.domain"]
}
```

---

## Public Note Configuration

Nezha Monitor supports setting public notes for servers in the Dashboard. The default user frontend tries to parse public notes as JSON and display supplemental information such as billing, plan, and route data.

`billingDataMod` and `planDataMod` can be filled in together or separately. Public note content is visible to guests; do not put passwords, tokens, real customer data, or other sensitive information in it.

---

### Configuration Example (Default Theme)

Example JSON configuration for public notes:

```json
{
  "billingDataMod": {
    "startDate": "2024-12-08T12:58:17.636Z",
    "endDate": "2024-12-08T12:58:17.636Z",
    "autoRenewal": "1",
    "cycle": "Year",
    "amount": "200EUR"
  },
  "planDataMod": {
    "bandwidth": "30Mbps",
    "trafficVol": "1TB/Month",
    "trafficType": "2",
    "IPv4": "1",
    "IPv6": "1",
    "networkRoute": "4837",
    "extra": "Einstein"
  }
}
```

#### Field Descriptions

1. **Billing information `billingDataMod`**:

   - **`startDate`**: Billing start date in ISO time format.
   - **`endDate`**: Billing end date in ISO time format. If it starts with `0000-00-00`, the frontend displays it as long-term or permanent service.
   - **`autoRenewal`**: Auto-renewal status. `1` means enabled, and the frontend calculates remaining time together with the cycle.
   - **`cycle`**: Billing cycle, such as `Month`, `Year`, or localized month/year labels.
   - **`amount`**: Billing amount and currency. `0` displays as free, `-1` displays as pay-as-you-go, and other values are displayed as written.

2. **Traffic and network configuration `planDataMod`**:
   - **`bandwidth`**: Server bandwidth information.
   - **`trafficVol`**: Traffic quota and cycle.
   - **`trafficType`**: Traffic type field. The current default user frontend parses it but does not directly display it; it can be reserved for custom themes or secondary development.
   - **`IPv4` / `IPv6`**: When the value is `1`, the frontend displays the corresponding IPv4 / IPv6 label.
   - **`networkRoute`**: Network route information, such as `AS4837`. Multiple values can be separated by English commas, and the frontend displays them separately.
   - **`extra`**: Extra note field. Multiple values can be separated by English commas, and the frontend displays them separately.

The current user frontend caches the server's last non-empty public note in browser `sessionStorage`. After modifying or clearing a public note, if the old content is still visible in the current browser session, refresh the page, close and reopen the tab, or clear this site's session storage before checking again.

---

::: tip
**Use a tool for easier configuration**
If you are not familiar with JSON configuration rules, you can use this third-party public note generator to quickly generate a configuration:
[Public Note Generator](https://nezhainfojson.pages.dev/)

Copy the generated JSON into the corresponding public note setting in the Dashboard and save it to display the information on the frontend.
:::
