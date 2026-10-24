---
description: Develop Nezha Monitoring V2 integrations with Swagger, REST and WebSocket payloads, JWT/CSRF and PAT boundaries, historical data, and correct settings updates.
outline: deep
---

# API and WebSocket development

The REST prefix `/api/v1` does not identify the product as V1. REST, realtime WebSocket, and MCP are distinct interfaces with different response contracts.

## Generate OpenAPI

Prepare frontend inputs with the [source quick start](/en_US/developer/getting-started.html), then run from the Dashboard root:

```bash
go install github.com/swaggo/swag/cmd/swag@v1.16.6
"$(go env GOPATH)/bin/swag" init --pd -d cmd/dashboard -g main.go -o cmd/dashboard/docs
```

Use `debug: true` locally. UI is at `/swagger/index.html`; JSON is at `/swagger/doc.json`. Do not expect these routes with debug disabled. Actual authorization comes from `controller.go` and `scope_doc.go`.

## Choose credentials

| Client | Credential and constraints |
| --- | --- |
| Same-origin administration | JWT cookie `nz-jwt`; mutations include `X-CSRF-Token` matching `nz-csrf` |
| Server applications, CI, bots | PAT Bearer header, restricted by scope, server range, and expiry |
| Public user theme | Guest-visible data; reuse same-origin login if needed, never embed a PAT |
| MCP client | PAT and `POST /mcp`; JWT is not accepted |

PATs cannot access every self-management endpoint, including profile and token self-management. `force_auth`, roles, ownership, PAT scopes, and server allowlists are separate constraints. See the [API user guide](/en_US/guide/api.html) for complete scopes and examples.

## Handle REST responses correctly

Common success responses use `{ "success": true, "data": ... }`. Failures usually contain `error`; `omitempty` means `success: false` may be absent. List endpoints can use `data.value` and `data.pagination`; not every `data` is an array.

Same-origin browser read-only example:

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

Settings are filtered by caller identity: this example does not expose admin configuration to guests. Production clients also need non-JSON error handling, timeouts, cancellation, and retries. Never convert failures into successful empty arrays.

## WebSocket payloads

`/api/v1/ws/server` messages directly contain `{ now, online?, servers? }`, **without the REST `success/data` envelope**. See the user frontend's `src/context/websocket-provider.tsx` and `src/types/nezha-api.ts`.

- Merge by server `id`. Empty lists, missing fields, offline nodes, and connection failures are different states.
- `public_note` appears only in the first packet. Preserve known values when later packets omit it.
- Use `wss` on HTTPS pages. CORS response headers do not bypass production same-origin checks; browser WebSocket cannot attach arbitrary Authorization headers like `fetch`.
- Use bounded retries, visible errors, and manual recovery. Clean up connections and timers on unmount and bound retained frames.

## History and capability detection

Historical metrics use `/api/v1/server/:id/metrics`; online sessions use `/api/v1/server/:id/online-history`. Online sessions do not depend on TSDB. Cached realtime frames are not long-term history.

Inspect `tsdb_enabled` before exposing metric history. Guest online history is capped at one day. Authenticated queries still obey permissions, retention windows, and PAT constraints. See the [API guide](/en_US/guide/api.html) for parameters, units, and shapes.

## Settings updates are not generic merge-patch

`PATCH /api/v1/setting` accepts `SettingForm` and directly assigns multiple strings and booleans. Only pointer fields such as `enable_mcp`, `allow_jwt_ip_change`, and `online_stats_days` explicitly preserve current values when omitted. Omitting other fields can clear settings; an invalid or missing `user_template` rejects the request.

Admin clients should read settings as an administrator, preserve editable fields, and submit a complete `SettingForm`. Do not blindly send one-field PATCH requests or echo the entire response with read-only fields. Check the [form definition](https://github.com/nezhahq/nezha/blob/master/model/setting_api.go) and [handler](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/setting.go) for writable fields.

Distinguish acceptance, execution, and effective results for Agent configuration, commands, and tasks; see [configuration loading](/en_US/configuration/environment.html). For new routes, read [backend and MCP extensions](/en_US/developer/backend-development.html).
