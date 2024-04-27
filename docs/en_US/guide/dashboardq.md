## Why the IP displayed in the admin panel and the actual IP of the Agent are not the same?  
First of all, explain how the IP displayed in the admin panel is gotten: the Agent will request the IP-API every once in a while, get the IP information and report it to the Dashboard, the IP-API currently used can be viewed here: [myip.go](https://github.com/nezhahq/agent/blob/main/pkg/monitor/myip.go)  
If you find that the IP displayed in the admin panel is not the same as the IP provided to you by the service provider, the biggest possibility is that the service provider gave you the **entry IP**, but the Agent tested out your **exit IP**. This problem may also occur in BGP servers and Leased line.  
::: tip  
To take a simple and very common example, the service provider to provide you a anti-DDoS server, in order to meet the goals of both DDoS protection and low network disruption rate, the IP provided to you may be the mapped anti-DDoS IP and not the real exit IP of your server  
:::   

You can also test the exit IP by running the following command in the Agent server:  
```shell
curl https://ipapi.co/ip/
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
Usually this does not occur, if it does, you can modify the configuration through the installation script or edit `/opt/nezha/dashboard/docker-compose.yaml` directly.  

## Wrong Dashboard layout, CSS resources cannot be loaded
If the Dashboard page has an incorrect layout, the usual reason is that the CSS file is missing or cannot be loaded.  
When such an issue occurs, you can first try `Reboot and update the Dashboard`. 
If the problem is not resolved after updating the Dashboard, then there may be an unsuitable configuration within your vhost configuration file. You can edit the vhost file or within the Aapanel to:  
1. Find the site you configured when installing Dashboard in `Website` and click `Conf` on the right side  
2. Select `Config` and delete the following from the config file:  
````nginx
location ~ .*\.(js|css)?$
    {
        expires      12h;
        error_log /dev/null;
        access_log /dev/null;
    }
````  
3. Save the configuration and clear the cache in the browser, NginX, and CDN, then refresh the page and it should return to normal.

## Dashboard cannot start：panic: 无法找到配置的DDNS提供者...
The value entered for the DDNS provider is incorrect. Currently, only `webhook`, `cloudflare`, `tencentcloud`, and `dummy` are supported.


## Dashboard crashes when updating DDNS: panic: interface conversion: interface {} is nil, not []interface {}
The DDNS `AccessID` or `AccessSecret` filled is incorrect.