**哪吒监控的被控端服务被称为 Agent，本文档将介绍如何在被控端服务器上安装 Agent，并与 Dashboard 连接**  
<br/>
## 一键安装 Agent

目前哪吒监控已支持在 Windows 和 Linux上一键安装 Agent，遵循本文档的步骤，你可以很轻松的在服务器上部署它  
<br/>
### 准备工作

你需要提前在管理面板中设置好通信域名，此域名不可以接入CDN，这里以前面提到过的示例通信域名 “data.example.com” 来做演示  
进入后台管理面板，转到“设置”页，在“未接入 CDN 的面板服务器域名/IP”项中填入通信域名，然后点击"保存"  
<br/>
### 在 Linux 中一键安装 (Ubuntu、Debian、CentOS)

* 首先在管理面板中添加一台服务器
* 点击新添加的服务器旁，绿色的 Linux 图标按钮，复制一键安装命令
* 在被控端服务器中运行复制的一键安装命令，等待安装完成后返回到 Dashboard 主页查看服务器是否上线  
<br/>
### 在 Windows 中一键安装

* 首先在管理面板中添加一台服务器
* 点击新添加的服务器旁，绿色的 Windows 图标按钮，复制一键安装命令
* 进入 Windows 服务器，运行 PowerShell，在 PowerShell 中运行复制的安装命令
* 如遇到确认「执行策略变更」请选择 Y
* 等待安装完成后返回 Dashboard 主页查看服务器是否上线  
<br/>  
<br/>

## 其他方式安装 Agent 

### 在 Linux 中安装Agent (Ubuntu、Debian、CentOS)

* 首先在管理面板中添加一台服务器  
* 在被控服务器中，运行脚本（位于中国大陆的服务器请使用镜像）：
```bash
curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install.sh  -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```
如果你的被控服务器位于中国大陆，可以使用镜像：  
````bash
curl -L https://jihulab.com/nezha/nezha/-/raw/master/script/install.sh -o nezha.sh && chmod +x nezha.sh && sudo CN=true ./nezha.sh
````
* 选择“安装监控 Agent”  
* 输入通信域名，如：”data.example.com“  
* 输入面板通信端口（RPC端口），默认为 5555  
* 输入 Agent 密钥，Agent 密钥在管理面板中添加服务器时生成，可以在管理面板中的“主机”页中找到  
* 等待安装完成后返回 Dashboard 主页查看服务器是否上线  
<br/>  

### 在 其他 Linux 如 Alpine 使用 Openrc 的发行版 安装 Agent 
本节内容由 [unknown0054](https://github.com/unknwon0054) 贡献

* 修改 SERVER、SECRET、TLS 然后在 shell 中执行

```shell
cat >/etc/init.d/nezha-agent<< EOF
#!/sbin/openrc-run
SERVER="" #Dashboard 地址 ip:port
SECRET="" #SECRET
TLS="" # 是否启用 tls 是 "--tls" 否留空
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
		local version=$(curl -m 10 -sL "https://api.github.com/repos/naiba/nezha/releases/latest" | grep "tag_name" | head -n 1 | awk -F ":" '{print $2}' | sed 's/\"//g;s/,//g;s/ //g')
		if [ ! -n "$version" ]; then
			version=$(curl -m 10 -sL "https://fastly.jsdelivr.net/gh/naiba/nezha/" | grep "option\.value" | awk -F "'" '{print $2}' | sed 's/naiba\/nezha@/v/g')
		fi
		if [ ! -n "$version" ]; then
			version=$(curl -m 10 -sL "https://gcore.jsdelivr.net/gh/naiba/nezha/" | grep "option\.value" | awk -F "'" '{print $2}' | sed 's/naiba\/nezha@/v/g')
		fi
		if [ ! -n "$version" ]; then
			echo -e "获取版本号失败，请检查本机能否链接 https://api.github.com/repos/naiba/nezha/releases/latest"
			return 0
		else
			echo -e "当前最新版本为: ${version}"
		fi
		wget -t 2 -T 10 -O nezha-agent_linux_${os_arch}.zip https://${GITHUB_URL}/naiba/nezha/releases/download/${version}/nezha-agent_linux_${os_arch}.zip >/dev/null 2>&1
		if [[ $? != 0 ]]; then
			echo -e "Release 下载失败，请检查本机能否连接 ${GITHUB_URL}${plain}"
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

* 增加运行权限

  ```shell
  chmod +x /etc/init.d/nezha-agent
  ```

* 运行 Nezha-Agent

  ```shell
  rc-service nezha-agent start
  ```

* 添加开机自启动

  ```shell
  rc-update add nezha-agent
  ```



### 在 Windows 中安装Agent  

- 请参考社区文章：  
[哪吒探针 - Windows 客户端安装](https://nyko.me/2020/12/13/nezha-windows-client.html)  
<br/>  

### 在 群晖DSM 中安装Agent  

- 请参考社区文章：  
[哪吒探针——群晖客户端（被控端）安装教程](https://wl.gta5pdx.cn/archives/546/)  

### 在 MacOS 中安装Agent  
***本节内容改编自[Mitsea Blog](https://blog.mitsea.com/e796f93db38d49e4b18df234c6ee75f5)，改编已获得原作者授权***  
<br/>  
::: warning  
安装过程中如提示“macOS 无法验证此 app“，请前往系统设置手动允许程序运行  
:::  

+ 首先在管理面板中添加一台服务器  
+ 前往 [Release](https://github.com/naiba/nezha/releases) 页下载 Agent 二进制文件，根据 CPU 架构选择下载 darwin amd64 还是 arm64 的 Agent  
如 Intel CPU 下载 amd64，Apple Silicon 下载 arm64 版本。下载完成后解压 Agent 二进制文件，如解压到下载文件夹  
+ 新建一个名为 `nezha_agent.plist` 的文件并保存，修改文件内容如下：  
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
	<string>在这里修改 Agent 二进制文件的的路径，如：/Users/123/Downloads/nezha-agent</string>
	<key>ProgramArguments</key>
	<array>
		<string>在这里修改 Agent 二进制文件的的路径，同上</string>
		<string>--password</string>
		<string>通信密钥，如：529664783eeb23cc25</string>
		<string>--server</string>
		<string>通信网址和RPC端口，如:data.example.com:5555</string>
	</array>
	<key>RunAtLoad</key>
	<true/>
</dict>
</plist>
```
+ 在 Terminal 中使用下面的命令加载 plist 文件到 launchd 里，**注意替换文件路径**  
```shell  
launchctl load /Users/123/Desktop/nezha_agent.plist
```
+ 启动进程  
```shell  
launchctl start nezha_agent
```
+ 检查进程是否运行  
```shell  
launchctl list | grep nezha_agent
```
+ 停止进程并移除
```shell  
launchctl stop nezha_agent
```
```shell  
launchctl remove nezha_agent
```
<br/>  

### 在 OpenWRT 中安装 Agent  
**如何 一步到位,解决安装过程疑难杂症**  
- 请参考项目：  
[NZ-OpenWrt](https://github.com/dysf888/NZ-OpenWrt)  
<br/>

**如何使 旧版 OpenWRT/LEDE 自启动**  
- 请参考项目：  
[哪吒监控 For OpenWRT](https://github.com/Erope/openwrt_nezha)  
<br/>

**如何使 新版 OpenWRT 自启动？来自 @艾斯德斯**  
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

## FAQ
### Agent 有 Docker 镜像吗？
**Agent 目前没有推出 Docker 镜像。**  
Agent 的设计思路和 Dashboard 相反，Dashboard 要尽可能不影响宿主机工作，但 Agent 则需要在宿主机中执行监控服务和运行命令。  
将 Agent 放入容器中确实可以继续执行监控任务，但 WebShell 等功能无法正常运行，因此不提供 Docker 镜像。  
