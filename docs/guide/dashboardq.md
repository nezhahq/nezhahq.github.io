## 为什么管理面板中显示的 IP 和 Agent 实际 IP 不一致？  
首先解释管理面板中显示的IP是怎么得到的：Agent 会每隔一段时间请求一遍 IP-API，获取到 IP 信息后上报到 Dashboard，目前使用的 IP-API 可在此查看：[myip.go](https://github.com/nezhahq/agent/blob/main/pkg/monitor/myip.go)。  
如您发现管理面板中显示的 IP 和服务商提供给您的 IP 不一致，最大的可能是服务商给您的是**入口 IP**，但Agent测试的是您的**出口 IP**。这个问题也可能会出现在多线服务器和 IPLC 专线中。    
::: tip  
举个简单也十分常见的例子，服务商给您提供的是一台高防服务器，为了同时满足高防和低网络中断率的目标，提供给您的 IP 可能是经过映射后的高防 IP 而并非您服务器的真实出口 IP 
:::  

您也可以在 Agent 服务器中运行以下命令测试出口IP:   
```shell
curl api.myip.la
curl ip.sb
curl ip-api.com
```

## 忘记查看密码\删除查看密码
请查看或编辑 `/opt/nezha/dashboard/data/config.yaml` 文件。   
密码位于 site-viewpassword 项中。

## 面板安装/重启/更新失败: iptables ......
首先尝试重启 Docker 再操作  
```shell
systemctl status docker
systemctl restart docker
systemctl status docker
```
重启后尝试重新安装面板。  
若依然出现 iptables... 等错误，则考虑直接关闭 iptables 甚至移除 iptables。  
这个问题也可能与内核有关，也可以尝试更换官方内核。  

## 面板重启失败：Invalid hostPort: nz_site_port 等
通常不会出现这个情况，如出现可以通过安装脚本修改配置。  

## 面板布局错误、CSS 资源无法被加载
如果出现 Dashboard 页面布局出现错误，通常的原因是 CSS 文件丢失或无法被加载  
出现此类错误，可以先尝试 `重启并更新面板`  
如果更新面板后问题没有得到解决，那么可能是你的 vhost 配置文件内有不适用的配置，你可以编辑 NginX 的 vhost 文件或在宝塔面板内： 
1. 在`网站`中找到安装 Dashboard 时配置的站点，点击右侧`设置`
2. 选择`配置文件`，删除配置文件中的：  
````nginx
location ~ .*\.(js|css)?$
    {
        expires      12h;
        error_log /dev/null;
        access_log /dev/null;
    }
````
3. 保存配置，并清空浏览器、NginX、CDN 中的缓存，此时刷新页面应恢复正常
