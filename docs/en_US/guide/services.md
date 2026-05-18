---
outline: deep
---

# Service Monitoring

**The service area is used to configure Agents to monitor external websites or servers.**
After setting up service monitors, you can click the **`Services`** icon on the homepage to view availability monitoring results from the past 30 days.

---

## How to Use

### Add a New Service Monitor

To add a new service monitor, follow these steps:
1. **Open the admin frontend**
   Go to the **`Services`** page and click the **`+`** button to add a new service monitor.

2. **Configure parameters**
   Set the following parameters when adding the monitor:
   - **Name**: A custom name for this service.
   - **Target**: Set the target according to the monitor type:
     - `HTTP GET`: Enter the full URL, including `http://` or `https://`, for example: `https://example.com`.
       **Note**: If the target URL uses `https://`, Nezha Monitor also monitors the SSL certificate of that URL. Certificate expiration or changes will trigger notifications.
     - `ICMP Ping`: Enter a domain name or IP address without a port, for example: `1.1.1.1` or `example.com`.
     - `TCPing`: Enter a domain name or IP address with a port, for example: `1.1.1.1:80` or `example.com:22`.
   - **Type**: Select the monitor type: `HTTP GET`, `ICMP Ping`, or `TCPing`.
   - **Show in Services**: Whether to show this monitor to guests. This is a privacy option.
   - **Interval**: Monitoring interval in seconds.
   - **Sort**: Display order for service monitors. Higher values are shown first.
   - **Cover**: Select a rule to decide which Agents request the target.
   - **Specific Servers**: Specify Agents within the selected cover rule.
   - **Notification Group ID**: Select notification methods configured on the **`Notifications`** page. See [Notification Method Configuration](/en_US/guide/notifications.html#flexible-notification-methods).
   - **Enable Failure Notification**: Optionally receive notifications when the target fails. Disabled by default.

3. **Submit the monitor**
   Click **`Submit`** to save the configuration, then wait a moment and return to the homepage to view monitoring results.

---

## Delay Change Notifications

Nezha Monitor collects and monitors latency between Agents and target servers. When latency changes significantly, it can send notifications to help monitor route status.

- **Enable Delay Notification**: After enabling this option, notifications are sent when latency exceeds the configured range, either higher than `Maximum Latency` or lower than `Minimum Latency`.

---

## Trigger Tasks on Notification

If you need to run a specific task when a service monitor triggers a notification:
1. Check **`Enable Trigger Task`**.
2. Configure:
   - **Task triggered by alert**: Select the task to run when the alert is triggered.
   - **Task triggered after recovery**: Select the task to run after the service recovers.

Set up the task configuration on the Tasks page before using this feature.

---

## Network Latency Charts

For `TCPing` and `ICMP-Ping` monitors, the Dashboard automatically generates network latency charts:
- Open the corresponding server detail page and switch to the **`Network`** tab.
- View historical network latency trends based on real-time latency statistics from the Agent to the target server.
- You can select 1 day, 7 days, or 30 days. Guests can only view 1 day of data; 7-day and 30-day data require login.
- If the same server participates in multiple monitors, you can select multiple monitors for comparison. When only one monitor is selected, the chart shows both latency and packet loss.
- Network charts support peak clipping to reduce the impact of sudden spikes on chart readability. You can enable it by default in frontend custom code with `window.ForcePeakCutEnabled = true`.

---

## User Frontend Display

The service monitoring panel on the user frontend homepage displays public services' availability and latency overview for the past 30 days. Users can click the service button on the homepage to expand or collapse this panel, or set `window.ForceShowServices = true` in [Custom Code](/en_US/guide/settings.html#custom-code) to expand it by default.

If the server returns cycle traffic statistics, the homepage service panel also displays cycle traffic cards. Service monitors are displayed by the **Sort** field in their configuration; higher values are shown first.

When there is no service data to display, the user frontend shows an empty-state message. This usually means service monitoring has not been enabled, services are not set to public display, or the currently selected server group has no related service monitoring data.

---

## Manage Monitors

To edit or delete an existing service monitor:
1. Open the **`Services`** page in the admin frontend.
2. Find the target monitor configuration.
3. Click the edit or delete icon on the right to modify or remove it.
