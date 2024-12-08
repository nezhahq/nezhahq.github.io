---
outline: deep
---

# Service Monitoring

**The Service section is where you configure Agents to monitor external websites or servers.**  
Once a service monitor is set up, you can view the availability results from the past 30 days by clicking the **`Service`** icon on the homepage.

---

## How to Use

### Add a New Service Monitor

Follow these steps to add a new service monitor:

1. **Access the Admin Panel**  
   Go to the **`Services`** page and click the **`+`** button to add a new service monitor.

2. **Configure Parameters**  
   When adding a monitor, fill in the following details:
   - **Name**: Give the service a custom name.
   - **Target**: Set the target based on the monitoring type:
     - `HTTP GET`: Enter a complete URL (including `http://` or `https://`), e.g., `https://example.com`.  
       **Note**: If the target URL uses `https://`, Nezha Monitoring will also monitor its SSL certificate. Notifications will be triggered for certificate expiration or changes.
     - `ICMP Ping`: Enter a domain or IP address (without a port number), e.g., `1.1.1.1` or `example.com`.
     - `TCP Ping`: Enter a domain or IP address with a port number, e.g., `1.1.1.1:80` or `example.com:22`.
   - **Type**: Choose the monitoring type (`HTTP GET`, `ICMP Ping`, or `TCP Ping`).
   - **Display in Services**: Choose whether this monitor is visible to guest users (privacy option).
   - **Interval**: Set the monitoring interval (in seconds).
   - **Coverage Scope**: Select a rule to determine which Agents will request the target.
   - **Specific Servers**: Specify which Agents within the coverage scope will perform the monitoring.
   - **Notification Group ID**: Choose a pre-configured notification method from the **`Notifications`** page. See [Notification Configuration](/guide/notifications.html#flexible-notification-methods) for details.
   - **Enable Failure Notification**: Optionally enable notifications for target failures (disabled by default).

3. **Submit the Monitor**  
   Click the **`Submit`** button to save the configuration. Wait a few moments, then check the homepage for monitoring results.

---

## Delay Change Notifications

Nezha Monitoring tracks and records the latency between Agents and target servers. When significant latency changes occur, notifications can be sent to help monitor network conditions.

- **Enable Delay Notification**: Once enabled, notifications will be sent when latency exceeds the specified range (`Max Latency` or `Min Latency`).

---

## Trigger Tasks on Notifications

To execute specific tasks when a service monitor triggers a notification:

1. Check the **`Enable Trigger Tasks`** option.
2. Configure:
   - **Tasks on Alarm Trigger**: Select the task to execute when an alarm is triggered.
   - **Tasks on Recovery**: Select the task to execute when the service returns to normal.

Tasks must be pre-configured in the **`Tasks`** page before using this feature.

---

## Network Latency Charts

For `TCP-Ping` and `ICMP-Ping` monitoring types, the Dashboard automatically generates network latency charts:
- Open the details page of the target server and switch to the **`Network`** tab.
- View historical network latency trends. Data is based on real-time latency statistics between the Agent and the target server.

---

## Manage Monitors

To edit or delete an existing service monitor:
1. Go to the **`Services`** page in the management panel.
2. Locate the desired monitor configuration.
3. Click the edit or delete icon on the right to modify or remove the monitor.