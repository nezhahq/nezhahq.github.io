---
outline: deep
---

# Servers

## Overview

The **Servers** section is responsible for managing Agents, serving as the core foundation for Nezha monitoring and enabling additional functionalities.

---

## Installation Commands

Refer to the [Agent Installation Guide](/en_US/guide/agent.html).  
The recommended approach is **one-click installation**:

1. Configure the necessary parameters.
2. Navigate to the servers page in the Dashboard and click the `Installation Command` icon.
3. Copy the generated installation command and run it on the target server to complete the setup.

---

## Forced Updates

Agent update behavior is controlled by the following parameters:

- `disable-auto-update`: Disables automatic updates.
- `disable-force-update`: Disables forced updates.

### Default Behavior

By default, the Agent updates automatically without manual intervention.

### Manual Forced Updates

If automatic updates are disabled, you can manually update the Agent by selecting the target server and executing a **forced update**.  
**Note**: If the `disable-force-update` parameter is enabled, forced updates will not work.

---

## Data Column Descriptions

The servers page in the Dashboard displays the following fields:

- **Version**: Displays the current Agent version.
- **Enable DDNS**: `True` indicates that the Dashboard will automatically update DNS records if the server's IP changes.
- **Hidden from Guests**: `True` hides the server from guest users in the Dashboard.
- **Note**:
  - **Private Note**: Visible only to authenticated users.
  - **Public Note**: Visible to all users, suitable for displaying general information.
  - Users can customize note based on their needs. Refer to [Public Note Configuration](#public-note-configuration) for details.
- **Command Line**: Provides access to WebShell and the Pseudo File Manager. Users can remotely execute commands, manage files, and upload/download files directly through the Dashboard.

---

## WebShell

The WebShell feature allows users to remotely access the server's command-line interface through the Dashboard. It supports both Linux and Windows systems.

- **Quick Commands**: Use `Ctrl+Shift+V` to paste commands.
- **Restrictions**: If the `disable-command-execute` parameter is enabled, the WebShell feature will be disabled.
- **Connection Issues**: If you encounter connection problems, refer to the [WebSocket Connection Issues Guide](/en_US/guide/q4.html) for troubleshooting.

---

## Edit Configuration

You can edit Agent configurations online by clicking the cog icon in the Action column.

If you edit configurations in batch, no existing configuration will be fetched, and you must manually fill in every field.

Agent will apply the new configuration and reload after 10 seconds.

---

## Pseudo File Manager

::: info

Only support \*nix systems.

:::

Provides a file manager-like interface, allowing you to browse files and download or upload files to the current directory.

Supports **Refresh**, **Go to**, and **Copy path** features to integrate seamlessly with the **WebShell**.

---

## DDNS

After checking the `DDNS` check box, you can fill in the following two fields:

### DDNS configuration ID

Please refer to the [DDNS](/guide/ddns.html) document to add a basic configuration first, after adding you can see the corresponding `DDNS configuration ID` in the panel.

### Override DDNS domain

You can use this feature to reuse DDNS configuration files without having to copy the Token multiple times.

This should be a simple JSON object, you should provide a set of key-value pairs, where the key is the `DDNS configuration ID` wrapped in double quotes, the ID specified here must be specified in the `DDNS configuration ID` field, and the value should be an array of domain names. You can provide more than one domain name, and the Settings here will override the default domain name you set in the DDNS Configuration.

```json
{
  "1": ["sub.example.domain"]
}
```

---

## Public Note Configuration

Nezha supports configuring custom public information in the Dashboard for frontend customization.

---

### Configuration Example (default theme)

Below is a JSON configuration example for public note:

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

1. **Billing Information (`billingDataMod`)**:

   - **`startDate`**: Start date of the billing period (ISO format).
   - **`endDate`**: End date of the billing period (ISO format).
   - **`autoRenewal`**: Automatic renewal status, `1` for enabled.
   - **`cycle`**: Billing cycle (e.g., `Month`, `Year`).
   - **`amount`**: Billing amount and currency.

2. **Traffic and Network Configuration (`planDataMod`)**:
   - **`bandwidth`**: Server bandwidth information.
   - **`trafficVol`**: Traffic quota and cycle.
   - **`trafficType`**: Traffic type, `1` for inbound only, `2` for both inbound and outbound.
   - **`IPv4` / `IPv6`**: Number of supported IPv4 or IPv6 addresses.
   - **`networkRoute`**: Network route information (e.g., AS4837).
   - **`extra`**: Additional remarks for custom information.

---

::: tip
**Use Tools for Easy Configuration**  
If you're unfamiliar with JSON configuration, you can use a third-party generator to quickly create public notes:  
[Public Note Generator](https://nezhainfojson.pages.dev/)

Copy the generated JSON into the corresponding public note section in the Dashboard and save the changes to display the information on the Dashboard front end.
:::
