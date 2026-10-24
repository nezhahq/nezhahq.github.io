---
description: Locate Nezha Dashboard and Agent configuration, use their different environment-variable naming rules, understand persistence, and verify delayed remote configuration changes.
outline: deep
---

# Loading and environment variables

## Locate the active files

| Process | Default path | Explicit selection |
| --- | --- | --- |
| Dashboard | `data/config.yaml` relative to the working directory | `./dashboard -c /path/config.yaml` |
| Dashboard database | `data/sqlite.db` relative to the working directory | `./dashboard -db /path/sqlite.db` |
| Agent | `config.yml` beside the executable | `./nezha-agent -c /path/config.yml` |

A filename alone does not identify the active configuration. Check systemd `ExecStart` and `WorkingDirectory`, or Docker command arguments and mounts. Container paths may differ from host paths.

## Dashboard naming rules

Dashboard reads variables prefixed with `NZ_`, removes the prefix, and lowercases the rest. **Underscores introduce nesting.** An individual field normally uses its Go field name without underscores.

| YAML field | Environment variable |
| --- | --- |
| `listen_host` | `NZ_LISTENHOST` |
| `listen_port` | `NZ_LISTENPORT` |
| `site_name` | `NZ_SITENAME` |
| `debug` | `NZ_DEBUG` |
| `jwt_secret_key` | `NZ_JWTSECRETKEY` |
| `https.listen_port` | `NZ_HTTPS_LISTENPORT` |
| `tsdb.data_path` | `NZ_TSDB_DATAPATH` |
| `tsdb.retention_days` | `NZ_TSDB_RETENTIONDAYS` |
| `memory.go_mem_limit_mb` | `NZ_MEMORY_GOMEMLIMITMB` |

For example, `NZ_LISTEN_PORT` becomes `listen.port`, not `listen_port`. Similarly, `NZ_TSDB_DATA_PATH` is not the correct name for `tsdb.data_path`. Prefer YAML for complex lists and OAuth2 maps rather than guessing environment syntax.

### Loading and persistence

Dashboard loads the environment first and then merges YAML. File values can override duplicate settings; avoid overlapping nested keys or alternative spellings. **The environment is not a universal override layer above YAML.**

`NZ_JWTSECRETKEY` is an explicit exception: a nonempty value ultimately wins over the file, is not written back as the JWT secret, and disables automatic key rotation. Other settings may be persisted to YAML when saving admin settings. Environment variables are not a general no-disk-storage mechanism.

File edits load after a Dashboard restart. Admin settings update runtime state through the API and save the file. File-only settings such as listeners, storage, and JWT options are outside that settings interface.

## Agent naming rules

Agent also uses `NZ_`, but **preserves underscores inside field names**. It reads YAML before environment variables. Environment values override simple scalar file settings.

| YAML field | Environment variable |
| --- | --- |
| `server` | `NZ_SERVER` |
| `client_secret` | `NZ_CLIENT_SECRET` |
| `uuid` | `NZ_UUID` |
| `tls` | `NZ_TLS` |
| `report_delay` | `NZ_REPORT_DELAY` |
| `disable_command_execute` | `NZ_DISABLE_COMMAND_EXECUTE` |

Use native YAML arrays and maps. Do not assume comma-separated strings become arrays. Processes inherit their environment at startup: recreate containers after environment changes, or reload service definitions and restart services. Changing an interactive shell does not update an existing service.

Agent saves configuration when generating a UUID, creating its file, or applying remote configuration. Saved files contain effective configuration and are tightened to `0600`. **Providing a connection secret through the environment does not guarantee it will never appear in the Agent configuration file.** Protect files and backups.

## Remote configuration is delayed

After the UI or `POST /api/v1/server/config` sends configuration, Agent validates it and schedules application roughly 10 seconds later. A later ordinary configuration may replace an ordinary update that has not yet applied. The response acknowledges scheduling; a later disk-write failure can still prevent application.

Application persists the file before publishing runtime configuration and reloading workers. Startup-read options, including `debug`, automatic-update enablement, and its interval, require a full Agent restart for reliable application. Environment variables can still override remotely saved values on the next startup.

- `disable_command_execute: true` also blocks remote configuration read/apply. Recover locally on the host.
- Ordinary configuration pushes cannot rotate `client_secret`. Server transfers use their dedicated workflow, not the generic configuration API.
- Preserve host access before changing connection addresses or TLS. An unreachable Agent cannot be repaired through its former Dashboard connection.

## Troubleshoot ineffective edits

1. Confirm the active `-c` file and container mount.
2. Check for duplicate `NZ_` variables without printing credentials into logs or issue reports.
3. Restart after local file edits; recreate containers after environment changes.
4. Allow the remote application window, inspect Agent logs, and confirm new reports instead of relying on the submission response.
5. For settings-save failures, check write permissions on the configuration directory, not only the file.
6. Cross-check logs, API readback, and effective behavior. See [configuration recipes and verification](/en_US/configuration/examples.html).

## Implementation references

- [Dashboard loading and persistence](https://github.com/nezhahq/nezha/blob/master/model/config.go)
- [Dashboard settings API](https://github.com/nezhahq/nezha/blob/master/cmd/dashboard/controller/setting.go)
- [Agent loading and validation](https://github.com/nezhahq/agent/blob/main/model/config.go)
- [Agent configuration application](https://github.com/nezhahq/agent/blob/main/cmd/agent/main.go)
