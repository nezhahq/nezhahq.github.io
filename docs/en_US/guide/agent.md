**The service in the monitored server is called Agent. This document will describe how to install the Agent on the monitored server and connect it with Dashboard**  
::: tip   
Agent binary repository: https://github.com/nezhahq/agent/releases    
:::   
 
## Install Agent using one-click script  
Nezha Monitoring now supports one-click installation of the Agent on Windows and Linux. Follow the steps in this document and you can easily deploy it on your server  
<br/>
### Preparation
First of all, you need to set up the communication domain name in the settings page of the admin panel, this domain name can not connect to the CDN, here is the sample communication domain name "data.example.com" mentioned earlier for demonstration    
Enter the administration panel, go to the "Settings" page, in the item "CDN Bypassed Domain/IP
", fill in the communication domain name, and then click "Save"  
<br/>
###  One-click installation on Linux (Ubuntu, Debian, CentOS)
* First add a server in the admin panel
* Click on the green Linux icon button next to the newly added server and copy the one-click installation command
* Run the copied one-click installation command on the monitored server, wait for the installation to complete, and then return to the Dashboard home page to see if the server is online.  
<br/>
###  One-click installation on Windows
* First add a server in the admin panel  
* Click on the green Linux icon button next to the newly added server and copy the one-click installation command  
* Login to Windows Server, open PowerShell, and run the copied installation command in PowerShell  
* If you encounter the prompt "Implement Policy Change" please select Y  
* Wait for the installation to complete and return to the Dashboard home page to see if the server is online  
<br/>  
<br/>
## Other ways to install Agent
<br/>  

### Installing Agent on Linux (Ubuntu, Debian, CentOS)  
* First add a server in the admin panel  
* In the monitored server, run the script: 
```bash
curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install_en.sh  -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh   
```
* Select “Install_agent”  

* Input the communication domain name, e.g. "data.example.com"  

* Input RPC port, default is 5555 

* Input the Agent Secret, which is generated when adding a server in the administration panel and can be found in the " Servers " page of the administration panel  

* Wait for the installation to complete and return to the Dashboard home page to see if the server is online  
  <br/>

### Installing Agent on other Linux (such as alpine use oprec not systemd) 
Contributed by [unknown0054](https://github.com/unknwon0054)

* Edit SERVER,SECRET,TLS then run it in Shell

```shell
cat >/etc/init.d/nezha-agent<< EOF
#!/sbin/openrc-run
SERVER="" #Dashboard address ip:port
SECRET="" #SECRET
TLS="" # Enable tls?  yes:"--tls" no:""
NZ_BASE_PATH="/opt/nezha"
NZ_AGENT_PATH="${NZ_BASE_PATH}/agent"
pidfile="/run/${RC_SVCNAME}.pid"
command="/opt/nezha/agent/nezha-agent"
command_args="-s ${SERVER}  -p ${SECRET} ${TLS}"
command_background=true
depend() {
	need net
}
checkconfig() {
	GITHUB_URL="github.com"
	if [ ! -f "${NZ_AGENT_PATH}/nezha-agent" ]; then
		if [[ $(uname -m | grep 'x86_64') != "" ]]; then
			os_arch="amd64"
		elif [[ $(uname -m | grep 'i386\|i686') != "" ]]; then
			os_arch="386"
		elif [[ $(uname -m | grep 'aarch64\|armv8b\|armv8l') != "" ]]; then
			os_arch="arm64"
		elif [[ $(uname -m | grep 'arm') != "" ]]; then
			os_arch="arm"
		elif [[ $(uname -m | grep 's390x') != "" ]]; then
			os_arch="s390x"
		elif [[ $(uname -m | grep 'riscv64') != "" ]]; then
			os_arch="riscv64"
		fi
		local version=$(curl -m 10 -sL "https://api.github.com/repos/nezhahq/agent/releases/latest" | grep "tag_name" | head -n 1 | awk -F ":" '{print $2}' | sed 's/\"//g;s/,//g;s/ //g')
		if [ ! -n "$version" ]; then
			version=$(curl -m 10 -sL "https://fastly.jsdelivr.net/gh/nezhahq/agent/" | grep "option\.value" | awk -F "'" '{print $2}' | sed 's/nezhahq\/agent@/v/g')
		fi
		if [ ! -n "$version" ]; then
			version=$(curl -m 10 -sL "https://gcore.jsdelivr.net/gh/nezhahq/agent/" | grep "option\.value" | awk -F "'" '{print $2}' | sed 's/nezhahq\/agent@/v/g')
		fi
		if [ ! -n "$version" ]; then
			echo -e "Failed to get the version number, please check if the network can connect to https://api.github.com/repos/nezhahq/agent/releases/latest"
			return 0
		else
			echo -e "The current latest version is: ${version}"
		fi
		wget -t 2 -T 10 -O nezha-agent_linux_${os_arch}.zip https://${GITHUB_URL}/nezhahq/agent/releases/download/${version}/nezha-agent_linux_${os_arch}.zip >/dev/null 2>&1
		if [[ $? != 0 ]]; then
			echo -e "Release download failed, please check if the network can connect to ${GITHUB_URL}${plain}"
			return 0
		fi
		mkdir -p $NZ_AGENT_PATH
		chmod 755 -R $NZ_AGENT_PATH
		unzip -qo nezha-agent_linux_${os_arch}.zip && mv nezha-agent $NZ_AGENT_PATH && rm -rf nezha-agent_linux_${os_arch}.zip README.md
	fi
	if [ ! -x "${NZ_AGENT_PATH}/nezha-agent" ]; then
		chmod +x ${NZ_AGENT_PATH}/nezha-agent
	fi
}
start_pre() {
	if [ "${RC_CMD}" != "restart" ]; then
		checkconfig || return $?
	fi
}
EOF
```

* Add execute permission

  ```shell
  chmod +x /etc/init.d/nezha-agent
  ```

* Run Nezha-Agent

  ```shell
  rc-service nezha-agent-hy start
  ```

* Set self-start after boot

  ```shell
  rc-update add nezha-agent
  ```

### Installing Agent on Windows  

- Please refer to the community article:   
[哪吒探针 - Windows 客户端安装](https://nyko.me/2020/12/13/nezha-windows-client.html) (Chinese)  
<br/>  

### Installing Agent on Synology DSM

- Please refer to the community article:   
[群晖 DSM 7.x 安装 哪吒监控 Agent](https://blog.mitsea.com/3929551d08bd4bb0a8baa453e2d92b0c/) (Chinese)  
[哪吒探针——群晖客户端（被控端）安装教程](https://wl.gta5pdx.cn/archives/546/) (Chinese)  


- Using Systemd *Only available on DSM7*:
  ```sh
  # Path of the agent binary file.
  EXEC="/PATH/TO/nezha-agent"
  # Path of the agent's log.
  LOG="${EXEC}.log"
  # Extend arguments, can be blank.
  ARGS="--disable-command-execute"
  # The address of nezha server's GRPC.
  SERVER="HOST_OR_IP:GRPC_PORT"
  # The token of host.
  SECRET="APP_SECRET"
  # Specify `run_as` user. * Strongly suggest NOT use `root`! *
  RUN_USER="nezha"
  # Create the service file.
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
  # Reload services
  systemctl daemon-reload
  # Start the agent service
  systemctl start nezha
  # Enable auto-start
  systemctl enable nezha
  ```
  ‼️DO IT WHEN YOU HAVE MODIFIED THE ENVS‼️
  
  Using `root` to execute command above, that's all.

<br/> 

### Installing Agent on MacOS  
***This section is adapted from [Mitsea Blog](https://blog.mitsea.com/e796f93db38d49e4b18df234c6ee75f5), with permission from the original author***  
<br/>  
::: warning  
If you are prompted with "macOS cannot verify this app" during installation, please go to system settings to allow the app to run.  
:::  

+ First add a server in the admin panel  
+ Go to the [Release](https://github.com/nezhahq/agent/releases) page to download the Agent binary and choose whether to download the darwin amd64 or arm64 Agent depending on the CPU architecture  
For example, download the amd64 version for Intel CPU and the arm64 version for Apple Silicon. After downloading, extract the Agent binary file, e.g. to the Download folder 
+ Create a new file named `nezha_agent.plist` and save it, edit the contents of the file:    
```xml  
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>KeepAlive</key>
	<true/>
	<key>Label</key>
	<string>nezha_agent</string>
	<key>Program</key>
	<string>Change the path of the Agent binary here, e.g. /Users/123/Downloads/nezha-agent</string>
	<key>ProgramArguments</key>
	<array>
		<string>Change the path of the Agent binary here, e.g. /Users/123/Downloads/nezha-agent</string>
		<string>--password</string>
		<string>Communication Secret, eg: 529664783eeb23cc25</string>
		<string>--server</string>
		<string>Communication URL and RPC port, eg:data.example.com:5555</string>
	</array>
	<key>RunAtLoad</key>
	<true/>
</dict>
</plist>
```
+ Use the following command in Terminal to load the plist file into launchd  
 **Be sure to change the file path**  
```shell  
launchctl load /Users/123/Desktop/nezha_agent.plist
```
+ Start Service  
```shell  
launchctl start nezha_agent
```
+ Check if the service is running  
```shell  
launchctl list | grep nezha_agent
```
+ Stop service and remove
```shell  
launchctl stop nezha_agent
```
```shell  
launchctl remove nezha_agent
```
<br/>  

Using Homebrew to install the Agent on macOS

The content of this section is adapted from [🐿️松鼠收集🌰](https://blog.mre.red/archives/install_nezha_monitoring_agent_service_with_homebrew), with the permission of the original author.

::: danger
Please ensure to set environment variables first, and then proceed with the installation of Nezha-agent using Homebrew!

Due to the creation of service configuration files (PLIST) by Homebrew during software installation, if you install first and then add environment variables, it will fail to start due to missing parameters!
:::

* Adding environment variables

```sh
echo 'export HOMEBREW_NEZHA_AGENT_PASSWORD="your key, obtained from your service page"' >> ~/.zshrc
echo 'export HOMEBREW_NEZHA_AGENT_SERVER="your server and port, in the format your.domain:5555"' >> ~/.zshrc
source ~/.zshrc
```

* Installing the Nezha Agent

As the package has not yet been submitted to the official Homebrew Core repository, it is currently available in the [third-party Homebrew repository](https://github.com/Brewforge/homebrew-chinese) maintained by the author of the blog mentioned above.

```sh
brew install brewforge/chinese/nezha-agent
```

* Starting the Nezha Agent service through Homebrew

```sh
brew services start nezha-agent
```

* Checking the service status

```sh
brew services info nezha-agent
```

* Stopping the service

```sh
brew services stop nezha-agent
```

* Uninstalling the Nezha Agent

```sh
brew rm nezha-agent
```

* Error handling first check environment variables

```sh
echo $HOMEBREW_NEZHA_AGENT_PASSWORD
echo $HOMEBREW_NEZHA_AGENT_SERVER
```

* If the environment variable configuration is correct, attempt reinstallation

```sh
brew services stop nezha-agent
brew reinstall nezha-agent
brew services start nezha-agent
```

* If the issue persists, please proceed to the [third-party Homebrew repository](https://github.com/Brewforge/homebrew-chinese) and submit a ticket

<br/>

### Installing Agent on OpenWRT
**How to solve various problems during the installation process in one step**  
- Please refer to the project:  
[NZ-OpenWrt](https://github.com/dysf888/NZ-OpenWrt) (Chinese) 
<br/>

**How to make the old version of OpenWRT/LEDE self-boot?**  
- Please refer to the project:   
[哪吒监控 For OpenWRT](https://github.com/Erope/openwrt_nezha) (Chinese) 
<br/>

**How to make the new version of OpenWRT self-boot? By @艾斯德斯**  
* First download the corresponding binary from the release, unzip the zip package and place it in `/root`    
* Then run `chmod +x /root/nezha-agent` to give it execute access, create file `/etc/init.d/nezha-service`：  

```shell
#!/bin/sh /etc/rc.common

START=99
USE_PROCD=1

start_service() {
 procd_open_instance
 procd_set_param command /root/nezha-agent -s data.example.com:5555 -p secreat -d
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

* Give it permission to execute: `chmod +x /etc/init.d/nezha-service`  
* Start the service `/etc/init.d/nezha-service enable && /etc/init.d/nezha-service start`  
<br/>  

## FAQ
### Is there a Docker image for Agent?
**There is currently no Docker image for Agent.**  
The Agent is designed to be the opposite of the Dashboard, in that the Dashboard is designed to work without affecting the server as much as possible, while the Agent needs to execute monitoring services and run commands in the server.  
Putting the Agent in a container does continue to execute monitoring services, but features such as WebShell do not work, so we do not provide Docker image of the Agent.  
