---
outline: deep
---

# 安装 Dashboard

## 准备工作  

搭建哪吒监控的 Dashboard，你需要：
1. 一台可以连接公网的服务器。防火墙和安全策略需放行 8008 端口，否则无法访问或接收数据。单核 512MB 内存的服务器即可满足大多数使用场景。
2. 一个已设置好 A 记录，指向 Dashboard 服务器 IP 的域名。
::: tip  
如果你想使用 CDN，请准备两个域名：  
- 一个配置好 CDN，用作公开访问，CDN 需支持 WebSocket 协议；  
- 另一个域名不使用 CDN，用作 Agent 与 Dashboard 的通信。  

本文档以 "dashboard.example.com" 和 "data.example.com" 为例。
:::

## 在服务器中安装 Dashboard

在面板服务器中，运行以下安装脚本：
```bash
curl -L https://raw.githubusercontent.com/nezhahq/scripts/refs/heads/main/install.sh -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```  

如果你的服务器位于中国大陆，可以使用镜像：
```bash
curl -L https://gitee.com/naibahq/scripts/raw/main/install.sh -o nezha.sh && chmod +x nezha.sh && sudo CN=true ./nezha.sh
```

以 Docker 安装为例，安装完成后按提示输入以下信息：
- `请输入站点标题:` - 自定义站点标题。
- `请输入暴露端口:` - 公开访问端口（默认 8008，可自定义）。
- `请指定后台语言:` - 选择语言偏好。

输入完成后，等待拉取 Docker 镜像。安装结束后，如果一切正常，你可以通过域名和端口号访问 Dashboard，例如：  
`http://dashboard.example.com:8008`  

如果需要再次运行安装脚本，可输入以下命令：
```bash
./nezha.sh
```
打开管理脚本。

## 登录到 Dashboard 配置界面

后台管理界面的路径为 `/dashboard`，你只需访问：  
`http://dashboard.example.com:8008/dashboard`  

首次登录的默认用户名和密码均为 `admin`。

::: warning  
默认密码为弱密码，对于高权限的面板来说，使用弱密码非常危险！  
建议安装后立即进入管理页面：点击头像 → “个人信息” → “更新个人资料”修改密码。  
建议密码长度至少 18 位，并混合大小写字母、数字及符号。
:::

## 配置反向代理

[Dashboard 反向代理配置](/guide/q3.html)

## 更新 Dashboard

运行脚本：
```bash
./nezha.sh
```
选择重启面板并更新。
