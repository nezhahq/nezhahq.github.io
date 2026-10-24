---
description: 哪吒 Agent 开发指南：本地构建、测试身份、指标与 protobuf 数据流、运行时配置快照、远程任务门禁和跨仓库兼容测试。
outline: deep
---

# Agent 开发

Agent 是独立 Go 程序，负责指标采集、探测与授权的远程操作。UI 修改一般不需要改 Agent；添加采集字段或远程能力才需要沿数据流协调多仓库。

## 本地构建与测试实例

```bash
git clone https://github.com/nezhahq/agent.git
cd agent
go mod download
go build -o bin/nezha-agent ./cmd/agent
```

工具链以 `go.mod` 为准。发行构建的平台矩阵与 `-ldflags` 见 `.goreleaser.yml`；默认本地构建版本不是正式发布，不要为了调试替换系统 Agent。

新建独立的 `dev-config.yml`，填入本地测试 Dashboard 地址及测试用户连接密钥；不要复制生产 UUID。连接、TLS 和参数格式见[Agent 配置](/configuration/agent.html)。在终端前台启动：

```bash
./bin/nezha-agent -c dev-config.yml
```

默认配置位置是二进制旁的 `config.yml`，不是当前 shell 目录。首次生成的 UUID 应保存，复制同一 UUID 同时运行两个实例会混淆身份。开发时通常不必安装系统服务，退出前台进程即可停止测试实例。

## 源码数据流

| 位置 | 关注点 |
| --- | --- |
| `model/config.go` | 字段、克隆、加载、校验与保存 |
| `pkg/monitor` | 主机信息、状态、网卡、GPU 和 IP 发现 |
| `proto/nezha.proto` | 与 Dashboard 的 gRPC 消息契约 |
| `cmd/agent` | 连接、上报、运行时快照、任务与生命周期 |
| `pkg/fm` 等能力包 | 文件与传输等具体实现 |

添加指标时，从采集函数经 `model` / `PB()` 转换检查到 protobuf，再检查 Dashboard 的接收、缓存、HTTP/WS 序列化和主题展示。仅在 Agent 端加字段不会自动出现历史图表；TSDB 写入、查询 API 和前端单位也要显式接入。

## 修改运行时配置

配置用于多个并发工作线程。按现有设计读取不可变运行时快照，不直接并发修改共享配置或其 map/slice。新增字段需同时考虑：

1. `AgentConfig` 的 YAML/JSON 字段及默认/范围校验。
2. `Clone()` 对新增集合进行深拷贝。
3. 对应消费者的配置视图，保证一次操作使用同一代配置。
4. 远程接受、延迟应用、先保存再发布、失败恢复与连接重建。
5. 哪些值只在启动时读取，哪些可重载，并更新配置文档。

不要不加检查地执行 `go generate ./...`：文件里存在生成指令不代表所引用的生成器在当前仓库中可用。以仓库实际生成工具和 CI 为准。

## 添加任务时不能只测成功路径

命令、终端、文件、NAT 和服务探测有各自禁用门禁。新增执行路径必须复用已有开关；普通配置下发不能借机轮换 `client_secret`，服务器转移的密钥轮换使用专用任务，并要求新连接启用可验证 TLS。

为耗时操作传递 context、超时和取消；会话结束要回收 goroutine、流、文件和子进程。外部命令只应在明确的命令功能内执行，不要将文件名等普通参数拼进 shell。

验证至少覆盖断线、重连、取消、任务重复或乱序、配置切换中并发访问，以及进程退出后无残留资源。需要操作系统能力的测试使用临时目录和隔离进程，不能对开发者真实服务执行破坏性操作。

## protobuf 与跨仓库兼容

保持已有字段编号，不复用已删除编号，新增能力保持缺省兼容。生成 Go 文件不是手写源码。修改协议时使用匹配工具重新生成 Dashboard 与 Agent 的产物，明确两个提交的配对关系。

Dashboard 的 `script/bootstrap.sh` 还会删除并复制相邻 `../agent/proto`；不要把它当作无副作用的 Swagger 命令。普通 API 文档只需[单独运行 swag](/developer/api.html)。

本地基础检查：

```bash
go test -mod=readonly -count=1 ./...
go test -mod=readonly -race -shuffle=on -count=1 ./...
go vet ./...
```

`-race` 需受支持的平台/编译器。跨仓库的 `agentcompat` 工作流验证固定配对的 Dashboard/Agent；涉及协议、连接或任务生命周期时按当前 CI 的固定 revision 与场景运行，不把普通单元测试视为等价替代。见[测试与贡献](/developer/testing.html)。
