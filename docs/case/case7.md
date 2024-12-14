---
outline: deep
---

# Broker for Nezha - 拓展 Nezha 接入平台
::: info

此项目暂未适配 V1 版本

:::
贡献者:  
+ [uubulb](https://codeberg.org/uubulb)

Broker for Nezha 是一个 Nezha Agent 的修改版本，其通过分离 Agent 的数据收集和 gRPC 上报功能，可使小型设备接入 Nezha Dashboard。

项目地址：<https://codeberg.org/uubulb/broker>

文档：[Broker for Nezha](https://broker.kuzu.uk/)

## 与原项目的不同
- 使用外置数据源，而不是从本地获取。
- 多数据源与多面板支持
- 仅支持部分任务类型，可参考项目 README 获取详细信息。

Broker for Nezha 需要与特定的数据收集软件一同使用。目前提供两种数据获取方式：
1. HTTP 主动获取（HTTP/1.1）
2. TCP 被动获取（推荐）

如需获取现有的数据收集软件，可以参考项目 README。

因数据获取方式缺乏安全性，建议仅在信任的网络环境使用。

## 编写数据收集端
如需自行编写数据收集端，除实现基本 HTTP 服务器或 TCP 客户端外，还需要使用特定的数据格式才可被 Broker 正常接收。具体请参考：[数据类型](https://broker.kuzu.uk/configuration/type/)

## 效果参考
<figure>
    <img src="/images/case7/dashboard.jpg" alt="Dashboard">
    <figcaption style="font-size: 0.9em; color: gray; text-align: center;">
    Dashboard
    </figcaption>
</figure>
<br />
<figure>
    <img src="/images/case7/webssh.jpg" alt="WebSSH">
    <figcaption style="font-size: 0.9em; color: gray; text-align: center;">
    WebSSH
    </figcaption>
</figure>
