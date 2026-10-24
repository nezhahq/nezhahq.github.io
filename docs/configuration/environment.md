---
description: 哪吒 Dashboard 与 Agent 配置路径、环境变量命名、加载顺序、后台保存和远程配置生效方式，解释为什么改配置后没有变化。
outline: deep
---

# 配置加载与环境变量

## 找到实际使用的文件

| 程序 | 默认位置 | 显式指定 |
| --- | --- | --- |
| Dashboard | 相对进程工作目录的 `data/config.yaml` | `./dashboard -c /path/config.yaml` |
| Dashboard 数据库 | 相对工作目录的 `data/sqlite.db` | `./dashboard -db /path/sqlite.db` |
| Agent | 可执行文件所在目录的 `config.yml` | `./nezha-agent -c /path/config.yml` |

不要仅根据文件名判断哪一份正在生效。systemd 检查 `ExecStart` 和 `WorkingDirectory`，Docker 检查容器启动参数及挂载目标。容器内路径不一定等于宿主机路径。

## Dashboard 的命名规则

Dashboard 读取前缀为 `NZ_` 的变量，去前缀后转换为小写，**下划线表示嵌套层级**。单个字段通常使用不带下划线的 Go 字段名。

| YAML 字段 | 环境变量 |
| --- | --- |
| `listen_host` | `NZ_LISTENHOST` |
| `listen_port` | `NZ_LISTENPORT` |
| `site_name` | `NZ_SITENAME` |
| `debug` | `NZ_DEBUG` |
| `jwt_secret_key` | `NZ_JWTSECRETKEY` |
| `https.listen_port` | `NZ_HTTPS_LISTENPORT` |
| `tsdb.data_path` | `NZ_TSDB_DATAPATH` |
| `tsdb.retention_days` | `NZ_TSDB_RETENTIONDAYS` |
| `memory.go_mem_limit_mb` | `NZ_MEMORY_GOMEMLIMITMB` |

例如 `NZ_LISTEN_PORT` 会被拆为 `listen.port`，不是 `listen_port`；`NZ_TSDB_DATA_PATH` 也不是 `tsdb.data_path` 的正确环境变量名。复杂列表、OAuth2 映射等优先使用 YAML，不要猜测环境变量格式。

### 加载与持久化

Dashboard 先加载环境变量，再合并 YAML；同名配置可能被文件值覆盖，嵌套与不同拼写的重复键更不应混用。**不要把环境变量当作通用的 YAML 强制覆盖层。**

`NZ_JWTSECRETKEY` 是明确的特例：非空时最终优先于文件中的 JWT 密钥，不写回该密钥，并跳过程序自动轮转。其它设置在后台保存时可能写回 YAML；环境变量不是通用的“不落盘”机制。

文件中的修改在重启 Dashboard 后加载。后台设置通过 API 更新运行态并保存文件；监听地址、存储和 JWT 等只读文件项不属于该设置接口。

## Agent 的命名规则

Agent 同样读取 `NZ_` 前缀，但**保留字段中的下划线**，先读 YAML，再读环境变量。简单标量的环境变量覆盖文件值。

| YAML 字段 | 环境变量 |
| --- | --- |
| `server` | `NZ_SERVER` |
| `client_secret` | `NZ_CLIENT_SECRET` |
| `uuid` | `NZ_UUID` |
| `tls` | `NZ_TLS` |
| `report_delay` | `NZ_REPORT_DELAY` |
| `disable_command_execute` | `NZ_DISABLE_COMMAND_EXECUTE` |

数组和映射使用 YAML 原生结构，不要把逗号分隔字符串假定为数组。环境变量由进程启动时继承；修改容器环境要重建容器，修改服务环境要重新加载服务定义并重启，单改交互式 shell 不会影响已有服务。

Agent 生成 UUID、首次创建文件或应用远程配置时会保存配置；保存后的文件包含有效配置，权限收紧为 `0600`。**通过环境变量提供连接密钥不保证它永不写入 Agent 配置文件。** 请保护文件和备份。

## 远程配置不是瞬间替换

后台或 `POST /api/v1/server/config` 下发 Agent 配置后，Agent 校验参数并安排约 10 秒后的应用；后到的普通配置可能替代尚未生效的普通配置。提交应答只说明已接受安排，之后仍可能因写文件失败而无法生效。

应用先保存文件，再更新运行时配置并重载工作线程。`debug`、自动更新开关和更新周期等启动时读取的选项，要完整重启 Agent 才能可靠应用。环境变量仍可能在下一次启动时覆盖远程写入的文件值。

- `disable_command_execute: true` 也会阻止远程读取/应用配置；应在主机本地恢复。
- 普通配置下发不允许轮换 `client_secret`；服务器转移使用专门流程，不能用通用配置 API 代替。
- 下发连接地址或 TLS 参数前保留主机访问方式；连不上新入口时无法再靠旧面板远程修复。

## 排查“修改不生效”

1. 确认编辑的是进程实际 `-c` 指向的文件及容器挂载。
2. 检查是否有 `NZ_` 环境变量重复设置。检查时不要把密钥打印到日志或提交问题单。
3. 本地文件修改后重启对应服务；修改容器环境后重新创建容器。
4. 对远程配置等待应用窗口，查看 Agent 日志并确认重新上报；不要只看 Dashboard 提交响应。
5. 如果设置接口保存失败，检查配置文件目录可写权限；不要只修改文件本身而忽略父目录。
6. 对日志、API 读回和实际表现交叉验证。参见[场景配置与验证](/configuration/examples.html)。

## 实现依据

- [Dashboard 配置加载与保存](https://github.com/nezhahq/nezha/blob/master/model/config.go)
- [Dashboard 设置接口](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/setting.go)
- [Agent 配置加载与校验](https://github.com/nezhahq/agent/blob/main/model/config.go)
- [Agent 配置应用](https://github.com/nezhahq/agent/blob/main/cmd/agent/main.go)
