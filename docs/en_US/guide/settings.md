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

The user frontend reads the following global variables. Set them in custom code with `<script>...</script>`; use `true` / `false` for booleans, not strings.

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

Example:

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

### Agent Connecting Address

- This is required when installing Agents with the one-click script.
- Set it to the Agent connection address you want to use, for example: `data.example.com:8008`.
- See [Agent Installation Prerequisites](/en_US/guide/agent.html#prerequisites) for details.

### Custom Public DNS Nameservers for DDNS

Used by DDNS to query domain SOA records. If empty, the built-in list is used.

### Frontend Real IP Request Header

- `CF-Connecting-IP` is a request header used to get the visitor's real IP.
- When accessing the Dashboard through Cloudflare CDN proxy, enabling this feature lets the origin server identify the visitor's real IP correctly.
  - **Use**: Security auditing, firewall rules, and logging.

::: danger
1. **Configure Headers Carefully**
   Frontend real IP request header configuration affects the built-in WAF (Web Application Firewall).
   If you do not understand how headers are passed, do not modify this casually. Incorrect configuration may cause IPs to be blocked by the built-in WAF.

2. **Prevent Account Brute Force Attacks**
   The built-in WAF is designed to prevent local account brute force.
   - If local accounts have no protection, high-frequency password enumeration attacks may occur, such as 100 password attempts per second.
   - WAF IP identification depends on correctly configured request headers to block such attacks effectively.

3. **Security Advice**
   Enable this only after you understand how headers are actually passed, and carefully verify the result.
:::

### Agent Real IP Request Header

- `CF-Connecting-IP` is a request header used to get the Agent's real IP.
- When Agents connect to the Dashboard through Cloudflare CDN proxy, enabling this feature lets the origin server identify the Agent's real IP correctly.

### IP Change Notification

This feature sends notifications when a server IP address changes. Configure it as follows:

#### Configuration Options

1. **Cover**
   Select a rule to determine which servers need monitoring.

2. **Specific Servers**
   Used together with Cover to add exclusions for the selected rule.

3. **Send notification to notification group**
   Select notification methods. Notification methods must be configured in advance on the Notifications page.

4. **Enable**
   After configuration, check **Enable** to make notifications take effect.

5. **Show full IP address in notification**
   By default, IP change notifications hide the full IP address.
   Check this option if you need to show the complete IP address.

---

## User Management

This tab allows adding multiple users to the Dashboard.

See [Multi-User](/en_US/guide/user.html) for details.

---

## Online Users

View current guests / users connected to the frontend, including **IP** and **connection time**, and manually block users.

---

## Web Application Firewall

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

If the current user is an administrator, block entries can be deleted manually.
