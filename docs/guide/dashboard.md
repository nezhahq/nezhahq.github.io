### 准备工作
----
搭建一个哪吒监控，你需要：
1. 一台可以连接公网的VPS，防火墙和安全策略需要放行8008和5555端口，否则会无法访问和无法接收数据。单核512MB内存的服务器配置就足以满足大多数使用场景
2. 一个已经设置好A记录，指向Dashboard服务器ip的域名 
::: tip 
如果你想使用CDN，请准备两个域名，一个配置好CDN用作公开访问，CDN需要支持WebSocket协议；另一个域名不要使用CDN，用作Agent端与Dashboard的通信   
本文档分别以 "cdn.example.com" 和 "data.example.com" 两个域名来演示
:::
3. 一个Github/Gitee账号

**本文档将以宝塔面板反代面板的过程作为范例，随着未来版本的变化，部分功能的入口可能会发生改变，本文档仅供参考**
<br/>
<br/>
### 获取Github的Client ID和密钥
----
哪吒监控接入Github和Gitee作为后台管理员账号  
+ 首先我们需要新建一个验证应用，以Github为例，登陆Github后，打开 https://github.com/settings/developers ，依次选择“OAuth Apps” - “New OAuth App”    
`Application name` - 随意填写  
`Homepage URL` - 填写面板的访问域名，如："http://cdn.example.com"  
`Authorization callback URL` - 填写回调地址，如："http://cdn.example.com/oauth2/callback"  
+ 点击“Register application” 
+ 保存页面中的Client ID，然后点击 “Generate a new client secret“，创建一个新的Client Secret，新建的密钥仅会显示一次，请妥善保存
<br/>
<br/>
### 在服务器中安装Dashboard
---
* 在面板服务器中，运行安装脚本：  
```bash
curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install.sh  -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```  
如果你的面板服务器位于中国大陆，可以使用镜像：  
````bash
curl -L https://fastly.jsdelivr.net/gh/naiba/nezha@master/script/install.sh -o nezha.sh && chmod +x nezha.sh && sudo CN=true ./nezha.sh
````

* 等待Docker安装完毕后，分别输入以下值：  
`OAuth提供商` -   Github或Gitee  
`Client ID` - 之前保存的Client ID   
`Client Secret` - 之前保存的密钥   
`用户名` - Github或Gitee的用户名   
`站点标题` - 自定义站点标题   
`访问端口` - 公开访问端口，可自定义，默认8008   
`Agent的通信端口` - Agent与Dashboard的通信端口，默认5555   

* 输入完成后，等待拉取镜像  
安装结束后，如果一切正常，此时你可以访问域名+端口号，如 “http://cdn.example.com:8008” 来查看面板  

* 将来如果需要再次运行脚本，可以运行：  
```bash
./nezha.sh
``` 
来打开管理脚本  
<br/>
<br/>
### 配置反向代理
---
* 在宝塔面板中新建一个站点，域名填写公开访问域名，如 “http://cdn.example.com“ ，然后点击“设置”进入站点设置选项，选择“反向代理” - “新建反向代理”  

* 自定义一个代理名称，在下方“目标URL”中填入 `http://127.0.0.1` 然后点击“保存”  

* 打开刚刚新建的反向代理右边的“配置文件”，将配置文件替换为以下内容：
````nginx
#PROXY-START/
location / {
    proxy_pass http://127.0.0.1:8008;
    proxy_set_header Host $host;
    proxy_set_header      Upgrade $http_upgrade;
}
location ~ ^/(ws|terminal/.+)$  {
    proxy_pass http://127.0.0.1:8008;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
}
#PROXY-END/
````
* 点击“保存”  
现在，你应该可以直接使用域名，如：“http://cdn.example.com“ 来访问面板了  
<br/>
#### 扩展内容： 


* CaddyServer v1（v2 无需特别配置）

  ```Caddyfile
  proxy /ws http://ip:8008 {
      websocket
  }
  proxy /terminal/* http://ip:8008 {
      websocket
  }
  ```

<br/>
<br/>

### 在宝塔面板中配置SSL
---
首先，先暂时关闭反向代理  
正如在其他网站中配置SSL证书一样，进入站点设置中的“SSL”，你可以选择自动申请 Let´s Encrypt 证书或手动配置已有的证书  
完成SSL的设置后，你需要回到 https://github.com/settings/developers ，编辑之前创建的验证应用程序，将之前我们填入的"Homepage URL"和"Authorization callback URL"中的域名全部从`http`改为`https`，如："https://cdn.example.com" 和 "https://cdn.example.com/oauth2/callback" ，**不更改此项可能会导致你无法登陆面板后台**  