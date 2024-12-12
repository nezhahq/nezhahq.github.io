# Serverless Telegram Bot for Nezha

Contributor: 
+ [uubulb](https://codeberg.org/uubulb)

Project URL: <https://github.com/swkisdust/plain-nezha-bot>

A single-user, single-instance, multi-language private chat Nezha Telegram bot that can be deployed on Cloudflare Workers.

Inspired by https://github.com/nezhahq/Nezha-Telegram-Bot-V1

## Deployment

1. Clone this project and run `npm install` to install dependencies.
2. Create a Workers KV namespace using your preferred method and save its ID.
3. Modify `wrangler.toml` and update the `kv_namespaces` field with your KV information.
4. Modify `wrangler.toml` under `vars`:

  - `NZ_BASEURL`: Panel address, e.g., `https://ops.naibahq.com`.
  - `LANG`: Language, options are `en` and `zh-CN`, default is `en`.
  - `ENDPOINT_PATH`: Route path for receiving Telegram Webhook, e.g., `/endpoint`.

5. Create the following Secrets:

  - `TELEGRAM_BOT_TOKEN`: Bot token obtained from BotFather.
  - `TELEGRAM_SECRET`: Webhook authentication key.
  - `TELEGRAM_UID`: User UID, the bot will not interact with anyone other than this UID.
  - `PASSWORD`: Basic authentication password for register/unregister/refresh token operations.
  - `NZ_USERNAME`: Panel username for initial authentication and subsequent refreshes.
  - `NZ_PASSWORD`: Panel password for initial authentication and subsequent refreshes.

6. Run `npx wrangler deploy` to deploy the project.

## Usage

Access the `/register` route to register the Webhook and start using the bot.

If you do not need the bot temporarily, you can access `/unregister` to remove the Webhook.

By default, the token refresh operation is triggered every 30 minutes. You can modify this manually in `wrangler.toml` or access `/refresh` to refresh manually.
