---
outline: deep
---

# NAT Traversal Configuration

Nezha Monitoring provides a built-in NAT traversal feature that allows users to expose internal services (e.g., home OpenWrt routers, NAS devices) running on the Agent to the public network via the Dashboard. Currently, only plaintext HTTP tunneling is supported.

---

## Prerequisites

Before configuring NAT traversal, ensure the following:

1. **Install and Run the Agent**  
   The target device must have the Nezha Agent correctly installed and running, with an active connection to the Dashboard.

2. **Prepare a Public Domain Name**  
   Use subdomains such as `service-1.example.com` and ensure they point to the public IP of the Dashboard server.

3. **One-to-One Mapping**  
   Each domain can map to only one internal service. For multiple services, use separate domains, such as `service-2.example.com`.

::: warning  
If using control panels like AApanel or other management tools, ensure the domain (e.g., `service-1.example.com`) is properly configured to point to the Dashboard service. Otherwise, access may fail.  
:::

---

## Configuration Steps

1. **Access the Dashboard Admin Panel**  
   Navigate to the **NAT Traversal** section in the menu.

2. **Add a Tunnel Configuration**  
   Click the **Add** button and provide the following details:
   - **Name**: A custom name for the tunnel, such as `OpenWrt Login Page`.
   - **Server ID**: The target Agent's ID.
   - **Local Service**: The internal service address to expose, in the format `IP:port` (e.g., `127.0.0.1:80`).
   - **Bound Domain**: The public domain name (e.g., `service-1.example.com`). If the Dashboard uses a non-standard port (e.g., `8008`), include the port in the configuration.

3. **Save the Configuration**  
   Click **Add** to save the configuration. Wait for the tunnel to become active.

4. **Verify the Tunnel**  
   Access `http://service-1.example.com` in a browser to confirm the internal service is successfully exposed.

---

## Important Notes

1. **Maintain Connection**  
   The Agent's connection to the Dashboard is essential for the NAT traversal feature. If the connection is interrupted, the tunnel will become temporarily unavailable.

2. **Security Considerations**  
   - The tunnel transmits data over plaintext HTTP without encryption.  
   - It is strongly recommended to enable TLS/SSL for:
     - **Communication between the Agent and Dashboard**.
     - **Connections between the Dashboard and external clients**.

---
