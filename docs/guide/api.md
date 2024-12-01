---
outline: deep
---

# API 接口
*V0版本，不适用于V1版本*

**哪吒监控支持使用 API 接口查询面板中 Agent 的状态信息** 

## 创建 Token

哪吒面板的 API 接口允许使用 Token 认证与 Cookies 认证。要新建一个 Token，在进入管理面板后，点击右上角的头像，选择 “API Token”，进入 Token 管理页面。点击 “API Token”，自定义备注后，点击 “添加”。

如需删除一个 Token，请选择相应的 Token，点击右侧的删除图标。

::: warning
Token 是 API 接口的鉴权凭据，它对你的面板的信息安全非常重要，请不要泄漏你的 Token 给他人。
:::

## 认证方式

确保在请求头中包含 `Authorization: Token` 进行身份认证。

Token 认证方式：
``` 
Request Headers:
Authorization: Token
```

## 使用说明

::: warning
下面示例中的负数时间戳为（0000-00-00），目前表示 Dashboard 上线后该 Agent 从未汇报过，但不建议用正负性判断状态。
:::

::: tip
**请求方式为 `GET`，返回格式为 `JSON`**
:::

### 获取服务器列表

请求：
``` 
GET /api/v1/server/list?tag= 
```

参数：
- `tag`（可选）：ServerTag 是服务器的分组，提供此参数则仅查询该分组中的服务器。

返回示例：
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

### 获取服务器详情

请求：
``` 
GET /api/v1/server/details?id=&tag= 
```

参数：
- `id`（可选）：ServerID，多个 ID 以逗号分隔，提供此参数则查询该 ID 对应的服务器，同时无视 `tag` 参数。
- `tag`（可选）：ServerTag，提供此参数则仅查询该分组下的服务器。

返回示例：
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

### 获取 ICMP Ping / TCPing 数据

此 API 无需认证。（除限制游客访问的服务器）

请求：
```
GET /api/v1/monitor/{id}
```

参数：
- `id`（必填）：ServerID，只能是一个正整数。

返回示例：
```json
{
    "code": 0,
    "message": "success",
    "result": [
        {
            "monitor_id": 1,
            "server_id": 1,
            "monitor_name": "Monitor1",
            "server_name": "Server1",
            "created_at": [
                1722142860000,
                1722142920000
            ],
            "avg_delay": [
                68.2275,
                70.1129
            ]
        },
        {
            "monitor_id": 2,
            "server_id": 1,
            "monitor_name": "Monitor2",
            "server_name": "Server1",
            "created_at": [
                1722142860000,
                1722142920000
            ],
            "avg_delay": [
                66.656,
                68.2153
            ]
        },
        {
            "monitor_id": 3,
            "server_id": 1,
            "monitor_name": "Monitor3",
            "server_name": "Server1",
            "created_at": [
                1722142860000,
                1722142920000
            ],
            "avg_delay": [
                61.4525,
                62.342
            ]
        }
    ]
}
```

注： `created_at` 和 `avg_delay` 为对应关系。

### 自动注册节点

说明: 用于自动化注册节点的脚本，示例代码详见下文。

参考: [https://github.com/naiba/nezha/pull/472](https://github.com/naiba/nezha/pull/472)

```http
POST /api/v1/server/register?simple=1
```

参数:

- `simple`:(可选) 指定返回数据的格式。
    - 当设置为 `simple=1`或者`simple=true` 时，返回的数据仅包含 Token 字符串（如 `8GYwaxYuLfU7zl7ndC`）。
    - 其他则返回完整的 JSON 对象：`{"code": 200, "message": "Server created successfully","secret": "8GYwaxYuLfU7zl7ndC"}`

请求体 (Payload):

你可以设置为空内容(`{}`), 然后nezha面板会使用默认值进行填充
- `Name`: 默认是节点的IP
- `Tag`: 默认是 "AutoRegister".
- `Note`:默认是 "".
- `HideForGuest`: 默认是 "on".

你也可以设置自己的请求参数:
```json
{
  "Name": "abcd",        // 节点名称
  "Tag": "",             // 标签，可选
  "Note": "",            // 备注信息，可选
  "HideForGuest": "on"   // 是否对访客隐藏
}
```

## 使用案例

### 获取所有服务器信息

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

### 获取特定服务器详情

```python
import requests

server_id = 1  # 替换为你的服务器ID
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

通过以上示例代码，可以轻松获取和处理服务器的状态信息，从而实现自动化监控和管理。

### 自动注册节点
1. 创建文件 `nezha_register.sh`，将以下内容复制到文件中：
```bash
#!/bin/bash

# Exit if NEZHA_TOKEN is not set
if [ -z "${NEZHA_TOKEN}" ]; then
    echo "NEZHA_TOKEN is not set. Exiting."
    exit 0
fi

# Set default values if variables are not set
NEZHA_PROBE_ADDRESS="${NEZHA_PROBE_ADDRESS:-probe.example.com}"
NEZHA_PROBE_PORT="${NEZHA_PROBE_PORT:-5555}"
NEZHA_DASHBOARD_URL="${NEZHA_DASHBOARD_URL:-https://nezha.example.com}"

NODE_NAME=${NODE_NAME:-$(hostname)}

# Send POST request and capture response and HTTP status code
response=$(curl -s -o response_body.json -w "%{http_code}" -X POST "${NEZHA_DASHBOARD_URL}/api/v1/server/register?simple=true" \
  -H "Content-Type: application/json" \
  -H "Authorization: ${NEZHA_TOKEN}" \
  -d "{\"Name\": \"${NODE_NAME}\"}")

# Extract HTTP status code and Nezha secret
HTTP_CODE="$response"
NEZHA_SECRET=$(cat response_body.json)
rm -f response_body.json

if [ "$HTTP_CODE" != "200" ]; then
    echo "Failed to get Nezha Secret. HTTP status code: $HTTP_CODE"
    exit 1
fi

# Additional check for NEZHA_SECRET to ensure it's not JSON-formatted (indicating failure)
if [[ "${NEZHA_SECRET:0:1}" == "{" ]]; then
    echo "Failed to get Nezha Secret. Received response: ${NEZHA_SECRET}"
    exit 1
fi

# Download and execute the install script with cleanup
curl -fsSL https://raw.githubusercontent.com/nezhahq/scripts/main/install.sh -o nezha.sh && \
chmod +x nezha.sh || { echo "Failed to download or make the script executable"; exit 1; }

# Clean up nezha.sh on exit
trap 'rm -f nezha.sh' EXIT

# Run the Nezha agent installation script
CMD="./nezha.sh install_agent "${NEZHA_PROBE_ADDRESS}" "${NEZHA_PROBE_PORT}" "${NEZHA_SECRET}" --tls"

echo "Run commnad : ${CMD}"

eval $CMD
```
2. 为脚本赋予可执行权限： `chmod +x nezha_register.sh`
3. 从dashboard获取token, 比如为 `POXbxorKJBM8wPMKX8r2PdMblyXvpggB`
4. 配置环境变量
```bash
export NEZHA_TOKEN="POXbxorKJBM8wPMKX8r2PdMblyXvpggB" # 从面板获取
export NEZHA_PROBE_ADDRESS="your_probe_address"        # 填写探针地址
export NEZHA_DASHBOARD_URL="https://nezha.example.com" # 修改为你的面板地址
export NEZHA_PROBE_PORT="5555"                         # 修改为你的探针端口（如有不同）
```
5. 运行注册脚本
```bash
./nezha_register.sh
```
6. 如果脚本成功运行，你会看到类似以下的日志：
```bash
Run command: ./nezha.sh install_agent probe.example.com 5555 YOUR_SECRET --tls
```
