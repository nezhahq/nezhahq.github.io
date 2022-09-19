**Service area is a function setting area for setting up Agents to monitor external websites or servers**  
**The monitoring results can be viewed on the "Services" page in the home page**
<br/>

## How to use

To add a new monitor, you can go to the "Services" page in the administration panel and click "Add Service Monitor".  

To add a service monitor, you need to complete the following settings:
+ `Name` - Customize a name    

+ `Type` - Select a monitoring type. Nezha currently supports three monitoring types: "HTTP-GET", "ICMP-Ping" and "TCP-Ping".

+ `Target` - Depending on the type you choose, the target is set in different ways
> + `HTTP-GET`: Selecting this type, you should enter a URL as the target, the URL should be added with `http://` or `https://`  **If your target URL is `https://`, it will also monitor the SSL certificate of that URL and trigger a notification when the SSL certificate expires or changes.**  
For example: https://example.com  

> + `ICMP-Ping`: When selecting this type, you should enter a domain name or IP without a port number  
For example: 1.1.1.1 or example.com 

> + `TCP-Ping`: When selecting this type, you should enter a domain name or IP and include the port number  
For example: 1.1.1.1:80 or example.com:22  

+ `Interval`： Sets the time interval in seconds between each time Agent sends requests to the target  

+ `Coverage`： Select a rule to determine which Agents to use to send requests to the target  

+ `Specific Servers`： Use with coverage to select the Agent to be excluded from the rule  

+ `Notification Group`： Select the notification method you have set up on the "Notification" page. [Click here](/en_US/guide/notifications.html#flexible-notification-methods) for more information

+ `Enable Failure Notification`： Select whether to receive target failure notifications as needed, default is inactive  

After setting, click "Add" and you are done.  
Wait for a moment to go to the "Services" page on the home page to view the monitoring results  
<br/>

## Notification of delay changes
Nezha Monitoring monitors and statistics the delay between the Agent and the target server, and sends notifications in case of significant changes    
Use this feature to help you monitor your server's routes for changes  

+ `Enable delay notifications`：When enabled, notifications will be sent when the Agent to target server delay is higher than the `Max delay` or lower than the `Min delay`  
<br/>

## Management Monitor
To manage existing service monitoring, you can go to the "Services" page in the administration panel  
Select a monitoring configuration and click the icon on the right to edit or delete it  