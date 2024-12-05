---
outline: deep
---

# 安装 Agent

**哪吒监控的被控端服务被称为 Agent，本文档将介绍如何在被控端服务器上安装 Agent，并与 Dashboard 连接。**  
::: tip  
Agent 二进制文件仓库地址为：<https://github.com/nezhahq/agent/releases>  
:::

## 一键安装 Agent

哪吒监控支持在 Windows、macOS 和 Linux 上一键安装 Agent。遵循本文档的步骤，你可以轻松地在服务器上部署它。

### 准备工作

在安装前，需要提前在管理面板中设置通信域名，该域名不建议接入 CDN。本文档以示例通信域名 “data.example.com” 为例。  
1. 在后台管理面板点击头像，进入“系统设置”页。  
2. 在“Agent对接地址【域名/IP:端口】”项中填入通信域名和端口 “data.example.com:8008”。  
3. 点击“确认”保存设置。

### 一键安装步骤

1. 在 `服务器` 页面中，点击 `安装命令` 并选择对应操作系统，安装命令将自动复制到你的剪贴板。  
2. 在被控端服务器中运行安装命令，等待安装完成后返回到 `服务器` 页面查看是否上线。  
3. 如果安装成功，页面中将自动弹出新的服务器，你可以点击编辑按钮为其设置名称。  

### 平台特有说明

#### Windows 特殊说明
1. 在 Windows 服务器中，运行 PowerShell。  
2. 在 PowerShell 中粘贴并运行安装命令。  
3. 如遇到「执行策略变更」确认提示，输入 `Y` 并回车。

## 其他方式安装 Agent

---

### 在群晖系统中安装 Agent（DSM 7）

<details>
  <summary>点击展开/收起</summary>

由于群晖（Synology NAS）设备的系统基于特定版本的 Linux，其 shell 环境和软件包管理与标准 Linux 系统有所不同，因此不支持一键安装脚本。需要手动安装 Agent，具体步骤如下：

---

#### 1. 准备工作

1. **确保拥有管理员权限**  
   - 登录群晖的管理界面，或通过 SSH 使用管理员账户登录设备。

2. **安装必要的依赖**  
   确定群晖设备已安装 `wget`、`unzip` 或 `curl`

:::tip

也可以提前下载并解压好 Nezha Agent 的二进制文件，通过群晖的 DSM File Station 手动上传，免去安装依赖的步骤。

:::

---

#### 2. 下载 Nezha Agent

1. **确定群晖的 CPU 架构**  
   使用以下命令获取设备的架构信息：
   ```bash
   uname -m
   ```
   常见架构对应关系：
   - `x86_64` 对应 `amd64`
   - `armv7l` 或 `aarch64` 对应 `arm`

2. **下载适配的 Nezha Agent 二进制文件**  
   根据设备架构选择正确的下载链接。例如，对于 `amd64` 架构：
   ```bash
   wget -O nezha-agent.zip https://github.com/nezhahq/agent/releases/latest/download/nezha-agent_linux_amd64.zip
   ```

3. **解压文件**  
   将下载的压缩包解压到指定目录，例如 `/opt/nezha`：
   ```bash
   mkdir -p /opt/nezha
   unzip nezha-agent.zip -d /opt/nezha
   ```

4. **赋予运行权限**
   ```bash
   chmod +x /opt/nezha/nezha-agent
   ```
---

#### 3. 创建配置文件

1. **创建并编辑配置文件**  
   在 `/opt/nezha` 目录下创建 `config.yml` 文件，并添加以下内容：
   ```yaml
   client_secret: your_agent_secret
   debug: false
   disable_auto_update: false
   disable_command_execute: false
   disable_force_update: false
   disable_nat: false
   disable_send_query: false
   gpu: false
   insecure_tls: false
   ip_report_period: 1800
   report_delay: 1
   server: data.example.com:8008
   skip_connection_count: false
   skip_procs_count: false
   temperature: false
   tls: false 
   use_gitee_to_upgrade: false
   use_ipv6_country_code: false
   uuid: your_uuid
   ```
   - **字段说明**：
     - `server`：替换为 Dashboard 地址和端口，如 `data.example.com:8008`。
     - `client_secret`：替换为 Dashboard 配置文件中的 `agentsecretkey`，路径通常为 `/opt/nezha/dashboard/data/config.yaml`。
     - `uuid`：为该 Agent 生成一个唯一标识符，不要与同一个 Dashboard 中其他的 Agent 重复，可使用 `uuidgen` 命令生成：
       ```bash
       uuidgen
       ```
   - **保存文件**：将文件保存至 `/opt/nezha/config.yml`。

---

#### 4. 创建 systemctl 服务文件

1. **创建服务文件**  
   在 `/etc/systemd/system/` 目录下创建 `nezha-agent.service` 文件：
   ```bash
   sudo nano /etc/systemd/system/nezha-agent.service
   ```

2. **添加以下内容**：
   ```ini
   [Unit]
   Description=Nezha Agent
   After=network.target

   [Service]
   Type=simple
   User=root
   Group=root
   ExecStart=/opt/nezha/nezha-agent -c /opt/nezha/config.yml
   Restart=always
   RestartSec=5

   [Install]
   WantedBy=multi-user.target
   ```

3. **保存文件并重新加载服务配置**：
   ```bash
   sudo systemctl daemon-reload
   ```

---

#### 5. 启动 Agent

1. **启动服务**  
   使用以下命令启动 Agent：
   ```bash
   sudo systemctl start nezha-agent
   ```

2. **设置开机自启动**  
   ```bash
   sudo systemctl enable nezha-agent
   ```

3. **查看服务状态**  
   确保 Agent 已成功启动：
   ```bash
   sudo systemctl status nezha-agent
   ```
---

#### 6. 验证 Agent 连接

1. 登录 Dashboard，检查是否有新设备上线。
2. 如果服务运行正常且日志中无报错，则安装完成。

</details>

---

### 在 Windows 系统中手动安装 Agent

<details>
  <summary>点击展开/收起</summary>

Windows 系统除了一键脚本，也可以下载对应的二进制文件并手动配置，以下是详细步骤：

---

#### 1. 准备工作

1. **确保管理员权限**  
   使用管理员账户登录 Windows 系统。

2. **安装必要工具**  
   - 确保有解压工具（如 `7-Zip` 或 `WinRAR`）。

---

#### 2. 下载 Nezha Agent

1. **确认系统架构**  
   - Windows 系统一般为 `amd64` 架构，可直接下载对应的二进制文件。

2. **下载 Nezha Agent 文件**  
   - 访问 [Nezha Agent Releases](https://github.com/nezhahq/agent/releases)，下载适用于 `Windows` 的版本，例如：
     ```plaintext
     nezha-agent_windows_amd64.zip
     ```

3. **解压文件**  
   - 将下载的压缩包解压到指定目录，例如：`C:\nezha`。

---

#### 3. 创建配置文件

1. **创建并编辑配置文件**  
   在解压目录中创建 `config.yml` 文件，内容如下：
   ```yaml
   client_secret: your_agent_secret
   debug: false
   disable_auto_update: false
   disable_command_execute: false
   disable_force_update: false
   disable_nat: false
   disable_send_query: false
   gpu: false
   insecure_tls: false
   ip_report_period: 1800
   report_delay: 1
   server: data.example.com:8008
   skip_connection_count: false
   skip_procs_count: false
   temperature: false
   tls: false 
   use_gitee_to_upgrade: false
   use_ipv6_country_code: false
   uuid: your_uuid
   ```
   - **字段说明**：
     - `server`：替换为您的 Dashboard 地址和端口，例如 `data.example.com:8008`。
     - `client_secret`：替换为 Dashboard 的 `agentsecretkey`，通常位于 `/opt/nezha/dashboard/data/config.yaml` 文件中。
     - `uuid`：可以通过在线工具生成。

2. **保存文件**  
   将文件保存为 `config.yml`，存放在 Agent 的目录中。

---

#### 4. 运行 Agent

1. **以管理员权限运行 Agent**  
   打开命令提示符，进入 Agent 的目录并运行以下命令：
   ```powershell
   nezha-agent.exe -c config.yml
   ```

2. **验证连接**  
   - 登录 Dashboard，查看是否有新设备上线。
   - 如果日志中没有报错信息，说明安装成功。

---

#### 5. 设置为服务运行

1. **安装为服务**  
   - 进入 Agent 的目录，在命令提示符中运行：
     ```powershell
     nezha-agent.exe service install
     ```

2. **启动服务**  
   - 安装成功后，Agent 会自动以服务形式启动，重启系统时也会自动运行。

3. **卸载服务**  
   - 如需卸载服务，运行以下命令：
     ```powershell
     nezha-agent.exe service uninstall
     ```

</details>

---

### 在 OpenWrt 系统中安装 Agent

<details>
  <summary>点击展开/收起</summary>

OpenWrt 是轻量级 Linux 系统，需通过手动下载和配置安装 Nezha Agent。

---

#### 1. 准备工作

1. **确保管理员权限**  
   - 通过 SSH 登录到 OpenWrt，使用 `root` 账户操作。

2. **安装必要工具**  
   - 更新软件包列表并安装必要工具：
     ```bash
     opkg update
     opkg install wget unzip
     ```

---

#### 2. 下载 Nezha Agent

1. **确定系统架构**  
   使用以下命令获取架构信息：
   ```bash
   uname -m
   ```
   常见架构对应关系：
   - `x86_64` 对应 `nezha-agent_linux_amd64.zip`
   - `arm` 或 `aarch64` 对应 `nezha-agent_linux_arm.zip`

2. **下载适配的 Nezha Agent**  
   ```bash
   wget -O nezha-agent.zip https://github.com/nezhahq/agent/releases/latest/download/nezha-agent_linux_<arch>.zip
   ```

3. **解压文件**  
   解压文件至 `/etc/nezha` 目录：
   ```bash
   mkdir -p /etc/nezha
   unzip nezha-agent.zip -d /etc/nezha
   ```

---

#### 3. 创建配置文件

1. **创建配置文件**  
   创建并编辑 `/etc/nezha/config.yml` 文件并填入以下内容：
   ```bash
   touch /etc/nezha/config.yml
   vi /etc/nezha/config.yml
   ```
   ```yaml
   client_secret: your_agent_secret
   debug: false
   disable_auto_update: false
   disable_command_execute: false
   disable_force_update: false
   disable_nat: false
   disable_send_query: false
   gpu: false
   insecure_tls: false
   ip_report_period: 1800
   report_delay: 1
   server: data.example.com:8008
   skip_connection_count: false
   skip_procs_count: false
   temperature: false
   tls: false 
   use_gitee_to_upgrade: false
   use_ipv6_country_code: false
   uuid: your_uuid
   ```

2. **保存配置文件**  
   确保配置文件路径正确：`/etc/nezha/config.yml`。

---

#### 4. 运行 Agent

1. **赋予执行权限并启动 Agent**  
   ```bash
   chmod +x /etc/nezha/nezha-agent
   /etc/nezha/nezha-agent -c /etc/nezha/config.yml
   ```

2. **验证 Agent 连接**  
   - 登录 Dashboard 检查是否有新设备上线。
   - 确认 Agent 运行状态正常。

---

#### 5. 设置为开机自启动

在 OpenWrt 上，可以通过创建服务脚本的方式实现 Nezha Agent 开机自启动。

---

1. **创建服务脚本**  
   在 `/etc/init.d/nezha-service` 中创建一个服务脚本：
   ```bash
   vi /etc/init.d/nezha-service
   ```

2. **添加以下内容**  
   将以下内容复制到文件中，并根据需求修改 `nezha-agent` 的路径和配置文件路径：
   ```bash
   #!/bin/sh /etc/rc.common

   START=99
   USE_PROCD=1

   start_service() {
       procd_open_instance
       procd_set_param command /etc/nezha/nezha-agent -c /etc/nezha/config.yml
       procd_set_param respawn
       procd_close_instance
   }

   stop_service() {
       killall nezha-agent
   }

   restart() {
       stop
       sleep 2
       start
   }
   ```

3. **赋予执行权限**  
   保存文件后，赋予脚本执行权限：
   ```bash
   chmod +x /etc/init.d/nezha-service
   ```

4. **启用服务**  
   运行以下命令启用并启动服务：
   ```bash
   /etc/init.d/nezha-service enable
   /etc/init.d/nezha-service start
   ```

5. **验证启动状态**  
   使用以下命令检查服务是否正常运行：
   ```bash
   ps | grep nezha-agent
   ```

---

### 注意事项

- **配置文件路径**：确保脚本中配置文件的路径（如 `/etc/nezha/config.yml`）正确。
- **服务管理**：可以使用以下命令管理服务：
  - 手动启动服务：
    ```bash
    /etc/init.d/nezha-service start
    ```
  - 停止服务：
    ```bash
    /etc/init.d/nezha-service stop
    ```
  - 重启服务：
    ```bash
    /etc/init.d/nezha-service restart
    ```
- **日志排查**：如 Agent 无法正常启动，可通过 `logread` 检查相关日志。
</details>
