---
outline: deep
---

# 通知设置

哪吒监控支持对服务器的负载、CPU、内存、硬盘、流量、月流量、进程数和连接数进行监控，并在达到用户设定的阈值时发送通知。

## 灵活的通知方式

- 在面板消息中，`#DATETIME#` 代表事件发生的时间戳，当通知被触发时，会自动替换为实际时间。
- `#NEZHA#` 是面板消息占位符，触发通知时会自动替换为实际消息内容。
- **请求体内容格式：**
  - 当请求类型为 **FORM** 时，使用 `key:value` 的形式，`value` 中可包含占位符，通知时会自动替换。
  - 当请求类型为 **JSON** 时，会进行简单的字符串替换后直接提交到 `URL`。
- **URL** 中也可包含占位符，请求时会进行字符串替换。

**请参考以下通知方式示例，您也可以根据需求自定义推送方式。**

---

### 支持的占位符

| 占位符              | 含义             |
| ------------------- | ---------------- |
| `#NEZHA#`           | 通知内容         |
| `#SERVER.NAME#`     | 服务器名称       |
| `#SERVER.IP#`       | 服务器 IP        |
| `#SERVER.IPV4#`     | 服务器 IPv4 地址 |
| `#SERVER.IPV6#`     | 服务器 IPv6 地址 |
| `#SERVER.CPU#`      | CPU 使用率       |
| `#SERVER.MEM#`      | 内存使用率       |
| `#SERVER.SWAP#`     | 交换分区使用率   |
| `#SERVER.DISK#`     | 磁盘使用率       |
| `#SERVER.NETINSPEED#` | 实时上传速度    |
| `#SERVER.NETOUTSPEED#` | 实时下载速度   |
| `#SERVER.TRANSFERIN#` | 总上传流量     |
| `#SERVER.TRANSFEROUT#` | 总下载流量    |
| `#SERVER.LOAD1#`    | 1分钟内负载      |
| `#SERVER.LOAD5#`    | 5分钟内负载      |
| `#SERVER.LOAD15#`   | 15分钟内负载     |

---

### Bark 示例

<details>
  <summary>点击展开/收起</summary>

- **名称**：Bark
- **URL 组成**：
  - GET 请求：`/:key/:body` 或 `/:key/:title/:body` 或 `/:key/:category/:title/:body`
  - POST 请求：`/push`
- **请求方式**：
  - GET 或 POST
- **请求类型**：
  - GET 请求：默认
  - POST 请求：`form`
- **Body**：
  - GET 请求：空
  - POST 请求：
    ```json
    {
      "title": "#SERVER.NAME#",
      "device_key": "xxxxxxxxx",
      "body": "#NEZHA#",
      "icon": "https://xxxxxxxx/nz.png"
    }
    ```
  
</details>

---

### Slack 示例（贡献者：[@白歌](https://github.com/cantoblanco)）

<details>
  <summary>点击展开/收起</summary>

#### 获取 URL 参数

1. **创建 Slack App**：在 [Slack API](https://api.slack.com/apps) 创建一个新的 App。
2. **添加 Incoming Webhook**：在 App 的功能页添加 Incoming Webhooks，并激活。
3. **生成 Webhook URL**：点击 “Add New Webhook to Workspace”，选择一个 Channel，授权后获得 Webhook URL。

**通知配置：**

- **名称**：Slack
- **URL**：`https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX`
- **请求方式**：`POST`
- **请求类型**：`JSON`
- **Body**：
  ```json
  {
    "text": "#NEZHA#"
  }
  ```

</details>

---

### Server 酱示例

<details>
  <summary>点击展开/收起</summary>

- **简单示例：**

  - **名称**：Server 酱
  - **URL**：`https://sc.ftqq.com/SCUrandomkeys.send?title=哪吒通知信息&desp=#NEZHA#`
  - **请求方式**：`GET`
  - **请求类型**：默认
  - **Body**：空

- **进阶示例：**

  - **名称**：Server 酱
  - **URL**：`https://sc.ftqq.com/SCUrandomkeys.send`
  - **请求方式**：`POST`
  - **请求类型**：`FORM`
  - **Body**：
    ```json
    {
      "title": "#SERVER.NAME#",
      "desp": "**#NEZHA#\n\n平均负载: \"#SERVER.LOAD1#\",\"#SERVER.LOAD5#\",\"#SERVER.LOAD15#\"\n\n## [点击访问面板](https://你的面板域名)\n\n![logo](https://raw.githubusercontent.com/naiba/nezha/master/resource/static/brand.svg)"
    }
    ```

  **通知效果预览：**

  ![Server 酱通知效果](https://github.com/iilemon/nezhahq.github.io/blob/main/docs/images/photo_2023-03-16_00-22-47a.jpg?raw=true)

</details>

---

### Telegram 示例（贡献者：[@白歌](https://github.com/cantoblanco)）

<details>
  <summary>点击展开/收起</summary>

#### 获取 URL 参数

1. **获取机器人 Token**：与 [@BotFather](https://t.me/BotFather) 对话，发送 `/newbot` 创建新机器人，获取 Token。
2. **获取用户 ID**：与 [@userinfobot](https://t.me/userinfobot) 对话，获取你的用户 ID。
3. **与机器人对话**：先与新创建的机器人发送一条消息，确保机器人可以发送消息给你。

**通知配置：**

- **名称**：Telegram
- **URL**：`https://api.telegram.org/bot<你的机器人Token>/sendMessage?chat_id=<你的用户ID>&text=#NEZHA#`
- **请求方式**：`GET`
- **请求类型**：默认
- **Body**：空

**注意**：将 `<你的机器人Token>` 和 `<你的用户ID>` 替换为实际值。

</details>

---

### wxpusher 示例

<details>
  <summary>点击展开/收起</summary>

**需提前关注你的应用**

- **名称**：wxpusher
- **URL**：`http://wxpusher.zjiecode.com/api/send/message`
- **请求方式**：`POST`
- **请求类型**：`JSON`
- **Body**：
  ```json
  {
    "appToken": "你的appToken",
    "topicIds": [],
    "content": "#NEZHA#",
    "contentType": "1",
    "uids": ["你的uid"]
  }
  ```

</details>

---

### 邮件通知示例（使用 SendCloud，贡献者：[@白歌](https://github.com/cantoblanco)）

<details>
  <summary>点击展开/收起</summary>

**注意**：SendCloud 每日有免费发送邮件限额，此处仅作示例。

#### 获取 URL 参数

1. **注册账号**：在 [SendCloud](https://www.sendcloud.net/) 注册并登录。
2. **获取 APIUSER 和 APIKEY**：在账号设置中获取。
3. **设置发件和收件邮箱**：自定义发件邮箱和收件邮箱。

**通知配置：**

- **名称**：邮件通知
- **URL**：
  ```
  https://api.sendcloud.net/apiv2/mail/send?apiUser=<APIUSER>&apiKey=<APIKEY>&from=<发件邮箱>&fromName=Nezha&to=<收件邮箱>&subject=Nezha-Notification&html=#NEZHA#
  ```
- **请求方式**：`POST`
- **请求类型**：`JSON`
- **Header**：空
- **Body**：空

**注意**：替换 `<APIUSER>`、`<APIKEY>`、`<发件邮箱>`、`<收件邮箱>` 为实际值。

</details>

---

### 钉钉群机器人配置示例

<details>
  <summary>点击展开/收起</summary>

#### 获取 URL 参数

1. **创建机器人**：在钉钉群的设置中添加机器人，选择自定义关键词方式。
2. **获取 Webhook URL**：创建完成后获得。

**通知配置：**

- **名称**：哪吒探针小跟班
- **URL**：`https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxxxxx`
- **请求方式**：`POST`
- **请求类型**：`JSON`
- **Header**：
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Body**：
  ```json
  {
    "msgtype": "text",
    "text": {
      "content": "哪吒探针：\n#NEZHA#"
    }
  }
  ```

**注意**：将 `access_token` 替换为你的机器人 Token，`content` 中需包含自定义关键词。

</details>

---

### 企业微信群机器人示例（贡献者：[@ChowRex](https://github.com/ChowRex)）

<details>
  <summary>点击展开/收起</summary>

#### 配置示例

- **名称**：企业微信群机器人
- **URL**：`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_BOT_KEY`
- **请求方式**：`POST`
- **请求类型**：`JSON`
- **Body**：
  ```json
  {
    "msgtype": "markdown",
    "markdown": {
      "content": "# 哪吒通知消息\n\n#NEZHA#\n\n> **名称**: #SERVER.NAME#\n> **IP**: #SERVER.IP#\n> **CPU**: #SERVER.CPU#%\n> **内存**: #SERVER.MEM#%\n> **磁盘**: #SERVER.DISK#%\n"
    }
  }
  ```

**通知效果预览：**

![企业微信通知效果](https://user-images.githubusercontent.com/30169860/223605620-eac53ee6-09f9-4583-94fa-9b0cdedba81c.png)

</details>

---

### 飞书群机器人配置示例（贡献者：[@eya46](https://github.com/eya46)）

<details>
  <summary>点击展开/收起</summary>

#### 获取 URL 参数

1. **创建机器人**：在飞书群设置中添加自定义机器人（Webhook）。
2. **获取 Webhook URL**：创建完成后获得。

**通知配置：**

- **名称**：哪吒面板 Bot
- **URL**：`https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxxxxxxxxxxx`
- **请求方式**：`POST`
- **请求类型**：`JSON`
- **Body**：
  ```json
  {
    "msg_type": "text",
    "content": {
      "text": "#NEZHA#\n#DATETIME#"
    }
  }
  ```

</details>

---

### Matrix 通知示例

<details>
  <summary>点击展开/收起</summary>

#### 参数说明

- **变量替换**：将以下变量替换为实际值
  - `$YOUR_HOME_SERVER`：Matrix 服务器地址
  - `$YOUR_NEZHA_URL`：你的哪吒面板 URL
  - `$YOUR_MATRIX_USERNAME`：Matrix 用户名
  - `$YOUR_MATRIX_PASSWD`：Matrix 用户密码
  - `$YOUR_MATRIX_TOKEN`：Matrix 访问令牌
  - `$ROOM_ID`：Matrix 房间 ID

#### 获取访问令牌

使用以下命令获取 `YOUR_MATRIX_TOKEN`：

```bash
curl -XPOST -d '{"type": "m.login.password", "identifier": {"user": "$YOUR_MATRIX_USERNAME", "type": "m.id.user"}, "password": "$YOUR_MATRIX_PASSWD"}' "https://$YOUR_HOME_SERVER/_matrix/client/r0/login"
```

#### 通知配置

- **名称**：Matrix
- **URL**：`https://$YOUR_HOME_SERVER/_matrix/client/r0/rooms/$ROOM_ID/send/m.room.message`
- **请求方式**：`POST`
- **请求类型**：`JSON`
- **Header**：
  ```json
  {
    "Authorization": "Bearer $YOUR_MATRIX_TOKEN"
  }
  ```
- **Body**：
  ```json
  {
    "msgtype": "m.text",
    "format": "org.matrix.custom.html",
    "formatted_body": "<h1><a href=\"$YOUR_NEZHA_URL\" target=\"_blank\">Nezha Dashboard</a></h1><ul><li>时间：#DATETIME#</li><li>消息：#NEZHA#</li></ul>",
    "body": "#NEZHA#"
  }
  ```

**使用步骤**：

1. **替换变量**：将所有 `$` 开头的变量替换为你的实际值。
2. **获取 Token**：使用上述命令获取 `YOUR_MATRIX_TOKEN`。
3. **配置请求**：按照配置填写 URL、Header 和 Body。
4. **发送通知**：配置完成后，通知将发送到指定的 Matrix 房间。

</details>

---

## 警报规则说明

**在配置警报规则之前，请先配置通知方式，然后在分组设置中为通知方式配置通知组。警报规则将以通知组为单位发送通知。**

### 基本规则

- **`type`**：可选一个或多个类型，**同时满足**所选类型才会触发通知。
  - **资源类**：`cpu`、`gpu`、`memory`、`swap`、`disk`
  - **网络类**：`net_in_speed`（入站网速）、`net_out_speed`（出站网速）、`net_all_speed`（双向网速）、`transfer_in`（入站流量）、`transfer_out`（出站流量）、`transfer_all`（双向流量）
  - **系统类**：`offline`（离线监控）、`load1`、`load5`、`load15`（负载）、`process_count`（进程数）
  - **连接数**：`tcp_conn_count`、`udp_conn_count`
  - **温度**：`temperature_max`（最高温度值）
- **`duration`**：持续时间（秒），在此时间内采样记录 30% 以上触发阈值才会通知（防止数据波动引起误报）。
- **`min` / `max`**：
  - 流量、网速类单位为字节（1KB=1024B，1MB=1024\*1024B）。
  - 内存、硬盘、CPU 使用百分比（0-100）。
  - 离线监控无需设置此项。
- **`cover`**：
  - `0`：监控所有服务器，可通过 `ignore` 忽略特定服务器。
  - `1`：忽略所有服务器，可通过 `ignore` 选择特定服务器进行监控。
- **`ignore`**：与 `cover` 配合使用，指定服务器的监控策略，格式为 `{服务器ID: true/false}`。

**示例**：

- **离线通知**：

  - **名称**：离线通知
  - **规则**：
    ```json
    [{"Type": "offline", "Duration": 10}]
    ```
  - **启用**：√

- **CPU 和内存监控**：

  - **名称**：CPU+内存
  - **规则**：
    ```json
    [
      {"Type": "cpu", "Min": 0, "Max": 50, "Duration": 10},
      {"Type": "memory", "Min": 20, "Max": 0, "Duration": 20}
    ]
    ```
  - **启用**：√

- **特定服务器通知发送到指定通知组**：

  - **场景**：服务器 1、2 离线 10 分钟后发送通知到通知组 A，服务器 3、4 离线 10 分钟后发送通知到通知组 B。
  
  - **规则一（通知组 A）**：
    - **名称**：1、2 离线通知
    - **规则**：
      ```json
      [{"Type": "offline", "Duration": 600, "Cover": 1, "Ignore": {"1": true, "2": true}}]
      ```
    - **通知组**：A
    - **启用**：√

  - **规则二（通知组 B）**：
    - **名称**：3、4 离线通知
    - **规则**：
      ```json
      [{"Type": "offline", "Duration": 600, "Cover": 1, "Ignore": {"3": true, "4": true}}]
      ```
    - **通知组**：B
    - **启用**：√

### 特殊规则：任意周期流量通知

可用于月流量监控。

- **`type`**：
  - `transfer_in_cycle`：周期内入站流量
  - `transfer_out_cycle`：周期内出站流量
  - `transfer_all_cycle`：周期内双向流量总和
- **`cycle_start`**：统计周期开始日期，格式为 RFC3339，例如 `2022-01-01T00:00:00+08:00`。
- **`cycle_interval`**：统计周期数量（如每 1 个月为一个周期）。
- **`cycle_unit`**：统计周期单位，可选 `hour`、`day`、`week`、`month`、`year`。
- **`min` / `max`**、`cover`、`ignore` 同基本规则。

**示例**：

- **月流量超限通知**：

  - **规则**：
    ```json
    [
      {
        "type": "transfer_out_cycle",
        "max": 1099511627776,
        "cycle_start": "2022-01-01T00:00:00+08:00",
        "cycle_interval": 1,
        "cycle_unit": "month",
        "cover": 1,
        "ignore": {"3": true, "4": true}
      }
    ]
    ```

  - **说明**：服务器 3、4 的出站月流量超过 1TB 时触发通知，统计周期从每月 1 号开始。

::: tip
如果对通知配置有疑问，可以使用以下第三方配置生成器简化操作（哪吒监控不对第三方生成器的功能性作任何保证）：

- [Nezha Rule Generator](https://nz.sina.us.kg/)：适用于大多数场景。
- [Nezha-Traffic-Alarm-Generator](https://wiziscool.github.io/Nezha-Traffic-Alarm-Generator/)：专注于周期流量通知规则生成。

:::

---

## 通知触发模式

- **总是**：每当 Agent 上报的状态符合通知规则时，都会触发一次通知。
- **仅一次**：仅在状态变化时触发通知，如从正常变为异常，或从异常恢复为正常。

---

## 设置通知时执行任务

如果需要在发送通知的同时执行特定任务，可以进行如下设置：

- **总是执行任务**：当通知状态从“正常”变为“异常”时，执行指定任务（需提前在任务页设置）。
- **仅一次执行任务**：当通知状态从“异常”恢复为“正常”时，执行指定任务（需提前在任务页设置）。