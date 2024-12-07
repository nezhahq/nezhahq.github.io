---
outline: deep
---
# Installing the Agent

**The client-side service of Nezha Monitoring is called the Agent. This document will guide you on how to install the Agent on the client server and connect it to the Dashboard.**  
::: tip  
The binary repository for the Agent is available at: <https://github.com/nezhahq/agent/releases>  
:::

## One-click Installation of the Agent

Nezha Monitoring supports one-click installation of the Agent on Windows, macOS, and Linux. By following the steps in this document, you can easily deploy it on your server.

### Prerequisites

Before installation, you need to set up a communication domain in the Dashboard Admin Panel. It is not recommended to route this domain through a CDN. This document uses the example communication domains "data.example.com".  
1. In the Dashboard Admin Panel, click on your avatar to navigate to the **System Settings** page.  
2. In the **Agent Connection Address [Domain/IP:Port]** field, enter the communication domain and port, e.g., `data.example.com:8008`.  
3. Click **Confirm** to save the settings.

### One-click Installation Steps

1. On the **Servers** page, click **Install Command** and select your corresponding operating system. The installation command will be automatically copied to your clipboard.  
2. Run the installation command on the client server. After the installation completes, return to the **Servers** page to check if the Agent has come online.  
3. If the installation is successful, a new server  will automatically appear on the page. You can click the **Edit** button to assign a name to it.  

### Platform-specific Instructions

#### Windows Specific Instructions
1. On the Windows server, open PowerShell.  
2. Paste and run the installation command in PowerShell.  
3. If prompted with an **"Execution Policy Change"** confirmation, type `Y` and press Enter.

## Alternative Methods to Install the Agent

---

### Installing the Agent on Synology DSM 7

<details>
  <summary>Click to Expand/Collapse</summary>

Since Synology NAS devices are based on specific versions of Linux, their shell environments and package managers differ from standard Linux systems, making one-click installation scripts unsupported. Therefore, you need to manually install the Agent by following these steps:

---

#### 1. Preparation

1. **Ensure Administrator Privileges**  
   - Log in to the Synology management interface or SSH into the device using an administrator account.

2. **Install Necessary Dependencies**  
   Ensure that your Synology device has `wget`, `unzip`, or `curl` installed.

::: tip  
Alternatively, you can download and extract the Nezha Agent binaries in advance and manually upload them via Synology's DSM File Station, bypassing the need to install dependencies.
:::

---

#### 2. Download the Nezha Agent

1. **Determine the Synology CPU Architecture**  
   Use the following command to identify your device's architecture:
   ```bash
   uname -m
   ```
   Common architecture mappings:
   - `x86_64` corresponds to `amd64`
   - `armv7l` or `aarch64` corresponds to `arm`

2. **Download the Appropriate Nezha Agent Binary**  
   Select the correct download link based on your device's architecture. For example, for `amd64`:
   ```bash
   wget -O nezha-agent.zip https://github.com/nezhahq/agent/releases/latest/download/nezha-agent_linux_amd64.zip
   ```

3. **Extract the Files**  
   Extract the downloaded archive to a specified directory, such as `/opt/nezha`:
   ```bash
   mkdir -p /opt/nezha
   unzip nezha-agent.zip -d /opt/nezha
   ```

4. **Grant Execute Permissions**
   ```bash
   chmod +x /opt/nezha/nezha-agent
   ```
---

#### 3. Create the Configuration File

1. **Create and Edit the Configuration File**  
   In the `/opt/nezha` directory, create a `config.yml` file with the following content:
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
   - **Field Descriptions**:
     - `server`: Replace with your Dashboard address and port, e.g., `data.example.com:8008`.
     - `client_secret`: Replace with the `agentsecretkey` from the Dashboard's configuration file, typically located at `/opt/nezha/dashboard/data/config.yaml`.
     - `uuid`: Generate a unique identifier for this Agent using the `uuidgen` command:
       ```bash
       uuidgen
       ```
   - **Save the File**: Save the file to `/opt/nezha/config.yml`.

---

#### 4. Create a systemd Service File

1. **Create the Service File**  
   In the `/etc/systemd/system/` directory, create a `nezha-agent.service` file:
   ```bash
   sudo nano /etc/systemd/system/nezha-agent.service
   ```

2. **Add the Following Content**:
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

3. **Save the File and Reload Service Configuration**:
   ```bash
   sudo systemctl daemon-reload
   ```

---
    
#### 5. Start the Agent

1. **Start the Service**  
   Use the following command to start the Agent:
   ```bash
   sudo systemctl start nezha-agent
   ```

2. **Enable the Service to Start on Boot**  
   ```bash
   sudo systemctl enable nezha-agent
   ```

3. **Check Service Status**  
   Ensure the Agent is running correctly:
   ```bash
   sudo systemctl status nezha-agent
   ```

---
    
#### 6. Verify Agent Connection

1. Log in to the Dashboard and check if a new device has come online.
2. Ensure the Agent is running smoothly without any error logs.

</details>

---

### Manually Installing the Agent on Windows

<details>
  <summary>Click to Expand/Collapse</summary>

In addition to the one-click script, Windows systems can also install the Agent by downloading the corresponding binary files and manually configuring them. Follow the steps below:

---

#### 1. Preparation

1. **Ensure Administrator Privileges**  
   Log in to the Windows system using an administrator account.

2. **Install Necessary Tools**  
   - Ensure you have a decompression tool installed, such as `7-Zip` or `WinRAR`.

---

#### 2. Download the Nezha Agent

1. **Confirm System Architecture**  
   - Windows systems are generally `amd64` architecture, so download the corresponding binary.

2. **Download the Nezha Agent Files**  
   - Visit the [Nezha Agent Releases](https://github.com/nezhahq/agent/releases) page and download the version suitable for `Windows`, for example:
     ```plaintext
     nezha-agent_windows_amd64.zip
     ```

3. **Extract the Files**  
   - Extract the downloaded archive to a designated directory, such as `C:\nezha`.

---

#### 3. Create the Configuration File

1. **Create and Edit the Configuration File**  
   In the extracted directory, create a `config.yml` file with the following content:
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
   - **Field Descriptions**:
     - `server`: Replace with your Dashboard address and port, e.g., `data.example.com:8008`.
     - `client_secret`: Replace with the `agentsecretkey` from the Dashboard's configuration file, typically located at `/opt/nezha/dashboard/data/config.yaml`.
     - `uuid`: Generate a unique identifier for this Agent using an online tool.
    
2. **Save the File**  
   Save the file as `config.yml` in the Agent's directory.

---

#### 4. Run the Agent

1. **Run the Agent with Administrator Privileges**  
   Open CMD with administrator rights, navigate to the Agent's directory, and execute the following command:
   ```powershell
   nezha-agent.exe -c config.yml
   ```

2. **Verify the Connection**  
   - Log in to the Dashboard and check if a new device has come online.
   - If there are no error messages in the Agent's logs, the installation is successful.

---

#### 5. Configure the Agent to Run as a Service

1. **Install as a Service**  
   - Navigate to the Agent's directory in CMD and run:
     ```powershell
     nezha-agent.exe service install
     ```

2. **Start the Service**  
   - After successful installation, the Agent will automatically start as a service and will run on system boot.

3. **Uninstall the Service**  
   - To uninstall the service, run the following command:
     ```powershell
     nezha-agent.exe service uninstall
     ```

</details>

---
    
### Installing the Agent on OpenWrt

<details>
  <summary>Click to Expand/Collapse</summary>

OpenWrt is a lightweight Linux distribution. Installing the Nezha Agent on OpenWrt requires manual downloading and configuration. Follow the steps below:

---

#### 1. Preparation

1. **Ensure Administrator Privileges**  
   - SSH into the OpenWrt device using the `root` account.

2. **Install Necessary Tools**  
   - Update the package list and install required tools:
     ```bash
     opkg update
     opkg install wget unzip
     ```

---

#### 2. Download the Nezha Agent

1. **Determine System Architecture**  
   Use the following command to identify the device's architecture:
   ```bash
   uname -m
   ```
   Common architecture mappings:
   - `x86_64` corresponds to `nezha-agent_linux_amd64.zip`
   - `arm` or `aarch64` corresponds to `nezha-agent_linux_arm.zip`

2. **Download the Appropriate Nezha Agent**  
   Replace `<arch>` with your device's architecture:
   ```bash
   wget -O nezha-agent.zip https://github.com/nezhahq/agent/releases/latest/download/nezha-agent_linux_<arch>.zip
   ```

3. **Extract the Files**  
   Extract the archive to the `/etc/nezha` directory:
   ```bash
   mkdir -p /etc/nezha
   unzip nezha-agent.zip -d /etc/nezha
   ```

---

#### 3. Create the Configuration File

1. **Create the Configuration File**  
   Create and edit the `/etc/nezha/config.yml` file:
   ```bash
   touch /etc/nezha/config.yml
   vi /etc/nezha/config.yml
   ```
   Add the following content:
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

2. **Save the Configuration File**  
   Ensure the configuration file is saved at `/etc/nezha/config.yml`.

---

#### 4. Run the Agent

1. **Grant Execute Permissions and Start the Agent**  
   ```bash
   chmod +x /etc/nezha/nezha-agent
   /etc/nezha/nezha-agent -c /etc/nezha/config.yml
   ```

2. **Verify Agent Connection**  
   - Log in to the Dashboard Admin Panel and check if a new device has come online.
   - Ensure the Agent is running correctly.

---

#### 5. Configure the Agent to Start on Boot

1. **Create a Service Script**  
   Create a service script at `/etc/init.d/nezha-service`:
   ```bash
   vi /etc/init.d/nezha-service
   ```

2. **Add the Following Content**  
   Replace `/etc/nezha/nezha-agent` and `/etc/nezha/config.yml` with the correct paths if different:
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

3. **Grant Execute Permissions**  
   ```bash
   chmod +x /etc/init.d/nezha-service
   ```

4. **Enable and Start the Service**  
   ```bash
   /etc/init.d/nezha-service enable
   /etc/init.d/nezha-service start
   ```

5. **Verify Service Status**  
   Check if the service is running correctly:
   ```bash
   ps | grep nezha-agent
   ```

---
    
#### Note

- **Configuration File Path**: Ensure the paths to the configuration files (e.g., `/etc/nezha/config.yml`) are correct in the service scripts.
- **Service Management**: You can manage the service using the following commands:
  - Manually start the service:
    ```bash
    /etc/init.d/nezha-service start
    ```
  - Stop the service:
    ```bash
    /etc/init.d/nezha-service stop
    ```
  - Restart the service:
    ```bash
    /etc/init.d/nezha-service restart
    ```
- **Log Troubleshooting**: If the Agent fails to start correctly, check relevant logs using `logread` to identify issues.
</details>

## Uninstalling the Agent

Uninstalling the Agent involves stopping the service, uninstalling it, and removing related files. Below are the steps for Ubuntu:

1. Stop and uninstall the service:
   ```bash
   cd /opt/nezha/agent/
   ./nezha-agent service uninstall
   ```

2. Remove the Agent folder:
   ```bash
   rm -rf /opt/nezha/agent/
   ```

If multiple services are installed and removing all of them would be necessary, the Agent installation script can be used to simplify the process.

```bash
./agent.sh uninstall
```
