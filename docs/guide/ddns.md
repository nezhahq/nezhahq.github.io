---
outline: deep
---

# DDNS

DDNS 功能适用于使用动态 IP 的服务器。当 Agent 上报一个新 IP 时，Dashboard 会根据配置自动更新 DNS 记录。

## 为什么使用哪吒监控的 DDNS 功能？

- **集中管理**：方便在 Dashboard 中集中管理 DDNS 设置，无需在每台服务器上部署单独的 DDNS 服务。
- **更高安全性**：机密信息仅存储在面板服务器中，降低泄露风险。

## 配置说明

可以直接在 Dashboard 的管理页面中添加 DDNS 配置。

1. **进入动态域名解析配置页面**  
   点击菜单栏中的“动态域名解析”，进入配置页面。  
2. **新建配置**  
   点击“新配置”按钮，在弹出窗口中填写相关信息：
   - **名称**：配置的名称，便于管理。
   - **DDNS 供应商**：选择提供服务的供应商类型。
   - **域名（逗号分隔）**：填写需要更新的域名，多个域名用逗号分隔。支持 IDN（国际化域名）。
   - **最大重试次数**：DDNS 更新的最大尝试次数，默认为 3，可设置范围为 1-10 的整数。
   - **DDNS 凭据 1** 和 **DDNS 凭据 2**：凭据选填，具体需求参见[供应商列表](#供应商列表)。
3. **Webhook 特殊说明**  
   如果使用 `webhook` 供应商，请根据[Webhook 配置说明](#webhook-配置说明)填写相关选项。
4. **启用选项**  
   至少勾选 **启用 DDNS IPv4** 或 **启用 DDNS IPv6**，否则不会进行更新。
5. **关联服务器**  
   添加配置后，需要修改服务器设置以启用 DDNS 功能：  
   - **启用 DDNS**：在 `服务器` 页面中为目标服务器启用 DDNS。  
   - **DDNS 配置**：选择适用的 DDNS 配置 ID，支持通过名称搜索。

## Webhook 配置说明

Webhook 支持自定义 HTTP 请求，适用于第三方供应商或其他定制化需求。

### 选项说明

- **Webhook URL**：目标请求的 URL，支持占位符替换。
- **Webhook 请求方式**：支持 `GET`、`POST`、`PATCH`、`DELETE` 和 `PUT`。
- **Webhook 请求类型**：请求体格式，可选择 `JSON` 或 `Form`。
- **Webhook 请求头**：以 JSON 格式填写请求头，注意不支持嵌套。
- **Webhook 请求体**：`GET` 和 `DELETE` 不使用请求体；如果使用嵌套格式，请选择 `JSON` 类型。

### 占位符说明

| 占位符      | 含义                   |
| ----------- | ---------------------- |
| `#ip#`      | 主机 IP 地址            |
| `#domain#`  | 域名（每次单独请求）    |
| `#type#`    | IP 类型：`"ipv4"` 或 `"ipv6"` |
| `#record#`  | 记录类型：`"A"` 或 `"AAAA"` |
| `#access_id#` | DDNS 凭据 1           |
| `#access_secret#` | DDNS 凭据 2       |

### 花生壳 Webhook 示例
<details>
  <summary>点击展开/收起</summary>

- **URL**：`http://ddns.oray.com/ph/update?hostname=#domain#&myip=#ip#`
- **请求方式**: `GET`
- **请求头**:  
  ```json
  {
    "Authorization": "Basic pass"
  }
  ```
  其中 `pass` 是 Base64 编码后的用户名和密码（例如，`user:pass` 转换为 `dXNlcjpwYXNzCg==`）。
- **注意**：花生壳仅支持 A 记录，因此只需启用 IPv4。

</details>

## 供应商列表

| 供应商         | 凭据1（ID） | 凭据2（Secret） |
| -------------- | ----------- | --------------- |
| `dummy`        | ❌️          | ❌️              |
| `webhook`      | 可选        | 可选            |
| `cloudflare`   | ❌️          | ✅               |
| `tencentcloud` | ✅          | ✅               |
| `he`           | ❌️          | ✅              |


### `cloudflare` Token 权限

Token 需要为目标域名分配以下权限:
   `区域.区域:读取`, `区域.DNS:编辑`

### `he` Secret 获取

`he` 供应商使用每个记录独有的 DDNS 密钥作为 Secret，因此必须先创建对应 A/AAAA 记录，勾选 `Enable entry for dynamic dns`，之后再在对应的 DDNS 栏中设置新的 DDNS 密钥。

## 查看日志

在 Dashboard 的日志页面，可以查看 DDNS 更新的详细记录。如果配置正确，日志中会显示更新状态。例如：

```shell
dashboard_1  | 2024/03/16 23:16:25 NEZHA>> 正在尝试更新域名(ddns.example.com)DDNS(1/3)
dashboard_1  | 2024/03/16 23:16:28 NEZHA>> 尝试更新域名(ddns.example.com)DDNS成功
```