**哪吒面板现在已经支持使用API接口查询面板中Agent的状态信息**  

## 创建Token
哪吒面板的API接口允许使用Token认证与Cookies认证  
要新建一个Token，在进入管理面板后，点击右上角的头像，选择 “API Token”，进入Token管理页面  
点击 “添加Token”，自定义备注后，点击 “添加”  
如需删除一个Token，请选择相应的Token，点击右侧的删除图标  
::: warning  
Token是API接口的鉴权工具，它对你的面板的信息安全非常重要，请不要泄漏你的Token给他人  
:::

## 认证方式
Token认证方式：
```  
Request Headers:  
Authorization: Token
```  
## 使用说明    
::: warning  
下面示例中的负数时间戳为（0000-00-00）  
目前表示Dashboard上线后该Agent从未汇报过  
但不建议用正负性判断状态  
:::  
::: tip
**请求方式为 `Get`，返回格式为 `JSON`**  
:::
+ 获取服务器列表：`GET /api/v1/server/list?tag=`  
query: tag (ServerTag是服务器的分组，提供此参数则仅查询该分组中的服务器)   

JSON返回示例：
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
  
+ 获取服务器详情：`GET /api/v1/server/details?id=&tag=`  
query: id (ServerID 多个ID以逗号分隔，提供此参数则查询该ID对应的服务器，同时无视tag参数)  
query: tag (ServerTag 提供此参数则仅查询该分组下的服务器)  

JSON返回示例：
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

## 使用案例 - 自建一个TG机器人来查询服务器信息  
参考[社区项目](https://github.com/spiritLHLS/nezha_api_tgbot)  
机器人可以通过API向面板请求服务器状态信息，得到信息后发送给用户  
你可以搭建此机器人来方便地查看指定服务器的当前状态且不需要打开面板