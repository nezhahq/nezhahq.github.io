---
description: 哪吒监控 V2 API 开发：Swagger 生成、REST/WebSocket 格式、JWT/CSRF 与 PAT 权限、历史查询及设置更新语义。
outline: deep
---

# API 与 WebSocket 开发

Dashboard 的 REST 前缀为 `/api/v1`，不代表产品是 V1。REST、实时 WebSocket 与 MCP 是不同接口，不能共用错误的响应解析假设。

## 生成 OpenAPI

按[源码快速开始](/developer/getting-started.html)准备前端输入。在 Dashboard 根目录生成 Swagger：

```bash
go install github.com/swaggo/swag/cmd/swag@v1.16.6
"$(go env GOPATH)/bin/swag" init --pd -d cmd/dashboard -g main.go -o cmd/dashboard/docs
```

本机实例使用 `debug: true`，UI 位于 `/swagger/index.html`，JSON 位于 `/swagger/doc.json`。关闭 debug 后不应依赖该路由公开文档。实际鉴权以 `controller.go` 和 `scope_doc.go` 为准。

## 选择凭据

| 客户端 | 凭据与约束 |
| --- | --- |
| 同源管理界面 | JWT cookie `nz-jwt`；变更请求带与 `nz-csrf` 对应的 `X-CSRF-Token` |
| 服务端程序、CI、机器人 | PAT Bearer 请求头，限制 scope、服务器范围与有效期 |
| 公开用户主题 | 游客可见数据；必要时复用同源登录会话，不嵌入 PAT |
| MCP 客户端 | PAT；`POST /mcp`，不接受 JWT |

PAT 不能访问所有自我管理端点，包括个人信息和 Token 自我管理。`force_auth`、角色、资源归属、PAT scope 和服务器白名单是不同约束。完整 scope 与调用示例见[API 使用指南](/guide/api.html)。

## 正确处理 REST 响应

常见成功响应为 `{ "success": true, "data": ... }`；失败通常带 `error`，`omitempty` 意味着不一定出现 `success: false`。列表端点可能是 `data.value` 和 `data.pagination`，不能把所有 `data` 假定为数组。

同源浏览器只读示例：

```javascript
async function readNezha(path, signal) {
  const response = await fetch(path, { signal, credentials: "same-origin" });
  const body = await response.json();
  if (!response.ok || body.error || body.success === false) {
    throw new Error(body.error || `HTTP ${response.status}`);
  }
  return body.data;
}

const settings = await readNezha("/api/v1/setting");
console.log(settings.tsdb_enabled);
```

设置按访问者身份裁剪，示例不意味着游客能读取管理员配置。生产客户端还需处理非 JSON 错误页、超时、取消与重试；不要把失败转换为“成功但空数组”。

## WebSocket 的独立格式

`/api/v1/ws/server` 消息直接是 `{ now, online?, servers? }`，**没有 REST 的 `success/data` 包装**。参考用户前端 `src/context/websocket-provider.tsx` 与 `src/types/nezha-api.ts`。

- 按服务器 `id` 合并状态；空列表、字段缺省、离线和连接失败是不同情况。
- `public_note` 仅首包携带，后续缺省时保留已知值，不要清空。
- HTTPS 页面使用 `wss`。CORS 响应头不能绕过生产同源校验；浏览器 WebSocket 不能像 `fetch` 一样随意附加 Authorization 请求头。
- 有限重连、可见错误、手动恢复；卸载组件时清理连接与定时器，限制历史帧数量。

## 历史数据与能力检测

指标历史使用 `/api/v1/server/:id/metrics`；在线会话使用 `/api/v1/server/:id/online-history`，后者不依赖 TSDB。不要把实时缓存帧冒充长周期历史。

先检查设置返回的 `tsdb_enabled`，再展示指标历史能力。游客在线历史最多 1 天；登录查询也受权限、保留窗口和 PAT 范围限制。参数、单位和结构见[API 指南](/guide/api.html)。

## 设置更新不是通用 merge-patch

`PATCH /api/v1/setting` 接收 `SettingForm`，直接赋值多个字符串与布尔字段。仅 `enable_mcp`、`allow_jwt_ip_change`、`online_stats_days` 等指针字段省略时明确保留原值；省略其它字段可能清空设置，缺少有效 `user_template` 还会使请求被拒绝。

管理客户端应先以管理员身份读取设置，在表单中保留所有可编辑字段，再提交完整 `SettingForm`。不要单字段盲目 PATCH，也不要原样回传含只读字段的整个响应。以[表单定义](https://github.com/nezhahq/nezha/blob/master/model/setting_api.go)和[处理器](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/setting.go)核对可写字段。

Agent 配置、命令和任务还要区分接受、执行与生效，参见[配置加载](/configuration/environment.html)。新增路由参见[后端与 MCP 扩展](/developer/backend-development.html)。
