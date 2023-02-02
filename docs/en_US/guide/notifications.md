Nezha Monitoring supports monitoring of server load, CPU, memory, hard disk, data transfer, monthly data transfer, number of processes, number of connections, and sends alarm notifications when one of these items reaches a user-set limit.  
<br/>
<br/>
## Flexible notification methods  
`#NEZHA#` is the panel message placeholder, the panel will automatically replace the placeholder with the actual message when it triggers the notification    

The content of Body is in `JSON` format：**When the request type is FORM**，the value is in the form of `key:value`，`value` can contain placeholders that will be automatically replaced when notified. **When the request type is JSON** It will only do string substitution and submit to the `URL` directly.

Placeholders can also be placed inside the URL, and it will perform a simple string substitution when requested.


Refer to the example below, it is very flexible.

  - **Bark Example**
    - Name: Bark
    - URL: The first part is the key, followed by three matches/: key/: body or/: key/: title/: body or/: key/: category/: title/: body
    - Request method: GET
    - Request Type: Default
    - Body: null
     
    - Name: Bark
    - URL:/push
    - Request method: POST
    - Request type: FORM
    - Body: `{"title": "#SERVER.NAME#","device_key":"xxxxxxxxx","body":"#NEZHA#","icon":" https://xxxxxxxx/nz.png "}`

   - **Telegram Example, contributed by [@haitau](https://github.com/haitau)**

     - Name：Telegram Robot message notification
     - URL：https://api.telegram.org/botXXXXXX/sendMessage?chat_id=YYYYYY&text=#NEZHA#
     - Request method: GET
     - Request type: default
     - Body: null
     - Notes for this method：The XXXXXX in botXXXXXX is the token provided when you follow the official @Botfather in Telegram and enter /newbot to create a new bot. (In the line after _Use this token to access the HTTP API_). The 'bot' are essential. After creating a bot, you need to talk to the BOT in Telegram (send a random message) before you can send a message by using API. YYYYYY is Telegram user's ID, you can get it by talking to the bot @userinfobot.    

  - **Email notification example - Outlook, contributed by [@Cantoblanco](https://github.com/cantoblanco)**   

     - Name: MS Mail Notification
     - URL：https://graph.microsoft.com/v1.0/me/microsoft.graph.sendMail
     - Request method: POST
     - Request type: JSON
     - Header: `{"Content-type":"application/json",
                  "Authorization":"Bearer {Token}"}`
     - Body:
  ```
  {
    "message": {
        "subject": "Server Status Notification",
        "body": {
            "contentType": "Text",
            "content": "#NEZHA#"
        },
        "toRecipients": [
            {
                "emailAddress": {
                    "address": "ADDRESS FOR RECEVING EMAILS"
                }
            }
        ]
    }
}
  ```

  - Notes for this method: This method requires calling Microsoft Graph V1.0, you need to go to Microsoft Graph and create your own application, give `Mail.Send` permission and get the Token, or you can go [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) directly to give permission and get the Token, just replace the Token in the Header with the actual Token.
     

<br/>
<br/>

## Description of notification rules

### Basic Rules

- Type: one or more types can be selected, such as in a rule to select more than one type, you need to **meet all the selected types at the same time** to trigger the notification (see the example later)  
  - `cpu`、`memory`、`swap`、`disk`
  - `net_in_speed` Inbound speed, `net_out_speed` Outbound speed, `net_all_speed` Inbound + Outbound speed, `transfer_in` Inbound Transfer, `transfer_out` Outbound Transfer, `transfer_all` Total Transfer
  - `offline` Offline monitoring
  - `load1`、`load5`、`load15` Load
  - `process_count` Number of processes _Currently, counting the number of processes takes up too many resources and is not supported at the moment_
  - `tcp_conn_count`、`udp_conn_count` Number of connections
- duration：Lasting for a few seconds, the notification will only be triggered when the sampling record reaches 30% or more within a few seconds
- min/max
  - Transfer, network speed, and other values of the same type. Unit is byte (1KB=1024B，1MB = 1024\*1024B)
  - Memory, hard disk, CPU. units are usage percentages
  - No setup required for offline monitoring
- cover `[{"type":"offline","duration":10, "cover":0, "ignore":{"5": true}}]`
  - `0` Cover all, use `ignore` to ignore specific servers
  - `1` Ignore all, use `ignore` to monitoring specific servers  
  For example: `[{"type":"offline","duration":10, "cover":0, "ignore":{"5": true}}]`
- ignore:   Select to ignore specific servers, use with `cover` with server id and boolean, e.g.: `{"1": true, "2":false}`  

**Complete examples:**  
 
>>Add an offline notification
>
>   - Name: Offline notification
>   - Rules: `[{"Type":"offline","Duration":10}]`
>   - Enable: √
  

  
>>Add an notification when the CPU exceeds 50% for 10s **but** the memory usage is below 20% for 20s  
>
>   - Name: CPU and RAM
>   - Rules: `[{"Type":"cpu","Min":0,"Max":50,"Duration":10},{"Type":"memory","Min":20,"Max":0,"Duration":20}]`
>   - Enable: √  
  
>>Send specific server notifications to specific notification groups  
>
>Case:  
>You have four servers, 1, 2, 3, 4, and two different notification groups, A and B  
>1, 2 The two servers are down for 10 minutes and send a notification to Notification Group A  
>3, 4 These two servers are down for ten minutes and then send a notification to Notification Group B    
>
>First you need to set up two notification groups, A and B, and then add two alarm rules:    
>  
>**Rule I:**
>   - Name: 1, 2 Off-line, send notification to group A
>   - Rules:`[{"type":"offline","duration":600,"cover":1,"ignore":{"1":true,"2":true}}]`
>   - Notification group: A  
>   - Enable: √  
>
>**Rule II:**
>   - Name: 3, 4 Off-line, send notification to group B
>   - Rules:`[{"type":"offline","duration":600,"cover":1,"ignore":{"3":true,"4":true}}]`
>   - Notification group: B
>   - Enable: √  

**Using these rules flexibly will help you to make full use of the notification function**  
  
<br/> 

###  Special: Any-cycle transfer notification

Can be used as monthly transfer notificatin  

- type
  - `transfer_in_cycle` Inbound transfer during the cycle
  - `transfer_out_cycle` Outbound transfer during the cycle
  - `transfer_all_cycle` The sum of inbound and outbound transfer during the cycle

- `cycle_start` Start date of the statistical cycle (can be the start date of your server's billing cycle), the time format is RFC3339, for example, the format in Beijing time zone is `2022-01-11T08:00:00.00+08:00`
- `cycle_interval` Interval time cycle  (For example, if the cycle is in days and the value is 7, it means that the statistics are counted every 7 days)
- `cycle_unit` Statistics cycle unit, default `hour`, optional (`hour`, `day`, `week`, `month`, `year`)
- `min/max`, `cover`, `ignore` Please refer to the basic rules to configure

>Example:  
>>The servers with ID 3 and 4 (defined in the `ignore`) are counted on the 1st of each month, and a notification is triggered when the monthly outbound transfer reaches 1TB during the cycle.  
>
> `[{"type":"transfer_out_cycle","max":1099511627776,"cycle_start":"2022-01-01T00:00:00+08:00","cycle_interval":1,"cycle_unit":"month","cover":1,"ignore":{"3":true,"4":true}}]`
 
 ## Description of mode of triggering notification
- Always triggered: A notification is triggered each time the status reported by the Agent matches the rules of the notification  
- Triggered only once: only one notification is triggered when the state changes, such as changing from normal state to abnormal state or abnormal state back to normal state  

## Set the task to be executed when notification  
If you need to perform a task while sending a notification message, you can set those items  
+ `Tasks to be triggered in case of failure` The task to be executed when the notification status matches the change from "normal" to "failure", the task should be set in advance in the tasks page  
+ `Tasks to be triggered after fault recovery` The task to be executed when the notification status matches the change from " failure " to " normal ", the task should be set in advance in the tasks page
