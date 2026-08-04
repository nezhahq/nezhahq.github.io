---
description: 哪吒监控 V2 Dashboard 常见问题与排障，覆盖 IP、反向代理、数据库锁、服务历史、IOStream 配额、配置、登录和运行日志。
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
1. 查看日志是否出现：
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

此错误表示您尚未在设置页面中配置 **`Agent 对接地址【域名/IP:端口】`**。  
该项配置是生成安装命令的必要条件，未配置时无法正确生成安装命令。

---

### 解决方法

1. **进入设置页面**  
   登录 Dashboard，点击右上角头像，选择 **`系统设置`**。

2. **配置服务器域名/IP**  
   在 **`Agent 对接地址【域名/IP:端口】`** 项中填写 Agent 连接 Dashboard 使用的地址。  
   示例：
   - **域名**：`data.example.com:8008`
   - **IP**：`123.123.123.123:8008`

3. **保存设置**  
   完成配置后，保存设置并返回安装命令页面，重新复制安装命令。

---

## File Manager 下载/上传时卡住

### 问题原因

1. **缓冲区设置问题**  
   File Manager (FM) 在传输文件时，每次发送的数据块大小为 **1 MiB**。如果代理的缓冲区小于 1 MiB，可能会导致传输卡住。

2. **CDN 影响性能**  
   使用 CDN 可能会严重降低文件传输性能，甚至导致卡顿。


### 解决方法

#### 1. 检查并调整代理缓冲区

对于常见的代理服务器（如 Nginx 和 Caddy），确保其缓冲区大于 1 MiB：

**Nginx 配置示例**：
```nginx
proxy_buffer_size 2m;
proxy_buffers 4 2m;
proxy_busy_buffers_size 4m;
```
- 将以上配置添加到 Nginx 的站点配置中，保存后重新加载配置：
  ```bash
  sudo nginx -s reload
  ```

**Caddy 配置示例**：
```caddy
reverse_proxy {
    transport http {
        read_buffer 2MB
        write_buffer 2MB
    }
}
```
- 将缓冲区大小设置为至少 2 MiB，保存配置并重启 Caddy 服务。

#### 2. 尝试直接连接

如果使用 CDN，建议绕过 CDN，直接连接到源服务器进行文件传输。  
检查连接方式是否直接指向源服务器的 IP 或域名，并确保网络畅通。

---

## 使用 Nginx 反代 gRPC 无法连接 Agent

当前版本的 Agent 会同时发送连字符形式的 `client-secret`、`client-uuid` 和旧版下划线形式的认证 Header，Dashboard 也同时兼容两种形式。因此，当 Dashboard 为 `v2.2.1` 或更高版本、Agent 为 `v2.2.2` 或更高版本时，通常不再需要为下划线 Header 设置 `underscores_in_headers` 或 `ignore_invalid_headers`。

如果仍无法连接，请优先确认：

1. Dashboard 与 Agent 均已升级，并重新生成或核对安装命令中的连接地址、UUID 和密钥。
2. Nginx 的 gRPC location 使用 `grpc_pass`，且没有清除 `client-secret` 或 `client-uuid`。
3. TLS 开关与代理入口协议一致，并查看 Dashboard、Agent 和 Nginx 错误日志。

只有在必须兼容旧版 Agent 或 Dashboard 时，才需要保留旧配置：在 `server` 块启用 `underscores_in_headers on;` 和 `ignore_invalid_headers off;`，并按需转发 `client_secret`、`client_uuid`。升级完成后可移除这组兼容设置。

---

## 在线终端、文件管理或内网穿透提示并发流过多

Dashboard 会限制活跃 IOStream 数量，避免大量终端、文件传输或穿透连接占满资源：

- `too many concurrent streams for this user`：同一用户已占用 20 条在线终端或文件管理流。
- `too many concurrent streams for this server`：同一目标服务器已占用 40 条流；此统计包括在线终端、文件管理、内网穿透和 MCP 文件传输。

关闭已经不用的终端、文件管理窗口、穿透连接或文件传输后再重试。若数量看起来不符，请先确认相关客户端确实已断开，再检查 Dashboard 日志定位未结束的连接。
