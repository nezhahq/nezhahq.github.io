---
outline: deep
---

# 通知设置

哪吒监控支持对服务器的负载、CPU、内存、硬盘、流量、月流量、进程数、连接数进行监控，并在达到用户设定的阈值时发送告警通知。

## 灵活的通知方式

- 在面板消息中，占位符 `#DATETIME#` 代表事件发生的时间戳。当通知被触发时，面板会自动将 `#DATETIME#` 替换为事件的实际时间。
- `#NEZHA#` 是面板消息占位符，面板触发通知时会自动用实际消息替换占位符。
- Body 内容是 `JSON` 格式的：**当请求类型为 FORM 时**，值为 `key:value` 的形式，`value` 里面可放置占位符，通知时会自动替换。**当请求类型为 JSON 时** 只会简单进行字符串替换后直接提交到 `URL`。
- URL 里面也可放置占位符，请求时会进行简单的字符串替换。

**请参考以下的通知方式示例，也可以根据自己的需求灵活设置推送方式。**

### Bark 示例
<details>
  <summary>点击展开/收起</summary>

- 名称：Bark
- URL 组成: /:key/:body or /:key/:title/:body or /:key/:category/:title/:body 
- 请求方式: GET
- 请求类型: 默认
- Body: 空

- 名称：Bark
- URL 组成: /push
- 请求方式: POST
- 请求类型: form
- Body: `{"title": "#SERVER.NAME#","device_key":"xxxxxxxxx","body":"#NEZHA#","icon":"https://xxxxxxxx/nz.png"}`

</details>

### Slack 示例 贡献者：[@白歌](https://github.com/cantoblanco)
<details>
  <summary>点击展开/收起</summary>

#### URL 参数获取说明

请提前准备好 Slack 的 Workspace 并为这个 Workspace 创建一个 App。如果你还没有创建，可以在 [Slack API](https://api.slack.com/apps) 创建一个 App。

创建完成 App 后，需要为这个 App 添加一个 Incoming Webhook。在 App 的设置页面中找到 Incoming Webhooks，将 Activate Incoming Webhooks 勾选为 ON，在页面下方找到并点击 Add New Webhook to Workspace，选择一个 Channel，然后点击允许。完成创建后，你会得到一个 Webhook URL，使用这个 URL 替换下方的示例 URL。

- 名称：Slack
- URL：https://hooks.slack.com/services/xxxxxxxxx/xxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxx
- 请求方式: POST
- 请求类型: JSON
- Body: `{"text":"#NEZHA#"}`

</details>

### Server 酱示例
<details>
  <summary>点击展开/收起</summary>

- 名称：Server 酱
- URL：https://sc.ftqq.com/SCUrandomkeys.send?title=哪吒告警信息&desp=#NEZHA#
- 请求方式: GET
- 请求类型: 默认
- Body: 空

**Server 酱进阶**
- 名称：Server 酱
- URL：https://sc.ftqq.com/SCUrandomkeys.send
- 请求方式: POST
- 请求类型: FORM
- Body: 
  ```json
  {
    "title": "#SERVER.NAME#",
    "desp": "**#NEZHA#\n\n平均负载: \"#SERVER.LOAD1#\",\"#SERVER.LOAD5#\",\"#SERVER.LOAD15#\"\n\n## [点击访问面板](https://你的面板域名)\n\n![logo](https://raw.githubusercontent.com/naiba/nezha/master/resource/static/brand.svg)"
  }
  ```

  ![展示](https://github.com/iilemon/nezhahq.github.io/blob/main/docs/images/photo_2023-03-16_00-22-47a.jpg?raw=true) 

</details>

### Telegram 示例 贡献者：[@白歌](https://github.com/cantoblanco)
<details>
  <summary>点击展开/收起</summary>

#### URL 参数获取说明

请提前在 Telegram 中创建一个机器人，获取到机器人的 token 和你的 Telegram 用户 ID。

机器人的 token 和用户 ID 都是数字和字母的组合，可以在 Telegram 中与 @userinfobot 对话获取自己的用户 ID。与 @BotFather 对话，输入命令 /newbot 创建一个机器人，创建完成后可以获得机器人的 token。

得到的 token 和用户 ID 都是字符串，可以直接拼接到 URL 中，如下所示，将 botXXXXXX 中的 XXXXXX 替换为你的机器人 token，要保留其中的 bot，将 YYYYYY 替换为你的用户 ID。注意，你需要先与机器人对话，否则机器人无法发送消息给你。#NEZHA# 是占位符，不要修改和删除

- 名称：Telegram
- URL：https://api.telegram.org/botXXXXXX/sendMessage?chat_id=YYYYYY&text=#NEZHA#
- 请求方式: GET
- 请求类型: 默认
- Body: 留空

</details>

### wxpusher 示例
**需要提前关注你的应用**
<details>
  <summary>点击展开/收起</summary>

- 名称: wxpusher
- URL：http://wxpusher.zjiecode.com/api/send/message
- 请求方式: POST
- 请求类型: JSON
- Body: `{"appToken":"你的appToken","topicIds":[],"content":"#NEZHA#","contentType":"1","uids":["你的uid"]}`
</details>

### 邮件通知示例 - SendCloud 贡献者：[@白歌](https://github.com/cantoblanco)
<details>
  <summary>点击展开/收起</summary>

**注意：SendCloud 有每日免费发送邮件限额限制，这里仅作示例，你可以选择付费服务或其他类似的免费服务，使用方法类似。**

#### URL 参数获取说明

该示例使用 SendCloud 作为发信服务，需提前在 [SendCloud](https://www.sendcloud.net/) 注册账号，创建发件邮箱，然后在[这里](https://www.sendcloud.net/sendSetting/apiuser)获取 APIUSER 和 APIKEY。

替换示例 URL 中的 `<替换APIUSER>` 和 `<替换APIKEY>` 为自己的 APIUSER 和 APIKEY，替换 URL 中的 `<自定义发件邮箱>` 和 `<自定义收件邮箱>` 为任意的的发件邮箱和收件邮箱。

- 名称：邮件告警
- URL：https://api.sendcloud.net/apiv2/mail/send?apiUser=<替换APIUSER>&apiKey=<替换APIKEY>&from=<自定义发件邮箱>&fromName=Nezha&to=<自定义收件邮箱>&subject=Nezha-Notification&html=#NEZHA#
- 请求方式: POST
- 请求类型: JSON
- Header: 留空
- Body: 留空

</details>

### 钉钉群机器人配置 示例
<details>
  <summary>点击展开/收起</summary>

#### URL 参数获取说明

请提前在钉钉中创建一个机器人，获取到机器人的 token。

机器人 URL 在钉钉群 - 管理机器人 - 创建机器人后获取，安全方式选择自定义关键词，Body 中 content 值内需包含该关键词。

- 名称: 哪吒探针小跟班
- URL：https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxxxxx
- 请求方式: POST
- 请求类型: JSON
- Header: `{"Content-Type": "application/json"}`
- Body: `{"msgtype": "text","text": {"content":"哪吒探针：\n#NEZHA#"}}`

</details>

### 企业微信群机器人 示例 贡献者：[@ChowRex](https://github.com/ChowRex)
<details>
  <summary>点击展开/收起</summary>

支持的占位符一览

```json
{
    "content": "#NEZHA#",
    "ServerName": "#SERVER.NAME#",
    "ServerIP": "#SERVER.IP#",
    "ServerIPV4": "#SERVER.IPV4#",
    "ServerIPV6": "#SERVER.IPV6#",
    "CPU": "#SERVER.CPU#",
    "MEM": "#SERVER.MEM#",
    "SWAP": "#SERVER.SWAP#",
    "DISK": "#SERVER.DISK#",
    "NetInSpeed": "#SERVER.NETINSPEED#",
    "NetOutSpeed": "#SERVER.NETOUTSPEED#",
    "TransferIn": "#SERVER.TRANSFERIN#",
    "TranferOut": "#SERVER.TRANSFEROUT#",
    "Load1": "#SERVER.LOAD1#",
    "Load5": "#SERVER.LOAD5#",
    "Load15": "#SERVER.LOAD15#",
    "TCP_CONN_COUNT": "#SERVER.TCPCONNCOUNT",  # 无效
    "UDP_CONN_COUNT": "#SERVER.UDPCONNCOUNT",  # 无效
}
```

> [群机器人配置说明 - 文档 - 企业微信开发者中心](https://developer.work.weixin.qq.com/document/path/91770#markdown%E7%B1%BB%E5%9E%8B)

- 名称：企业微信群机器人
- URL：https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_BOT_KEY
- 请求方式: POST
- 请求类型: JSON
- Body: 
    ```json
    {
        "msgtype": "markdown",
        "markdown": {
            "content": "# 哪吒通知消息\n\n\"#NEZHA#\"\n\n> 名称: \"#SERVER.NAME#\"\n> IP: \"#SERVER.IP#\"\n> IPv4: \"#SERVER.IPV4#\"\n> IPv6: \"#SERVER.IPV6#\"\n> CPU: \"#SERVER.CPU#\"\n> 内存: \"#SERVER.MEM#\"\n> 交换分区: \"#SERVER.SWAP#\"\n> 存储: \"#SERVER.DISK#\"\n> 实时上传速度: \"#SERVER.NETINSPEED#\"\n> 实时下载速度: \"#SERVER.NETOUTSPEED#\"\n> 总上传: \"#SERVER.TRANSFERIN#\"\n> 总下载: \"#SERVER.TRANSFEROUT#\"\n> 1分钟内负载: \"#SERVER.LOAD1#\"\n> 5分钟内负载: \"#SERVER.LOAD5#\"\n> 15分钟内负载: \"#SERVER.LOAD15#\"\n> TCP连接数: \"#SERVER.TCPCONNCOUNT\"\n> UDP连接数: \"#SERVER.UDPCONNCOUNT\"\n\n"
        }
    }
    ```

根据需求删减相关内容信息即可。

![通知效果](https://user-images.githubusercontent.com/30169860/223605620-eac53ee6-09f9-4583-94fa-9b0cdedba81c.png)

</details>

### 飞书群机器人配置 示例 贡献者：[@eya46](https://github.com/eya46)
<details>
  <summary>点击展开/收起</summary>

#### URL 参数获取说明

机器人 URL 通过飞书群 - 群机器人 - 添加机器人 - 自定义机器人(webhook)创建后获取。

- 名称: 哪吒面板 Bot
- URL：https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxxxxxxxxxxx
- 请求方式: POST
- 请求类型: JSON
- Body: `{"content":{"text":"#NEZHA#\n#DATETIME#"},"msg_type":"text"}`

</details>

### Matrix 通知示例

<details>
  <summary>点击展开/收起</summary>

#### 参数说明

* 以 `$` 开头的大写变量都需要替换为你的实际值。
  * **`YOUR_HOME_SERVER`**: Matrix 服务器的地址。
  * **`YOUR_NEZHA_URL`**: 你的哪吒面板的 URL。
  * **`YOUR_MATRIX_USERNAME`** 和 **`YOUR_MATRIX_PASSWD`**: Matrix 用户名和密码。
  * **`YOUR_MATRIX_TOKEN`** 获取方式：
    ```sh
    curl -XPOST -d '{"type": "m.login.password", "identifier": {"user": "$YOUR_MATRIX_USERNAME", "type": "m.id.user"}, "password": "$YOUR_MATRIX_PASSWD"}' "https://$YOUR_HOME_SERVER/_matrix/client/r0/login"
    ```

#### 请求配置

- **名称**: Matrix
- **URL**: `https://$YOUR_HOME_SERVER/_matrix/client/r0/rooms/$ROOM_ID/send/m.room.message`
- **请求方式**: `POST`
- **请求类型**: `JSON`
- **Header**:
  ```json
  {
    "Authorization": "Bearer $YOUR_MATRIX_TOKEN"
  }
  ```
- **Body**:
  ```json
  {
    "msgtype": "m.text",
    "format": "org.matrix.custom.html",
    "formatted_body": "<html><head><title>Nezha Dashboard</title></head><body><h1><a href=\"$YOUR_NEZHA_URL\" target=\"_blank\">Nezha Dashboard</a></h1><ul><li>datetime: #DATETIME#</li><li>Message: #NEZHA#</li></ul></body></html>",
    "body": "#NEZHA#"
  }
  ```
#### 使用步骤

1. **替换变量**: 将 `$YOUR_HOME_SERVER`, `$YOUR_NEZHA_URL`, `$YOUR_MATRIX_USERNAME`, `$YOUR_MATRIX_PASSWD`, 以及 `$YOUR_MATRIX_TOKEN` 替换为你自己的值。
2. **获取 Token**: 使用上面提供的 `curl` 命令来获取 `YOUR_MATRIX_TOKEN`，确保替换所有相关的变量。
3. **配置请求**: 使用上述配置来设置你的请求，确保使用正确的 URL、请求头和请求体。
4. **发送通知**: 通过配置后的请求发送 Matrix 消息，完成哪吒监控的通知集成。

这样设置好后，每次触发通知时，你的 Matrix 房间中就会收到格式化的哪吒面板信息。

</details>

## 告警规则说明

### 基本规则

- `type`：可选取一个或多个类型，如在一个规则中选择了多个类型，需要**同时满足**所有选择的类型才会触发通知（可参考后面的示例）
  - `cpu`、`gpu`、`memory`、`swap`、`disk`
  - `net_in_speed` 入站网速、`net_out_speed` 出站网速、`net_all_speed` 双向网速、`transfer_in` 入站流量、`transfer_out` 出站流量、`transfer_all` 双向流量
  - `offline` 离线监控
  - `load1`、`load5`、`load15` 负载
  - `process_count` 进程数（目前取线程数占用资源太多，暂时不支持）
  - `tcp_conn_count`、`udp_conn_count` 连接数
  - `temperature_max` 最高温度值
- `duration`：持续数秒，数秒内采样记录 30% 以上触发阈值才会告警（防数据插针）
- `min` 或 `max`：
  - 流量、网速类单位为字节（1KB=1024B，1MB=1024*1024B）
  - 内存、硬盘、CPU 以占用百分比计数
  - 离线监控无需设置此项
- `cover`： 
  - `0` 监控所有服务器，通过 `ignore` 忽略特定服务器
  - `1` 忽略所有服务器，通过 `ignore` 监控特定服务器  
  例如：`[{"type":"offline","duration":10, "cover":0, "ignore":{"5": true}}]`
- `ignore`：选择忽略特定服务器，搭配 `cover` 使用，内容为服务器 ID 和布尔值，例如：`{"1": true, "2": false}`

**完整示例:**  

添加一个离线告警：

- 名称：离线通知
- 规则：`[{"Type":"offline","Duration":10}]`
- 启用：√

添加一个监控 CPU 持续 10 秒超过 50% **且** 内存持续 20 秒占用低于 20% 的告警：

- 名称：CPU+内存
- 规则：`[{"Type":"cpu","Min":0,"Max":50,"Duration":10},{"Type":"memory","Min":20,"Max":0,"Duration":20}]`
- 启用：√

将特定的服务器通知发送到特定的通知分组：

示例场景：  
有 1、2、3、4 四台服务器和 A、B 两个不同的通知组。  
1、2 这两台服务器掉线十分钟后给通知组 A 发送通知。  
3、4 这两台服务器掉线十分钟后给通知组 B 发送通知。

首先你需要先设置好 A、B 两个通知组，然后添加两条告警规则：

**规则一：**

- 名称：1、2 离线，发送给通知组 A
- 规则：`[{"type":"offline","duration":600,"cover":1,"ignore":{"1":true,"2":true}}]`
- 通知方式组：A
- 启用：√

**规则二：**

- 名称：3、4 离线，发送给通知组 B
- 规则：`[{"type":"offline","duration":600,"cover":1,"ignore":{"3":true,"4":true}}]`
- 通知方式组：B
- 启用：√

**灵活使用参数可以让你的告警功能被充分使用**  

### 特殊：任意周期流量告警

可以用作月流量监控

- `type`：
  - `transfer_in_cycle` 周期内的入站流量
  - `transfer_out_cycle` 周期内的出站流量
  - `transfer_all_cycle` 周期内双向流量的和
- `cycle_start`：统计周期开始日期（可以是你机器计费周期的开始日期），时间格式为 RFC3339，例如北京时间为 `2022-01-11T08:00:00.00+08:00`
- `cycle_interval`：统计周期单位的数量（例如，周期单位为天，该值为 7，则代表每隔 7 天统计一次）
- `cycle_unit`：统计周期单位，默认 `hour`，可选（`hour`, `day`, `week`, `month`, `year`）
- `min/max`、`cover`、`ignore` 参考基本规则配置

示例:  

ID 为 3 和 4 的服务器（ignore 里面定义），以每月 1 号为统计周期，周期内统计的出站月流量达到 1TB 时告警：

```json
[{"type":"transfer_out_cycle","max":1099511627776,"cycle_start":"2022-01-01T00:00:00+08:00","cycle_interval":1,"cycle_unit":"month","cover":1,"ignore":{"3":true,"4":true}}]
```

::: tip
如果对告警配置仍感到有困难，可以试试以下第三方配置生成器简化操作。哪吒监控不对生成配置的功能性作任何保证。

- [Nezha Rule Generator](https://nz.sina.us.kg/): 适用绝大多数场景
- [Nezha-Traffic-Alarm-Generator](https://wiziscool.github.io/Nezha-Traffic-Alarm-Generator/): 适用于生成周期流量告警规则，且更加方便一些
:::

## 通知触发模式

- **始终触发**：每当 Agent 上报的状态符合告警的规则时，都会触发一次通知。
- **单次触发**：仅状态改变时触发一次通知，如从正常状态改变为异常状态，或异常状态恢复为正常状态。

## 设置告警时执行任务

如果需要在发出告警消息的同时执行某项任务，可以设置此项目。

- **告警时触发任务**：当告警状态符合从“正常”变更为“事件”时，所要执行的任务，任务应提前在任务页设置。
- **恢复时触发任务**：当告警状态符合从“事件”恢复为“正常”时，所要执行的任务，任务应提前在任务页设置。
