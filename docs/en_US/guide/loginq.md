## Page refuses to connect or timeout after login callback  
1. Your server cannot connect to Github, consider trying several times or switching to Gitlab.
2. You have configured the wrong callback URL, make sure your callback URL is correct and **port and protocol** are correct!
3. An unknown error occurred in Dashboard, you can use the script to check the logs.  

::: tip  
What is a protocol?   
In the browser, your domain name ending with `://` is the protocol, usually `http` and `https`. Since the Dashboard may be accessible by multiple protocols + domain + port combinations under normal deployment, please make sure to choose the most appropriate one as the callback.  
:::    

### How do I check if my callback URL is wrong?  
Please make sure the protocol+domain+port displayed by your browser before login and the protocol+domain+port you jump to after login are the same.  
Please make sure your path is `/oauth2/callback`, **all lowercase**.  

## Dashboard errors after login
### http: named cookie not present
1. Clear your browser cookies and log in again, or change your browser.  
2. Check the callback address to ensure that your callback address is correct and that both **the port and protocol** are correct! The address from which the request is initiated needs to be in the same domain as the callback address, and the port, protocol, and domain name (or IP) all need to be consistent.

### lookup xxx
DNS resolution failure, in most cases, is due to iptables-related configuration changes.  
It is recommended to restart docker first, `sudo systemctl restart docker`, and then use the script to restart the Dashboard.  
If the lookup error still occurs, it is recommended to check whether there are other tools to control iptables, such as Aapanel Firewall.  
This problem may also be related to the kernel, please try to change the official kernel.  

### The authorization method is invalid, or the login callback URL is invalid, expired, or has been revoked
Suggest changing the authentication method to Github/Gitlab.  

### oauth2: server response missing access_token
It may be caused by a number of factors, the most likely is a network problem, we suggest to check the network and retry.  
If you can't solve it, we suggest changing the authentication method to Github/Gitlab.  

### This user is not the administrator or cannot login
You have logged into the wrong account or configured the wrong username, note that **username is not email**, you can use a script to modify it.  

### dial tcp xxx:443 i/o timeout
If the server has network problems, you can restart docker first, `sudo systemctl restart docker`, and then use the script to restart the Dashboard.  
You can also change to another OAuth method if necessary.  

### net/http: TLS handshake timeout
Same as above.
