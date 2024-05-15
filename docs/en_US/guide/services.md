---
outline: deep
---

# Service Monitoring

**The Services section is where you set up monitoring for external websites or servers using Agents.**  
**Configured service monitors can be viewed on the "Services" page of the homepage, displaying the availability monitoring results for the past 30 days.**

## How to Use

To add a new monitor, go to the "Services" page in the Admin Panel and click "Add Monitor."

When adding a new service monitor, you need to set the following parameters:

- **Name**: Customize a name.

- **Type**: Select a monitor type. Nezha Monitoring currently supports three types: "HTTP-GET," "ICMP-Ping," and "TCP-Ping."

- **Target**: Depending on the type you choose, the method for setting the target differs:
  - `HTTP-GET`: For this type, you should enter a URL as the target, including `http://` or `https://`. **If your target URL is `https://`, the SSL certificate of that URL will also be monitored. Notifications will be triggered when the SSL certificate expires or changes.** Example: https://example.com.
  - `ICMP-Ping`: For this type, you should enter a domain name or IP without a port number. Example: 1.1.1.1 or example.com.
  - `TCP-Ping`: For this type, you should enter a domain name or IP with a port number. Example: 1.1.1.1:80 or example.com:22.

- **Request Interval**: Set the interval in seconds at which the Agent requests the target.

- **Coverage**: Select a rule to determine which Agents will request the target.

- **Specific Servers**: Used in conjunction with the coverage scope, select Agents within the rule to exclude.

- **Notification Group**: Choose the notification methods you have already set up on the "Notification" page. [Click here](/en_US/guide/notifications.html#flexible-notification-methods) for more details.

- **Enable Fault Notification**: Choose whether to receive fault notifications for the target as needed. The default is unchecked.

After setting it up, click "Add." Wait a moment and go to the "Services" page on the homepage to view the monitoring results.

## Latency Change Notification

Nezha Monitoring can monitor and record the latency between the Agent and the target server, sending notifications when there are significant changes. This feature helps you monitor if the server's network route has changed.

- **Enable Latency Notifications**: When enabled, Notification will be sent if the latency from the Agent to the target server is greater than the `Maximum Latency` or less than the `Minimum Latency`.

## Trigger Tasks on Notification

If you need to execute tasks when service monitoring Notification are triggered, you can check "Enable Trigger Tasks" and select the pre-configured trigger tasks in "Task on Notification" and "Task on Recovery."

## Network Latency Chart

The TCP-Ping and ICMP-Ping monitoring types set in the Services page will automatically enable the monitoring chart feature. On the "Network" page of the homepage, you can view historical network latency charts. The data in the charts is based on the latency from the Agent to the target server. You can click the Agent's name to toggle the chart display. In the chart, you can uncheck the target server's name to hide or show the corresponding data.

## Managing Monitors

To manage existing service monitors, go to the "Services" page in the Admin Panel. Select a monitor configuration and click the icons on the right to edit or delete it.