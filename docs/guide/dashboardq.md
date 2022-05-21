# Dashboard相关
### 实时通道断开/在线终端连接失败
请查看[常见问题-实时通道断开/在线终端连接失败](/guide/q4.html)  
在此不再赘述。

### 后台显示的IP和Agent实际IP不一致？
首先解释后台显示的IP是怎么来的，Agent会每隔一段时间请求一遍IP-API，获取到IP信息后进行上报，目前使用的IP-API可在此查看[myip.go](https://github.com/naiba/nezha/blob/master/cmd/agent/monitor/myip.go)。  
如您认为后台显示的IP和服务商提供给您的IP不一致，最大的可能是服务商给您的是**入口**，但Agent测试的是您的**出口**。这个问题也可能会出现在多线主机中。    
举个简单也十分常见的例子，服务商给您提供的是一台高防主机，为了同时满足高防和低网络中断率的目标，提供给您的IP可能是经过映射后的高防IP而并非您主机的真实出口IP。    
您也可以使用以下命令在Agent部署主机中进行测试。   
```shell
curl api.myip.la
curl ip.sb
curl ip-api.com
```

### 查看密码忘记\删除查看密码
请查看或编辑`/opt/nezha/dashboard/data/config.yaml`文件。   
密码位于site-viewpassword。

### 面板安装失败: iptables ......
首先尝试重启docker再操作
```shell
systemctl status docker
systemctl restart docker
systemctl status docker
```
重启后尝试重新安装面板。  
若依然出现iptables...等错误，则考虑是否直接关闭iptables甚至移除iptables。  
这个问题也可能由内核引起，也可以尝试更换官方内核。  
