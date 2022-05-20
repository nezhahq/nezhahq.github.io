## API接口（允许使用API Token认证与Cookies认证）
Token认证方式：
```  
Request Headers:  
Authorization: Token
```  

下面示例中的负数时间戳为（0000-00-00）  
目前表示面板上线后该服务器从未汇报过  
但不建议用正负性判断状态  

获取服务器列表：`GET /api/v1/server/list?tag=`  
query: tag (ServerTag 提供此参数则仅查询该分组下的服务器)
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
