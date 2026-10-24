---
description: 开发哪吒监控 V2 用户主题：轻量定制、React/Vite 本地开发、REST/WebSocket 数据、历史图表、dist.zip 发布、内置主题注册、本地覆盖与回退。
keywords: [哪吒主题开发, Nezha V2 theme development, 用户前端, WebSocket, 自定义主题]
outline: deep
---

# 主题开发

哪吒用户主题是使用 Dashboard HTTP/WebSocket 数据的前端应用，不是服务端 Go 模板。用户页通常位于 `/`，管理前端位于 `/dashboard/`；二者独立构建，不能直接互换产物。

## 选择最小改动方式

| 需求 | 方式 |
| --- | --- |
| 改 Logo、背景、显示选项或少量 CSS | 后台 `custom_code`，不用重编译 Dashboard |
| 改卡片、布局、图表、交互 | fork 用户前端，构建完整主题 |
| 临时验证自己构建的主题 | 在开发/自有实例覆盖已选择主题的本地目录 |
| 让发行版可选新主题 | 发布静态资源并提交 Dashboard manifest 集成 |

`custom_code_dashboard` 是管理前端入口，不是用户主题配置。主题没有自动继承所有 `window.*` 变量的机制，自定义主题应明确声明自己支持哪些选项。

## 1. 先跑通官方用户前端

以[官方用户前端仓库](https://github.com/hamster1963/nezha-dash-v2)为起点，按其 `package.json` 准备 Node.js 和 pnpm：

```bash
git clone https://github.com/hamster1963/nezha-dash-v2.git
cd nezha-dash-v2
pnpm install --frozen-lockfile
MOCK_NEZHA_COUNT=6 pnpm dev:mock
```

使用终端显示的地址，协议和端口以所检出代码的 `vite.config.ts` 为准。mock 同时使用 8008，不要与真实 Dashboard 抢占端口。少量 mock 节点适合调布局，默认的大规模节点数据适合检查列表性能。

联调真实实例时，先停止 mock，独立启动本地 Dashboard，再运行 `pnpm dev`；保留 `/api/v1/` 和 `/api/v1/ws/server` 的 HTTP/WebSocket 代理。只修改样式无需连接生产实例。

### 源码怎么找

| 位置 | 作用 |
| --- | --- |
| `src/pages`、`src/components` | 页面组合、卡片、详情和图表展示 |
| `src/context/websocket-provider.tsx` | 实时帧、连接生命周期和有限历史 |
| `src/lib/nezha-api.ts`、`src/types/nezha-api.ts` | API 调用和数据类型 |
| `src/locales` | 用户界面翻译 |
| `vite.config.ts` | 根路径、代理、构建目标和测试环境 |

当前用户前端源码还按 `src/features` 拆分服务器选择器、运行配置、详情图表等边界；`src/lib/inject.ts` 等保留兼容入口。以仓库的 `docs/architecture.md` 查职责，不把主分支的内部文件位置视为所有已打包主题的公共 API。

## 2. 正确使用数据

- 设置和分组走 REST，实时节点状态走 WebSocket；两种响应包装不同，详见[API 开发](/developer/api.html)。
- UI 只渲染后端返回的可见节点；切换登录身份后清理身份相关缓存。不要用管理员静态快照填充游客页面。
- `host`、`state` 和 GPU 扩展字段可能缺省。区分 `0`、未知、离线和加载失败，不用虚构的零值掩盖错误。
- 图表保留合法的零值和重复数值，按时间戳对齐，单位在边界统一转换。稀疏 GPU 数据不能按数组下标假定为相同采样时刻。
- 查询指标历史前检查 `tsdb_enabled`。实时缓存不是持久历史，后端没有逐卡 GPU 历史索引参数时不要自行杜撰。
- 节点公开备注可能只在首帧出现。备注作为文本渲染；确需解释自定义 JSON 时验证结构，链接仅允许预期的 `http`/`https` 等安全协议，不能直接执行 HTML。

独立主题可以从下面的最小实时接入函数开始。它只建立一次连接，返回清理函数；生产主题应在外层增加有上限的重试与可见恢复操作。

```javascript
export function connectStatus(onFrame, onError) {
  const url = new URL("/api/v1/ws/server", window.location.origin);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  const socket = new WebSocket(url);
  socket.onmessage = (event) => {
    try {
      const frame = JSON.parse(event.data);
      if (!frame || !Number.isFinite(frame.now)) {
        throw new Error("Invalid status frame");
      }
      onFrame({ ...frame, servers: Array.isArray(frame.servers) ? frame.servers : [] });
    } catch (error) {
      onError(error);
    }
  };
  socket.onerror = () => onError(new Error("WebSocket connection failed"));
  socket.onclose = () => onError(new Error("WebSocket disconnected"));
  return () => {
    socket.onmessage = socket.onerror = socket.onclose = null;
    socket.close();
  };
}
```

浏览器原生 WebSocket 使用同源 cookie。不要把 PAT 填进代码、URL 参数、构建环境变量或 `localStorage` 来绕过鉴权。

## 3. 兼容轻量定制

官方用户主题的常见设置可以放在 Dashboard 的 `custom_code` 中：

```html
<script>
  window.CustomLogo = "https://example.com/logo.svg";
  window.ForceShowServices = true;
  window.ForceCardInline = true;
</script>
```

这些是主题约定，不是 Dashboard YAML 的顶层字段。自定义脚本拥有页面权限；只加载可信资源。移除脚本节点不能撤销已经注册的事件或其它副作用，开发者需提供对应清理逻辑。完整变量用法见[用户主题定制](/guide/q8.html)。

## 4. 构建与打包

```bash
pnpm verify
zip -r dist.zip dist
unzip -l dist.zip
```

发布包必须有顶层 `dist/`，其中包含 `index.html` 与完整资源；不能把 `src/`、密钥或依赖目录打进去。不要为了构建通过而跳过类型检查。保留 Vite `base: "/"`；管理主题的 `/dashboard` base 则另行处理。

检查生产构建而不只是开发热更新：资源加载、深浅色、窄屏、长服务器名称、空列表、错误恢复都应验收。发布后保留旧版本产物，避免原地覆盖同一版本。

## 5. 本地文件覆盖与回退

Dashboard 对请求先查找**相对进程工作目录**的已选主题目录，找不到某个文件时才尝试内嵌资源。例如 `user_template: user-dist` 时，自有部署可在工作目录放置：

```text
<Dashboard working directory>/
  user-dist/
    index.html
    assets/
```

放的是构建后 `dist/` 的内容，不是源码，也不是 `user-dist/dist/index.html`。这是已选主题的文件覆盖能力，并不意味着 YAML 可以注册任意新目录。

在测试实例确认后，停机保存原覆盖目录，将一整套新产物放到目标位置，容器部署挂载对应目录，再启动验证。单文件增补会与内嵌资源混用，应避免混杂版本。保留同一版本完整静态资源，不在切换时遗失浏览器仍需的旧资源。

回退时恢复原覆盖目录，或移走自定义覆盖目录回到内嵌主题，再刷新并验证。不要删除配置/数据库。升级容器不会自动维护你挂载的自定义主题，需要自行校验兼容性。

## 6. 集成为发行版内置主题

Dashboard 只接受 `service/singleton/frontend-templates.yaml` 中合法的 `user_template` / `admin_template`。新增用户主题的 manifest 结构如下，仓库和版本是示例占位：

```yaml
- path: "my-theme-dist"
  name: "My Theme"
  repository: "https://github.com/example/my-nezha-theme"
  author: "example"
  version: "v1.0.0"
  is_admin: false
  is_official: false
```

1. 在自己的仓库发布固定版本的 `dist.zip`，结构满足上一节要求。
2. 为 Dashboard 提交 manifest 改动；构建脚本会下载发布包到 `cmd/dashboard/my-theme-dist`。
3. 编译 Dashboard，将 `*-dist` 目录内嵌到二进制。运行时不会自动从 GitHub 下载或检查最新主题。
4. 主题进入所用发行版后，才可在后台选择对应主题；无效配置会回退为默认主题。

新增 SPA 路由还要同步检查 `cmd/dashboard/controller/controller.go` 的 `frontendPageUrlRegistry`。不在白名单的路径可能返回应用 HTML，但 HTTP 状态为 `404`，导致直接刷新、链接预览和外部监测异常。

## 交付验收

- 新会话、游客、成员、管理员和强制登录模式，隐藏节点不泄漏。
- 刷新 `/server/1` 及新增路由，检查真实 HTTP 状态，不只测试前端跳转。
- TSDB 开/关、历史空数据、切换时间范围、请求乱序、断网重连和令牌失效。
- GPU 信息缺省、长名称、大量节点、320px 窄屏、键盘操作和深浅色。
- `dist.zip` 结构、资源 URL、manifest 固定版本和本地回退均可复验。

实现依据：[主题 manifest](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml)、[下载脚本](https://github.com/nezhahq/nezha/blob/master/script/fetch-frontends.sh)、[静态资源处理器](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/controller.go)。
