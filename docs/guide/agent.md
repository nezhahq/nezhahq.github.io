**哪吒监控的被控端服务被称为Agent，本文档将介绍如何在被控端服务器上安装Agent，并与Dashboard连接**  
<br/>
## 一键安装Agent

目前哪吒监控已支持在WIndows和Linux上一键安装Agent，遵循本文档的步骤，你可以很轻松的在服务器上部署它  
<br/>
### 准备工作

你需要提前在管理面板中设置好通信域名，此域名不可以接入CDN，这里以前面提到过的示例通信域名 “data.example.com” 来做演示  
进入后台管理面板，转到“设置”页，在“未接入CDN的面板服务器域名/IP”项中填入通信域名，然后点击"保存"  
<br/>
### Linux一键安装

* 首先在管理面板中添加一台服务器
* 点击新添加的服务器旁，绿色的Linux图标按钮，复制一键安装命令
* 在被控端服务器中运行复制的一键安装命令，等待安装完成后返回到Dashboard主页查看服务器是否上线  
<br/>
###  Windows一键安装

* 首先在管理面板中添加一台服务器
* 点击新添加的服务器旁，绿色的Windows图标按钮，复制一键安装命令
* 进入Windows服务器，运行PowerShell，在PowerShell中运行复制的安装命令
* 如遇到确认「执行策略变更」请选择 Y
* 等待安装完成后返回Dashboard主页查看服务器是否上线  
<br/>  
<br/>
## 其他方式安装Agent  
### Linux安装Agent  

* 首先在管理面板中添加一台服务器  
* 在被控服务器中，运行脚本（位于中国大陆的服务器请使用镜像）：
```bash
curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install.sh  -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```  
如果你的被控服务器位于中国大陆，可以使用镜像：  
````bash
curl -L https://fastly.jsdelivr.net/gh/naiba/nezha@master/script/install.sh -o nezha.sh && chmod +x nezha.sh && sudo CN=true ./nezha.sh
````
* 选择“安装监控Agent”  
* 输入通信域名，如：”data.example.com“  
* 输入面板通信端口（RPC端口），默认为5555  
* 输入Agent密钥，Agent密钥在管理面板中添加服务器时生成，可以在管理面板中的“主机”页中找到  
* 等待安装完成后返回Dashboard主页查看服务器是否上线  
<br/>  

### Windows安装Agent  

- 请参考社区文章：  
[哪吒探针 - Windows 客户端安装](https://nyko.me/2020/12/13/nezha-windows-client.html)  
<br/>  

### OpenWRT安装Agent  

**如何使 旧版OpenWRT/LEDE 自启动**  
- 请参考项目：  
[哪吒监控 For OpenWRT](https://github.com/Erope/openwrt_nezha)  
<br/>

**如何使 新版OpenWRT 自启动？来自 @艾斯德斯**  
* 首先在 release 下载对应的二进制解压 zip 包后放置到 `/root`  
* 运行 `chmod +x /root/nezha-agent` 赋予执行权限，然后创建 `/etc/init.d/nezha-service`：

```shell
#!/bin/sh /etc/rc.common

START=99
USE_PROCD=1

start_service() {
 procd_open_instance
 procd_set_param command /root/nezha-agent -s 面板通信地址:端口 -p 秘钥 -d
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

* 运行 `chmod +x /etc/init.d/nezha-service` 赋予执行权限  
* 启动服务： `/etc/init.d/nezha-service enable && /etc/init.d/nezha-service start`  
<br/>  
<br/>
## 自定义Agent监控项目

#### 自定义监控的网卡和硬盘分区

* 执行 `/opt/nezha/agent/nezha-agent --edit-agent-config` 来选择自定义的网卡和分区，然后重启 Agent 即可生效

#### 其他运行参数

通过执行 `./nezha-agent --help` 查看支持的参数，如果你使用了一键脚本安装Agent，可以编辑 `/etc/systemd/system/nezha-agent.service`，在 `ExecStart=` 这一行的末尾加上以下参数

- `--report-delay` 控制系统信息上报的间隔，默认为 1 秒，可以设置为 3 来进一步降低 agent 端系统资源占用（配置区间 1-4）
- `--skip-conn` 不监控连接数，推荐 机场/连接密集型服务器或CPU占用较高的服务器设置
- `--skip-procs` 不监控进程数，也可以降低 agent 占用
- `--disable-auto-update` 禁止 **自动更新** Agent（安全特性）
- `--disable-force-update` 禁止 **强制更新** Agent（安全特性）
- `--disable-command-execute` 禁止在 Agent 上执行定时任务、打开在线终端（安全特性）
- `--tls` 启用 SSL/TLS 加密（使用 nginx 反向代理 Agent 的 grpc 连接，并且 nginx 开启 SSL/TLS 时，需要启用该项配置）