---
outline: deep
---

# Notification Settings

Nezha Monitoring supports monitoring server metrics such as load, CPU, memory, disk, bandwidth, monthly traffic, process count, and connections. Notifications are triggered when user-defined thresholds are reached.

---

## Flexible Notification Methods

- **Message Placeholders**: 
  - `#DATETIME#`: Represents the event timestamp, automatically replaced with the actual time when a notification is triggered.
  - `#NEZHA#`: A placeholder for notification content, replaced with the actual message.

- **Request Body Formats**:
  - For **FORM** requests, use `key:value` pairs, with placeholders in `value` replaced dynamically.
  - For **JSON** requests, strings are replaced before submission to the `URL`.

- **URL Placeholders**: Placeholders in the URL are replaced with corresponding values during the request.

**Refer to the examples below or customize notification methods based on your needs.**

---

### Supported Placeholders

| Placeholder            | Description               |
| ----------------------- | ------------------------- |
| `#NEZHA#`              | Notification content      |
| `#SERVER.NAME#`        | Server name               |
| `#SERVER.IP#`          | Server IP address         |
| `#SERVER.IPV4#`        | Server IPv4 address       |
| `#SERVER.IPV6#`        | Server IPv6 address       |
| `#SERVER.CPU#`         | CPU usage rate            |
| `#SERVER.MEM#`         | Memory usage rate         |
| `#SERVER.SWAP#`        | Swap usage rate           |
| `#SERVER.DISK#`        | Disk usage rate           |
| `#SERVER.NETINSPEED#`  | Real-time inbound speed    |
| `#SERVER.NETOUTSPEED#` | Real-time outbound speed  |
| `#SERVER.TRANSFERIN#`  | Total inbound traffic      |
| `#SERVER.TRANSFEROUT#` | Total outbound traffic    |
| `#SERVER.LOAD1#`       | 1-minute load average     |
| `#SERVER.LOAD5#`       | 5-minute load average     |
| `#SERVER.LOAD15#`      | 15-minute load average    |

---

### Bark Example

<details>
  <summary>Expand/Collapse</summary>

- **Name**: Bark
- **URL Composition**:
  - GET Requests: `/:key/:body`, `/:key/:title/:body`, or `/:key/:category/:title/:body`
  - POST Requests: `/push`
- **Request Method**: GET or POST
- **Request Type**: 
  - GET: Default
  - POST: `form`
- **Body** (POST Example):
  ```json
  {
    "title": "#SERVER.NAME#",
    "device_key": "xxxxxxxxx",
    "body": "#NEZHA#",
    "icon": "https://xxxxxxxx/nz.png"
  }
  ```

</details>

---

### Slack Example (Contributed by [@cantoblanco](https://github.com/cantoblanco))

<details>
  <summary>Expand/Collapse</summary>

#### URL Parameter Setup

1. **Create a Slack App**: Visit [Slack API](https://api.slack.com/apps) and create a new App.
2. **Enable Incoming Webhook**: Add and activate Incoming Webhooks on the App's settings page.
3. **Generate Webhook URL**: Add a new webhook to a workspace, select a channel, and authorize. Copy the generated URL.

**Notification Configuration:**

- **Name**: Slack
- **URL**: `https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX`
- **Request Method**: POST
- **Request Type**: JSON
- **Body**:
  ```json
  {
    "text": "#NEZHA#"
  }
  ```

</details>

---

### Telegram Example (Contributed by [@cantoblanco](https://github.com/cantoblanco))

<details>
  <summary>Expand/Collapse</summary>

#### URL Parameter Setup

1. **Create a Bot**: Use [@BotFather](https://t.me/BotFather) to create a bot and get its token.
2. **Retrieve User ID**: Use [@userinfobot](https://t.me/userinfobot) to find your user ID.
3. **Send a Test Message**: Send a message to your bot to activate communication.

**Notification Configuration:**

- **Name**: Telegram
- **URL**: `https://api.telegram.org/bot<Your_Bot_Token>/sendMessage?chat_id=<Your_User_ID>&text=#NEZHA#`
- **Request Method**: GET
- **Request Type**: Default
- **Body**: None

**Note**: Replace `<Your_Bot_Token>` and `<Your_User_ID>` with actual values.

</details>

---

### Matrix Notification Example

<details>
  <summary>Click to Expand/Collapse</summary>

#### Parameter Description

- **Variable Replacement**: Replace the following variables with actual values:
  - `$YOUR_HOME_SERVER`: Address of your Matrix server.
  - `$YOUR_NEZHA_URL`: URL of your Nezha Dashboard.
  - `$YOUR_MATRIX_USERNAME`: Your Matrix username.
  - `$YOUR_MATRIX_PASSWD`: Your Matrix password.
  - `$YOUR_MATRIX_TOKEN`: Matrix access token.
  - `$ROOM_ID`: ID of the Matrix room where notifications will be sent.

---

#### Retrieve Access Token

Use the following command to obtain `YOUR_MATRIX_TOKEN`:

```bash
curl -XPOST -d '{"type": "m.login.password", "identifier": {"user": "$YOUR_MATRIX_USERNAME", "type": "m.id.user"}, "password": "$YOUR_MATRIX_PASSWD"}' "https://$YOUR_HOME_SERVER/_matrix/client/r0/login"
```

---

#### Notification Configuration

- **Name**: Matrix
- **URL**: `https://$YOUR_HOME_SERVER/_matrix/client/r0/rooms/$ROOM_ID/send/m.room.message`
- **Request Method**: `POST`
- **Request Type**: `JSON`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer $YOUR_MATRIX_TOKEN"
  }
  ```
- **Body**:
  ```json
  {
    "msgtype": "m.text",
    "format": "org.matrix.custom.html",
    "formatted_body": "<h1><a href=\"$YOUR_NEZHA_URL\" target=\"_blank\">Nezha Dashboard</a></h1><ul><li>Time: #DATETIME#</li><li>Message: #NEZHA#</li></ul>",
    "body": "#NEZHA#"
  }
  ```

---

### Steps to Use

1. **Replace Variables**: Replace all `$` prefixed variables with your actual values.
2. **Obtain Token**: Use the command above to retrieve `YOUR_MATRIX_TOKEN`.
3. **Configure Request**: Fill in the URL, Headers, and Body as described.
4. **Send Notifications**: The configured notification will be sent to the specified Matrix room.

</details>

---

# Alert Rule Configuration

**Before configuring alert rules, set up notification methods and group them into notification groups. Alert rules send notifications at the group level.**

---

### Basic Rules

- **`type`**: Select one or more types. All selected types **must be satisfied** to trigger a notification.
  - **Resource Types**: `cpu`, `gpu`, `memory`, `swap`, `disk`
  - **Network Types**: `net_in_speed`, `net_out_speed`, `net_all_speed`, `transfer_in`, `transfer_out`, `transfer_all`
  - **System Types**: `offline`, `load1`, `load5`, `load15`, `process_count`
  - **Connection Counts**: `tcp_conn_count`, `udp_conn_count`
  - **Temperature**: `temperature_max` (maximum temperature)
- **`duration`**: Duration in seconds. Alerts are triggered if the condition persists for this duration with at least 30% of the data satisfying the threshold.
- **`min` / `max`**:
  - Bandwidth and traffic are measured in bytes (1KB = 1024B, 1MB = 1024\*1024B).
  - Memory, disk, and CPU usage are measured as percentages (0-100).
  - Offline monitoring does not require these fields.
- **`cover`**:
  - `0`: Monitor all servers, exclude specific ones with `ignore`.
  - `1`: Ignore all servers, include specific ones with `ignore`.
- **`ignore`**: Specifies servers to exclude or include for monitoring, in the format `{ServerID: true/false}`.

---

### Examples

#### Offline Notification

- **Name**: Offline Alert
- **Rule**:
  ```json
  [{"Type": "offline", "Duration": 10}]
  ```
- **Enabled**: √

#### CPU and Memory Monitoring

- **Name**: CPU + Memory Alert
- **Rule**:
  ```json
  [
    {"Type": "cpu", "Min": 0, "Max": 50, "Duration": 10},
    {"Type": "memory", "Min": 20, "Max": 0, "Duration": 20}
  ]
  ```
- **Enabled**: √

#### Specific Server Notifications to Groups

**Scenario**: Notify group A when servers 1 and 2 are offline for 10 minutes. Notify group B for servers 3 and 4.

- **Rule for Group A**:
  - **Name**: Alert for 1, 2
  - **Rule**:
    ```json
    [{"Type": "offline", "Duration": 600, "Cover": 1, "Ignore": {"1": true, "2": true}}]
    ```
  - **Notification Group**: A
  - **Enabled**: √

- **Rule for Group B**:
  - **Name**: Alert for 3, 4
  - **Rule**:
    ```json
    [{"Type": "offline", "Duration": 600, "Cover": 1, "Ignore": {"3": true, "4": true}}]
    ```
  - **Notification Group**: B
  - **Enabled**: √

---

### Special Rules: Periodic Traffic Alerts

Useful for monitoring monthly traffic.

- **`type`**:
  - `transfer_in_cycle`: Periodic inbound traffic.
  - `transfer_out_cycle`: Periodic outbound traffic.
  - `transfer_all_cycle`: Combined inbound and outbound traffic.
- **`cycle_start`**: Start date of the cycle (RFC3339 format, e.g., `2022-01-01T00:00:00+08:00`).
- **`cycle_interval`**: Cycle interval in units (e.g., 1 month).
- **`cycle_unit`**: Unit of the cycle (`hour`, `day`, `week`, `month`, `year`).
- **`min` / `max`, `cover`, `ignore`**: Same as basic rules.

---

#### Example: Monthly Traffic Alert

- **Rule**:
  ```json
  [
    {
      "Type": "transfer_out_cycle",
      "Max": 1099511627776,
      "Cycle_start": "2022-01-01T00:00:00+08:00",
      "Cycle_interval": 1,
      "Cycle_unit": "month",
      "Cover": 1,
      "Ignore": {"3": true, "4": true}
    }
  ]
  ```
- **Explanation**: Sends an alert when the outbound traffic of servers 3 and 4 exceeds 1TB in a monthly cycle starting on the 1st.

---

### Notification Trigger Modes

- **Always**: Sends notifications whenever the Agent reports a state satisfying the alert rule.
- **Once**: Sends notifications only when the state changes (e.g., normal to abnormal, or abnormal to normal).

---

### Execute Tasks on Notification

To execute tasks when a notification is triggered:

- **Always Execute**: Executes the specified task when the state changes from "normal" to "alert".
- **Execute Once**: Executes the specified task when the state changes from "alert" to "normal".
