## Preparations
To setup a Nezha monitorning Dashboard, you need these things:
1. A VPS that can connect to the Internet, firewall and security policies need to open ports 8008 and 5555, otherwise it will be inaccessible and unable to receive data. A 1 core 512MB RAM server is sufficient for most usage scenarios
2. A domain name that has been set up with an A record that resolves to the Dashboard server IP  
::: tip 
If you want to use CDN, please prepare two domains, one connect to CDN for public access, CDN needs to support WebSocket protocol; the other domain should not connect to CDN, use it as Agent to send data to Dashboard.   
This document uses "cdn.example.com" and "data.example.com" domains to demonstrate respectively
:::
3. A Github or Gitlab account

**This document will use the aaPanel as an example, with future versions of the changes, some of the features may change, this document is for reference only**
<br/>
<br/>
## Get the Client ID and Client Secret on Github/Gitlab
Nezha Monitor uses a Github account as the login account for the admin panel    
+ First we need to create a new authentication application, after logging into Github, open https://github.com/settings/developers and select "OAuth Apps" - "New OAuth App "      
`Application name` - Fill in as you like  
`Homepage URL` - Fill in the panel's access domain name, such as: "http://cdn.example.com"    
`Authorization callback URL` - Fill in the callback address, e.g., "http://cdn.example.com/oauth2/callback"  
+ Click on "Registration Application"  
+ Remember the Client ID in the page, then click "Generate a new client secret" to create a new Client Secret, the new secret will be displayed only once, please save it properly
<br/>
<br/>  
+ If you're using Gitlab, you'll need to go to https://gitlab.com/-/profile/applications to create a new application  
+ Fill in `Redirect URL` with the callback address    
+ In `Scopes`, select `read_user` and `read_api`   
+ Once created, save the Application ID and Secret  
## Installing Dashboard on the server
* In the panel server, run the installation script:    
```bash
curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install_en.sh  -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```  

* After waiting for the Docker installation to complete, input the following settings:    
`OAuth2 provider` -   Github or Gitlab  
`Client ID` - Previously saved Client ID   
`Client Secret` - Previously saved secret   
`GitHub/Gitee login name` - Github o Gitlab username   
`Site title` - Custom site title   
`Site access port` - Public access port, customizable, default 8008   
`RPC port` - The communication port between Agent and Dashboard, default 5555   

* After the input is complete, wait to pull the mirror  
After the installation, if everything is fine, you can visit the domain + port number, such as "http://cdn.example.com:8008" to view the Dashboard  

* In the future, if you need to run the script again, you can run:    
```bash
./nezha.sh
``` 
to open the management script  
<br/>
<br/>
## Configure reverse proxy
* Create a new site in the aaPanel, fill in the public access domain name, such as "http://cdn.example.com", then click "Settings" to enter the site settings option, select " Reverse proxy" - "New reverse proxy"  

* Customize a proxy name, fill in `http://127.0.0.1` in the "Target URL" and click "Save"  

* Open the " configuration" to the right of the new reverse proxy you just created and replace the configuration file with the following:  
````nginx
#PROXY-START/
location / {
    proxy_pass http://127.0.0.1:8008;
    proxy_set_header Host $http_host;
    proxy_set_header      Upgrade $http_upgrade;
}
location ~ ^/(ws|terminal/.+)$  {
    proxy_pass http://127.0.0.1:8008;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $http_host;
}
#PROXY-END/
````
* Click "Save"    
Now, you should be able to access the panel directly using a domain name such as: "http://cdn.example.com"    
<br/>
#### Other:   


* CaddyServer v1（v2 no special configuration required）  

  ```
  proxy /ws http://ip:8008 {
      websocket
  }
  proxy /terminal/* http://ip:8008 {
      websocket
  }
  ```

<br/>
<br/>

## Configuring SSL in the aaPanel
First, temporarily disable the reverse proxy    
As with other websites, you can choose to automatically apply for a Let´s Encrypt certificate or manually configure an existing certificate by going to "SSL" in the site settings  
After you finish setting up SSL, you need to go back to https://github.com/settings/developers and edit the authentication application you created before, change all the domain names in the "Homepage URL" and "Authorization callback URL" you filled in before from `http` to `https`, such as: "https://cdn.example.com" and "https://cdn.example.com/oauth2/callback",  **If you don't change these links, you may not be able to log into the admin panel**   

## FAQ
### I am not satisfied with the data modification or addition function provided by the Dashboard, what if I want to modify or add data myself?
Commonly used in requirements such as batch installation of Agents, where you can modify the database directly.  
Please note that not everything can be modified in the database, wrong modification will lead to data confusion and failure to start Dashboard, **please do not modify the database at will!**  
::: danger  
Again, **please do not modify the database at will!**  
:::    
If you need to modify the data in the database, please **stop** the Dashboard container before modifying it.  
The database type is sqlite3, located in `/opt/nezha/dashboard/data/sqlite.db`, please backup before modifying the data

### What are each table or column in the database?
The documentation does not provide an explanation of the database. If you have the ability to modify the database, you should be able to read it with a little thinking.

### Does Dashboard update automatically?
The Agent normally updates automatically, but the Dashboard does not and needs to be updated manually.  

### How do I update the Dashboard?
Run the script `. /nezha.sh` and select restart Dashboard and update
