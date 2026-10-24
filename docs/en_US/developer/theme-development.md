---
description: Develop Nezha Monitoring V2 themes with React/Vite, REST and WebSocket data, history charts, custom code, dist.zip releases, bundled-theme registration, local overrides, and rollback.
keywords: [Nezha V2 theme development, custom theme, user frontend, WebSocket]
outline: deep
---

# Theme development

A Nezha user theme is a frontend application consuming Dashboard HTTP/WebSocket data, not a server-side Go template. User pages normally live at `/`; administration lives at `/dashboard/`. They have separate builds and their artifacts are not interchangeable.

## Choose the smallest change

| Goal | Approach |
| --- | --- |
| Change logo, background, display preferences, or a little CSS | Admin `custom_code`, without rebuilding Dashboard |
| Change cards, layout, charts, or interaction | Fork a user frontend and build a complete theme |
| Validate your build on an instance you operate | Override the selected theme's local directory |
| Offer a new theme in Dashboard releases | Publish assets and contribute manifest integration |

`custom_code_dashboard` targets administration, not the user theme. Themes do not automatically implement every `window.*` option; document which conventions your theme supports.

## 1. Run the official user frontend

Start from the [official user frontend](https://github.com/hamster1963/nezha-dash-v2), using Node.js and pnpm requirements from `package.json`:

```bash
git clone https://github.com/hamster1963/nezha-dash-v2.git
cd nezha-dash-v2
pnpm install --frozen-lockfile
MOCK_NEZHA_COUNT=6 pnpm dev:mock
```

Use the URL shown in the terminal; protocol and port depend on the checked-out `vite.config.ts`. The mock also uses port 8008, so do not run real Dashboard on that port simultaneously. A small mock fleet suits layout work; the default large fleet helps assess list performance.

For real integration, stop mocks, start a separate local Dashboard, and run `pnpm dev`. Preserve HTTP/WebSocket proxies for `/api/v1/` and `/api/v1/ws/server`. Styling work does not require a production connection.

### Find the relevant source

| Location | Responsibility |
| --- | --- |
| `src/pages`, `src/components` | Page composition, cards, details, charts |
| `src/context/websocket-provider.tsx` | Realtime frames, connection lifecycle, bounded history |
| `src/lib/nezha-api.ts`, `src/types/nezha-api.ts` | API calls and data types |
| `src/locales` | UI translations |
| `vite.config.ts` | Base path, proxies, build targets, test environment |

Current frontend source also separates selectors, runtime configuration, and detail charts under `src/features`, while keeping compatibility entry points such as `src/lib/inject.ts`. Consult its `docs/architecture.md`; main-branch internals are not a public API guaranteed by every bundled theme.

## 2. Consume data correctly

- Settings/groups use REST; live servers use WebSocket. Their envelopes differ: see [API development](/en_US/developer/api.html).
- Render only nodes visible to the caller. Clear identity-dependent caches when login changes; never populate guest views from administrator snapshots.
- `host`, `state`, and extended GPU fields may be absent. Distinguish zero, unknown, offline, and failed loading instead of fabricating zero samples.
- Preserve valid zero and repeated values. Align chart series by timestamp and convert units consistently. Sparse GPU data cannot be aligned by array position alone.
- Check `tsdb_enabled` before requesting metric history. Realtime cache is not persistent history; do not invent per-card GPU history parameters absent from the backend.
- Public notes may appear only in the first frame. Render notes as text. If interpreting custom JSON, validate its shape and allow only intended safe URL schemes such as `http`/`https`, rather than executing HTML.

An independent theme can start with this minimal realtime adapter. It opens one connection and returns a cleanup function; production callers should add bounded retries and visible recovery controls.

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

Native browser WebSocket uses same-origin cookies. Do not bypass authentication by putting PATs in source, URL parameters, build-time environment variables, or `localStorage`.

## 3. Support lightweight customization

Common official-theme options can be placed in Dashboard `custom_code`:

```html
<script>
  window.CustomLogo = "https://example.com/logo.svg";
  window.ForceShowServices = true;
  window.ForceCardInline = true;
</script>
```

These are theme conventions, not top-level Dashboard YAML fields. Scripts have page privileges: load trusted resources only. Removing script nodes cannot undo registered events or other side effects; provide cleanup where needed. See [user-theme customization](/en_US/guide/q8.html) for available options.

## 4. Build and package

```bash
pnpm verify
zip -r dist.zip dist
unzip -l dist.zip
```

The archive must contain top-level `dist/` with `index.html` and complete assets, not source, secrets, or dependencies. Do not bypass type checking to make a build pass. Preserve Vite `base: "/"`; admin themes require their separate `/dashboard` base.

Test production output, not only hot reload: assets, light/dark modes, narrow screens, long names, empty lists, and error recovery. Retain previous artifacts rather than overwriting the same published version.

## 5. Local overrides and rollback

Dashboard checks the selected theme directory **relative to its process working directory** before falling back to embedded assets per file. For `user_template: user-dist`, an instance you operate can use:

```text
<Dashboard working directory>/
  user-dist/
    index.html
    assets/
```

Copy the contents of built `dist/`, not source or `user-dist/dist/index.html`. This overrides an already selected theme; it does not register arbitrary directories through YAML.

After testing separately, stop the instance, preserve the old override directory, place a complete artifact at the target location, mount it if containerized, and restart. Partial overrides mix local and embedded files, so avoid mixed versions. Keep complete versioned assets and account for old assets still requested by existing browser sessions.

To roll back, restore the old override or move the custom directory aside to return to embedded resources, then refresh and verify. Do not delete configuration/databases. Container upgrades do not maintain custom mounted themes automatically; validate compatibility yourself.

## 6. Register a bundled theme

Dashboard accepts only valid `user_template` / `admin_template` entries from `service/singleton/frontend-templates.yaml`. A user-theme entry looks like this; repository and version are illustrative placeholders:

```yaml
- path: "my-theme-dist"
  name: "My Theme"
  repository: "https://github.com/example/my-nezha-theme"
  author: "example"
  version: "v1.0.0"
  is_admin: false
  is_official: false
```

1. Publish a fixed-version `dist.zip` in your repository using the required layout.
2. Contribute the Dashboard manifest entry; the build script downloads it into `cmd/dashboard/my-theme-dist`.
3. Build Dashboard, embedding `*-dist` directories. Runtime does not automatically download themes or look up their latest GitHub releases.
4. Select the theme only after it is included in the Dashboard build you run. Invalid selections fall back to the default.

For new SPA routes, update `frontendPageUrlRegistry` in `cmd/dashboard/controller/controller.go`. Unregistered paths may return application HTML with HTTP `404`, breaking direct refreshes, previews, and external monitoring despite working client-side navigation.

## Delivery checks

- New sessions, guests, members, administrators, mandatory login, and no hidden-node leaks.
- Direct refreshes of `/server/1` and new routes with actual HTTP-status checks.
- TSDB on/off, empty history, period changes, out-of-order requests, reconnects, and expired credentials.
- Missing GPU data, long names, large fleets, 320px layouts, keyboard interaction, light/dark modes.
- Reproducible archive layout, asset URLs, pinned manifest version, and local rollback.

Implementation: [manifest](https://github.com/nezhahq/nezha/blob/master/service/singleton/frontend-templates.yaml), [download script](https://github.com/nezhahq/nezha/blob/master/script/fetch-frontends.sh), [static resource handler](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/controller.go).
