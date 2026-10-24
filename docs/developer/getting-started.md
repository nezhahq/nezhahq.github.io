---
description: 从源码运行哪吒监控 V2 Dashboard 与 Agent，准备 Go、Swagger、非空嵌入资源、隔离开发数据与前端联调环境。
outline: deep
---

# 源码开发快速开始

先让隔离的 Dashboard、用户前端和测试 Agent 工作，再修改功能。以下步骤不使用生产配置、凭据或数据库。

## 仓库与职责

| 仓库 | 职责 | 主要位置 |
| --- | --- | --- |
| [Dashboard](https://github.com/nezhahq/nezha) | HTTP/REST、WebSocket、gRPC、MCP、权限和存储 | `cmd/dashboard`、`model`、`service` |
| [Agent](https://github.com/nezhahq/agent) | 主机采集、探测与远程操作 | `cmd/agent`、`pkg/monitor`、`model` |
| [管理前端](https://github.com/nezhahq/admin-frontend) | `/dashboard/` 管理应用 | `src`、`vite.config.ts` |
| [官方用户前端](https://github.com/hamster1963/nezha-dash-v2) | `/` 状态页与节点详情 | `src`、`vite.config.ts` |
| [文档](https://github.com/nezhahq/nezhahq.github.io) | 双语 VitePress 文档 | `docs`、`scripts` |

Go 工具链以各仓库 `go.mod` 为准。Dashboard 使用 SQLite/CGO，需要 C 编译器与 CGO；用户前端按 `package.json` 使用 Node.js ≥ 22、pnpm ≥ 11。Dashboard manifest 固定了打包主题版本，前端主分支不一定已随面板发布。

## 1. 准备 Dashboard

```bash
git clone https://github.com/nezhahq/nezha.git
cd nezha
go mod download
go install github.com/swaggo/swag/cmd/swag@v1.16.6
"$(go env GOPATH)/bin/swag" init --pd -d cmd/dashboard -g main.go -o cmd/dashboard/docs
```

`cmd/dashboard/docs` 是生成目录。普通 REST 开发不需要重新生成 protobuf，也不必执行包含跨仓库文件复制的 `script/bootstrap.sh`。

### 选择前端输入

**需要实际页面：** 准备 `curl`、`unzip`、`realpath` 和 Mike Farah 的 `yq`，从仓库根目录运行：

```bash
bash script/fetch-frontends.sh
```

脚本按 `service/singleton/frontend-templates.yaml` 固定的仓库和版本下载 `dist.zip`，替换对应的 `cmd/dashboard/*-dist` 目录。自定义前端源码不要放在被覆盖的位置。

**仅测试后端：** 使用非空占位资源满足 `go:embed`，但它们不是可用管理页面：

```bash
mkdir -p cmd/dashboard/admin-dist cmd/dashboard/user-dist
printf '<!doctype html><title>Admin placeholder</title>\n' > cmd/dashboard/admin-dist/index.html
printf '<!doctype html><title>User placeholder</title>\n' > cmd/dashboard/user-dist/index.html
```

二选一即可。只创建空目录不够；资源在 `cmd/dashboard/` 下，不是根目录的 `dashboard/`。

## 2. 使用隔离数据启动

创建目录 `dev-data`，新建 `dev-data/config.yaml`：

```yaml
debug: true
listen_host: "127.0.0.1"
listen_port: 8008
language: "zh_CN"
site_name: "Nezha Development"
install_host: "127.0.0.1:8008"
tls: false
```

```bash
go build -o bin/dashboard ./cmd/dashboard
./bin/dashboard -c dev-data/config.yaml -db dev-data/sqlite.db
```

空数据库首次初始化 `admin` / `admin`。仅在本机完成首次登录并改密码。访问 `/dashboard/`；Swagger 位于 `http://127.0.0.1:8008/swagger/index.html`。`debug` 同时暴露调试端点，只用于隔离开发环境。

开发数据、生成文档与构建产物不要提交。不要将生产数据库复制进调试实例。

## 3. 前端与 Agent 联调

- 用户前端按[主题开发](/developer/theme-development.html)启动 mock，或代理 API/WebSocket 到本地 Dashboard。
- 管理前端运行 `npm ci`、`npm run dev`，进入终端显示地址的 `/dashboard/`；保留 `/dashboard` base 和 API/WebSocket 代理。
- 使用测试用户连接密钥运行[开发 Agent](/developer/agent-development.html)。明文回环连接仅用于本机联调，公网使用校验证书的 TLS。

## 4. 验证完整链路

确认测试节点上线、WebSocket 持续更新、服务探测有真实结果；直接刷新详情页仍有正确 HTTP 状态。再运行[测试与贡献检查](/developer/testing.html)。

| 构建或联调错误 | 优先处理 |
| --- | --- |
| 缺少 `cmd/dashboard/docs` | 安装 swag 并生成，不是创建空 Go 包 |
| `pattern *-dist: no matching files found` | 在 `cmd/dashboard/` 准备真实或非空占位资源 |
| SQLite/CGO 编译或运行失败 | 检查 C 编译器和 CGO，不照搬 Agent 的无 CGO 构建 |
| 8008 已占用或读到旧数据 | 检查旧进程、工作目录、`-c` 和 `-db` |
| 页面正常但 WebSocket 被拒绝 | 检查 Origin、同源代理及 debug 回环开发条件 |
