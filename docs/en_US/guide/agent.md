---
outline: deep
---

# Install Agent

**This document will introduce how to install the Agent on the monitored server and connect it to the Dashboard.**  
::: tip  
The repository for Agent binaries can be found at: <https://github.com/nezhahq/agent/releases>
:::

## One-Click Installation of the Agent

Nezha Monitoring supports one-click installation of the Agent on both Windows and Linux. By following the steps in this document, you can easily deploy it on your server.

### Preparation

You need to set up a communication domain in the admin panel in advance, and this domain should not be connected to a CDN. This document uses the example communication domain “data.example.com”.  
Go to the settings page in the admin panel, fill in the communication domain in the “Non-CDN Dashboard Server Domain/IP” field, and click "Save".

### One-Click Installation on Linux

1. First, add a server in the admin panel.
2. Click the green Linux icon button next to the newly added server and copy the one-click installation command.
3. Run the copied installation command on the monitored server, and wait for the installation to complete. Then, check if the server is online in the Dashboard home page.

### One-Click Installation on macOS

1. First, add a server in the admin panel.
2. Click the green Apple icon button next to the newly added server and copy the one-click installation command.
3. Run the copied installation command on the monitored server, and wait for the installation to complete. Then, check if the server is online in the Dashboard home page.

### One-Click Installation on Windows

1. First, add a server in the admin panel.
2. Click the green Windows icon button next to the newly added server and copy the one-click installation command.
3. Go to the Windows server, run PowerShell, and execute the copied installation command in PowerShell.
4. If you encounter a prompt to "change execution policy," choose Y.
5. Wait for the installation to complete, then check if the server is online in the Dashboard home page.

::: warning  
If you encounter errors when running the one-click installation command in PowerShell, try the **Manual Installation of the Agent on Windows** below.
:::

## Other Ways to Install the Agent

### Installing the Agent on Linux (Support most distros)
<details>
  <summary>Click to expand/collapse</summary>

1. First, add a server in the admin panel.
2. Run the script on the monitored server:

```bash
curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install_en.sh  -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```

1. Select “Install monitoring Agent.”
2. Enter the communication domain, such as "data.example.com".
3. Enter the dashboard communication port (gRPC port), default is 5555.
4. Enter the Agent secret, which is generated when you add a server in the admin panel and can be found on the “Servers” page in the admin panel.
5. Wait for the installation to complete, then check if the server is online in the Dashboard home page.

</details>

### Installing the Agent using the built-in service command (Support most systems)
<details>
  <summary>Click to expand/collapse</summary>

First, get a copy of Nezha Agent: https://github.com/nezhahq/agent/releases

After extracting the archive, run the following command to install the service (may require root permission):

```bash
./nezha-agent service install -s server_name:port -p password
```

You can also add other arguments except the server address and password. For more details, refer to the documentation: [Customizing Agent Monitoring Items](/en_US/guide/q7.html).

Uninstall the service:

```bash
./nezha-agent service uninstall
```

Start the service:

```bash
./nezha-agent service start
```

Stop the service:

```bash
./nezha-agent service stop
```

Restart the service:

```bash
./nezha-agent service restart
```

</details>

### Installing the Agent with runit
<details>
  <summary>Click to expand/collapse</summary>

The built-in service command of Agent supports most init systems, including FreeBSD rc.d and openrc, but still missing some of them.

Here we take Void Linux's runit as an example:

1. Create directory `/etc/sv/nezha-agent`:

```bash
mkdir /etc/sv/nezha-agent
```

2. Create service file `/etc/sv/nezha-agent/run`, with following content:

```bash
#!/bin/sh
exec 2>&1
exec /opt/nezha/agent/nezha-agent -s server_name:port -p password 2>&1
```

You can add other arguments here as well.

3. Create logging service file `/etc/sv/nezha-agent/log/run`:

```bash
#!/bin/sh
exec vlogger -t nezha-agent -p daemon
```

4. Enable the service:

```bash
sudo ln -s /etc/sv/nezha-agent/ /var/service
```

Use the `sv` command to manage the service.

How to view logs:

1. Install `socklog` and enable it:

```bash
sudo xbps-install -S socklog-void
sudo ln -s /etc/sv/socklog-unix /var/service
```

2. Run `svlogtail`:

```bash
sudo svlogtail | grep nezha-agent
```

</details>

### Manual Installation of the Agent on Windows
* Refer to the community article:  
[Nezha - Windows Client Installation](https://nyko.me/2020/12/13/nezha-windows-client.html) (Chinese)

### Installing the Agent on Synology DSM
<details>
  <summary>Click to expand/collapse</summary>

* Refer to community articles:  
[Installing Nezha Monitoring Agent on Synology DSM 7.x](https://blog.mitsea.com/3929551d08bd4bb0a8baa453e2d92b0c/) (Chinese)  
[Nezha - Synology Client (Agent) Installation Tutorial](https://wl.gta5pdx.cn/archives/546/) (Chinese)

* Using Systemd *for DSM7 only*:

```sh
# Agent path
EXEC="/PATH/TO/nezha-agent"
# Log path
LOG="${EXEC}.log"
# Additional execution parameters, can be empty
ARGS=""
# Nezha server gRPC address
SERVER="HOST_OR_IP:gRPC_PORT"
# The secret key obtained in the previous step
SECRET="APP_SECRET"
# User running the service, *strongly recommended to use non-root user*
RUN_USER="nezha"

# Write to systemd service file
cat << EOF > /usr/lib/systemd/system/nezha.service
[Unit]
Description=Nezha Agent Service
After=network.target

[Service]
Type=simple
ExecStart=/bin/nohup ${EXEC} ${ARGS} -s ${SERVER} -p ${SECRET} &>> ${LOG} &
ExecStop=ps -fe |grep nezha-agent|awk '{print \$2}'|xargs kill
User=${RUN_USER}

Restart=on-abort

[Install]
WantedBy=multi-user.target
EOF

# Reload service
systemctl daemon-reload
# Start service
systemctl start nezha
# Enable service startup
systemctl enable nezha
```

‼️ Modify the corresponding information before running the above commands with the `root` account to complete the installation.

</details>

### Installing the Agent on macOS Using Homebrew
<details>
  <summary>Click to expand/collapse</summary>

***This section is adapted from [🐿️松鼠收集🌰](https://blog.mre.red/archives/install_nezha_monitoring_agent_service_with_homebrew) with the author's permission***

::: warning	
Please be sure to add environment variables before installing nezha-agent through Homebrew!
Homebrew creates the service-required plist file during software installation, and if you add the environment variables after installation, it will fail to start due to missing parameters.
:::

1. Add environment variables:

```shell
echo 'export HOMEBREW_NEZHA_AGENT_PASSWORD="Communication key, obtained from the service page"' >> ~/.zshrc
echo 'export HOMEBREW_NEZHA_AGENT_SERVER="Your server and port, format your.domain:5555 "' >> ~/.zshrc
source ~/.zshrc
```

2. Install Nezha Agent:

::: danger
Note that this Homebrew repository is maintained by a third party and is unrelated to Nezha Monitoring.
The Nezha project team does not endorse this repository's usability, security, etc. Please evaluate the risks yourself before using!
:::

Since it has not yet been submitted to the Homebrew Core official library, it is temporarily placed in the [third-party Homebrew repository](https://github.com/Brewforge/homebrew-chinese) maintained by the author of the blog:

```shell
brew install brewforge/chinese/nezha-agent
```

3. Start Nezha Agent service through Homebrew:

```shell
brew services start nezha-agent
```

4. Check the service status:

```shell
brew services info nezha-agent
```

5. Stop the service:

```shell
brew services stop nezha-agent
```

6. Uninstall Nezha Agent:

```shell
brew rm nezha-agent
```

7. If there is an error, first check the environment variables:

```shell
echo $HOMEBREW_NEZHA_AGENT_PASSWORD
echo $HOMEBREW_NEZHA_AGENT_SERVER
```

8. If the environment variables are configured correctly, try reinstalling:

```shell
brew services stop nezha-agent
brew reinstall nezha-agent
brew services start nezha-agent
```

9. If the issue persists, submit a issue to the [third-party Homebrew repository](https://github.com/Brewforge/homebrew-chinese).

</details>

### Installing the Agent on OpenWRT
<details>
  <summary>Click to expand/collapse</summary>

**How to solve installation difficulties and issues in one step?**

* Refer to the project:  
[NZ-OpenWrt](https://github.com/dysf888/NZ-OpenWrt)  

**How to enable autostart on older OpenWRT/LEDE?**

* Refer to the project:  
[Nezha Monitoring for OpenWRT](https://github.com/Erope/openwrt_nezha)  

**How to enable autostart on newer OpenWRT? Contributor: @艾斯德斯**

* First, download the corresponding binary from the release, unzip the zip package, and place it in `/root`.
* Run `chmod +x /root/nezha-agent` to grant execution permission, then create `/etc/init.d/nezha-service`:

```shell
#!/bin/sh /etc/rc.common

START=99
USE_PROCD=1

start_service() {
 procd_open_instance
 procd_set_param command /root/nezha-agent -s Dashboard communication domain:port -p Key -d
 procd_set_param respawn
 procd_close_instance
}

stop_service() {
  killall nezha-agent
}

restart() {
 stop
 sleep 2
 start
}
```

* Run `chmod +x /etc/init.d/nezha-service` to grant execution permission.  
* Start the service: `/etc/init.d/nezha-service enable && /etc/init.d/nezha-service start`

</details>

## Does the Agent Have a Docker Image?

**The Agent does not currently have a Docker image.**  
The design philosophy of the Agent is opposite to that of the Dashboard. While the Dashboard should minimally impact the server, the Agent needs to execute monitoring services and run commands within the server.  
Running the Agent inside a container can still perform monitoring tasks, but features like WebShell will not function properly, so no Docker image is provided.
