---
outline: deep
---

# 登录常见问题

当前 V2 Dashboard 使用本地账户登录，并支持将本地账户绑定到 OAuth2 第三方账户。旧版 GitHub OAuth 登录问题不再适用于当前登录流程。

## 忘记管理员密码

请参考 [初始化用户密码](/guide/q13.html)。重置后建议立即登录后台修改为新的强密码。

## OAuth2 登录失败

请先确认以下配置：

1. Dashboard 配置文件中的 `oauth2` 字段使用新版结构，详见 [设置 OAuth 2.0 绑定](/guide/q14.html)。
2. 第三方平台的 Callback URL 为 `https://你的面板域名/api/v1/oauth2/callback`。
3. 已先使用本地账户登录，并在个人信息页完成 OAuth2 绑定。

如果还没有绑定关系，不能直接使用 OAuth2 登录到本地账户。

## 切换网络后登录失效

Dashboard 默认把浏览器 JWT 会话绑定到登录时识别的客户端 IP。切换 Wi-Fi、移动网络、VPN 或代理出口后，可能需要重新登录；这不等同于密码错误或账号被封。

先检查[前端真实 IP 请求头](/guide/q12.html)，确保代理没有把访客 IP 错误识别为共享或不稳定的地址。确需允许会话跨 IP 使用时，可设置 [`allow_jwt_ip_change: true`](/configuration/dashboard.html#allow-jwt-ip-change)，但这会放宽会话保护；默认仍为 `false`，当前管理前端无此开关。

默认用户前端首页遇到游客 API 的 `ApiErrorUnauthorized` 会提示登录并提供 `/dashboard` 入口，不再把此情形显示成后端不可用。启用了 `force_auth` 时应先登录；不要仅凭这个提示判断 Agent 离线。

## 登录接口被频繁尝试或误封

V2 继续提供 Web 应用防火墙，用于限制登录爆破。若 Dashboard 部署在反向代理或 CDN 后面，请正确配置 [前端真实 IP 请求头](/guide/q12.html)，否则可能因为无法识别真实访问者 IP 而出现误判。

如果已经误封，可以使用管理员账户在 **系统设置 → Web 应用防火墙** 中删除对应封禁记录。
