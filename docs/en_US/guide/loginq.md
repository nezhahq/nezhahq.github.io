---
outline: deep
---

# Login FAQ

The current V2 Dashboard uses local account login and supports binding local accounts to third-party OAuth2 accounts. Legacy GitHub OAuth login issues no longer apply to the current login flow.

## Forgot Administrator Password

See [Initialize User Password](/en_US/guide/q13.html). After resetting it, log in to the admin frontend and change it to a new strong password as soon as possible.

## OAuth2 Login Failed

Check the following first:

1. The `oauth2` field in the Dashboard configuration uses the new structure. See [Setting Up OAuth 2.0 Binding](/en_US/guide/q14.html).
2. The Callback URL on the third-party platform is `https://your-dashboard-domain/api/v1/oauth2/callback`.
3. You have already logged in with a local account and completed OAuth2 binding on the profile page.

If no binding relationship exists yet, OAuth2 cannot directly log in to a local account.

## Session Lost After Switching Networks

Dashboard binds browser JWT sessions to the client IP identified at login by default. Switching Wi-Fi, mobile networks, VPNs, or proxy exits may require signing in again. This does not necessarily mean an incorrect password or a blocked account.

First verify the [Frontend Real IP Request Header](/en_US/guide/q12.html), so the proxy does not misidentify visitors as a shared or unstable address. If sessions must survive IP changes, set [`allow_jwt_ip_change: true`](/en_US/configuration/dashboard.html#allow-jwt-ip-change). This relaxes session protection; the default remains `false`, and the current admin frontend has no switch for it.

The default user frontend homepage shows a login prompt with a `/dashboard` link when a guest API returns `ApiErrorUnauthorized`, rather than reporting backend unavailability. Sign in first when `force_auth` is enabled; this prompt alone does not indicate offline Agents.

## Login Endpoint Is Frequently Tried or Incorrectly Blocked

V2 includes a Web Application Firewall to limit login brute-force attempts. If Dashboard is deployed behind a reverse proxy or CDN, configure the [Frontend Real IP Request Header](/en_US/guide/q12.html) correctly; otherwise, Dashboard may misidentify visitor IPs and block incorrectly.

If an IP has already been blocked by mistake, use an administrator account to remove the corresponding block record under **System Settings → Web Application Firewall**.
