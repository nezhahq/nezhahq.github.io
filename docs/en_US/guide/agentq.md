---
outline: deep
---

# Agent FAQ

---

## Why is the IP displayed in the Dashboard different from the Agent's actual IP?

If the IP displayed in the Dashboard is inconsistent with the Agent's actual IP, please refer to [Dashboard FAQ - Why is the IP shown in the management panel different from the Agent's actual IP?](/en_US/guide/dashboardq.html).  
Detailed solutions to this issue are provided in the related document and will not be repeated here.

---

## Errors During One-Click Script Installation

### 1. `curl: Failed to connect to raw.githubusercontent.com......`

This issue commonly occurs on servers located in Mainland China due to unstable connections to GitHub. Solutions include:

1. **Retry the script multiple times**: Simply rerun the one-click installation script a few more times.  
2. **Manual Installation**: Follow the guide for [manual Agent installation](/en_US/guide/agent.html#alternative-methods-to-install-the-agent).  
3. **Use an acceleration service**: Utilize third-party GitHub acceleration services or mirrors. Replace the download URL in the installation script with the accelerated link.

---

### 2. `sudo: command not found`

If the error `sudo: command not found` appears, it means the `sudo` tool is not installed on the target server. Solutions include:

1. **Install `sudo` manually**:
   - For Ubuntu systems:
     ```shell
     apt install sudo
     ```
   - For CentOS systems:
     ```shell
     yum install sudo
     ```

2. **Verify installation**: After installing `sudo`, rerun the one-click installation script.

---

## Multiple Configuration Files Appearing in the Agent Installation Directory, and Multiple Agent Services Installed on the System

This issue occurs because the Agent installation script was run multiple times. The Agent supports installing multiple system services based on different configuration files, so the script does not overwrite the existing installation but instead installs new configurations as separate system services.

You can use the Agent script's uninstall function to remove all configuration files and their associated services:

```bash
./agent.sh uninstall
```

---

## Does the Agent Have a Docker Image?

**The Agent currently does not offer a Docker image.**  
Unlike the Dashboard, which aims to minimize its impact on the host system, the Agent is designed to deeply integrate with the host to perform monitoring services and command execution tasks.

Although running the Agent inside a container may still allow monitoring, functionalities like WebShell will not work properly. Therefore, the official project does not provide Docker image support.
