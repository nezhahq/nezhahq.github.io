---
outline: deep
---

# Frequently Asked Questions about the Dashboard

## Why is the IP Displayed in the Admin Panel Different from the Actual Agent IP?

First, let's explain how the IP displayed in the Admin panel is obtained: The Agent periodically requests IP-API to get IP information and reports it to the Dashboard. The currently used IP-API can be viewed here: [myip.go](https://github.com/nezhahq/agent/blob/main/pkg/monitor/myip.go).  
If you find that the IP displayed in the Admin panel is different from the IP provided by your service provider, it is most likely that the service provider has given you an **entry IP**, but the Agent is testing your **exit IP**. This issue can also occur with multi-line servers and IPLC private lines.

::: tip
For example, a common scenario is that the service provider gives you a high-defense server. To meet both high defense and low network interruption rate goals, the IP provided may be a mapped high-defense IP rather than your server's real exit IP.
:::

You can also test the exit IP on the Agent server by running the following commands:

```shell
curl https://ipapi.co/ip/
curl ip.sb
curl ip-api.com
```

## Forgot or Deleted Viewing Password

Please view or edit the `/opt/nezha/dashboard/data/config.yaml` file.   
The password is located under the `site-viewpassword` item.

## Dashboard Installation/Restart/Update Failure: iptables ......

First, try restarting Docker before proceeding:

```shell
systemctl status docker
systemctl restart docker
systemctl status docker
```

After restarting, try reinstalling the Dashboard.  
If iptables errors persist, consider disabling or removing iptables.  
This issue might also be related to the kernel, so switching to the official kernel can be another solution.

## Dashboard Restart Failure: Invalid hostPort: nz_site_port

If this issue occurs, you can modify the configuration via the installation script or directly edit the `/opt/nezha/dashboard/docker-compose.yaml` file.

## Dashboard Layout Error, CSS Resources Not Loading

If the Dashboard page layout is incorrect, it's usually due to missing or inaccessible CSS files.  
To resolve this, try `restarting and updating the Dashboard` first.  
If the problem persists after updating, the issue may be due to inappropriate configurations in your vhost file. You can edit the Nginx vhost file or use the aaPanel to:

1. Find the site configured during Dashboard installation in `Websites` and click `Settings` on the right.
2. Select `Configuration File` and remove the following lines:

    ```nginx
    location ~ .*\.(js|css)?$
        {
            expires      12h;
            error_log /dev/null;
            access_log /dev/null;
        }
    ```

3. Save the configuration, clear the browser, Nginx, and CDN caches, and refresh the page to see if it returns to normal.

## Dashboard Cannot Start: panic: Unable to find the configured DDNS provider...

The value entered for the DDNS provider is incorrect. Currently, only `webhook`, `cloudflare`, `tencentcloud`, and `dummy` are supported.

## Dashboard DDNS Update Crash: panic: interface conversion: interface {} is nil, not []interface {}

The entered DDNS `AccessID` or `AccessSecret` is incorrect.

## Dashboard warning: NEZHA>> 错误的服务监控上报...

1. The installed versions of the Dashboard and Agent are not compatible and have a `TaskType` that is unsupported by its counterpart. Updating both to the latest version could solve this problem.

2. This could be a specific issue in Dashboard v0.17.10 - v0.18.0. Updating to the latest version could solve this.

## Unable to start the Agent service: Unix syslog delivery error

Appears in Agent v0.16.9+. Mostly caused by a malfunctioning `/dev/log` socket (or it does not exist at all). You can refer to <https://unix.stackexchange.com/questions/317064/how-do-i-restore-dev-log-in-systemdrsyslog-host> to solve this problem. Try avoiding using init systems like `systemd` in a Docker installation.

## Network Monitoring Page Shows: server monitor history not found

This error indicates that no TCP-Ping or ICMP-Ping type monitoring has been set in the services page or monitoring data has not yet been generated.   
If it has been set up, wait for some time and then check again.

## What to do if /terminal or /ws can't connect properly after enabling HTTPS?

This is often due to an incomplete certificate. Add the -d parameter to the agent run command. If the log contains `x509:certificate signed by unknown authority`, replacing with a complete certificate will solve the problem.

## What if I'm not satisfied with the data modification/addition functionality provided by the dashboard and want to modify/add data myself?

Common in scenarios like batch adding Agents, you can directly modify the database.  
Note that not everything in the database can be modified; incorrect modifications can lead to data corruption and inability to start the Dashboard. **Do not modify the database casually!**
::: danger  
Again, **do not modify the database casually!**  
:::  
If you need to modify data in the database, **stop** the dashboard container first.  
The database type is sqlite3, located at `/opt/nezha/dashboard/data/sqlite.db`. Backup before modifying.

## Will the Dashboard automatically update?

Agents typically update automatically, but the Dashboard does not and requires manual updates.

## `Agent Command Issuance Failed` When Connecting to Web Terminal

When the Agent is offline, or the connection between the Agent and the Dashboard is unstable, it may cause issues with connecting to the Web Terminal.
Please check if the Agent is running normally and maintaining a stable connection with the Dashboard.