---
outline: deep
---

# 安装 Dashboard

## 准备工作  

搭建一个哪吒监控，你需要：
1. 一台可以连接公网的服务器，防火墙和安全策略需要放行 8008 和 5555 端口，否则会无法访问和无法接收数据。单核 512MB 内存的服务器配置就足以满足大多数使用场景。
2. 一个已经设置好 A 记录，指向 Dashboard 服务器 IP 的域名。
::: tip 
如果你想使用 CDN，请准备两个域名，一个配置好 CDN 用作公开访问，CDN 需要支持 WebSocket 协议；另一个域名不要使用 CDN，用作 Agent 端与 Dashboard 的通信。  

本文档分别以 "dashboard.example.com" 和 "data.example.com" 两个域名来演示。
:::
3. 一个 Github 账号（或：Gitlab、Gitee）。

**本文档将以宝塔面板反代 Dashboard 的过程作为示范，随着未来版本的变化，部分功能的入口可能会发生改变，本文档仅供参考。**  
:::warning  
本项目并不依赖宝塔，你可以选择使用你喜欢的任何服务器面板，或手动安装 Nginx 或 Caddy 来配置 SSL 和反代。  
如果你认为没有必要使用 80、443 端口来访问 Dashboard，你甚至不需要安装 Nginx 就可以直接使用安装脚本安装并运行哪吒监控。  
:::  

## 获取 Github 的 Client ID 和密钥

哪吒监控接入 Github、Gitlab、Gitee 作为后台管理员账号。  
1. 首先我们需要新建一个验证应用，以 Github 为例，登录 Github 后，打开 https://github.com/settings/developers，依次选择“OAuth Apps” - “New OAuth App”。  
`Application name` - 随意填写。  
`Homepage URL` - 填写面板的访问域名，如："http://dashboard.example.com"（你的域名）。  
`Authorization callback URL` - 填写回调地址，如："http://dashboard.example.com/oauth2/callback"（不要忘记`/oauth2/callback`）。  
2. 点击 “Register application”。  
3. 保存页面中的 Client ID，然后点击 “Generate a new client secret“，创建一个新的 Client Secret，新建的密钥仅会显示一次，**请妥善保存**。

## 使用 Cloudflare Access 作为 OAuth2 提供方

对于位于中国大陆的用户，直接连接到 GitHub 可能会遇到困难。如果您在使用 GitHub、GitLab 或 Gitee 作为管理员账户登录时遇到问题，建议切换到使用 [Cloudflare Access 作为 OAuth2 提供方](/guide/q8.html) 进行登录。

### 新建 SaaS-OIDC 应用流程

:::warning
以下步骤适用于已经开始使用 Zero Trust 的用户。如果您尚未使用过 Cloudflare Zero Trust，强烈建议您首先阅读 [Cloudflare Access 作为 OAuth2 提供方的使用指南](/guide/q8.html)，以了解 Cloudflare Access 的配置示例和流程。
:::

1. 前往 [Zero Trust Dashboard](https://one.dash.cloudflare.com)，使用 Cloudflare 账号登录。
2. `My Team` -> `Users` -> `<具体用户>` -> 获取 `User ID` 并保存。
3. `Access` -> `Application` -> `Add an Application`。
4. 选择 `SaaS`，在 `Application` 中输入自定义的应用名称（例如 nezha），选择 `OIDC` 后点击 `Add application`。
5. `Scopes` 选择 `openid`, `email`, `profile`, `groups`。
6. `Redirect URLs` 填写你的 callback 地址，例如 `https://dashboard.example.com/oauth2/callback`。
7. 保存 `Client ID`、`Client Secret`、`Issuer` 地址中协议与域名的部分，例如 `https://xxxxx.cloudflareaccess.com`。

**如使用此方式，安装 Dashboard 完成后，需要修改配置文件 `/opt/nezha/dashboard/data/config.yaml`，将 `Endpoint` 配置修改为之前保存的 `Issuer` 地址，例如 `https://xxxxx.cloudflareaccess.com`，保存后需重启 Dashboard。**   

## OIDC 验证配置（可选）

哪吒支持自定义 OIDC 验证登录。有关配置详情，请参考文档：[OIDC 配置文档](/guide/q10.html)。

## 在服务器中安装 Dashboard

在面板服务器中，运行安装脚本：
```bash
curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install.sh -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```  
如果你的面板服务器位于中国大陆，可以使用镜像：
```bash
curl -L https://gitee.com/naibahq/nezha/raw/master/script/install.sh -o nezha.sh && chmod +x nezha.sh && sudo CN=true ./nezha.sh
```

等待 Docker 安装完毕后，分别输入以下值：
- `OAuth提供商` -  github、cloudflare、gitlab、gitee 中选择一个。
- `Client ID` - 之前保存的 Client ID。
- `Client Secret` - 之前保存的 Client Secret。
- `用户名` - OAuth 提供商中的用户名/User ID。
- `站点标题` - 自定义站点标题。
- `访问端口` - 公开访问端口，可自定义，默认 8008。
- `Agent的通信端口` - Agent 与 Dashboard 的通信端口，默认 5555。

输入完成后，等待拉取镜像。  
安装结束后，如果一切正常，此时你可以访问域名+端口号，如 “http://dashboard.example.com:8008” 来查看面板。

将来如果需要再次运行脚本，可以运行：
```bash
./nezha.sh
``` 
来打开管理脚本。  

## 配置反向代理

在宝塔面板中新建一个站点，域名填写公开访问域名，如 “http://dashboard.example.com“ ，然后点击“设置”进入站点设置选项，选择“反向代理” - “新建反向代理”。

自定义一个代理名称，在下方“目标 URL”中填入 `http://127.0.0.1` 然后点击“保存”。

打开刚刚新建的反向代理右边的“配置文件”，将配置文件替换为以下内容：
```nginx
#PROXY-START/
location / {
    proxy_pass http://127.0.0.1:8008;
    proxy_set_header Host $http_host;
    proxy_set_header      Upgrade $http_upgrade;
}
location ~ ^/(ws|terminal/.+)$  {
    proxy_pass http://127.0.0.1:8008;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $http_host;
}
#PROXY-END/
```
点击“保存”。  
现在，你应该可以直接使用域名，如：“http://dashboard.example.com“ 来访问面板了。  

### 扩展内容： 

CaddyServer v1（v2 无需特别配置）：

```caddy
proxy /ws http://ip:8008 {
    websocket
    header_upstream -Origin
}
proxy /terminal/* http://ip:8008 {
    websocket
    header_upstream -Origin
}
```

## 在宝塔面板中配置 SSL

首先，先暂时关闭反向代理。  
正如在其他网站中配置 SSL 证书一样，进入站点设置中的 “SSL”，你可以选择自动申请 Let´s Encrypt 证书或手动配置已有的证书。  
完成 SSL 的设置后，你需要回到 https://github.com/settings/developers ，编辑之前创建的验证应用程序，将之前我们填入的 "Homepage URL" 和 "Authorization callback URL" 中的域名全部从 `http` 改为 `https`，如："https://dashboard.example.com" 和 "https://dashboard.example.com/oauth2/callback" ，**不更改此项可能会导致你无法登录面板后台**。  

## 更新 Dashboard

运行脚本 `./nezha.sh` ，选择重启面板并更新。
