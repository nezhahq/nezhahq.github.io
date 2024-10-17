---
outline: deep
---

# DDNS

DDNS 功能适用于使用动态 IP 的服务器，当 Agent 上报了一个新的 IP（10分钟一次），Dashboard 会根据配置自动更新 DNS 记录。

## 为什么我要使用哪吒监控的 DDNS 功能？

- 方便集中管理 DDNS 设置，而不是在每台服务器上都部署一个 DDNS 服务。
- 仅在面板服务器上保存您的机密信息，防止外泄。

## 配置说明

可以直接在 Dashboard 管理页面中添加 DDNS 配置。

1. 点击菜单栏中的“动态 DNS”选项，进入配置页面。
2. 点击“新配置”按钮，在弹出窗口中按需填写信息。选项说明：
    - **名称**：配置名称。
    - **DDNS供应商**：供应商类型，决定了使用何种方法更新 DNS 记录。
    - **域名（逗号分隔）**：域名，如填写多个域名需要用 `,` 分隔。支持 IDN（国际化域名）。
    - **最大重试次数**：DDNS 更新尝试次数，默认为 3，范围为 1 到 10 的整数。
    - **DDNS 凭据 1** 以及 **DDNS 凭据 2** 为选填，通常需要至少填 1 个。下面的[表格](#供应商列表)列出了所有供应商的对应选项。
3. 如果使用 `webhook` 供应商，那么需要按需填写 Webhook 的对应选项。具体的说明请见 [Webhook 配置说明](#webhook-配置说明)。
4. 需要至少勾选 **启用DDNS IPv4** 和 **启用DDNS IPv6** 中的一个，否则不会进行任何更新操作。
5. 在添加了新的配置后，还需要修改服务器配置才能使 DDNS 生效。服务器相关选项说明：
    - **启用 DDNS**：为此服务器启用 DDNS 功能。
    - **DDNS 配置**：要使用的 DDNS 配置 ID 列表，可以根据配置名称进行搜索。

## Webhook 配置说明

Webhook 需要自行构建 HTTP 请求，适用于需要使用其它供应商的服务且操作较为简单的情况。

Webhook 相关选项说明：
- **Webhook 地址**：HTTP 请求 URL。其中只有参数可以使用占位符。
- **Webhook 请求方式**：HTTP 请求方式。支持 `GET`、`POST`、`PATCH`、`DELETE` 以及 `PUT`。
- **Webhook 请求类型**：HTTP 请求体格式，为 `JSON` 或者 `Form`。
- **Webhook 请求头**：HTTP 请求头，用 JSON 填写，注意不支持嵌套。
- **Webhook 请求体**：HTTP 请求体，`GET` 和 `DELETE` 不会使用。如需使用嵌套格式，必须选择 `JSON` 作为请求类型。

Webhook 支持的占位符：
- `#ip#`：主机 IP。
- `#domain#`：DDNS 域名。每个域名的请求是分别进行的，所以此项的值只会是单个域名字符串。
- `#type#`：IP 类型，值为 `"ipv4"` 或 `"ipv6"`。
- `#record#`：记录类型，值为 `"A"` 或 `"AAAA"`。
- `#access_id#`：DDNS 凭据 1。
- `#access_secret#`：DDNS 凭据 2。

### 花生壳 Webhook 示例
<details>
  <summary>点击展开/收起</summary>

- URL：`http://ddns.oray.com/ph/update?hostname=#domain#&myip=#ip#`
- 请求方式: `GET`
- 请求头：`{"Authorization": "Basic pass"}`，把 `pass` 替换成你的用户名:密码的 Base64 编码（例如，`user:pass` 为 `dXNlcjpwYXNzCg==`）。
- 花生壳只支持 A 记录，所以只勾选启用 IPv4。其它 Webhook 选项不需要填。

</details>

## 供应商列表

| 供应商       | 凭据1（ID） | 凭据2（Secret） |
| ------------ | ----------- | --------------- |
| `dummy`      | ❌️         | ❌️             |
| `webhook`    | 可选       | 可选            |
| `cloudflare` | ❌️         | ✅             |
| `tencentcloud`| ✅        | ✅             |

## 查看日志

在 Dashboard 的日志中，可以看到 DDNS 功能的相关日志，配置正确时，更新 DNS 记录时会有相应的日志记录。

```shell
dashboard_1  | 2024/03/16 23:16:25 NEZHA>> 正在尝试更新域名(ddns.example.com)DDNS(1/3)
dashboard_1  | 2024/03/16 23:16:28 NEZHA>> 尝试更新域名(ddns.example.com)DDNS成功
```
