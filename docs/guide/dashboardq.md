---
outline: deep
---

# Dashboard 常见问题

## 为什么管理面板中显示的 IP 和 Agent 实际 IP 不一致？

首先解释管理面板中显示的IP是怎么得到的：Agent 会每隔一段时间请求一遍 IP-API，获取到 IP 信息后上报到 Dashboard，目前使用的 IP-API 可在此查看：[myip.go](https://github.com/nezhahq/agent/blob/main/pkg/monitor/myip.go)。  
如您发现管理面板中显示的 IP 和服务商提供给您的 IP 不一致，最大的可能是服务商给您的是**入口 IP**，但 Agent 测试的是您的**出口 IP**。这个问题也可能会出现在多线服务器和 IPLC 专线中。

::: tip  
举个简单也十分常见的例子，服务商给您提供的是一台高防服务器，为了同时满足高防和低网络中断率的目标，提供给您的 IP 可能是经过映射后的高防 IP 而并非您服务器的真实出口 IP。
:::

您也可以在 Agent 服务器中运行以下命令测试出口 IP:

```shell
curl https://ipapi.co/ip/
curl ip.sb
curl ip-api.com
```

## 忘记查看密码\删除查看密码

请查看或编辑 `/opt/nezha/dashboard/data/config.yaml` 文件。   
密码位于 `site-viewpassword` 项中。

## 面板安装/重启/更新失败: iptables ......

首先尝试重启 Docker 再操作：

```shell
systemctl status docker
systemctl restart docker
systemctl status docker
```

重启后尝试重新安装面板。  
若依然出现 iptables... 等错误，则考虑直接关闭 iptables 甚至移除 iptables。  
这个问题也可能与内核有关，也可以尝试更换官方内核。

## 面板重启失败：Invalid hostPort: nz_site_port 等

如出现此问题，可以通过安装脚本修改配置，或者直接修改 `/opt/nezha/dashboard/docker-compose.yaml` 文件。

## 面板布局错误、CSS 资源无法被加载

如果出现 Dashboard 页面布局错误，通常是 CSS 文件丢失或无法被加载。  
出现此类错误，可以先尝试 `重启并更新面板`。  
如果更新面板后问题没有得到解决，那么可能是你的 vhost 配置文件内有不适用的配置，你可以编辑 Nginx 的 vhost 文件或在宝塔面板内：

1. 在 `网站` 中找到安装 Dashboard 时配置的站点，点击右侧 `设置`。
2. 选择 `配置文件`，删除配置文件中的：

    ```nginx
    location ~ .*\.(js|css)?$
        {
            expires      12h;
            error_log /dev/null;
            access_log /dev/null;
        }
    ```

3. 保存配置，并清空浏览器、Nginx、CDN 中的缓存，此时刷新页面应恢复正常。

## 面板无法启动：panic：无法找到配置的 DDNS 提供者...

填入的 DDNS provider 的值有误，目前仅支持 `webhook`、`cloudflare`、`tencentcloud` 和 `dummy`。

## 面板更新 DDNS 崩溃：panic：interface conversion: interface {} is nil, not []interface {}

填入的 DDNS `AccessID` 或 `AccessSecret` 有误。

## 面板警告：NEZHA>> 错误的服务监控上报...

1. Dashboard 与 Agent 版本不兼容导致含有对端不支持的 `TaskType` 导致，全部更新至最新版本即可解决。

2. Dashboard v0.17.10 - v0.18.0 也存在此问题，更新至最新版本可以解决。

## 无法启动 Agent 服务：Unix syslog delivery error

此报错见于 Agent v0.16.9+。原因为系统的 `/dev/log` 套接字工作不正常或不存在。可参考 <https://unix.stackexchange.com/questions/317064/how-do-i-restore-dev-log-in-systemdrsyslog-host> 解决。如果使用的是 Docker，请避免使用 `systemd` 等 init 系统。

## 打开网络监控页显示：server monitor history not found

出现此错误说明没有在服务页中设置 TCP-Ping 和 ICMP-Ping 类型的监控或者监控数据还未生成。   
如已经设置完毕，可以等待一段时间后再查看。

## 启用 HTTPS 后 /terminal 或 /ws 不能正常连接

常常是由于证书不完整造成的，请在 agent 运行参数中添加 -d，若 log 中有 `x509:certificate signed by unknown authority`，更换完整证书则可解决该问题。

## 对面板提供的数据修改/增加功能不满意，想要修改/增加数据

常见于批量新建 Agent 等需求中，可以直接修改数据库。  
请注意，数据库中并非什么都可以修改，错误的修改会导致数据混乱无法启动 Dashboard，**请勿随意修改数据库！**  
::: danger  
再重复一遍，**请勿随意修改数据库！**  
:::  
如需要在数据库中修改数据，请先**停止**面板容器再修改。  
数据库类型是 sqlite3，位于 `/opt/nezha/dashboard/data/sqlite.db`，修改前请备份。

## Dashboard 会自动更新吗？

Agent 通常情况下会自动更新，但 Dashboard 并不会，需要手动更新。

## 连接在线终端时提示：`Agent 信令下发失败`

当 Agent 离线，或与 Dashboard 之间的连接不稳定时，可能会导致在线终端无法正常连接。
请检查 Agent 是否正常运行，是否与 Dashboard 保持稳定的连接。