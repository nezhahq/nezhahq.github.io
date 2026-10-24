---
description: Extend Nezha Dashboard REST APIs, MCP tools, and asynchronous work with explicit authorization, input contracts, cancellation, audit boundaries, and regression testing.
outline: deep
---

# Dashboard and MCP extensions

Reuse existing REST APIs and capability layers first. Adding an endpoint requires resource permissions, input limits, response semantics, and lifecycle behavior, not just a route.

## Locate responsibilities

| Layer | Location | Responsibility |
| --- | --- | --- |
| Routes/middleware | `cmd/dashboard/controller/controller.go` | Authentication groups, scopes, CSRF, route registration |
| Forms/responses/models | `model` | Input validation, JSON contracts, database structures |
| Handlers | `cmd/dashboard/controller` | HTTP/MCP protocol and business calls |
| Shared business/storage | `service/singleton`, `pkg/tsdb` | Caches, history, alerts, task lifecycle |
| Agent communication | `cmd/dashboard/rpc`, `service/rpc`, `proto` | gRPC, dispatch, streams, receipts |

Do not let UI clients submit every ORM field. Requests, stored models, and public responses need explicit, separate field boundaries.

## Adding REST functionality

1. Define callers, input, output, and resource rules: guest-readable, member-owned, or administrator-only.
2. Define forms/responses with explicit JSON names and validate sizes, ranges, and enums.
3. Reuse JWT/PAT route authentication and enforce scopes. Browser cookie mutations remain CSRF-protected.
4. Check ownership/visibility and PAT server restrictions per resource, not just login. Avoid leaking distinctions between absent and inaccessible resources.
5. Use existing envelopes and distinguish empty, forbidden, unavailable, and accepted work. Add Swagger annotations and regenerate.
6. Test success, unauthorized access, missing scopes, allowlist exclusions, invalid inputs, concurrency, and cancellation. Update frontend and bilingual docs.

**Visibility is not management permission.** Members may see another user's public servers without acquiring modification or execution rights. Historical queries must enforce visibility and PAT restrictions too.

## Adding an MCP tool

Native MCP currently covers identity, inventory/state, commands, and files. Alert configuration, history, and task management are not implicit methods. Check the [tool inventory](/en_US/guide/mcp.html); naming a tool in a client or feature page does not implement it.

Start with `controller/mcp.go`, `mcp_tools_*.go`, `mcp_transfer.go`, and related `service/rpc` code. Complete all of the following:

- JSON-RPC input schema, registration, dispatch, and protocol/error behavior matching existing implementation.
- The `enable_mcp` kill switch, PAT-only authentication, and Origin checks; no browser-JWT fallback.
- Minimal scopes, user resource permissions, PAT server allowlists, and corresponding Agent capability gates.
- Input/output limits, timeouts/cancellation, PAT revocation, and cleanup when MCP is disabled.
- Distinct command exit-code and execution-failure semantics; task acknowledgement is not command success.
- Audit tool, target, outcome, and necessary metadata without recording PATs, sensitive file bodies, or unnecessary command output.

File tools should reuse path restrictions, size limits, and integrity checks. Do not introduce download URLs that bypass authorization or turn the endpoint into an arbitrary public proxy.

The current transport uses `POST /mcp` request/response without standalone SSE push. `GET`/`DELETE /mcp` returning `405` is deliberate. Adapt clients to implemented transport instead of promising SSE only in documentation.

## State changes and recovery

Distinguish accepted, running, terminal, and effectively applied states. After ambiguous timeouts on side-effecting requests, reconcile state before retrying. Multi-stage operations need persistent state, replay/idempotency rules, and recovery paths.

Persist configuration or credential transitions before irreversible cleanup/runtime changes. Use existing synchronization for shared state. Avoid putting atomic or synchronization fields inside response structs copied by value.

## What to include in a contribution

Provide contracts, permission matrices, regression cases, required migration/rollback notes, and [test evidence](/en_US/developer/testing.html). For Agent/protobuf changes, list paired commits. New UI routes must also check [SPA HTTP-status fallback](/en_US/developer/theme-development.html).

Authoritative implementation: [routes](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/controller.go), [scope map](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/scope_doc.go), [MCP](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/mcp.go).
