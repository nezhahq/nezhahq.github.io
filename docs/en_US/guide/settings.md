---
outline: deep
---

# Settings

**Access the settings page by logging into the admin dashboard and clicking on the avatar → `System Settings`.**

---

## Site Name

Customize the title of your site for easier identification and management.

---

## Language Settings

Set the software language, mainly affecting notifications and error messages.

The language of the web interface will also be updated.

---

## Custom Code

This option allows you to add custom styles or script code to the web interface, such as modifying the logo, adjusting the color scheme, adding beautification scripts, or tracking scripts.

You can also modify the following global variables to use preset custom features directly:

- User Frontend:
    1. `window.CustomBackgroundImage`: Custom background image.
    2. `window.CustomMobileBackgroundImage`: Custom mobile background image.
    3. `window.CustomLogo`: Custom logo. Requires a URL.
    4. `window.CustomDesc`: Custom description.
    5. `window.ShowNetTransfer`: Boolean, whether to display network traffic on cards.
    6. `window.DisableAnimatedMan`: Boolean, enable/disable animated character illustrations.
    7. `window.CustomIllustration`: Custom illustration, conflicts with `window.DisableAnimatedMan`.
    8. `window.FixedTopServerName`: Boolean, whether to fix the top server name.
    9. `window.CustomLinks`: Custom external links, formatted as `[{\"link\":\"https://github.com/hamster1963/nezha-dash\",\"name\":\"GitHub\"}]`.
    10. `window.ForceTheme`: Force a default color theme, values are "light" or "dark".
    11. `window.ForceUseSvgFlag`: Boolean, whether to force the use of SVG flags.

- Admin Frontend:
    1. `window.DisableAnimatedMan`: Boolean, enable/disable animated character illustrations.

---

## Agent connecting address

- This is required for installing **Agent** using the installation command.  
- Set it to the desired Agent connection address, e.g., `data.example.com:8008`.  
- For more details, refer to [Agent Installation Prerequisites](/en_US/guide/agent.html#prerequisites).

---

## Custom Public DNS Nameservers for DDNS

Used to query domain SOA records for the DDNS feature. If left blank, the built-in list will be used.

---

## Real IP Request Header

- `CF-Connecting-IP` is a header used to identify the visitor's real IP address.  
- When accessing the Dashboard through a Cloudflare CDN proxy, enabling this feature allows the origin server to correctly recognize the visitor's real IP.  
  - **Purpose**: Facilitates security audits, firewall rule configuration, and accurate logging.

::: danger   
1. **Be Careful with Header Configuration**  
   The Real IP Request Header impacts the proper functioning of the built-in Web Application Firewall (WAF).  
   If you are unfamiliar with header handling, avoid modifying this setting. Incorrect configuration may result in the IP being blocked by the WAF.

2. **Prevent Account Brute Force Attacks**  
   The built-in WAF is designed to prevent brute force attacks on local accounts.  
   - Without protective measures, attackers could attempt high-frequency password enumeration (e.g., 100 attempts per second).  
   - The WAF relies on accurate IP identification via properly configured headers to block such attacks.

3. **Security Recommendations**  
   Only enable this feature if you understand the header transmission mechanism. Thoroughly test your configuration after enabling.
:::

---

## IP Change Notification

This feature sends a notification when a server's IP address changes. Configure it as follows:

### Configuration Options

1. **Coverage Scope**  
   Select a rule to determine which servers to monitor for IP changes.

2. **Specific Servers**  
   Use this setting to exclude specific servers from the selected rule.

3. **Send Notifications to a Group**  
   Choose a notification group. (Notification methods must be pre-configured in the `Notifications` page.)

4. **Enable the Feature**  
   Check the **Enable** option to activate notifications.

5. **Show Full IP Address in Notifications**  
   By default, IP change notifications mask full IP addresses.  
   To display full IPs, enable this option.

---

## User Management

This tab allows you to add multiple users to the dashboard.  

For details, refer to [Multi-User](/en_US/guide/user.html).

---

## Online Users

View information about visitors/users currently connected to the frontend, including **IP** and **connection time**, with the ability to manually block users.

---

## Web Application Firewall

View current blocked entries with useful information:

- **IP**: The IP of the blocked user.
- **Block Identifier**: The identifier for the resource attacked by the blocked user. Typically a user ID, but in special cases:
  1. Attempting to crack a gRPC connection key;
  2. Attempting to crack an API token;
  3. Attempting to log into a nonexistent user;
  4. Manual blocking (via the "Online Users" page).
- **Count**: The number of times this block entry has been triggered. Higher counts result in longer block durations.
- **Block Reason**: The reason for the last block on this entry.
- **Ban Time**: The time of the last block on this entry.

If the current user is an administrator, they can manually delete block entries.
