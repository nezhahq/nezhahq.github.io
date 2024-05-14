---
outline: deep
---

**Nezha Monitoring supports querying the status information of Agents using the API interface**

## Creating a Token

Nezha Monitoring's API interface allows for Token authentication and Cookies authentication. To create a new Token, go to the admin panel, click on the avatar in the top right corner, select "API Token," and enter the Token management page. Click "Add Token", add a custom note, and click "Add".

To delete a Token, select the corresponding Token and click the delete icon on the right.

::: warning
Tokens are the authentication credentials for the API interface. They are critical to the security of your Dashboard's information, so do not share your Token with others.
:::

## Authentication Method

Ensure the request header contains `Authorization: Token` for authentication.

Token authentication method:
``` 
Request Headers:
Authorization: Token
```

## Usage Instructions

::: warning
Negative timestamps in the following examples represent `0000-00-00`. This currently indicates that the Agent has never reported since the Dashboard went online, but it is not recommended to use the positive or negative value to determine the status.
:::

::: tip
**The request method is `GET`, and the response format is `JSON`.**
:::

### Get Server List

Request:
``` 
GET /api/v1/server/list?tag= 
```

Parameters:
- `tag` (optional): ServerTag is the server group. Provide this parameter to query only servers in that group.

Example response:
```json
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

### Get Server Details

Request:
``` 
GET /api/v1/server/details?id=&tag= 
```

Parameters:
- `id` (optional): ServerID, multiple IDs separated by commas. Provide this parameter to query the server corresponding to that ID and ignore the `tag` parameter.
- `tag` (optional): ServerTag, provide this parameter to query only servers in that group.

Example response:
```json
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
                "CPU": 17.33,
                "MemUsed": 14013841408,
                "SwapUsed": 0,
                "DiskUsed": 2335048912896,
                "NetInTransfer": 2710273234,
                "NetOutTransfer": 695454765,
                "NetInSpeed": 10806,
                "NetOutSpeed": 5303,
                "Uptime": 331080,
                "Load1": 5.23,
                "Load5": 4.87,
                "Load15": 3.99,
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

## Usage Examples

### Get All Server Information

```python
import requests

url = "http://your-dashboard/api/v1/server/list"
headers = {
    "Authorization": "your_token"
}

response = requests.get(url, headers=headers)
data = response.json()

for server in data['result']:
    print(f"Server Name: {server['name']}, Last Active: {server['last_active']}, IP: {server['valid_ip']}")
```

### Get Specific Server Details

```python
import requests

server_id = 1  # Replace with your server ID
url = f"http://your-dashboard/api/v1/server/details?id={server_id}"
headers = {
    "Authorization": "your_token"
}

response = requests.get(url, headers=headers)
data = response.json()

server = data['result'][0]
print(f"Server Name: {server['name']}")
print(f"CPU Usage: {server['status']['CPU']}%")
print(f"Memory Used: {server['status']['MemUsed']} bytes")
print(f"Disk Used: {server['status']['DiskUsed']} bytes")
print(f"Network In Speed: {server['status']['NetInSpeed']} bytes/s")
print(f"Network Out Speed: {server['status']['NetOutSpeed']} bytes/s")
```

With the above example code, you can easily obtain and process server status information, enabling automated monitoring and management.