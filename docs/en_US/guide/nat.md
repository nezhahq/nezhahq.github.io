---
outline: deep
---
# NAT Traversal Configuration

Nezha Server Monitoring includes built-in NAT traversal capabilities, allowing users to expose internal services running on an Agent (such as home OpenWrt routers or NAS devices) to the public internet. This functionality facilitates remote access and is currently limited to supporting HTTP protocol traversal.

## Preparation

Prior to configuring NAT traversal, please ensure the following preparatory steps are completed:

- Verify that the Nezha Monitoring Agent is installed and actively running on your device and maintains a stable connection with the Dashboard.
- Acquire a public domain name, ideally using a subdomain configuration, such as `service-1.example.com`. Point this domain name to the public IP address of your Dashboard server.
- It is important to note that each domain name can only map to the service of one Agent. For mapping services from multiple Agents, distinct domain names should be used, such as `service-2.example.com`.

::: warning
If your Dashboard server uses tools like the aaPanel or similar management platforms, ensure that your domain (e.g., `service-1.example.com`) is correctly linked to the Dashboard site within these tools to avoid access issues.
:::

## NAT Traversal Configuration Steps

1. Log into the Dashboard Admin Panel and navigate to the "NAT Traversal" section in the menu.
2. Click the "Add" button and provide the following required details:
   - **Name**: Assign a custom name to this traversal setup, for example, `OpenWrt Login Page`.
   - **Agent ID**: Input the ID of the Agent for which traversal is needed.
   - **Internal Service Address**: Specify the internal service address that requires traversal, in the `IP:port` format, such as `127.0.0.1:80`.
   - **Domain Name**: Enter the previously configured public domain name, like `service-1.example.com`.
3. After filling in the details, click the "Add" button and wait for the traversal setup to activate.
4. Test the configuration by accessing `http://service-1.example.com` to ensure the internal service on the Agent is successfully accessible.

## Usage Notes

- Continuous connectivity between the Agent and the Dashboard is crucial for the NAT traversal functionality to operate correctly. If the connection to the Agent is lost, the traversal setup will temporarily cease to function.
- Given that the NAT traversal does not encrypt traffic by itself, it is recommended to secure data transmissions by employing HTTPS protocol between the Agent and the Dashboard, as well as between the Dashboard and the client browser, to ensure data security during transmission.