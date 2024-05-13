---
outline: deep
---

## 登录回调后页面卡住\拒绝连接\响应时间过长

还有其他一些表现形式，总之登录后浏览器无法正常显示。

1. 您的服务器无法连接到 Github/Gitee，最常见于国内服务器配置 Github 情况下，可以考虑多尝试几次或者切换到 Cloudflare Access。
2. 您配置错了回调地址，确保您的回调地址正确且**端口与协议**均正确！
3. Dashboard 发生未知错误，您可以使用脚本查看日志。

::: tip
什么是协议？
在浏览器中，您的域名以 `://` 结尾的字符串即为协议，通常为 `http` 和 `https` 两种。由于正常部署情况下面板可能有多种协议+域名+端口组合均可访问，请务必选一个最合适的作为回调。
:::

### 如何检查我的回调地址是否错误？

请确保登录前浏览器显示的协议+域名+端口和登录后跳转到的协议+域名+端口一致。  
请确保您的路径为 `/oauth2/callback`，**全部小写**。

## 登录后面板报错

### http: named cookie not present

1. 清理 cookies 后重新登录，或换个浏览器。
2. 检查回调地址，确保您的回调地址正确且**端口与协议**均正确！发起请求的地址需要和回调地址处于同域，端口、协议和域名(或IP)都需要一致。

### lookup xxx

容器 DNS 解析失败，多数情况下为修改了 iptables 相关配置。  
建议先重启 docker，`sudo systemctl restart docker`，再使用脚本重启面板。  
仍然出现 lookup 错误建议查看是否有其他控制 iptables 的工具，如宝塔防火墙等。  
这个问题也可能与内核有关系，请尝试更换官方内核。

### 授权方式无效，或者登录回调地址无效、过期或已被撤销

只出现在 Gitee 登录方式中，原因不明，建议更换到 GitHub。

### oauth2: server response missing access_token

可能由多种因素引起，最大可能性是网络问题，建议检查网络后重试。  
无法解决的话建议更换 Github 等。

### 该用户不是本站点管理员，无法登录

您登陆错了账号或者配置错了用户名，注意**用户名不是邮箱**，可使用脚本修改。  
Cloudflare Access 用户请注意，您的用户名不是邮箱，而是 User ID。

### dial tcp xxx:443 i/o timeout

网络问题，可先重启 Docker，`sudo systemctl restart docker`，再使用脚本重启面板。  
如为国内服务器配置 Github 登陆方式，则建议切换到 Cloudflare Access 以避免网络干扰。

### net/http: TLS handshake timeout

同上。