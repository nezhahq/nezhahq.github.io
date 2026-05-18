---
outline: deep
---

# Login FAQ

Since v1, the Dashboard uses local account login and supports binding local accounts to OAuth2 third-party accounts. Legacy GitHub OAuth login issues no longer apply to the current login flow.

## Forgot Administrator Password

See [Initialize User Password](/en_US/guide/q13.html). After resetting it, log in to the admin frontend and change it to a new strong password as soon as possible.

## OAuth2 Login Failed

Check the following first:

1. The `oauth2` field in the Dashboard configuration uses the new structure. See [Setting Up OAuth 2.0 Binding](/en_US/guide/q14.html).
2. The Callback URL on the third-party platform is `https://your-dashboard-domain/api/v1/oauth2/callback`.
3. You have already logged in with a local account and completed OAuth2 binding on the profile page.

If no binding relationship exists yet, OAuth2 cannot directly log in to a local account.

## Login Endpoint Is Frequently Tried or Incorrectly Blocked

v1 introduces a Web Application Firewall to limit login brute force attempts. If the Dashboard is deployed behind a reverse proxy or CDN, configure the [Frontend Real IP Request Header](/en_US/guide/q12.html) correctly; otherwise, the Dashboard may misidentify visitor IPs and block incorrectly.

If an IP has already been blocked by mistake, use an administrator account to remove the corresponding block record under **System Settings → Web Application Firewall**.
