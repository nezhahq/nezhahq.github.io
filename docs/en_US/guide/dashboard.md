---
outline: deep
---

# Installing the Dashboard

## Prerequisites  

To set up the Nezha Monitoring Dashboard, you will need:
1. A server with public internet access. Ensure that firewall and security policies allow traffic on port 8008; otherwise, access or data reception will fail. A single-core server with 512MB of RAM is sufficient for most use cases.
2. A domain name with an A record pointing to your Dashboard server's IP address.
::: tip  
If you plan to use a CDN, prepare two domain names:  
- One configured with a CDN for public access. The CDN must support the WebSocket protocol.  
- Another domain without CDN for communication between the Agent and Dashboard.  

This guide uses "dashboard.example.com" and "data.example.com" as examples.
:::

---

## Installing the Dashboard on the Server

Run the following script on your server to install the Dashboard:
```bash
curl -L https://raw.githubusercontent.com/nezhahq/scripts/refs/heads/main/install_en.sh -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```  

For a Docker installation, after running the script, follow the prompts to input the following details:
- `Enter site title:` - Customize your site title.
- `Enter exposed port:` - Set the public access port (default is 8008, customizable).
- `Select the language:` - Choose your preferred language.

Once the inputs are complete, the Docker image will be pulled. After the installation is complete and running successfully, you can access the Dashboard via the domain and port, such as:  
`http://dashboard.example.com:8008`  

To rerun the installation script in the future, use:
```bash
./nezha.sh
```
This will reopen the management script.

---

## Logging into the Dashboard Admin Panel

The Dashboard Admin Panel is available at:  
`http://dashboard.example.com:8008/dashboard`  

The default username and password for the first login are both `admin`.

::: warning  
The default password is weak, which poses a significant security risk for a high-privilege dashboard.  
It is strongly recommended to immediately change the password after installation:  
Navigate to your profile by clicking on the avatar → "Personal Information" → "Update Profile."  
Create a strong password with a minimum of 18 characters, including a mix of uppercase and lowercase letters, numbers, and symbols.
:::

---

## Configuring Reverse Proxy

Refer to [Dashboard Reverse Proxy Configuration](/en_US/guide/q3.html).

---

## Updating the Dashboard

To update the Dashboard, run the following script:
```bash
./nezha.sh
```
Then, select the option to restart and update the Dashboard.
```