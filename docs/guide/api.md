## API接口（允许使用API Token认证与Cookies认证）
Token认证方式：
```  
Request Headers:  
Authorization: Token
```  
获取服务器列表：`GET /api/v1/server/list?tag=`  

query: tag (ServerTag 提供此参数则仅查询该分组下的服务器)
```
{
    "code": 0,
    "message": "success",
    "result": [
        {
            "id": 1,
            "name": "ServerName",
            "tag": "ServerTag",
            "ipv4": "1.1.1.1",
            "ipv6": "",
            "valid_ip": "1.1.1.1"
        }
    ]
}
```
  
获取服务器详情：`GET /api/v1/server/details?id=&tag=`  
query: id (ServerID 以逗号分隔 提供此参数则查询该列表对应的服务器 同时无视tag参数)  
query: tag (ServerTag 提供此参数则仅查询该分组下的服务器)
```
{
    "code": 0,
    "message": "success",
    "result": [
        {
            "id": 1,
            "name": "ServerName",
            "tag": "ServerTag",
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
                "CPU": 10.94117647050606,
                "MemUsed": 14150975488,
                "SwapUsed": 0,
                "DiskUsed": 2138323378176,
                "NetInTransfer": 652628744,
                "NetOutTransfer": 465447325,
                "NetInSpeed": 2156,
                "NetOutSpeed": 4254,
                "Uptime": 157738,
                "Load1": 3.82373046875,
                "Load5": 3.74169921875,
                "Load15": 4.5966796875,
                "TcpConnCount": 214,
                "UdpConnCount": 48,
                "ProcessCount": 451
            }
        }
    ]
}
````
