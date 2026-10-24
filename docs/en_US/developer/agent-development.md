---
description: Develop Nezha Agent with local builds, isolated test identities, metrics and protobuf data flow, immutable runtime configuration, task gates, and cross-repository compatibility testing.
outline: deep
---

# Agent development

Agent is an independent Go program for collection, probes, and authorized operations. UI-only changes rarely require Agent changes; new collected fields or remote capabilities require coordination along the data path.

## Build and isolate a test instance

```bash
git clone https://github.com/nezhahq/agent.git
cd agent
go mod download
go build -o bin/nezha-agent ./cmd/agent
```

Use the toolchain from `go.mod`. Release platform matrices and linker flags are in `.goreleaser.yml`. A default local build is not an official release; do not replace the installed system Agent for debugging.

Create separate `dev-config.yml` with a local test Dashboard and a test user's connection secret. Do not copy a production UUID. See [Agent configuration](/en_US/configuration/agent.html) for addresses, TLS, and field formats. Run in the foreground:

```bash
./bin/nezha-agent -c dev-config.yml
```

The default is `config.yml` beside the binary, not the shell working directory. Preserve the generated UUID; simultaneously running copies of one UUID confuses identity. Development normally needs no system-service installation: exit the foreground process to stop it.

## Source data flow

| Location | Responsibility |
| --- | --- |
| `model/config.go` | Fields, cloning, loading, validation, persistence |
| `pkg/monitor` | Host/state, interfaces, GPU, IP discovery |
| `proto/nezha.proto` | Dashboard gRPC message contract |
| `cmd/agent` | Connection, reporting, runtime snapshots, tasks, lifecycle |
| Capability packages such as `pkg/fm` | File and transfer implementation |

For a new metric, follow collection through model/`PB()` conversion and protobuf, then Dashboard receiving, caching, HTTP/WS serialization, and theme rendering. An Agent field does not automatically create historical charts: explicitly integrate TSDB writes, query APIs, and frontend units too.

## Runtime configuration changes

Multiple concurrent workers consume configuration. Follow the immutable runtime-snapshot design; do not mutate shared configuration or its maps/slices concurrently. For each new field, consider:

1. YAML/JSON fields and default/range validation in `AgentConfig`.
2. Deep copies for new collections in `Clone()`.
3. Consumer-specific views that use one generation per operation.
4. Remote acceptance, deferred application, save-before-publish, recovery, and reconnects.
5. Startup-read versus reloadable behavior and matching documentation.

Do not blindly execute `go generate ./...`: a directive does not prove its referenced generator exists in the current checkout. Follow actual tools and CI.

## Task development beyond the happy path

Commands, terminals, files, NAT, and probes have distinct disable gates. Reuse existing gates on new paths. Generic configuration pushes cannot rotate `client_secret`; server-transfer rotation uses a dedicated task and requires verified TLS on the next connection.

Propagate context, timeouts, and cancellation through slow operations. Reclaim goroutines, streams, files, and child processes when sessions end. Shell execution belongs only in explicit command functionality; never interpolate ordinary filenames into shell strings.

Cover disconnects, reconnects, cancellation, duplicated/out-of-order work, concurrent configuration changes, and resource-free shutdown. OS-sensitive tests should use temporary directories and isolated processes rather than modify real developer services.

## Protobuf and cross-repository compatibility

Preserve existing field numbers and never reuse removed numbers. New fields must tolerate omission. Generated Go files are not hand-edited source. Regenerate matching Dashboard and Agent artifacts with compatible tools and record paired commits.

Dashboard `script/bootstrap.sh` also removes and copies the adjacent `../agent/proto`. It is not a side-effect-free Swagger command. For ordinary API docs, [run swag alone](/en_US/developer/api.html).

Basic local checks:

```bash
go test -mod=readonly -count=1 ./...
go test -mod=readonly -race -shuffle=on -count=1 ./...
go vet ./...
```

`-race` requires a supported platform/compiler. Cross-repository `agentcompat` workflows verify pinned Dashboard/Agent pairs. For protocol, connection, and task-lifecycle work, follow the current CI revisions and scenarios; ordinary unit tests are not equivalent. See [testing and contributions](/en_US/developer/testing.html).
