**The service in the monitored server is called Agent. This document will describe how to install the Agent on the monitored server and connect it with Dashboard**  
<br/>
## Install Agent using one-click script  
Nezha Monitoring now supports one-click installation of the Agent on Windows and Linux. Follow the steps in this document and you can easily deploy it on your server  
<br/>
### Preparation
First of all, you need to set up the communication domain name in the settings page of the admin panel, this domain name can not connect to the CDN, here is the sample communication domain name "data.example.com" mentioned earlier for demonstration    
Enter the administration panel, go to the "Settings" page, in the item "CDN Bypassed Domain/IP
", fill in the communication domain name, and then click "Save"  
<br/>
###  One-click installation on Linux
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

### Installing Agent on Linux  
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

### Installing Agent on Windows  
- Please refer to the community article: 
[哪吒探针 - Windows 客户端安装](https://nyko.me/2020/12/13/nezha-windows-client.html)(Chinese)  
<br/>  

### Installing Agent on OpenWRT

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

## Customize Agent

#### Customize the NIC and hard drive partitions to be monitored

* Run `/opt/nezha/agent/nezha-agent --edit-agent-config` to select a custom NIC and partition, and then restart Agent

#### Other Flags

Run `./nezha-agent --help` to view supported flags，if you are already using the one-click script, you can edit `/etc/systemd/system/nezha-agent.service`，at the end of this line `ExecStart=` add:  

- `--report-delay` System information reporting interval, default is 1 second, can be set to 3 to reduce the system resource usage on the agent side (configuration range 1-4)
- `--skip-conn` Not monitoring the number of connections, if it is a server with a large number of connections, the CPU usage will be high. It is recommended to set this to reduce CPU usage
- `--skip-procs` Disable monitoring the number of processes can also reduce CPU and memory usage
- `--disable-auto-update` Disable **Automatic Update** Agent (security feature)
- `--disable-force-update` Disable **Forced Update** Agent (security feature)
- `--disable-command-execute` Disable execution of scheduled tasks, disallow open online terminals on the Agent side (security feature)
- `--tls` Enable SSL/TLS encryption (If you are using nginx to reverse proxy Agent´s grpc connections, and if nginx has SSL/TLS enabled, you need to enable this configuration)