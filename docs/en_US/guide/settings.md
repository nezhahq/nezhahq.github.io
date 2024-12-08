---
outline: deep
---

# Settings

**Access the settings page by logging into the Admin panel and clicking on the avatar → `System Settings`.**

---

## Site Name

Customize the title of your site for easier identification and management.

---

## Language Settings

Nezha Monitoring currently supports the following languages:
- Simplified Chinese / 简体中文
- Traditional Chinese / 繁體中文
- English
- Spanish / Español

We welcome contributions to improve translations or add support for more languages.

---

## Custom Code

Add custom styles or scripts to the visitor page, such as changing the logo, adjusting colors, applying beautification code, or adding analytics scripts.

::: warning  
- Custom code is only effective on the visitor homepage and **does not apply to the Admin panel**.  
- To modify the Admin panel, you must manually edit the theme files inside the Docker container.
:::

---

## Dashboard Server Domain/IP (Non-CDN)

- This setting is required for the installation of Agents via the one-click script.  
- The input must be a domain or IP address **not behind a CDN**, such as `data.example.com:8008`.  
- For more details, see [Agent Installation Preparation](/guide/agent.html).

---

## Frontend Access Password

Set a password to restrict visitors from directly accessing the Dashboard.  
After setting, users must enter the password to access the homepage.

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

This section allows you to add multiple users to the Dashboard.  
- Adding multiple users facilitates collaborative management.