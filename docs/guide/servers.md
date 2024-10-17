---
outline: deep
---

# 服务器

## 介绍

服务器区域负责管理 Agent，是哪吒探针中最基础的区域，也是其他功能的基础。

## 新增服务器

第一步是新增服务器，可以自定义名称、分组、排序和备注。  
拥有相同分组的服务器会在受支持的主题中划分到一起进行显示，备注仅会在后台显示，无需担心泄露信息。

## 安装 Agent

请参考前文[安装 Agent](/guide/agent.html)。  
推荐使用一键安装，即**配置好参数后**，点击服务器**一键安装**列上的对应的系统图标即可复制安装命令，在相应服务器上进行安装。

## 强制更新

Agent 更新相关的参数是 [自定义 Agent 监控项目](/guide/q7.html) 中的 `--disable-auto-update` 和 `--disable-force-update`。  
默认情况下，Agent 会自动更新，无需干预。但当用户关闭自动更新后，也可以选中指定服务器进行强制更新。  
`disable-force-update` 开启时此功能不生效。

## 数据列

* 版本号：记录 Agent 当前版本。
* 对游客隐藏：为 True 时，游客在面板中无法查看到此服务器。
* 启用 DDNS：为 True 时，当该服务器 IP 发生变化，Dashboard 会自动更新 DNS 记录。
* DDNS 域名：为该服务器配置的 DDNS 域名。
* 密钥：即 secret/key，配置 Agent 时会用到，用于验证 Agent 与 Dashboard 的通信。
* 一键安装：点击相应的系统按钮，复制命令到服务器执行即可一键安装。
* 备注：服务器备注，仅验证后可见。
* 公开备注：服务器公开备注，前台可见。可以根据此字段做一些自定义，具体见[公开备注示例](#公开备注示例)。
* 管理：分别为连接 WebShell，修改服务器配置，删除服务器。

## 在线终端

即 WebShell，`disable-command-execute` 开启时此功能不生效。  
Linux 和 Windows 均可用，可使用 Ctrl+Shift+V 粘贴。  
连接失败请参考[实时通道断开/在线终端连接失败](/guide/q4.html)。

## FM

Dashboard v0.19.1 / Agent v0.19.0 加入的新功能，是嵌入 WebShell 的一个伪文件管理器，提供文件下载和上传功能，也可以进行目录跳转或者复制路径。点击 WebShell 右下角的蓝色按钮就可以打开。

## 公开备注示例

### ServerStatus主题agent账单信息展示
<details>
  <summary>点击展开/收起</summary>

<strong>配置位置：后台-> 服务器 -> 编辑服务器 -> 公开备注</strong>

<strong>完整配置，包含过期时间和价格展示</strong>
```json
{
   "billingDataMod": {
       "startDate": "2024-10-01T00:00:00+08:00",
       "endDate": "2024-11-01T00:00:00+08:00",
       "autoRenewal": "1",
       "cycle": "月",
       "amount": "$3.99"
   }
}
```

<strong>单独配置过期时间</strong>
```json
{
   "billingDataMod": {
       "startDate": "2024-10-01T00:00:00+08:00",
       "endDate": "2024-11-01T00:00:00+08:00",
       "autoRenewal": "1",
       "cycle": "月"
   }
}
```

<strong>配置详细说明：</strong>

<strong>startDate 账单开始时间</strong>
```
格式如 2022-04-01T23:59:59+08:00
```

<strong>endDate 账单到期时间</strong>
```
格式如 2022-05-01T23:59:59+08:00
当以0000-00-00开头时，表示账单无期限，适用于永久免费的vps，如0000-00-00T23:59:59+08:00
```

<strong>Date格式说明</strong>
```
分3部分
1. 日期：2022-04-01
2. 时间：T23:59:59
3. 时区：+08:00
例如：
2024-10-01T23:59:59+05:00
2024-09-21T12:00:00-05:00
2024-03-15T23:59:59+00:00
```

<strong>autoRenewal 自动续期</strong>
```
支持值
1：自动续期
0：不自动续期
当设置 "autoRenewal": 1 时，程序会根据当前时间自动判断，vps账单到期后无需手动更改startDate和endDate
```

<strong>amount 价格</strong>
```
格式如 $9.99 、€19.92 、¥199、19.99HKD、9.99USD、49.99CNY
如果vps是免费的，请设置为"0" , 如 "amount": "0", 前台展示为 FREE
如果vps是按量收费，请设置为"-1" , 如 "amount": "-1", 前台展示为PAYG
```

<strong>cycle 付费周期</strong>
```
支持格式（英文大小写字母都支持，大小写字母混用也支持）
1. 月、month、monthly、m、mo
2. 季、quarterly、q
3. 半年、半、half、semi-annually、h
4. 年、year、annually、y、yr
```
</details>
