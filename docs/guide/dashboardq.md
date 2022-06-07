## 为什么管理面板中显示的IP和Agent实际IP不一致？  
首先解释管理面板中显示的IP是怎么得到的：Agent会每隔一段时间请求一遍IP-API，获取到IP信息后上报到Dashboard，目前使用的IP-API可在此查看：[myip.go](https://github.com/naiba/nezha/blob/master/cmd/agent/monitor/myip.go)。  
如您发现管理面板中显示的IP和服务商提供给您的IP不一致，最大的可能是服务商给您的是**入口IP**，但Agent测试的是您的**出口IP**。这个问题也可能会出现在多线服务器和IPLC专线中。    
::: tip  
举个简单也十分常见的例子，服务商给您提供的是一台高防服务器，为了同时满足高防和低网络中断率的目标，提供给您的IP可能是经过映射后的高防IP而并非您服务器的真实出口IP 
:::  

您也可以在Agent服务器中运行以下命令测试出口IP:   
```shell
curl api.myip.la
curl ip.sb
curl ip-api.com
```

## 忘记查看密码\删除查看密码
请查看或编辑 `/opt/nezha/dashboard/data/config.yaml` 文件。   
密码位于 site-viewpassword 项中。

## 面板安装/重启/更新失败: iptables ......
首先尝试重启docker再操作  
```shell
systemctl status docker
systemctl restart docker
systemctl status docker
```
重启后尝试重新安装面板。  
若依然出现iptables...等错误，则考虑直接关闭iptables甚至移除iptables。  
这个问题也可能与内核有关，也可以尝试更换官方内核。  

## 面板重启失败：Invalid hostPort: nz_site_port 等
通常不会出现这个情况，如出现可以通过安装脚本修改配置。  
