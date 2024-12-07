---
outline: deep
---

# Dashboard FAQ

---

## Why is the IP displayed in the Dashboard different from the Agent's actual IP?

The IP displayed in the Dashboard is the outbound IP detected and reported by the Agent using [IP-API](https://github.com/nezhahq/agent/blob/main/pkg/monitor/myip.go).  
If the displayed IP differs from the one provided by your service provider, possible reasons include:

1. **Service Provider Uses an Inbound IP**: The IP provided by your service provider might be a high-defense or mapped inbound IP rather than the actual outbound IP.
2. **Multi-line or Dedicated Line Environments**: Multi-line servers or IPLC dedicated lines may cause discrepancies in outbound IPs.

### Verify the Outbound IP
Run the following commands on the Agent server to test the outbound IP:
```shell
curl https://ipapi.co/ip/
curl ip.sb
curl ip-api.com
```

---

## Dashboard Installation/Restart/Update Fails with: `iptables ......`

1. **Restart Docker**  
   Run the following commands to restart Docker:
   ```shell
   systemctl status docker
   systemctl restart docker
   systemctl status docker
   ```

2. **Disable or Remove iptables**  
   If the issue persists, try disabling or removing `iptables`.

3. **Switch to an Official Kernel**  
   Some issues might be related to the kernel. Switching to the official kernel could help resolve the problem.

---

## Dashboard Layout Errors or Missing CSS Resources

This is typically caused by missing or inaccessible CSS files. Solutions:

1. **Restart and Update the Dashboard**  
   Use the one-click script and select `Update Dashboard`.

2. **Check Nginx Configuration**  
   If the issue persists, check and modify the Nginx vhost configuration:
   - Remove the following section:
     ```nginx
     location ~ .*\.(js|css)?$
         {
             expires      12h;
             error_log /dev/null;
             access_log /dev/null;
         }
     ```
   - Save the configuration and clear the cache for the browser, Nginx, and CDN.

3. **Refresh the Page**  
   The layout should return to normal.

---

## Dashboard Fails to Start: `panic: unable to find configured DDNS provider...`

The DDNS provider is misconfigured. Supported values include: `webhook`, `cloudflare`, `tencentcloud`, and `dummy`. Verify and correct the configuration.

---

## Dashboard DDNS Update Crash: `panic: interface conversion: interface {} is nil, not []interface {}`

The DDNS `AccessID` or `AccessSecret` is incorrect. Double-check and correct the values.

---

## Dashboard Warning: `NEZHA>> Invalid service monitoring report...`

This issue usually arises from version mismatches between the Dashboard and Agent.  
**Solution**: Update both the Dashboard and Agent to the latest versions.

---

## Server Network Monitoring Page Displays Empty

This error indicates:
1. `TCP-Ping` or `ICMP-Ping` monitoring has not been configured in the Services page.
2. Monitoring data has not yet been generated.  
**Solution**: Complete the configuration and wait for some time before checking the data.

---

## `/terminal` or `/ws` Not Working After Enabling HTTPS

This issue is often caused by incomplete certificates:

1. Check the logs for the following error:
   ```plaintext
   x509: certificate signed by unknown authority
   ```
2. If this error appears, replace the certificate with a complete one to resolve the issue.

---

## Data Modification or Feature Extensions

If you need to modify Dashboard data (e.g., batch creation of Agents), you can operate directly on the database.  
### Caution:
- The database is `sqlite3` and is located at `/opt/nezha/dashboard/data/sqlite.db`.
- Always back up the database before making changes.
- Stop the Dashboard container before making changes.  
::: danger  
Do not modify the database carelessly! Incorrect changes may corrupt data or prevent the Dashboard from starting.
:::

---

## Does the Dashboard Update Automatically?

The Dashboard does not update automatically. Updates must be performed manually using the script.  
Agents, by default, update automatically.

---

## Error: `Agent signaling dispatch failed` when connecting to the Online Terminal

This issue may be caused by:
1. **Agent Offline**: Check if the Agent is running normally.
2. **Unstable Connection**: Ensure the connection between the Agent and Dashboard is stable, and troubleshoot any network issues.

---

## Error: `You have not specify the installed host.` when Copying Installation Commands

### Cause

This error occurs if the **`Dashboard Server Domain/IP (without CDN)`** field is not configured in the settings.  
This configuration is required to generate the installation commands correctly.

### Solution

1. **Go to Settings**  
   Log in to the Dashboard, click on the avatar in the top-right corner, and select **`System Settings`**.

2. **Configure the Server Domain/IP**  
   In the **`Dashboard Server Domain/IP (without CDN)`** field, enter your server's domain or IP address.  
   Example:
   - **Domain**: `data.example.com`
   - **IP**: `123.123.123.123`

3. **Save Settings**  
   After configuring, save the settings and return to the installation commands page. Copy the commands again.

---

## File Manager Upload/Download Freezes

### Cause

1. **Buffer Size Issue**  
   File Manager (FM) sends data in 1 MiB chunks. If the proxy's buffer size is smaller than 1 MiB, transfers may freeze.

2. **CDN Performance Impact**  
   Using a CDN can significantly degrade performance or cause freezes during transfers.

### Solution

#### 1. Adjust Proxy Buffer Size

For common proxies like Nginx and Caddy, ensure the buffer size is set to at least 1 MiB:

**Nginx Example**:
```nginx
proxy_buffer_size 2m;
proxy_buffers 4 2m;
proxy_busy_buffers_size 4m;
```
Reload the configuration:
```bash
sudo nginx -s reload
```

**Caddy Example**:
```caddy
reverse_proxy {
    transport http {
        read_buffer 2MB
        write_buffer 2MB
    }
}
```
Restart the Caddy service after saving the configuration.

#### 2. Direct Connection

Bypass the CDN and connect directly to the origin server for file transfers. Ensure the connection points directly to the server's IP or domain and is stable.

---

## Unable to Connect Agent with Nginx Reverse Proxy for gRPC

### Cause

By default, Nginx does not allow underscores in headers. The Agent uses `client_secret` and `client_uuid` headers for authentication.

### Solution

1. **Enable Underscores**  
   Add the following directive in the server block:
   ```nginx
   underscores_in_headers on;
   ```

2. **Manually Forward Headers**  
   Include the following configuration in the gRPC reverse proxy setup:
   ```nginx
   grpc_set_header client_secret $http_client_secret;
   grpc_set_header client_uuid $http_client_uuid;
   ```