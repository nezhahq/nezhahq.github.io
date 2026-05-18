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

用户前端会读取以下全局变量。请在自定义代码中通过 `<script>...</script>` 设置；布尔值使用 `true` / `false`，不要写成字符串。

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

示例：

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

### Agent 对接地址

- 此项为使用一键脚本安装 Agent 的必要设置。  
- 设置内容为你希望使用的 Agent 连接地址，例如：`data.example.com:8008`。  
- 详情请参考 [Agent 安装准备工作](/guide/agent.html#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)。

### DDNS 的自定义公共 DNS 名称服务器

用于 DDNS 功能查询域名 SOA 记录，如不填则采用内置列表。

### 前端真实 IP 请求头

- `CF-Connecting-IP` 是一个用于获取访问者真实 IP 的请求头字段。  
- 当通过 Cloudflare CDN 代理访问 Dashboard 时，启用此功能可以让源服务器正确识别访问者的真实 IP。  
  - **用途**：便于进行安全审计、防火墙规则配置和日志记录。


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

### IP 变更提醒

此功能允许在服务器 IP 地址变更时发送通知，设置步骤如下：

#### 配置选项

1. **覆盖范围**  
   选择一条规则以确定需要监控哪些服务器。

2. **特定服务器**  
   配合覆盖范围设置，可以为选定规则添加排除项。

3. **提醒发送至通知分组**  
   选择通知方式（通知方式需提前在“通知”页中设置）。

4. **启用功能**  
   设置完成后，勾选 **启用** 才会使通知生效。

5. **通知中显示完整 IP 地址**  
   默认情况下，IP 变更通知会隐藏完整 IP 地址。  
   如需显示完整 IP 地址，可勾选此选项。

---

## 用户管理

此标签页允许为 Dashboard 添加多个用户。  

具体功能请参考 [多用户](/guide/user.html)。

---

## 在线用户

查看当前连接到前台的游客 / 用户信息，包含 **IP** 及 **连接时间**，并可以手动封禁用户。

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

如果当前用户为管理员，便可以手动删除封禁条目。
