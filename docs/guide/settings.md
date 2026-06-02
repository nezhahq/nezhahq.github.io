---
outline: deep
---

# 设置

**登录管理页面后，点击头像 → 系统设置，即可进入设置页面。**

---

## 系统配置

### 站点名称

在此项中可以自定义站点标题，便于识别和管理。

### 语言设置

设置软件的语言，主要影响通知与错误信息。

同时可以联动网页界面，实时更改语言。

### 自定义代码

此项用于在网页界面中添加自定义样式或脚本代码，例如修改 Logo、背景图、主题、外链或统计代码。

此项分为两类：

- **用户前端自定义代码**：对应配置文件中的 `custom_code`，会注入公开访问的用户前端。
- **管理前端自定义代码**：对应配置文件中的 `custom_code_dashboard`，只会注入登录后的管理前端。

下面这些全局变量仅由用户前端读取，放入管理前端自定义代码不会生效。请在用户前端自定义代码中通过 `<script>...</script>` 设置；布尔值使用 `true` / `false`，不要写成字符串。

- `window.CustomBackgroundImage`：桌面端背景图 URL。
- `window.CustomMobileBackgroundImage`：移动端背景图 URL，未设置时会沿用桌面端背景图。
- `window.CustomLogo`：Logo 图片 URL。
- `window.CustomDesc`：首页描述文本。
- `window.CustomLinks`：自定义外链，值必须是可被 `JSON.parse` 解析的 JSON 字符串，格式为 `[{"name":"GitHub","link":"https://github.com/nezhahq/nezha"}]`。
- `window.ForceTheme`：强制默认颜色主题，值为 `"light"` 或 `"dark"`。
- `window.ShowNetTransfer`：是否在服务器卡片显示上下行流量。
- `window.DisableAnimatedMan`：是否关闭默认动画人物插图。
- `window.CustomIllustration`：自定义插图 URL。设置后会替换默认插图，通常不需要再启用 `window.DisableAnimatedMan`。
- `window.FixedTopServerName`：是否固定顶部服务器名称。
- `window.ForceUseSvgFlag`：是否强制使用 SVG 旗帜。
- `window.ForceShowServices`：是否默认展开首页服务监控面板。
- `window.ForceCardInline`：是否在非移动端强制使用服务器横向列表布局；移动端仍会使用卡片布局。
- `window.ForceShowMap`：是否默认展开首页地图。
- `window.ForcePeakCutEnabled`：是否默认开启网络图表的峰值裁剪，用于降低突发尖峰对图表可读性的影响。

用户前端示例：

```html
<script>
  window.CustomLogo = "https://example.com/logo.png";
  window.CustomDesc = "My Monitor";
  window.CustomLinks = JSON.stringify([
    { name: "GitHub", link: "https://github.com/nezhahq/nezha" }
  ]);
  window.ForceTheme = "dark";
  window.ForceShowServices = true;
</script>
```

- 管理前端
    1. `window.DisableAnimatedMan`：布尔值，开/关动画人物插图

### 主题

主题设置用于选择用户前端展示模板，对应配置文件中的 [`user_template`](/configuration/dashboard.html#user_template)。管理前端模板对应 [`admin_template`](/configuration/dashboard.html#admin_template)，通常保持默认即可。

内置主题由官方维护；社区主题来自社区贡献，可能不会随 Dashboard 版本同步更新。使用社区主题前请确认来源可信、兼容当前版本，并了解其自定义代码、外链资源或样式变更带来的风险。

### Agent 对接地址

- 此项为使用一键脚本安装 Agent 的必要设置。  
- 设置内容为你希望使用的 Agent 连接地址，例如：`data.example.com:8008`。  
- 如果 Agent 通过 HTTPS、Dashboard 内置 HTTPS 或已在反向代理/CDN 上完成 TLS 终结连接，请启用 **Agent 使用 TLS 连接**，生成的安装命令会带上 TLS 参数。
- 如果 Agent 直连明文 `host:port`，请不要启用 TLS，否则安装命令会让 Agent 按 TLS 方式连接，可能导致无法上线。
- 详情请参考 [Agent 安装准备工作](/guide/agent.html#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)。

### Dashboard 保留域名

用于声明 Dashboard 对外访问使用的域名，防止普通成员在 NAT 中创建与 Dashboard 入口冲突的域名。多个域名使用英文逗号分隔。配置字段为 [`reserved_hosts`](/configuration/dashboard.html#reserved_hosts)。

### DDNS 的自定义公共 DNS 名称服务器

用于 DDNS 功能查询域名 SOA 记录，如不填则采用内置列表。

### 前端真实 IP 请求头

- `CF-Connecting-IP` 是一个用于获取访问者真实 IP 的请求头字段。  
- 当通过 Cloudflare CDN 代理访问 Dashboard 时，启用此功能可以让源服务器正确识别访问者的真实 IP。  
  - **用途**：便于进行安全审计、防火墙规则配置和日志记录。
- 如果 Dashboard 直接面向公网，没有上层反向代理或 CDN 传递真实 IP Header，可选择 **使用直连 IP**，对应配置值为 `NZ::Use-Peer-IP`。


::: danger   
1. **慎重配置 Header**  
   前端真实 IP 请求头的配置涉及内置 WAF（Web 应用防火墙）的正常运作。  
   如果您不了解 Header 的传递方式，请勿随意修改。错误配置可能导致 IP 被内置 WAF 封禁。  

2. **防止账户爆破攻击**  
   内置 WAF 旨在防止本地账户爆破。  
   - 如果本地账户未设置任何防护，可能导致高频密码枚举攻击（如每秒尝试 100 个密码）。  
   - WAF 的 IP 识别依赖于正确配置的请求头，以有效拦截此类攻击。

3. **安全建议**  
   确保您了解 Header 的实际传递机制后再启用此功能，并仔细验证配置结果。
:::

### Agent 真实 IP 请求头

- `CF-Connecting-IP` 是一个用于获取 Agent 真实 IP 的请求头字段。  
- 当 Agent 通过 Cloudflare CDN 代理连接 Dashboard 时，启用此功能可以让源服务器正确识别 Agent 的真实 IP。  

### MCP 开关

用于启用或关闭 Dashboard 的 MCP 入口。启用后可使用 PAT 调用 `POST /mcp`；关闭时会拒绝新的 MCP 请求并中断相关传输。配置字段为 [`enable_mcp`](/configuration/dashboard.html#enable_mcp)，认证和权限说明见 [API 接口 - MCP 接入](/guide/api.html#mcp-%E6%8E%A5%E5%85%A5)。

### IP 变更提醒

此功能允许在服务器 IP 地址变更时发送通知，设置步骤如下：

#### 配置选项

1. **覆盖范围**  
   选择一条规则以确定需要监控哪些服务器。

2. **特定服务器**  
   配合覆盖范围设置。覆盖范围为 **覆盖全部** 时，这里表示 **排除特定服务器**；覆盖范围为 **忽略全部** 时，这里表示 **仅特定服务器**。

3. **提醒发送至通知分组**  
   选择通知方式（通知方式需提前在“通知”页中设置）。

4. **启用功能**  
   设置完成后，勾选 **启用** 才会使通知生效。

5. **通知中显示完整 IP 地址**  
   默认情况下，IP 变更通知会隐藏完整 IP 地址。  
   如需显示完整 IP 地址，可勾选此选项。

---

## API Tokens

此标签页用于创建和吊销 Personal Access Token（PAT）。PAT 适合自动化脚本、CI、LLM 工具和 MCP 客户端使用。

普通成员进入设置页时只会看到 **API Tokens** 标签页；其它系统配置、用户管理、在线用户和 Web 应用防火墙等标签页仅管理员可见。

创建 Token 时可以选择 scope、可访问的服务器 ID 白名单和过期时间。Token 明文只会在创建成功后显示一次；后续列表只会展示权限、服务器白名单、过期时间、最后使用时间和最后使用 IP 等元信息。认证格式和 scope 说明见 [API 接口 - Personal Access Token](/guide/api.html#personal-access-token-pat)。

---

## 用户管理

此标签页允许为 Dashboard 添加多个用户。  

具体功能请参考 [多用户](/guide/user.html)。

---

## 在线用户

查看当前连接到前台的游客 / 用户信息，包含 **IP** 及 **连接时间**，并可以手动封禁用户；管理员也可以批量封禁选中的在线用户。

---

## Web 应用防火墙

可以查看当前的封禁条目，并提供一些有用的信息：

- **IP** 被封禁者的 IP。
- **封禁标识** 被封禁者尝试攻击的资源标识，与 IP 一起作为封禁条目的标识。一般情况下为用户 ID，但也存在以下特殊情况：
  1. 尝试破解 gRPC 连接密钥；
  2. 尝试破解 API Token；
  3. 尝试登录不存在的用户；
  4. 手动封禁（通过“在线用户”页面）。
- **计数** 此封禁条目的封禁次数，数量越多则封禁时间越长。
- **封禁原因** 此封禁条目最后一次的封禁原因。
- **封禁时间** 此封禁条目最后一次的封禁时间。

如果当前用户为管理员，便可以手动删除封禁条目，也可以批量删除选中的封禁条目。
