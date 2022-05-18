哪吒监控支持对服务器的负载、CPU、内存、硬盘、带宽、流量、月流量、进程数、连接数进行监控，并在其中某项达到用户设定值时发送报警通知
<br/>
<br/>
## 灵活的通知方式  
`#NEZHA#` 是面板消息占位符，面板触发通知时会自动用实际消息替换占位符  

Body 内容是`JSON` 格式的：**当请求类型为 FORM 时**，值为 `key:value` 的形式，`value` 里面可放置占位符，通知时会自动替换。**当请求类型为 JSON 时** 只会简单进行字符串替换后直接提交到`URL`。

URL 里面也可放置占位符，请求时会进行简单的字符串替换。

你可以参考以下的通知方式示例，也可以根据自己的需求灵活设置推送方式

   - server酱示例

     - 名称：server 酱
     - URL：https://sc.ftqq.com/SCUrandomkeys.send?text=#NEZHA#
     - 请求方式: GET
     - 请求类型: 默认
     - Body: 空

   - wxpusher 示例，需要关注你的应用

     - 名称: wxpusher
     - URL：http://wxpusher.zjiecode.com/api/send/message
     - 请求方式: POST
     - 请求类型: JSON
     - Body: `{"appToken":"你的appToken","topicIds":[],"content":"#NEZHA#","contentType":"1","uids":["你的uid"]}`

   - Telegram 示例 [@haitau](https://github.com/haitau) 贡献

     - 名称：telegram 机器人消息通知
     - URL：https://api.telegram.org/botXXXXXX/sendMessage?chat_id=YYYYYY&text=#NEZHA#
     - 请求方式: GET
     - 请求类型: 默认
     - Body: 空
     - URL 参数获取说明：botXXXXXX 中的 XXXXXX 是在 telegram 中关注官方 @Botfather ，输入/newbot ，创建新的机器人（bot）时，会提供的 token（在提示 Use this token to access the HTTP API:后面一行）这里 'bot' 三个字母不可少。创建 bot 后，需要先在 telegram 中与 BOT 进行对话（随便发个消息），然后才可用 API 发送消息。YYYYYY 是 telegram 用户的数字 ID。与机器人@userinfobot 对话可获得。

<br/>
<br/>

## 报警规则说明

### 基本规则

- type：可选取一个或多个类型，如在一个规则中选择了多个类型，需要**同时满足**所有选择的类型才会触发通知（可参考后面的示例）
  - `cpu`、`memory`、`swap`、`disk`
  - `net_in_speed` 入站网速、`net_out_speed` 出站网速、`net_all_speed` 双向网速、`transfer_in` 入站流量、`transfer_out` 出站流量、`transfer_all` 双向流量
  - `offline` 离线监控
  - `load1`、`load5`、`load15` 负载
  - `process_count` 进程数 _目前取线程数占用资源太多，暂时不支持_
  - `tcp_conn_count`、`udp_conn_count` 连接数
- duration：持续数秒，数秒内采样记录 30% 以上触发阈值才会报警（防数据插针）
- min 或 max：
  - 流量、网速类数值 为字节（1KB=1024B，1MB = 1024\*1024B）
  - 内存、硬盘、CPU 以占用百分比计数
  - 离线监控无需设置此项
- cover： 
  - `0` 监控所有，通过 `ignore` 忽略特定服务器
  - `1` 忽略所有，通过 `ignore` 监控特定服务器  
  例如：`[{"type":"offline","duration":10, "cover":0, "ignore":{"5": true}}]`
- ignore:  选择忽略特定服务器，搭配 `cover` 使用，内容为服务器id和布尔值，例如：`{"1": true, "2":false}`  

**完整示例:**  
:::tip 
添加一个离线报警

   - 名称：离线通知
   - 规则：`[{"Type":"offline","Duration":10}]`
   - 启用：√
:::  

:::tip 
添加一个监控 CPU 持续 10s 超过 50% **且** 内存持续 20s 占用低于 20% 的报警

   - 名称：CPU+内存
   - 规则：`[{"Type":"cpu","Min":0,"Max":50,"Duration":10},{"Type":"memory","Min":20,"Max":0,"Duration":20}]`
   - 启用：√
:::  
<br/> 

### 特殊：任意周期流量报警

可以用作月流量报警

- type:
  - `transfer_in_cycle` 周期内的入站流量
  - `transfer_out_cycle` 周期内的出站流量
  - `transfer_all_cycle` 周期内双向流量和
- cycle_start： 统计周期开始日期（可以是你机器计费周期的开始日期），时间格式为RFC3339，例如北京时间为`2022-01-11T08:00:00.00+08:00`
- cycle_interval：每隔多少个周期单位（例如，周期单位为天，该值为 7，则代表每隔 7 天统计一次）
- cycle_unit 统计周期单位，默认`hour`,可选(`hour`, `day`, `week`, `month`, `year`)
- min/max、cover、ignore 参考基本规则配置

示例: ID 为 3 的服务器（ignore 里面定义），以每月 15 号为统计周期，周期内统计的出站月流量达到 1TB 时报警 `[{"type":"transfer_out_cycle","max":1000000000000,"cycle_start":"2022-01-11T08:00:00.00+08:00","cycle_interval":1,"cycle_unit":"month","cover":1,"ignore":{"3":true}}]`
  ![7QKaUx.md.png](https://s4.ax1x.com/2022/01/13/7QKaUx.md.png)