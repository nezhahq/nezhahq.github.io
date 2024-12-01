---
outline: deep
---

# Agent 常见问题

---

## 后台显示的 IP 和 Agent 实际 IP 不一致？

如果后台显示的 IP 和 Agent 的实际 IP 不一致，请参考 [Dashboard 相关 - 为什么管理面板中显示的 IP 和 Agent 实际 IP 不一致？](/guide/dashboardq.html#为什么管理面板中显示的ip和agent实际ip不一致？)。  
该问题的详细解决方法已在相关文档中说明，此处不再赘述。

---

## 一键脚本安装时出错

### 1. `curl: Failed to connect to raw.githubusercontent.com......`

此问题多发生在中国大陆的服务器上，原因是 Github 的连接不稳定。解决方法：
1. **多次尝试**：直接多尝试几次运行一键脚本。
2. **手动安装**：按照 [手动安装 Agent](/guide/agent.html#其他方式安装agent) 的指南完成安装。
3. **使用加速服务**：可使用第三方 Github 加速服务或镜像。找到加速地址后，在一键安装脚本中进行替换。

---

### 2. `sudo: command not found`

如果提示 `sudo: command not found`，说明目标服务器未安装 `sudo` 工具。解决方法：
1. **手动安装 sudo**：
   - 对于 Ubuntu 系统，可以运行以下命令：
     ```shell
     apt install sudo
     ```
   - 对于 CentOS 系统，可以运行以下命令：
     ```shell
     yum install sudo
     ```
2. **检查安装成功**：安装完成后，再次运行一键脚本进行安装。
