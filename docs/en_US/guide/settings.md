---
outline: deep
---

# Settings

**After logging in to the admin page, click the avatar → System Settings to open the settings page.**

---

## System Configuration

### Site Name

Customize the site title here for easier identification and management.

### Language Settings

Set the software language, mainly affecting notifications and error messages.

The web interface can also change language in real time.

### Custom Code

This item is used to add custom styles or scripts to the web interface, such as changing the logo, background image, theme, external links, or analytics code.

This item is split into two fields:

- **User frontend custom code**: corresponds to `custom_code` in the configuration file and is injected into the public user frontend.
- **Admin frontend custom code**: corresponds to `custom_code_dashboard` in the configuration file and is injected only into the logged-in admin frontend.

The following global variables are read only by the user frontend. They do not take effect if placed in admin frontend custom code. Set them in user frontend custom code with `<script>...</script>`; use `true` / `false` for booleans, not strings.

- `window.CustomBackgroundImage`: Desktop background image URL.
- `window.CustomMobileBackgroundImage`: Mobile background image URL. If unset, the desktop background image is used.
- `window.CustomLogo`: Logo image URL.
- `window.CustomDesc`: Homepage description text.
- `window.CustomLinks`: Custom external links. The value must be a JSON string parseable by `JSON.parse`, in the format `[{"name":"GitHub","link":"https://github.com/nezhahq/nezha"}]`.
- `window.ForceTheme`: Force the default color theme. Value is `"light"` or `"dark"`.
- `window.ShowNetTransfer`: Whether to show inbound/outbound traffic on server cards.
- `window.DisableAnimatedMan`: Whether to disable the default animated character illustration.
- `window.CustomIllustration`: Custom illustration URL. After setting it, it replaces the default illustration, and `window.DisableAnimatedMan` is usually unnecessary.
- `window.FixedTopServerName`: Whether to pin the top server name.
- `window.ForceUseSvgFlag`: Whether to force SVG flags.
- `window.ForceShowServices`: Whether to expand the homepage service monitoring panel by default.
- `window.ForceCardInline`: Whether to force the horizontal server list layout on non-mobile devices. Mobile devices still use the card layout.
- `window.ForceShowMap`: Whether to expand the homepage map by default.
- `window.ForcePeakCutEnabled`: Whether to enable network chart peak clipping by default, reducing the impact of sudden spikes on chart readability.

User frontend example:

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

- Admin frontend
    1. `window.DisableAnimatedMan`: Boolean, turns the animated character illustration on/off.

### Theme

The theme setting selects the user frontend template and corresponds to [`user_template`](/en_US/configuration/dashboard.html#user_template). The admin frontend template corresponds to [`admin_template`](/en_US/configuration/dashboard.html#admin_template) and usually should stay at the default value.

Built-in themes are maintained by the official project. Community themes are contributed by the community and may not be updated together with Dashboard releases. Before using a community theme, make sure the source is trusted, it is compatible with your Dashboard version, and you understand the risks from custom code, external assets, or style changes.

### Agent Connecting Address

- This is required when installing Agents with the one-click script.
- Set it to the Agent connection address you want to use, for example: `data.example.com:8008`.
- If Agents connect through HTTPS, Dashboard built-in HTTPS, or a reverse proxy/CDN that terminates TLS, enable **Agent uses TLS connection**. The generated installation command will include the TLS option.
- If Agents connect directly to a plaintext `host:port`, do not enable TLS. Otherwise the installation command will make Agents connect with TLS and they may fail to come online.
- See [Agent Installation Prerequisites](/en_US/guide/agent.html#prerequisites) for details.

### Reserved Dashboard Hosts

Declares the public hostnames used to access Dashboard, preventing normal members from creating NAT domains that collide with Dashboard entry hosts. Separate multiple hostnames with commas. The configuration field is [`reserved_hosts`](/en_US/configuration/dashboard.html#reserved_hosts).

### Custom Public DNS Nameservers for DDNS

Used by DDNS to query domain SOA records. If empty, the built-in list is used.

### Frontend Real IP Request Header

Used to identify the real client IP of visitors accessing the admin frontend and user frontend. Online users, audit records, login brute-force protection, and the Web Application Firewall all depend on it.

For direct public access, select **Use Direct IP**. For Cloudflare, usually use `CF-Connecting-IP`. For Nginx, Caddy, Apache, or another reverse proxy, the proxy must pass `X-Real-IP`, `nz-realip`, or another matching header. For complete scenarios, reverse proxy examples, verification, and recovery, see [Frontend Real IP Header Configuration](/en_US/guide/q12.html).

### Agent Real IP Request Header

- `CF-Connecting-IP` is a request header used to get the Agent's real IP.
- When Agents connect to the Dashboard through Cloudflare CDN proxy, enabling this feature lets the origin server identify the Agent's real IP correctly.

### MCP Toggle

Enables or disables the Dashboard MCP endpoint. After enabling it, clients can call `POST /mcp` with a PAT. When disabled, Dashboard rejects new MCP requests and interrupts related transfers. The configuration field is [`enable_mcp`](/en_US/configuration/dashboard.html#enable_mcp). For authentication and permission details, see [API Interface - MCP Access](/en_US/guide/api.html#mcp-access).

### IP Change Notification

This feature sends notifications when a server IP address changes. Configure it as follows:

#### Configuration Options

1. **Cover**
   Select a rule to determine which servers need monitoring.

2. **Specific Servers**
   Used together with Cover. When Cover is **Cover all**, this means **exclude specific servers**. When Cover is **Ignore all**, this means **only specific servers**.

3. **Send notification to notification group**
   Select notification methods. Notification methods must be configured in advance on the Notifications page.

4. **Enable**
   After configuration, check **Enable** to make notifications take effect.

5. **Show full IP address in notification**
   By default, IP change notifications hide the full IP address.
   Check this option if you need to show the complete IP address.

---

## API Tokens

This tab creates and revokes Personal Access Tokens (PATs). PATs are suitable for automation scripts, CI, LLM tools, and MCP clients.

Normal members only see the **API Tokens** tab on the settings page. Other tabs such as system configuration, user management, online users, and Web Application Firewall are visible only to administrators.

When creating a token, select scopes, optional server ID whitelist, and expiration. The plaintext token is shown only once after creation. Later lists only show metadata such as scopes, server whitelist, expiration time, last used time, and last used IP. For authentication format and scopes, see [API Interface - Personal Access Token](/en_US/guide/api.html#personal-access-token-pat).

---

## User Management

This tab allows adding multiple users to the Dashboard.

See [Multi-User](/en_US/guide/user.html) for details.

---

## Online Users

View current guests / users connected to the frontend, including **IP** and **connection time**, and manually block users. Administrators can also batch block selected online users.

---

## Web Application Firewall

The Web Application Firewall depends on **Frontend Real IP Request Header** to identify source IPs. Before configuring a real-IP header, read [Frontend Real IP Header Configuration](/en_US/guide/q12.html) and confirm Dashboard reads the real client IP.

You can view current block entries and related useful information:

- **IP**: The blocked user's IP.
- **Block ID**: The resource identifier the blocked user attempted to attack. Together with IP, it identifies a block entry. Usually this is a user ID, but there are these special cases:
  1. Attempting to brute force a gRPC connection secret;
  2. Attempting to brute force an API Token;
  3. Attempting to log in to a nonexistent user;
  4. Manual block through the Online Users page.
- **Count**: Number of times this entry has been blocked. Higher counts result in longer block times.
- **Reason**: The reason for the latest block on this entry.
- **Time**: The latest block time for this entry.

If the current user is an administrator, block entries can be deleted manually or in batches.
