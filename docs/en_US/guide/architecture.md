---
title: Nezha Monitoring V2 architecture and data flow
description: Text-based Nezha Monitoring V2 architecture covering Dashboard, Agent, frontends, SQLite, optional TSDB, gRPC connections, service checks, alerts, and remote-operation data flows.
outline: deep
---

# Nezha Monitoring V2 architecture and data flow

Nezha Monitoring V2 uses a centralized topology in which one Dashboard manages multiple Agents. Dashboard is the control plane and presentation entry point; Agent is the data-collection and task-execution component on each monitored node. This boundary determines the correct domain, reverse proxy, permission, backup, and troubleshooting design.

## Logical topology

```text
Browser / API client
          |
          | HTTPS / WebSocket
          v
+------------------------+        Notification / DNS APIs
| Dashboard              |---------------------> External integrations
| - User and admin UIs   |
| - REST API / MCP       |
| - Alert/task scheduler |
| - State and access     |
+-----------+------------+
            |        |
            |        +------> SQLite (configuration, users, business data)
            |        +------> Optional TSDB (metric and service history)
            |
            | gRPC (can be carried by an HTTPS reverse proxy)
            v
     +------+------+------+
     | Agent | Agent | ... |
     +-------+-------+-----+
        |       |
        +-------> Host metrics, network checks, authorized tasks
```

This is a logical relationship; the components do not need to share one network. Browsers must be able to reach Dashboard, and every Agent must be able to reach the configured Agent endpoint.

## What does Dashboard do?

Dashboard is responsible for:

- Authenticating users, API Tokens, and Agent connections.
- Receiving host information, runtime state, and task results from Agents.
- Maintaining servers, groups, users, services, notifications, tasks, DDNS, and system configuration.
- Serving data to the user frontend, admin frontend, REST API, and optional MCP endpoint.
- Evaluating service state and alert conditions and invoking configured notification methods.
- Relaying authorized terminal, file, task, NAT, and related operations to the target Agent.

Dashboard is therefore more than a read-only chart viewer. Once remote operations are enabled, it is a privileged control plane. Restrict the admin surface, use TLS, protect secrets, and keep it updated.

## What does Agent do?

Agent runs on every monitored device and mainly:

- Reads host and network state exposed by the operating system.
- Connects to Dashboard using a connection secret and its UUID.
- Reports state according to settings such as `report_delay`.
- Performs assigned HTTP, Ping, or TCP service checks.
- Executes terminal, file, task, update, or NAT operations when they are not disabled and the caller is authorized.

For nodes that do not need remote operations, use Agent settings such as `disable_command_execute`, `disable_force_update`, and `disable_nat` to reduce its capability. See [Agent configuration](/en_US/configuration/agent.html).

## Connections and reverse proxies

In V2, web access and Agent communication can share the Dashboard listening port, which defaults to `8008`. Typical deployments use one of two patterns:

1. **Direct Dashboard port:** browsers and Agents connect to `host:8008`.
2. **HTTPS reverse proxy:** the proxy forwards normal HTTP, WebSocket, and gRPC requests to Dashboard.

The proxy must support both gRPC and WebSocket correctly. Current Agent and Dashboard versions accept both `Authorization` and `Grpc-Metadata-Authorization` for gRPC authentication. See [Dashboard reverse proxy configuration](/en_US/guide/q3.html) and [WebSocket troubleshooting](/en_US/guide/q4.html) for Nginx, Caddy, and CDN details.

When the public web domain and Agent communication domain differ, configure `dashboard_host` and `install_host` separately. These values also participate in OAuth2 callback Host and reserved NAT-domain checks. See [Dashboard configuration](/en_US/configuration/dashboard.html#dashboard-host).

## How does state move through the system?

### Host state

Agent sends host information and a state stream to Dashboard. Dashboard keeps current state in memory for pages and API queries. When TSDB is enabled, historical server metrics are written to local time-series storage. Real-time state remains available without TSDB, but historical server metrics are unavailable and the frontend locks those history periods.

### Service monitoring

Dashboard assigns check tasks to Agents according to the service coverage and selected-server configuration. Each Agent reaches the HTTP, ICMP, or TCP target from its own network location and returns the result. This allows availability and latency comparisons across routes or regions.

Without TSDB, service history is read from SQLite. After TSDB is enabled, service history is queried from TSDB. See [Enable TSDB](/en_US/guide/q15.html) for setup and migration constraints.

### Remote operations

When a browser or API client requests terminal, file, or task access, Dashboard first checks user or Token permission, then relays the request through the Agent task or IOStream channel. Terminal, file management, NAT, and MCP file transfer use limited IOStream quotas; close idle sessions when necessary.

## Where is data stored?

- **SQLite:** Dashboard uses a local SQLite file for users, configuration, and business data by default.
- **Memory:** current online state and runtime objects live in Dashboard memory; after a restart, Agents reconnect and report again.
- **Optional TSDB:** setting `tsdb.data_path` enables built-in time-series storage for server metrics and service history.
- **External services:** Dashboard contacts a notification, OAuth2, or DDNS provider only when that integration is configured. The transmitted content depends on the provider template and configuration.

A backup must include more than the container definition. Script-based installations normally require a backup of `/opt/nezha`, and Dashboard should be stopped before migration to obtain consistent data. See [Backup and recovery](/en_US/guide/q5.html).

## Common architecture choices

### One-domain deployment

One HTTPS domain serves browsers and Agents. This is the simplest configuration, but the reverse proxy must handle both WebSocket and gRPC correctly.

### Separate web and Agent domains

The public web domain can use a CDN while the Agent communication domain connects directly or uses a proxy with explicit gRPC support. This avoids some CDN long-connection or gRPC limitations but requires both Host values to be configured correctly.

### Private Dashboard

A VPN, private network, or access-control layer can restrict Dashboard when no public status page is needed. All Agents and administrator clients must still be able to reach the required endpoint.

## Pre-production checklist

- [Install Dashboard](/en_US/guide/dashboard.html) and replace the default password.
- Enable HTTPS for public endpoints and configure real-IP headers and trusted Hosts correctly.
- Grant terminal, file, task, NAT, API, and MCP permissions only to users who need them.
- Disable unneeded execution capabilities on Agents.
- Back up SQLite, configuration, and TSDB directories and test restoration.
- Read [Security and privacy](/en_US/guide/security.html) and [Version and compatibility](/en_US/guide/version-compatibility.html).
