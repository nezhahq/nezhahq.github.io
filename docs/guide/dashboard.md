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

**本文档以宝塔面板配置反向代理 Dashboard 的过程作为示范。随着未来版本的变化，部分功能入口可能会有所调整，本文档仅供参考。**  

::: warning  
本项目并不依赖宝塔面板。你可以使用任何服务器面板，或手动安装 Nginx 或 Caddy 来配置 SSL 和反向代理。  

如果你认为无需通过 80 或 443 端口访问 Dashboard，可以直接使用安装脚本部署并运行哪吒监控，无需安装 Nginx 或其他 Web 服务器。  
:::

以宝塔面板为例，在宝塔面板中新建站点，填写公开访问域名，如 `http://dashboard.example.com`，然后点击“设置”，进入站点设置，选择“反向代理” → “新建反向代理”。

1. 自定义代理名称，在“目标 URL”中填入：  
   `http://127.0.0.1:8008`  
   点击“保存”。  
2. 打开刚创建的反向代理右边的“配置文件”，将内容替换为以下代码：
```nginx
#PROXY-START/
location / {
    proxy_pass http://127.0.0.1:8008;
    proxy_set_header Host $host;
    proxy_set_header Origin https://$host;
    proxy_set_header nz-realip $http_CF_Connecting_IP;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
}
location ~ ^/(ws|terminal/.+|file/.+)$ {
    proxy_pass http://127.0.0.1:8008;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $http_host;
}
#PROXY-END/
```
3. 点击“保存”。

现在，你可以直接通过域名访问面板，例如：  
`http://dashboard.example.com`  

### 扩展内容  

**CaddyServer v1 配置**（v2 无需特殊配置）：
```caddy
proxy /ws http://127.0.0.1:8008 {
    websocket
    header_upstream -Origin
}
proxy /terminal/* http://127.0.0.1:8008 {
    websocket
    header_upstream -Origin
}
proxy /file/* http://127.0.0.1:8008 {
    websocket
    header_upstream -Origin
}
```

## 更新 Dashboard

运行脚本：
```bash
./nezha.sh
```
选择重启面板并更新。