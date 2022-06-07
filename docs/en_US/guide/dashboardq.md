## Why the IP displayed in the admin panel and the actual IP of the Agent are not the same?  
First of all, explain how the IP displayed in the admin panel is gotten: the Agent will request the IP-API every once in a while, get the IP information and report it to the Dashboard, the IP-API currently used can be viewed here: [myip.go](https://github.com/naiba/nezha/blob/master/cmd/agent/monitor/myip.go)  
If you find that the IP displayed in the admin panel is not the same as the IP provided to you by the service provider, the biggest possibility is that the service provider gave you the **entry IP**, but the Agent tested out your **exit IP**. This problem may also occur in BGP servers and Leased line.  
::: tip  
To take a simple and very common example, the service provider to provide you a anti-DDoS server, in order to meet the goals of both DDoS protection and low network disruption rate, the IP provided to you may be the mapped anti-DDoS IP and not the real exit IP of your server  
:::   

You can also test the exit IP by running the following command in the Agent server:  
```shell
curl api.myip.la
curl ip.sb
curl ip-api.com
```  

## Forgot your access password or deleted your access password
Please view or edit the `/opt/nezha/dashboard/data/config.yaml` file.   
The password is located in the site-viewpassword item.  

## Dashboard install/restart/update failed: iptables ......
First, try restarting docker and retrying again  
```shell
systemctl status docker
systemctl restart docker
systemctl status docker
```  
Restart and try to reinstall the Dashboard.  
If you still get iptables... etc. errors, then consider simply closing iptables or even removing it.  
This issue may also be kernel related, try replacing the official kernel as well.  

## Dashboard reboot failed: Invalid hostPort: nz_site_port etc.
Usually this does not occur, if it does, you can modify the configuration through the installation script. 