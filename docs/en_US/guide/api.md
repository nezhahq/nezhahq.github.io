**Nezha Monitoring now supports querying the status information of the Agent in the Dashboard using the API**  

## Create Token
API allows Token authentication method and Cookies authentication method   
To create a new Token, after entering the admin panel, click on the avatar in the upper right corner and select "API Token" to enter the Token management page    
Click "Add Token" and after customizing the notes, click "Add"  
To delete a Token, please select the corresponding Token and click the delete icon on the right  
::: warning  
Token is the authentication tool of API, it is very important for your Dashboard's information security, please don't leak your Token to others  
:::

## Authentication method
Token authentication method:  
```  
Request Headers:  
Authorization: Token
```  
## How to use    
::: warning  
The negative timestamp in the example below is (0000-00-00)  
It is currently used to indicate that the Agent has never reported since the Dashboard went live  
However, it is not recommended to use positivity or negativity to determine the status  
:::  
::: tip
**The request method is `Get` and the return format is `JSON`.**  
:::
+ Get a list of servers: `GET /api/v1/server/list?tag=`  
query: tag (ServerTag means the group of servers, if this value is provided, only the servers in this group are queried)   

JSON Return Example:
```
{
    "code": 0,
    "message": "success",
    "result": [
        {
            "id": 1,
            "name": "Server1",
            "tag": "Tag1",
            "last_active": 1653014667,
            "ipv4": "1.1.1.1",
            "ipv6": "",
            "valid_ip": "1.1.1.1"
        },
        {
            "id": 2,
            "name": "Server2",
            "tag": "Tag2",
            "last_active": -62135596800,
            "ipv4": "",
            "ipv6": "",
            "valid_ip": ""
        }
    ]
}
```  
  
+ Get server details: `GET /api/v1/server/details?id=&tag=`  
query: id (ServerID. Multiple IDs are separated by commas, provide this value to query the server corresponding to the ID, while ignoring the tag value)  
query: tag (ServerTag, if this value is provided, only the servers in this group are queried)  

JSON Return Example:
```
{
    "code": 0,
    "message": "success",
    "result": [
        {
            "id": 1,
            "name": "Server1",
            "tag": "Tag1",
            "last_active": 1653015042,
            "ipv4": "1.1.1.1",
            "ipv6": "",
            "valid_ip": "1.1.1.1",
            "host": {
                "Platform": "darwin",
                "PlatformVersion": "12.3.1",
                "CPU": [
                    "Apple M1 Pro 1 Physical Core"
                ],
                "MemTotal": 17179869184,
                "DiskTotal": 2473496842240,
                "SwapTotal": 0,
                "Arch": "arm64",
                "Virtualization": "",
                "BootTime": 1652683962,
                "CountryCode": "hk",
                "Version": ""
            },
            "status": {
                "CPU": 17.330210772540017,
                "MemUsed": 14013841408,
                "SwapUsed": 0,
                "DiskUsed": 2335048912896,
                "NetInTransfer": 2710273234,
                "NetOutTransfer": 695454765,
                "NetInSpeed": 10806,
                "NetOutSpeed": 5303,
                "Uptime": 331080,
                "Load1": 5.23486328125,
                "Load5": 4.873046875,
                "Load15": 3.99267578125,
                "TcpConnCount": 195,
                "UdpConnCount": 70,
                "ProcessCount": 437
            }
        },
        {
            "id": 2,
            "name": "Server2",
            "tag": "Tag2",
            "last_active": -62135596800,
            "ipv4": "",
            "ipv6": "",
            "valid_ip": "",
            "host": {
                "Platform": "",
                "PlatformVersion": "",
                "CPU": null,
                "MemTotal": 0,
                "DiskTotal": 0,
                "SwapTotal": 0,
                "Arch": "",
                "Virtualization": "",
                "BootTime": 0,
                "CountryCode": "",
                "Version": ""
            },
            "status": {
                "CPU": 0,
                "MemUsed": 0,
                "SwapUsed": 0,
                "DiskUsed": 0,
                "NetInTransfer": 0,
                "NetOutTransfer": 0,
                "NetInSpeed": 0,
                "NetOutSpeed": 0,
                "Uptime": 0,
                "Load1": 0,
                "Load5": 0,
                "Load15": 0,
                "TcpConnCount": 0,
                "UdpConnCount": 0,
                "ProcessCount": 0
            }
        }
    ]
}
```
  
## Case - Build your own Telegram bot to query server information  
Refer to [Community Project](https://github.com/spiritLHLS/nezha_api_tgbot) (Chinese)  
The bot can request server status information from the Dashboard through the API, and then send the information to the user.  
You can build this bot to easily view the current status of a given server without opening the Dashboard.  