---
title: What is Nezha Monitoring V2?
description: Official Nezha Monitoring V2 overview explaining how Dashboard and Agent provide multi-server metrics, network service checks, alerts, and authorized operations, and which use cases fit the project.
outline: deep
---

# What is Nezha Monitoring V2?

**Nezha Monitoring V2 is an open-source, self-hosted server monitoring and operations tool.** It combines a central Dashboard with an Agent installed on each monitored device. Together they provide a unified view of server status, website and network-service checks, alerts, and authorized operations such as terminal, file, and task access.

Nezha is designed for individuals and teams that want a straightforward web interface for VPS fleets, cloud servers, home labs, NAS devices, or geographically distributed nodes. It focuses on quick deployment and day-to-day infrastructure operations. It is not intended to replace a log analytics platform, application performance monitoring system, or general-purpose metrics query platform.

## Core components

| Component | Where it runs | Primary responsibility | Official source |
| --- | --- | --- | --- |
| Dashboard | A server reachable by administrators and Agents | Receives Agent state, stores configuration, presents data, schedules checks and tasks, sends notifications, and exposes APIs and the admin UI | [nezhahq/nezha](https://github.com/nezhahq/nezha) |
| Agent | Every monitored server or device | Collects host state, reports to Dashboard, performs assigned service checks, and accepts authorized tasks according to its configuration | [nezhahq/agent](https://github.com/nezhahq/agent) |
| User and admin frontends | Served by Dashboard | Provide public or authenticated status views and management for servers, services, notifications, tasks, users, and settings | Released with Dashboard |

Dashboard and Agent have independent release versions. Check [Dashboard Releases](https://github.com/nezhahq/nezha/releases) and [Agent Releases](https://github.com/nezhahq/agent/releases) before upgrading either component. “V2” identifies the current product generation; it is not the complete version number of every component. See [Version and compatibility](/en_US/guide/version-compatibility.html).

## What can Nezha monitor?

### Server state

The Agent reports online status and available metrics such as CPU, memory, swap, disk, network traffic, load, connection count, process count, and uptime. Some data depends on the operating system, permissions, and Agent configuration. GPU and temperature reporting also require supported hardware and explicit configuration.

### Websites and network services

Service monitoring supports HTTP GET, ICMP Ping, and TCPing. Checks can run from selected Agents to measure availability and latency, and HTTPS targets can be checked for certificate status. See [Service monitoring](/en_US/guide/services.html) for fields and history behavior.

### Alerts and notifications

Administrators can notify on conditions such as offline state, resource usage, traffic, service failure, latency changes, and certificate status. Delivery methods, notification groups, and templates are configured in Dashboard. See [Notifications](/en_US/guide/notifications.html).

### Authorized operations

Nezha also provides web terminal, file management, scheduled and triggered tasks, DDNS, NAT, REST API, and MCP features. These features expand the Dashboard and Agent trust boundary. Enable only what you need and combine user roles, API Token scopes, Agent disable options, and network access controls.

## How does one data flow work?

1. An Agent connects with credentials generated from the Dashboard server page.
2. The Agent continuously reports host information and runtime state.
3. Dashboard keeps current state in memory and stores business data according to its configuration. When TSDB is enabled, it can retain and query longer metric history.
4. Dashboard serves that state to the user frontend, admin frontend, and authorized API clients.
5. When a service check or task requires an Agent, Dashboard sends the request over the established connection and receives the result.
6. When an alert rule is satisfied, Dashboard invokes the configured notification method.

See [Architecture and data flow](/en_US/guide/architecture.html) for connections, storage, and reverse-proxy implications.

## Which use cases fit?

- View availability and resource usage for VPS, cloud, and home-lab servers in one interface.
- Check websites, ports, network latency, and TLS certificates from different network locations.
- Give a small operations team a self-hosted status, alerting, and common remote-operations entry point.
- Connect server inventory, metric queries, and limited operations to internal automation through REST API or MCP.

If your primary need is a public uptime page, second-by-second deep observability, the PromQL ecosystem, or large enterprise network management, read the [monitoring tool comparison](/en_US/guide/comparison.html) before choosing Nezha, another tool, or a combined deployment.

## Where should I start?

1. Read [Architecture and data flow](/en_US/guide/architecture.html) to understand network and trust boundaries.
2. [Install Dashboard](/en_US/guide/dashboard.html) and replace the default password immediately.
3. [Install Agent](/en_US/guide/agent.html) and confirm the node is online.
4. Configure [service monitoring](/en_US/guide/services.html) and [notifications](/en_US/guide/notifications.html).
5. Review the [security and privacy checklist](/en_US/guide/security.html) before production use.

## Frequently asked questions

### Is Nezha Monitoring free and open source?

The Dashboard and Agent source code is published in the NezhaHQ GitHub repositories. A deployment still has server, domain, storage, and notification-service costs and remains subject to repository licenses and third-party service terms.

### Does Nezha Monitoring require a cloud service?

No. Dashboard and Agent can be self-hosted. Agents must still be able to reach Dashboard. OAuth2, external notifications, CDNs, and DNS providers are contacted only when you choose those integrations.

### Can one Dashboard monitor multiple servers?

Yes. Install an Agent on each server and connect them to the same Dashboard, then organize access with groups, users, and service coverage rules.

### Does `/api/v1` mean that I am using Nezha V1?

No. `/api/v1` names an API route version. The current product generation is V2. Product generation, Dashboard release, Agent release, and API path version are separate concepts.

### Does Nezha automatically make my servers secure?

No. Nezha provides authentication, permission, and security configuration controls, but the operator remains responsible for TLS, reverse proxy settings, secrets, users, firewall rules, backups, and updates. Follow the [security and privacy guide](/en_US/guide/security.html).
