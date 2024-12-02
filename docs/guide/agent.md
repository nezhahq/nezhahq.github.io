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
2. 在“仪表板服务器域名/IP（无 CDN）”项中填入通信域名。  
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

由于群晖（Synology NAS）设备的系统基于特定版本的 Linux，其 shell 环境和软件包管理与标准 Linux 系统有所不同，因此不支持一键安装脚本。需要手动安装 Agent，具体步骤如下：

---

#### 1. 准备工作

1. **确保拥有管理员权限**  
   - 登录群晖的管理界面，或通过 SSH 使用管理员账户登录设备。

2. **安装必要的依赖**  
   如果群晖设备尚未安装 `wget`、`unzip` 或 `curl`，请按照以下步骤安装依赖：
   
   - **启用 SynoCommunity 仓库**  
     访问 [SynoCommunity](https://synocommunity.com/) 并按照指南启用，以支持更多软件包。
   
   - **安装 Entware**  
     ```bash
     # 下载并安装 Entware
     wget -O - https://raw.githubusercontent.com/Entware/entware-installer/master/installer.sh | /bin/sh
     ```
   
   - **通过 Entware 安装所需依赖**  
     ```bash
     opkg update
     opkg install wget unzip curl
     ```

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
   - `armv7l` 对应 `arm`
   - `aarch64` 对应 `arm64`

2. **下载适配的 Nezha Agent 二进制文件**  
   根据设备架构选择正确的下载链接。例如，对于 `amd64` 架构：
   ```bash
   wget -O nezha-agent.zip https://github.com/nezhahq/agent/releases/latest/download/nezha-agent_linux_amd64.zip
   ```

3. **解压文件**  
   将下载的压缩包解压到指定目录，例如 `/volume1/nezha`：
   ```bash
   unzip nezha-agent.zip -d /volume1/nezha
   ```

---

#### 3. 创建配置文件

1. **创建并编辑配置文件**  
   在 `/volume1/nezha` 目录下创建 `config.yml` 文件，并添加以下内容：
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
   - **保存文件**：将文件保存至 `/volume1/nezha/config.yml`。

---

#### 4. 运行 Agent

1. **赋予执行权限并启动 Agent**  
   ```bash
   chmod +x /volume1/nezha/nezha-agent && /volume1/nezha/nezha-agent -c /volume1/nezha/config.yml
   ```

2. **验证 Agent 连接**  
   - 查看 Dashboard，检查是否有新设备上线。
   - 查看 Agent 的日志，确保没有报错信息。

---

#### 5. 设置为开机自启动

群晖系统不支持 `systemd`，但可以通过任务计划（Task Scheduler）实现开机自启动：

1. **登录群晖 DSM 管理界面**  
   使用管理员账户登录 DSM。

2. **打开任务计划**  
   前往 **控制面板** > **任务计划**。

3. **创建新任务**  
   - **任务类型**：触发的任务 > 用户定义的脚本。
   - **任务名称**：例如 `Start Nezha Agent`。
   - **用户账号**：选择 `root`。
   - **任务设置**：
     - **触发事件**：选择 **开机**。
     - **任务内容**：在用户定义的脚本中输入以下命令：
       ```bash
       chmod +x /volume1/nezha/nezha-agent && /volume1/nezha/nezha-agent -c /volume1/nezha/config.yml
       ```
   
4. **保存并运行任务**  
   - 保存任务后，选择 `Start Nezha Agent` 任务，手动运行一次以确保配置正确。
   - 返回 Dashboard，确认 Agent 是否正常运行。

