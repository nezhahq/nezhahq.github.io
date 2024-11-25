# Broker for Nezha - Advancing on more platforms
Contributor: 
+ [uubulb](https://codeberg.org/uubulb)

Broker for Nezha is a modified version of the Nezha Agent that separates data collection from gRPC reporting, enabling small devices to connect to the Nezha Dashboard.

Project link: <https://codeberg.org/uubulb/broker>

Online Documentation: [Broker for Nezha](https://broker.kuzu.uk/)

## Difference from Nezha Agent
- Utilizes external data sources to report to **Nezha Dashboard**.
- Supports configuring multiple sources and connecting to multiple Dashboards.
- Only has limited task support. For details, view the project README.

Broker for Nezha needs to be used with specific data collection software. Currently, it provides two data collection methods:
1. HTTP (HTTP/1.1) - Active polling
2. TCP - Passive collection (recommended to avoid creating redundant connections)

For existing data collection software, refer to the project README. Due to security concerns, it's recommended to use this only in a trusted network.

## Writing a Data Collector
If you need to write your own data collector, you'll need to implement a basic HTTP server or TCP client and use a specific data format that Broker can recognize. For details, see: [Data types](https://broker.kuzu.uk/en/configuration/type/)

## Examples
<figure>
    <img src="/images/case7/dashboard.jpg" alt="Dashboard">
    <figcaption style="font-size: 0.9em; color: gray; text-align: center;">
    Dashboard
    </figcaption>
</figure>
<br />
<figure>
    <img src="/images/case7/webssh.jpg" alt="WebSSH">
    <figcaption style="font-size: 0.9em; color: gray; text-align: center;">
    WebSSH
    </figcaption>
</figure>
