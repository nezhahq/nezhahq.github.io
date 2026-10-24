---
description: 哪吒监控贡献与测试指南：Dashboard/Agent 的 Go、race、vet，用户和管理前端验证，文档构建、跨仓库联调与高质量 PR 交付。
outline: deep
---

# 测试、贡献与发布检查

测试应匹配改动层次。纯文档修改不必重建整个 Agent；协议/生命周期修改也不能只靠网页能打开判断成功。以下命令是开发者可运行的检查，不表示每次改动都已代为运行全部项目测试。

## Go 后端与 Agent

先按[快速开始](/developer/getting-started.html)为 Dashboard 生成 Swagger 并准备非空前端输入，再在各仓库根目录运行：

```bash
go test -mod=readonly -count=1 ./...
go vet ./...
go test -mod=readonly -race -shuffle=on -count=1 ./...
```

`-race` 需受支持的平台和 C 编译器。普通测试检查功能，race 检查并发访问，不互相替代。新增回归测试应复现原问题而非只照抄实现。

两个仓库的 `.github/workflows/test.yml` 包含普通、race/质量和跨仓库压力验证；`agentcompat` 使用固定源码组合与专门 build tags。修改上报、重连、任务恰好一次执行或退出清理时，复用该工作流的固定配对和场景，不擅自省略测试步骤或改成任意 latest。

## 用户主题

```bash
pnpm install --frozen-lockfile
pnpm verify
```

当前脚本组合代码检查、覆盖率、类型检查和生产构建。覆盖率达标不等于图表视觉正确；mock 和测试替身也不证明真实后端权限、断线或资源发布正常。前端主分支与 Dashboard manifest 打包版本分别检查。

## 管理前端

```bash
npm ci
npm run lint
npm test
npm run build
```

需要真实登录/表单/路由联调时运行仓库 Playwright：先按 README 启动隔离后端，再准备浏览器并执行：

```bash
npm run e2e:install
npm run e2e
```

E2E 会操作后台状态，不指向生产。失败时保留报告、后端日志与具体 URL，但移除凭据。

## 文档

在文档仓库根目录运行：

```bash
npm ci
npm test
git diff --check
```

`npm test` 包含 VitePress 构建、SEO/双语页面与内部链接检查，以及 MCP 组件测试。新增页面同时更新中英文导航、相关页面链接和适用的 `llms.txt` 入口；元描述准确说明该页解决的问题。

## 浏览器验收矩阵

| 维度 | 最低覆盖 |
| --- | --- |
| 身份 | 游客、成员、管理员、过期会话与强制登录 |
| 路由 | 直接打开/刷新、前端跳转、HTTP 状态和资源 base |
| 数据 | 无节点、离线、缺失字段、TSDB 开/关、空历史 |
| 故障 | 网络断开/恢复、超时、乱序请求、失败可重试 |
| 布局 | 桌面、窄屏、长文本、深浅色、键盘焦点 |

记录浏览器与视口；模拟窄屏不能写成真实手机验收。未运行的检查明确标为未验证，不用单元测试结果替代视觉结论。

## 提交与回退

使用独立分支，写清问题、修改、兼容范围和已运行检查。保持锁文件与生成产物符合所在仓库规则；不要提交开发数据库、日志中的 Token 或测试用户密钥。

主题保留上一版静态产物；存储和配置变更提供[备份/恢复](/guide/q5.html)路径；协议变更注明 Dashboard/Agent 配对提交。发布、合并、部署是与本地验证不同的操作，不把“构建成功”写成“线上已生效”。
