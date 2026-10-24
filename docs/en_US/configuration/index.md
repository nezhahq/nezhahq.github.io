---
description: Configure Nezha Monitoring V2 with a clear workflow for YAML files, environment variables, Dashboard settings, Agent options, deployment examples, and effective verification.
outline: deep
---

# Configuration guide

Nezha configuration has two independent parts: Dashboard controls entry points, authentication, and storage; Agent controls its connection, collected metrics, and remote-operation capabilities. Each has its own YAML file. Field names and environment-variable rules are not interchangeable.

## Choose a starting point

| Goal | Read |
| --- | --- |
| Locate the active file and understand loading and persistence | [Loading and environment variables](/en_US/configuration/environment.html) |
| Look up every Dashboard option and default | [Dashboard configuration](/en_US/configuration/dashboard.html) |
| Look up every Agent option and default | [Agent configuration](/en_US/configuration/agent.html) |
| Configure a reverse proxy, built-in HTTPS, lightweight collection, or storage | [Configuration recipes and verification](/en_US/configuration/examples.html) |
| Configure notifications, alerts, tasks, and groups | [User guide: settings](/en_US/guide/settings.html) and the adjacent feature pages |
| Develop or deploy your own user theme | [Theme development](/en_US/developer/theme-development.html) |

## Recommended workflow

1. **Identify how the process runs.** Check container mounts, process arguments, or service definitions. Dashboard defaults to `data/config.yaml`; Agent defaults to `config.yml` beside its executable. Installers may specify another location.
2. **Back up the current state.** Preserve configuration and service definitions. Follow [backup and recovery](/en_US/guide/q5.html) for database and TSDB changes. Do not place credentials in shared-readable backups.
3. **Change one configuration source.** Prefer the admin UI for supported settings. Avoid defining the same field in YAML and the environment. Preserve a local recovery path before changing listeners, TLS, or credentials.
4. **Apply and read back.** Admin settings generally apply immediately; local file edits require restarting the relevant process. Remote Agent configuration is delayed: successful submission does not prove reconnection.
5. **Verify the real path.** Confirm the UI loads, Agents keep reporting, history can be queried, intended features work, and disabled capabilities are actually rejected.

## Common distinctions

- Dashboard `tls` affects installation commands only. Actual server HTTPS comes from `https` or a reverse proxy. Agent `tls` controls the real connection.
- `install_host` is the Agent entry point, `dashboard_host` is the public Dashboard/OAuth2 callback host, and `listen_host` is the local bind address.
- A user connection secret registers Agents; it is neither a REST/MCP PAT nor a browser JWT.
- `online_stats_days` controls online-session history; `tsdb.retention_days` controls time-series retention. Neither replaces the other.
- Theme `window.*` globals are not Dashboard YAML fields. Put them in `custom_code`; the selected theme interprets them.

## Boundaries outside configuration

Agent operations also depend on operating-system permissions. Dashboard user permissions, PAT scopes, and server allowlists still apply. Disabling mandatory login does not publish every server or remove management API authentication. See [security and privacy](/en_US/guide/security.html).
