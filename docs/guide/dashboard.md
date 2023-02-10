## 准备工作  

搭建一个哪吒监控，你需要：
1. 一台可以连接公网的 VPS，防火墙和安全策略需要放行 8008 和 5555 端口，否则会无法访问和无法接收数据。单核 512MB 内存的服务器配置就足以满足大多数使用场景
2. 一个已经设置好 A 记录，指向 Dashboard 服务器 ip 的域名 
::: tip 
如果你想使用 CDN，请准备两个域名，一个配置好 CDN 用作公开访问，CDN 需要支持WebSocket 协议；另一个域名不要使用 CDN，用作 Agent 端与 Dashboard 的通信   
本文档分别以 "cdn.example.com" 和 "data.example.com" 两个域名来演示
:::
3. 一个 Github 账号（或：Gitlab、Jihulab、Gitee）  
::: tip  
如果您位于中国大陆，访问 Github 有困难，我们建议您选择 Jihulab 作为 OAuth 提供商  
:::

**本文档将以宝塔面板反代面板的过程作为范例，随着未来版本的变化，部分功能的入口可能会发生改变，本文档仅供参考**  
:::warning  
本项目并不依赖宝塔，你可以选择使用你喜欢的任何服务器面板，如果你能力足够，可以手动安装 NginX 或 Caddy 来配置 SSL 和反代。  
如果你认为没有必要使用 80、443 端口来访问 Dashboard，你甚至不需要安装 NginX 就可以直接使用安装脚本。  
:::  
<br/>
<br/>

## 获取 Github/Jihulab 的 Client ID 和密钥

哪吒监控接入 Github、Gitlab、Jihulab、Gitee 作为后台管理员账号  
+ 首先我们需要新建一个验证应用，以 Github 为例，登录 Github 后，打开 https://github.com/settings/developers ，依次选择“OAuth Apps” - “New OAuth App”    
`Application name` - 随意填写  
`Homepage URL` - 填写面板的访问域名，如："http://cdn.example.com"  
`Authorization callback URL` - 填写回调地址，如："http://cdn.example.com/oauth2/callback"  
+ 点击 “Register application” 
+ 保存页面中的 Client ID，然后点击 “Generate a new client secret“，创建一个新的 Client Secret，新建的密钥仅会显示一次，请妥善保存
<br/>
<br/>  
+ JihuLab 的应用创建入口为：https://jihulab.com/-/profile/applications  
+ `Redirect URL` 中应填入回调地址  
+ 在下方`范围`中勾选 `read_user` 和 `read_api` 
+ 创建完成后，保存好应用程序 ID 和密码

## 在服务器中安装 Dashboard

* 在面板服务器中，运行安装脚本：  
```bash
curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install.sh  -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```  
如果你的面板服务器位于中国大陆，可以使用镜像：  
````bash
curl -L https://cdn.jsdelivr.net/gh/naiba/nezha@master/script/install.sh -o nezha.sh && chmod +x nezha.sh && sudo CN=true ./nezha.sh
````

* 等待Docker安装完毕后，分别输入以下值：  
`OAuth提供商` -   Github，Gitlab，Jihulab，Gitee 中选择一个  
`Client ID` - 之前保存的 Client ID   
`Client Secret` - 之前保存的密钥   
`用户名` - OAuth 提供商中的用户名   
`站点标题` - 自定义站点标题   
`访问端口` - 公开访问端口，可自定义，默认 8008   
`Agent的通信端口` - Agent与Dashboard的通信端口，默认 5555   

* 输入完成后，等待拉取镜像  
安装结束后，如果一切正常，此时你可以访问域名+端口号，如 “http://cdn.example.com:8008” 来查看面板  

* 将来如果需要再次运行脚本，可以运行：  
```bash
./nezha.sh
``` 
来打开管理脚本  
<br/>
<br/>

## 配置反向代理

* 在宝塔面板中新建一个站点，域名填写公开访问域名，如 “http://cdn.example.com“ ，然后点击“设置”进入站点设置选项，选择“反向代理” - “新建反向代理”  

* 自定义一个代理名称，在下方“目标 URL”中填入 `http://127.0.0.1` 然后点击“保存”  

* 打开刚刚新建的反向代理右边的“配置文件”，将配置文件替换为以下内容：
````nginx
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
````
* 点击“保存”  
现在，你应该可以直接使用域名，如：“http://cdn.example.com“ 来访问面板了  
<br/>
#### 扩展内容： 


* CaddyServer v1（v2 无需特别配置）

  ```
  proxy /ws http://ip:8008 {
      websocket
      header_upstream -Origin
  }
  proxy /terminal/* http://ip:8008 {
      websocket
      header_upstream -Origin
  }
  ```

<br/>
<br/>

## 在宝塔面板中配置 SSL

首先，先暂时关闭反向代理  
正如在其他网站中配置 SSL 证书一样，进入站点设置中的 “SSL”，你可以选择自动申请 Let´s Encrypt 证书或手动配置已有的证书  
完成 SSL 的设置后，你需要回到 https://github.com/settings/developers ，编辑之前创建的验证应用程序，将之前我们填入的 "Homepage URL" 和 "Authorization callback URL" 中的域名全部从`http`改为`https`，如："https://cdn.example.com" 和 "https://cdn.example.com/oauth2/callback" ，**不更改此项可能会导致你无法登录面板后台**  

## FAQ
### 启用HTTPS后/terminal或/ws不能正常连接怎么办?
常常是由于证书不完整造成的，请在agent运行参数中添加-d，若log中有x509:certificate signed by unknown authority,更换完整证书则可100%解决该问题。

### 我对面板提供的数据修改/增加功能不满意，我想要自己修改/增加数据怎么办？
常见于批量插入 Agent 等需求中，可以直接修改数据库。  
请注意，数据库中并非什么都可以修改，错误的修改会导致数据混乱无法启动 Dashboard，**请勿随意修改数据库！**  
::: danger  
再重复一遍，**请勿随意修改数据库！**  
:::  
如需要在数据库中修改数据，请先**停止**面板容器再修改。  
数据库类型是 sqlite3，位于 `/opt/nezha/dashboard/data/sqlite.db`，修改前请备份  

### 数据库中各表/列是什么意思？
文档不提供数据库解释，有能力修改数据库的稍加分析应该就足以看懂。

### Dashboard 会自动更新吗？
Agent通常情况下会自动更新，但Dashboard并不会，需要手动更新。  

### 如何更新 Dashboard？
运行脚本 `./nezha.sh` ，选择重启面板并更新
