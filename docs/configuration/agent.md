---
description: 哪吒监控 V2 Agent YAML 配置参考，覆盖 Dashboard 地址、连接密钥、TLS、上报周期、系统指标、自定义 IP API、更新和命令/NAT 禁用选项。
outline: deep
---

# Agent 配置

Agent 配置文件格式为 YAML。

在管理后台中，可以对 Agent 的配置进行修改并直接应用；也可以通过 API 批量下发配置项，详见 [API 文档](/developer/api.html)。

---

## 文件与生效值

Agent 默认读取可执行文件旁的 `config.yml`，用 `-c` 指定其它路径。环境变量命名和优先级与 Dashboard 不同，先读[加载规则](/configuration/environment.html)。下文列出缺省值，必填身份字段另行说明。

## 选项

- ##### **`client_secret`**

  - 类型：`string`；默认：必填，无可用默认值。

  - 用于与 Dashboard 进行安全通信的客户端密钥。
  - 连接密钥与用户绑定。当前前台没有单独的“复制连接密钥”入口，通常应直接使用服务器页面生成的安装命令，或从该命令中的 `NZ_CLIENT_SECRET` 提取。
  - 管理员如需为其他用户手动配置 Agent，可通过管理接口读取对应用户的 `agent_secret`，不要继续使用配置文件中的全局 `agent_secret_key`。
  - 此参数填写错误时，Agent 无法通过 Dashboard 鉴权。

- ##### **`debug`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时启用日志。

- ##### **`disable_auto_update`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时禁用 Agent 的自动更新功能，增强系统稳定性和安全性。

- ##### **`disable_command_execute`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时拒绝命令执行、在线终端、文件管理和 MCP 文件/命令操作，也拒绝远程读取与应用配置。解除此限制需要在主机本地修改并重启。

- ##### **`disable_force_update`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时拒绝 Dashboard 下发的强制升级；不关闭定期自动检查。要完全改为自行维护，另设 `disable_auto_update: true`。

- ##### **`disable_nat`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时 Agent 不再接受面板下达的 **内网穿透** 任务。

- ##### **`disable_send_query`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时 Agent 不再接受面板下达的 `TCP Ping`、`ICMP Ping` 和 `HTTP GET` 任务。

- ##### **`gpu`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时启用 GPU 监控。Linux NVIDIA 还支持逐卡显存上报；其他平台/厂商仍可能只有使用率。
  - 注意：启用 GPU 监控可能需要安装额外依赖，详细信息参考：[启用 GPU 监控](/guide/q9.html)。

- ##### **`insecure_tls`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时禁用证书检查，适用于使用自签名证书的场景。

- ##### **`ip_report_period`**

  - 类型：`integer`；默认：`1800`。

  - 设置本地 IP 更新间隔时间（秒）。默认值为 `1800` 秒（30 分钟）。
  - `0` 回退为 `1800`，非零且小于 `30` 时按 `30` 秒处理。

- ##### **`report_delay`**

  - 类型：`integer`；默认：`3`。

  - 状态上报间隔（秒），`0` 回退为 `3`，有效范围为 `1`–`4`；其它越界值校验失败，并非自动截断。

- ##### **`server`**

  - 类型：`string`；默认：必填，无可用默认值。

  - 格式为 `host:port`，不包含 `http://`、`https://` 或路径。IPv6 使用 `[IPv6]:port`；TLS 由独立的 `tls` 控制。

- ##### **`skip_connection_count`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时禁用网络连接数的监控，适用于高连接数或资源受限的环境。

- ##### **`skip_procs_count`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时禁用进程数的监控，以降低资源占用。

- ##### **`temperature`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时启用硬件温度监控（仅支持部分硬件，部分 VPS 可能无法获取温度信息）。

- ##### **`tls`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时启用 Agent 与 Dashboard 间的通信 SSL/TLS 加密。
  - 如果 Agent 使用 Nginx 反向代理且启用了 SSL/TLS 配置，请开启此选项。

- ##### **`hard_drive_partition_allowlist`**

  - 类型：`string[]`；默认：`[]`。

  - 一个字符串数组，用于指定需要监控的硬盘分区列表。
  - 若指定此参数，将仅对列出的分区进行监控。

- ##### **`nic_allowlist`**

  - 类型：`map[string]bool`；默认：`{}`。

  - 一个 `map[string]bool` 类型的允许列表，用于指定需要监控的网卡。
  - 键为网卡名称，值为 `true` 表示允许监控，`false` 表示不监控。
  - 非空时只有值为 `true` 的接口计入；未列出的接口也排除。留空时采用内置过滤，会排除常见回环、隧道和容器接口，并非所有虚拟网卡。

- ##### **`use_gitee_to_upgrade`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时使用 Gitee 仓库作为自动更新源，对中国大陆服务器更为友好。

- ##### **`use_atomgit_to_upgrade`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时使用 AtomGit 仓库作为自动更新源。通常只需要在默认更新源访问不稳定时启用。

- ##### **`use_ipv6_country_code`**

  - 类型：`bool`；默认：`false`。

  - 当为 `true` 时强制使用 IPv6 地址查询国家代码（默认使用 IPv4）。

- ##### **`uuid`**

  - 类型：`string`；默认：留空生成并保存。

  - 当前 Agent 的唯一标识参数，用于 Dashboard 识别数据来源。
  - 若需替换 Dashboard 中已存在的 Agent，可以手动设置此参数。

- ##### **`dns`**

  - 类型：`string[]`；默认：`[]`。

  - 一个字符串数组，用于设置自定义 DNS 服务器列表。
  - 指定后，Agent 将优先使用此列表中的 DNS 服务器解析域名。

- ##### **`custom_ip_api`**

  - 类型：`string[]`；默认：`[]`。

  - 一个字符串数组，用于指定自定义 IP 查询 API 列表。
  - API 应返回纯 IP 文本，或兼容 Cloudflare trace 的 `ip=` 行；任意 JSON 地址接口不一定兼容。它们用于公网 IP 发现，不是国家地理位置 API。
  - 每个地址都必须能被解析为 URL，并使用 `http` 或 `https` 协议；不符合要求的地址会导致 Agent 启动失败，或导致远程配置无法应用。

- ##### **`self_update_period`**

  - 类型：`integer`；默认：`0`。
  - 手动设置更新间隔（分钟）。
  - `0` 使用随机周期（30 分钟起、不满 90 分钟）；正值按分钟固定。更新开关和周期在启动时读取，改后完整重启以可靠生效。

---

## 应用

在修改配置文件中的参数后，需要重新启动 Agent 服务以使更改生效。可以使用 Agent 的内置服务管理功能或者手动重启。

### 使用内置服务管理

可以直接输入以下命令重启默认 Agent 服务：

```shell
./nezha-agent service restart
```

对于多个 Agent 服务的情况，可以指定对应的配置文件：

```shell
./nezha-agent service -c ./config-6sc1f.yml restart
```

### 手动管理

1. **重新启动服务**  
   运行以下命令重新启动默认的第一个 Agent 服务：

   ```shell
   sudo systemctl restart nezha-agent.service
   ```

2. **多 Agent 服务的情况**  
   如果同一服务器上运行了多个 Agent 服务，请先列出所有 Agent 服务的名称：
   ```shell
   sudo systemctl list-units --type=service | grep nezha-agent
   ```
   然后分别使用以下命令重新启动对应的 Agent 服务：
   ```shell
   sudo systemctl restart <service-name>
   ```
   将 `<service-name>` 替换为实际列出的名称。内置服务管理按二进制名称命名，非默认配置追加配置路径哈希，不要假定存在 `@2` 实例。


## 更新源与应用边界

两个镜像开关同时开启时优先 Gitee；都关闭时仍可能按国家信息选择镜像，否则使用 GitHub。远程配置的应答、约 10 秒延迟应用和落盘/重连是不同阶段，详见[配置加载](/configuration/environment.html)。`disable_command_execute` 不是仅禁用 shell 的开关；启用前要保留本机恢复入口。

## 相关文档

- [Agent 安装](/guide/agent.html)
- [架构与数据流](/guide/architecture.html)
- [安全与隐私](/guide/security.html)
- [Agent 常见问题](/guide/agentq.html)
