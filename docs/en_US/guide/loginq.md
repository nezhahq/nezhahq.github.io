---
outline: deep
---

# FAQ about logging into the Dashboard

## Stuck Page/Connection Refused/Long Response Time After Login Callback

These issues can manifest in various ways, but ultimately the browser cannot display correctly after login.

1. Your server cannot connect to Github/Gitee, which is most common when configuring Github on servers in mainland China. You may try several times or switch to Cloudflare Access.
2. You have configured the callback address incorrectly. Ensure that your callback address is correct and that both the **port and protocol** are accurate!
3. An unknown error occurred on the Dashboard. You can use a script to check the logs.

::: tip
What is a protocol?
In the browser, the string that ends your domain with `://` is the protocol, usually `http` or `https`. Since there may be multiple protocol+domain+port combinations available for accessing the Dashboard in a normal deployment, make sure to choose the most appropriate one as the callback.
:::   

### How to Check if My Callback Address is Wrong?

Ensure that the protocol+domain+port displayed in the browser before login and after the callback are consistent.  
Ensure that your path is `/oauth2/callback`, **all in lowercase**.

## Errors After Logging into the Admin Panel

### http: named cookie not present

1. Clear cookies and log in again, or try a different browser.
2. Check the callback address to ensure it is correct and that both the **port and protocol** are accurate! The address initiating the request must be in the same domain as the callback address, with the port, protocol, and domain (or IP) all matching.

### lookup xxx

The container DNS resolution failed, usually due to modified iptables configurations.  
It is recommended to restart Docker first, `sudo systemctl restart docker`, then restart the Dashboard using the script.  
If the lookup error persists, check if there are other tools controlling iptables, such as firewall.  
This issue might also be related to the kernel, so try switching to the official kernel.

### Invalid authorization method, or the login callback address is invalid, expired, or has been revoked

This issue appears only when using Gitee login, and the reason is unclear. Switching to GitHub is recommended.

### oauth2: server response missing access_token

This could be caused by various factors, most likely a network issue. Check your network and try again.  
If unresolved, switching to Github or another method is recommended.

### The user is not an admin of this site and cannot log in

You logged in with the wrong account or configured the wrong username. Note that **the username is not an email**, and you can use a script to modify it.  
For Cloudflare Access users, note that your username is not an email but a User ID.

### dial tcp xxx:443 i/o timeout

This is a network issue. Try restarting Docker first, `sudo systemctl restart docker`, then restart the Dashboard using the script.  
If you are configuring Github login on a server in mainland China, switching to Cloudflare Access is recommended to avoid network interference.

### net/http: TLS handshake timeout

Same as above.