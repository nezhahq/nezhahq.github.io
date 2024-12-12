# Serverless 哪吒 Telegram 机器人

贡献者:  
+ [uubulb](https://codeberg.org/uubulb)

项目地址：<https://github.com/swkisdust/plain-nezha-bot>

单用户单面板多语言私聊哪吒 Telegram 机器人，可以在 Cloudflare Workers 上部署。

Inspired by https://github.com/nezhahq/Nezha-Telegram-Bot-V1

## 部署

1. Clone 本项目，运行 `npm install` 安装依赖。
2. 用你喜欢的方式创建一个 Workers KV 命名空间，保存下 ID。
3. 修改 `wrangler.toml`，将 `kv_namespaces` 字段改为你创建的 KV 信息。
4. 修改 `wrangler.toml` 中的 `vars`：

  - `NZ_BASEURL`：面板地址，例如 `https://ops.naibahq.com`。
  - `LANG`：语言，可选 `en` `zh-CN`，默认为 `en`。
  - `ENDPOINT_PATH`：接收 Telegram Webhook 的路由路径，例如 `/endpoint`。

5. 创建以下 Secrets：

  - `TELEGRAM_BOT_TOKEN`：从 BotFather 那里获取的机器人 Token。
  - `TELEGRAM_SECRET`：Webhook 认证密钥。
  - `TELEGRAM_UID`：用户 UID，机器人将不会与除此 UID 外的任何人互动。
  - `PASSWORD`：基本认证密码，用于进行 注册 / 取消注册 / 刷新 Token 操作。
  - `NZ_USERNAME`：面板用户名，用于初次认证及后续刷新。
  - `NZ_PASSWORD`：面板密码，用于初次认证及后续刷新。

6. 输入 `npx wrangler deploy` 部署项目。

## 使用

访问 `/register` 路由注册 Webhook 即可开始使用。

如暂时不需使用，可以访问 `/unregister` 删除 Webhook。

默认每 30 分钟触发一次 Token 刷新操作，可以在 `wrangler.toml` 中手动修改，或是访问 `/refresh` 手动刷新。
