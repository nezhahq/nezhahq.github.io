---
description: Run Nezha Monitoring V2 Dashboard and Agent from source with Go, Swagger, nonempty embedded assets, isolated development data, and frontend integration.
outline: deep
---

# Source development quick start

Get an isolated Dashboard, user frontend, and test Agent working before changing features. These steps do not use production configuration, credentials, or databases.

## Repositories and responsibilities

| Repository | Responsibility | Main locations |
| --- | --- | --- |
| [Dashboard](https://github.com/nezhahq/nezha) | HTTP/REST, WebSocket, gRPC, MCP, authorization, storage | `cmd/dashboard`, `model`, `service` |
| [Agent](https://github.com/nezhahq/agent) | Host collection, probes, remote operations | `cmd/agent`, `pkg/monitor`, `model` |
| [Admin frontend](https://github.com/nezhahq/admin-frontend) | `/dashboard/` administration | `src`, `vite.config.ts` |
| [Official user frontend](https://github.com/hamster1963/nezha-dash-v2) | `/` status page and server details | `src`, `vite.config.ts` |
| [Documentation](https://github.com/nezhahq/nezhahq.github.io) | Bilingual VitePress documentation | `docs`, `scripts` |

Use each repository's `go.mod` for Go requirements. Dashboard uses SQLite/CGO and requires a C compiler and CGO; the user frontend specifies Node.js ≥ 22 and pnpm ≥ 11 in `package.json`. Dashboard pins bundled theme versions, so frontend main may be ahead of the bundled release.

## 1. Prepare Dashboard

```bash
git clone https://github.com/nezhahq/nezha.git
cd nezha
go mod download
go install github.com/swaggo/swag/cmd/swag@v1.16.6
"$(go env GOPATH)/bin/swag" init --pd -d cmd/dashboard -g main.go -o cmd/dashboard/docs
```

`cmd/dashboard/docs` is generated. Ordinary REST development does not require protobuf regeneration or `script/bootstrap.sh`, which also copies files across repositories.

### Choose frontend inputs

**For working pages:** install `curl`, `unzip`, `realpath`, and Mike Farah's `yq`, then run from the repository root:

```bash
bash script/fetch-frontends.sh
```

The script downloads `dist.zip` from repositories and versions pinned in `service/singleton/frontend-templates.yaml`, replacing corresponding `cmd/dashboard/*-dist` directories. Keep frontend source outside these overwritten locations.

**For backend-only tests:** use nonempty placeholders to satisfy `go:embed`. They are not working administration pages:

```bash
mkdir -p cmd/dashboard/admin-dist cmd/dashboard/user-dist
printf '<!doctype html><title>Admin placeholder</title>\n' > cmd/dashboard/admin-dist/index.html
printf '<!doctype html><title>User placeholder</title>\n' > cmd/dashboard/user-dist/index.html
```

Choose one approach. Empty directories are insufficient. Assets belong under `cmd/dashboard/`, not a root-level `dashboard/`.

## 2. Start with isolated data

Create `dev-data` and add `dev-data/config.yaml`:

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

An empty database initializes `admin` / `admin`. Complete initialization locally and change the password. Open `/dashboard/`; Swagger is at `http://127.0.0.1:8008/swagger/index.html`. `debug` also exposes diagnostic endpoints and belongs only in isolated development.

Do not commit development data, generated API documentation, or build output. Never copy production databases into a debug instance.

## 3. Connect frontends and an Agent

- Follow [theme development](/en_US/developer/theme-development.html) for mocks or API/WebSocket proxying to local Dashboard.
- In the admin frontend, run `npm ci` and `npm run dev`, then open `/dashboard/` at the displayed address. Preserve its `/dashboard` base and API/WebSocket proxies.
- Use a test user's connection secret with a [development Agent](/en_US/developer/agent-development.html). Plaintext loopback is for local testing only; use verified TLS across public networks.

## 4. Verify a complete path

Confirm registration, continuing WebSocket updates, and real probe results. Direct route refreshes should retain correct HTTP statuses. Then run [testing and contribution checks](/en_US/developer/testing.html).

| Build or integration error | Check first |
| --- | --- |
| Missing `cmd/dashboard/docs` | Install swag and generate it, rather than inventing an empty Go package |
| `pattern *-dist: no matching files found` | Prepare real or nonempty placeholder assets under `cmd/dashboard/` |
| SQLite/CGO build or runtime failure | Check C compiler/CGO, not Agent's CGO-free build settings |
| Port 8008 busy or old data loaded | Check old processes, working directory, `-c`, and `-db` |
| Page loads, WebSocket rejected | Check Origin, same-origin proxying, and debug loopback conditions |
