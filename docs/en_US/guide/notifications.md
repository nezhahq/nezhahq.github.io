---
outline: deep
---

# Notification Configuration

Nezha Monitoring supports monitoring server load, CPU, memory, disk, traffic, monthly traffic, process count, and connection count, and sending notifications when user-defined thresholds are reached.

## Flexible Notification Methods

- In Dashboard messages, the placeholder `#DATETIME#` represents the timestamp of the event. When the notification is triggered, the Dashboard automatically replaces `#DATETIME#` with the actual event time.
- `#NEZHA#` is a placeholder for Dashboard messages, and the Dashboard automatically replaces the placeholder with the actual message when the notification is triggered.
- The body content is in `JSON` format: **When the request type is FORM**, the value is in `key:value` form, and placeholders can be placed inside `value`. The placeholders will be automatically replaced during notification. **When the request type is JSON**, only simple string replacement is performed before being submitted to the `URL`.
- Placeholders can also be placed inside the URL, and simple string replacement will be performed during the request.

**Refer to the following notification method examples, and you can also flexibly set the push method according to your needs.**

### Bark Example
<details>
  <summary>Click to expand/collapse</summary>

- Name: Bark
- URL structure: /:key/:body or /:key/:title/:body or /:key/:category/:title/:body
- Request Method: GET
- Request Type: Default
- Body: Empty

- Name: Bark
- URL structure: /push
- Request Method: POST
- Request Type: form
- Body: `{"title": "#SERVER.NAME#","device_key":"xxxxxxxxx","body":"#NEZHA#","icon":"https://xxxxxxxx/nz.png"}`

</details>

### Slack Example Contributor: [@白歌](https://github.com/cantoblanco)
<details>
  <summary>Click to expand/collapse</summary>

#### URL Parameter Acquisition Instructions

Prepare your Slack Workspace in advance and create an App for this Workspace. If you have not created one, you can create an App at [Slack API](https://api.slack.com/apps).

After creating the App, you need to add an Incoming Webhook to the App. In the App's settings page, find Incoming Webhooks, enable Activate Incoming Webhooks, and at the bottom of the page, find and click Add New Webhook to Workspace, choose a Channel, and click Allow. After creating, you will get a Webhook URL, which you will use to replace the example URL below.

- Name: Slack
- URL: https://hooks.slack.com/services/xxxxxxxxx/xxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxx
- Request Method: POST
- Request Type: JSON
- Body: `{"text":"#NEZHA#"}`

</details>

### Telegram Example Contributor: [@白歌](https://github.com/cantoblanco)
<details>
  <summary>Click to expand/collapse</summary>

#### URL Parameter Acquisition Instructions

Create a bot in Telegram and get the bot's token and your Telegram user ID.

The token and user ID are alphanumeric strings. You can get your user ID by chatting with @userinfobot on Telegram. Create a bot by chatting with @BotFather, and you will get the bot's token.

Replace botXXXXXX with your bot token and YYYYYY with your user ID in the URL below. Note that you need to chat with the bot first, otherwise the bot cannot send messages to you.

- Name: Telegram
- URL: https://api.telegram.org/botXXXXXX/sendMessage?chat_id=YYYYYY&text=#NEZHA#
- Request Method: GET
- Request Type: Default
- Body: Empty

</details>


### Email Notification Example - Outlook Contributor: [@白歌](https://github.com/cantoblanco)
<details>
  <summary>Click to expand/collapse</summary>

**Note: SendCloud has a daily free email sending limit. This is just an example. You can choose a paid service or other similar free services. The usage method is similar.**

#### URL Parameter Acquisition Instructions

This example uses SendCloud as the email service. You need to register an account on [SendCloud](https://www.sendcloud.net/), create a sender email, and then obtain the APIUSER and APIKEY [here](https://www.sendcloud.net/sendSetting/apiuser).

Replace `<replaceAPIUSER>` and `<replaceAPIKEY>` in the example URL below with your APIUSER and APIKEY, and replace `<customSenderEmail>` and `<customRecipientEmail>` with any sender and recipient email addresses.

- Name: MS Mail Notification
- URL：https://graph.microsoft.com/v1.0/me/microsoft.graph.sendMail
- Request method: POST
- Request type: JSON
- Header: `{"Content-type":"application/json",
            "Authorization":"Bearer {Token}"}`
- Body:
    ```json
    {
      "message": {
          "subject": "Server Status Notification",
          "body": {
          "contentType": "Text",
          "content": "#NEZHA#"
          },
          "toRecipients": [
            {
              "emailAddress": {
                  "address": "ADDRESS FOR RECEVING EMAILS"
                  }
            }
          ]
      }
    } 
    ```

</details>

### DingTalk Group Bot Configuration Example
<details>
  <summary>Click to expand/collapse</summary>

#### URL Parameter Acquisition Instructions

Create a bot in DingTalk in advance and get the bot's token.

The bot URL is obtained after creating a bot in the DingTalk group - Manage Bot - Create Bot. Choose custom keywords for the security method, and the Body content value must contain these keywords.

- Name: Nezha Assistant
- URL: https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxxxxx
- Request Method: POST
- Request Type: JSON
- Header: `{"Content-Type": "application/json"}`
- Body: `{"msgtype": "text","text": {"content":"Nezha Probe:\n#NEZHA#"}}`

</details>

### WeChat Work Group Bot Example Contributor: [@ChowRex](https://github.com/ChowRex)
<details>
  <summary>Click to expand/collapse</summary>

Supported placeholders list

```json
{
    "content": "#NEZHA#",
    "ServerName": "#SERVER.NAME#",
    "ServerIP": "#SERVER.IP#",
    "ServerIPV4": "#SERVER.IPV4#",
    "ServerIPV6": "#SERVER.IPV6#",
    "CPU": "#SERVER.CPU#",
    "MEM": "#SERVER.MEM#",
    "SWAP": "#SERVER.SWAP#",
    "DISK": "#SERVER.DISK#",
    "NetInSpeed": "#SERVER.NETINSPEED#",
    "NetOutSpeed": "#SERVER.NETOUTSPEED#",
    "TransferIn": "#SERVER.TRANSFERIN#",
    "TranferOut": "#SERVER.TRANSFEROUT#",
    "Load1": "#SERVER.LOAD1#",
    "Load5": "#SERVER.LOAD5#",
    "Load15": "#SERVER.LOAD15#",
    "TCP_CONN_COUNT": "#SERVER.TCPCONNCOUNT",  # invalid
    "UDP_CONN_COUNT": "#SERVER.UDPCONNCOUNT",  # invalid
}
```

> This document is **NOT** available in English.
> 
> [Group Bot Configuration Instructions - Document - WeChat Work Developer Center](https://developer.work.weixin.qq.com/document/path/91770#markdown%E7%B1%BB%E5%9E%8B)

- Name: WeChat Work Group Bot
- URL: https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_BOT_KEY
- Request Method: POST
- Request Type: JSON
- Body: 
    ```json
    {
        "msgtype": "markdown",
        "markdown": {
            "content": "# Nezha Notification\n\n\"#NEZHA#\"\n\n> Name: \"#SERVER.NAME#\"\n> IP: \"#SERVER.IP#\"\n> IPv4: \"#SERVER.IPV4#\"\nIPv6: \"#SERVER.IPV6#\"\n> CPU: \"#SERVER.CPU#\"\n> Memory: \"#SERVER.MEM#\"\n> Swap: \"#SERVER.SWAP#\"\n> Disk: \"#SERVER.DISK#\"\n> Upload Speed: \"#SERVER.NETINSPEED#\"\n> Download Speed: \"#SERVER.NETOUTSPEED#\"\n> Total Upload: \"#SERVER.TRANSFERIN#\"\n> Total Download: \"#SERVER.TRANSFEROUT#\"\n> Load1: \"#SERVER.LOAD1#\"\n> Load5: \"#SERVER.LOAD5#\"\n> Load15: \"#SERVER.LOAD15#\"\n> TCP Connection Count: \"#SERVER.TCPCONNCOUNT\"\n> UDP Connection Count: \"#SERVER.UDPCONNCOUNT\"\n\n"
        }
    }
    ```

You can remove or add relevant information as needed.

</details>

## Notification Rule Explanation

### Basic Rules

- `type`: You can choose one or more types. If multiple types are selected in one rule, **all selected types must be satisfied** to trigger a notification (refer to the examples below)
  - `cpu`, `memory`, `swap`, `disk`
  - `net_in_speed` inbound network speed, `net_out_speed` outbound network speed, `net_all_speed` total network speed, `transfer_in` inbound traffic, `transfer_out` outbound traffic, `transfer_all` total traffic
  - `offline` offline monitoring
  - `load1`, `load5`, `load15` load
  - `process_count` process count (currently resource-intensive due to thread count, not supported temporarily)
  - `tcp_conn_count`, `udp_conn_count` connection count
- `duration`: Duration in seconds. An notification is triggered if 30% or more of the samples exceed the threshold within this duration (to prevent data spikes).
- `min` or `max`:
  - For traffic and network speed, the unit is bytes (1KB = 1024B, 1MB = 1024 * 1024B)
  - For memory, disk, and CPU, the unit is percentage
  - No need to set this for offline monitoring
- `cover`: 
  - `0` monitors all servers, use `ignore` to exclude specific servers
  - `1` ignores all servers, use `ignore` to monitor specific servers  
  Example: `[{"type":"offline","duration":10, "cover":0, "ignore":{"5": true}}]`
- `ignore`: Select specific servers to exclude, used with `cover`, content is server ID and boolean value, e.g., `{"1": true, "2": false}`

**Complete Examples:**  

Add an offline notification:

- Name: Offline Notification
- Rule: `[{"Type":"offline","Duration":10}]`
- Enabled: √

Add an notification for CPU usage exceeding 50% for 10 seconds **and** memory usage below 20% for 20 seconds:

- Name: CPU+Memory
- Rule: `[{"Type":"cpu","Min":0,"Max":50,"Duration":10},{"Type":"memory","Min":20,"Max":0,"Duration":20}]`
- Enabled: √

Send notifications for specific servers to specific notification groups:

Scenario example:  
There are 4 servers (1, 2, 3, 4) and two notification groups (A, B).  
Notify group A if servers 1 and 2 are offline for 10 minutes.  
Notify group B if servers 3 and 4 are offline for 10 minutes.

First, set up notification groups A and B, then add two notification rules:

**Rule 1:**

- Name: 1, 2 Offline, Send to Notification Group A
- Rule: `[{"type":"offline","duration":600,"cover":1,"ignore":{"1":true,"2":true}}]`
- Notification Group: A
- Enabled: √

**Rule 2:**

- Name: 3, 4 Offline, Send to Notification Group B
- Rule: `[{"type":"offline","duration":600,"cover":1,"ignore":{"3":true,"4":true}}]`
- Notification Group: B
- Enabled: √

**Flexibly using parameters can make your notification function fully utilized**

### Special: Any Cycle Traffic notification

Can be used for monthly traffic monitoring

- `type`:
  - `transfer_in_cycle` inbound traffic during the cycle
  - `transfer_out_cycle` outbound traffic during the cycle
  - `transfer_all_cycle` total traffic during the cycle
- `cycle_start`: The start date of the statistical cycle (can be the start date of your server billing cycle). The time format is RFC3339, e.g., Beijing time is `2022-01-11T08:00:00.00+08:00`
- `cycle_interval`: The number of statistical cycle units (e.g., if the cycle unit is days, and this value is 7, it means statistics are collected every 7 days)
- `cycle_unit`: Statistical cycle unit, default is `hour`, optional (`hour`, `day`, `week`, `month`, `year`)
- `min/max`, `cover`, `ignore` refer to basic rule configuration

Example:  

For servers with IDs 3 and 4 (defined in ignore), if the monthly outbound traffic exceeds 1TB starting from the 1st of each month, send an notification:

```json
[{"type":"transfer_out_cycle","max":1099511627776,"cycle_start":"2022-01-01T00:00:00+08:00","cycle_interval":1,"cycle_unit":"month","cover":1,"ignore":{"3":true,"4":true}}]
```

## Notification Trigger Modes

- **Always Trigger**: A notification is triggered every time the Agent reports a status that matches the notification rule.
- **Single Trigger**: A notification is triggered only once when the status changes, such as from normal to abnormal or from abnormal to normal.

## Set Tasks to Execute on notifications

If you need to execute a task while sending an notification message, you can set this item.

- **Task on Notification**: The task to be executed when the notification status changes from "normal" to "event". The task should be set in the tasks page in advance.
- **Task on Recovery**: The task to be executed when the notification status changes from "event" to "normal". The task should be set in the tasks page in advance.