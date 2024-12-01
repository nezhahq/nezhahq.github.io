---
outline: deep
---

# Dashboard 常见问题

---

## 为什么管理面板中显示的 IP 和 Agent 实际 IP 不一致？

管理面板中显示的 IP 是 Agent 使用 [IP-API](https://github.com/nezhahq/agent/blob/main/pkg/monitor/myip.go) 检测并上报的出口 IP。  
如显示的 IP 与服务商提供的 IP 不一致，可能原因如下：
1. **服务商使用入口 IP**：服务商提供的 IP 为高防或映射后的入口 IP，而非实际出口 IP。
2. **多线路或专线环境**：多线服务器或 IPLC 专线可能导致出口 IP 与预期不一致。

### 验证出口 IP
在 Agent 服务器中运行以下命令测试出口 IP：
```shell
curl https://ipapi.co/ip/
curl ip.sb
curl ip-api.com
```

---

## 面板安装/重启/更新失败：`iptables ......`

1. **重启 Docker**
   运行以下命令重启 Docker：
   ```shell
   systemctl status docker
   systemctl restart docker
   systemctl status docker
   ```

2. **关闭或移除 iptables**
   若问题仍未解决，尝试关闭或移除 `iptables`。

3. **更换官方内核**
   部分问题可能与内核有关，切换到官方内核后再尝试操作。

---

## 面板布局错误、CSS 资源无法被加载

通常由 CSS 文件丢失或无法加载导致。解决方法如下：
1. **重启并更新面板**  
   执行一键脚本选择 `更新面板`。

2. **检查 Nginx 配置**  
   若问题未解决，检查并修改 Nginx 的 vhost 文件：
   - 在宝塔面板中找到安装 Dashboard 时配置的站点，点击 **`设置` → `配置文件`**。
   - 删除以下内容：
     ```nginx
     location ~ .*\.(js|css)?$
         {
             expires      12h;
             error_log /dev/null;
             access_log /dev/null;
         }
     ```
   - 保存配置，并清空浏览器、Nginx 和 CDN 的缓存。

3. **刷新页面**  
   此时页面应恢复正常。

---

## 面板无法启动：`panic：无法找到配置的 DDNS 提供者...`

DDNS 提供者配置错误。支持的值包括：`webhook`、`cloudflare`、`tencentcloud` 和 `dummy`。请确认配置正确。

---

## 面板更新 DDNS 崩溃：`panic：interface conversion: interface {} is nil, not []interface {}`

DDNS `AccessID` 或 `AccessSecret` 填写有误，请检查并更正。

---

## 面板警告：`NEZHA>> 错误的服务监控上报...`

此问题通常由于 Dashboard 和 Agent 的版本不匹配导致。  
解决方法：更新 Dashboard 和 Agent 至最新版本。

---

## 服务器网络监控页显示空白

此错误说明：
1. 未在服务页中设置 `TCP-Ping` 或 `ICMP-Ping` 类型的监控。
2. 数据尚未生成。  
解决方法：完成设置后等待一段时间，再查看监控数据。

---

## 启用 HTTPS 后 `/terminal` 或 `/ws` 无法正常连接

此问题多因证书不完整导致：
1. 在 Agent 参数中添加 `-d`，查看日志是否出现：
   ```plaintext
   x509:certificate signed by unknown authority
   ```
2. 若有该错误，更换完整证书即可解决。

---

## 数据修改/功能扩展需求

若需对 Dashboard 提供的数据进行修改（如批量新建 Agent），可直接操作数据库。  
### 注意事项：
- 数据库类型为 `sqlite3`，位于 `/opt/nezha/dashboard/data/sqlite.db`。
- 修改数据前，请备份数据库。
- 修改时，务必 **停止面板容器**。  
::: danger  
请勿随意修改数据库！错误修改可能导致数据混乱或无法启动 Dashboard。
:::

---

## Dashboard 是否会自动更新？

Dashboard 不会自动更新，需要手动运行脚本进行更新。  
Agent 在默认情况下会自动更新。

---

## 连接在线终端时提示：`Agent 信令下发失败`

此问题可能由于以下原因导致：
1. **Agent 离线**：检查 Agent 是否正常运行。
2. **连接不稳定**：确认 Agent 与 Dashboard 的连接是否稳定，并排除网络问题。

---

## 复制安装命令时提示：`You have not specify the installed host.`

### 错误原因

此错误表示您尚未在设置页面中配置 **`仪表板服务器域名/IP（无 CDN）`**。  
该项配置是生成安装命令的必要条件，未配置时无法正确生成安装命令。

---

### 解决方法

1. **进入设置页面**  
   登录 Dashboard，点击右上角头像，选择 **`系统设置`**。

2. **配置服务器域名/IP**  
   在 **`仪表板服务器域名/IP（无 CDN）`** 项中填写您的服务器域名或 IP 地址。  
   示例：
   - **域名**：`data.example.com`
   - **IP**：`123.123.123.123`

3. **保存设置**  
   完成配置后，保存设置并返回安装命令页面，重新复制安装命令。

---

## FM 下载/上传时卡住

确保代理的缓冲区大于 1 MiB，因为 FM 发送的数据块大小为 1 MiB。

使用 CDN 可能会导致性能严重下降，请尝试直接连接。
