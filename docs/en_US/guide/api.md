---
outline: deep
---

# API Interface

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

### Get ICMP Ping / TCPing monitor value

This API does not require authentication, except for servers with `HideForGuest` option enabled.

Request:
``` 
GET /api/v1/monitor/{id}
```

Parameters:
- `id` (required): ServerID, must be an positive integer.

Example response:
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

Note: `created_at` corresponds with `avg_delay`.

### Automatic Node Registration

Description: Script for automating node registration. Example code is provided below.
Reference: [https://github.com/naiba/nezha/pull/472](https://github.com/naiba/nezha/pull/472)

```http
POST /api/v1/server/register?simple=1
```

Parameters:

- `simple`: (optional): Specifies the format of the response data.
    - When set to `simple=1` or `simple=true`, the response will only include a Token string (e.g., `8GYwaxYuLfU7zl7ndC`).
    - Otherwise the response will return a complete JSON object:：`{"code": 200, "message": "Server created successfully","secret": "8GYwaxYuLfU7zl7ndC"}`

Request Payload:

The payload can be completely empty (`{}`), and the system will apply the following default values:
- `Name`: Defaults to the node’s IP address ($IP).
- `Tag`: Defaults to "AutoRegister".
- `Note`: Defaults to an empty string ("").
- `HideForGuest`: Defaults to "on".

You can also customize your data:
```json
  "Name": "abcd",        // Node name
  "Tag": "",             // Tag (optional)
  "Note": "",            // Note or description (optional)
  "HideForGuest": "on"   // Whether to hide from guests
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

### Automatic Node Registration
1. Create a file named `nezha_register.sh`, and copy the following content into it:
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
curl -fsSL https://raw.githubusercontent.com/nezhahq/scripts/main/install_en.sh -o nezha.sh && \
chmod +x nezha.sh || { echo "Failed to download or make the script executable"; exit 1; }

# Clean up nezha.sh on exit
trap 'rm -f nezha.sh' EXIT

# Run the Nezha agent installation script
CMD="./nezha.sh install_agent "${NEZHA_PROBE_ADDRESS}" "${NEZHA_PROBE_PORT}" "${NEZHA_SECRET}" --tls"

echo "Run commnad : ${CMD}"

eval $CMD
```
2. Grant execution permission to the script: `chmod +x nezha_register.sh`
3. Get `Token` from Nezha dashboard, e.g. `POXbxorKJBM8wPMKX8r2PdMblyXvpggB`
4. Set Environment Variables
```bash
export NEZHA_TOKEN="POXbxorKJBM8wPMKX8r2PdMblyXvpggB" # Obtain this token from the dashboard
export NEZHA_PROBE_ADDRESS="your_probe_address"        # Set your probe address
export NEZHA_DASHBOARD_URL="https://nezha.example.com" # Replace with your dashboard URL
export NEZHA_PROBE_PORT="5555"                         # Modify this port if needed
```
5. Run the script to complete node registration and probe installation:
```bash
./nezha_register.sh
```
6. If the script runs successfully, you will see output like the following:
```bash
Run command: ./nezha.sh install_agent probe.example.com 5555 YOUR_SECRET --tls
```