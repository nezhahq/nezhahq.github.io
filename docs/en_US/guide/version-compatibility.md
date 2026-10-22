---
title: Nezha Monitoring V2 version and compatibility guide
description: Understand Nezha Monitoring V2 product generation, independent Dashboard and Agent releases, the /api/v1 route namespace, legacy V0/V1 documentation, and safe upgrade checks.
outline: deep
---

# Nezha Monitoring V2 version and compatibility guide

The current documentation targets **Nezha Monitoring V2**. Separating product generation, component releases, and API versions prevents `/api/v1`, an old tutorial, or one component tag from being mistaken for a statement that the current product is still V1.

## What do the four version labels mean?

| Label | Example | Meaning |
| --- | --- | --- |
| Product generation | Nezha Monitoring V2 | Current overall product and documentation generation |
| Dashboard release | `v2.x.y` | Independently published server release from the [Dashboard repository](https://github.com/nezhahq/nezha/releases) |
| Agent release | `v2.x.y` | Independently published client release from the [Agent repository](https://github.com/nezhahq/agent/releases); it does not need the same exact number as Dashboard |
| API path version | `/api/v1/...` | REST API route namespace maintained for interface compatibility; it is not the product generation |

Seeing `/api/v1/server` on a V2 Dashboard is therefore expected. Do not replace routes with `/api/v2` unless the official code and API documentation explicitly introduce that path.

## Must Dashboard and Agent have the same version?

They are released independently, so their patch versions do not have to match. That does not imply every arbitrary cross-version combination is compatible. Recommended practice is to:

1. Use stable releases from both repositories in production.
2. Read both Dashboard and Agent release notes before upgrading.
3. Back up Dashboard data and configuration first.
4. Upgrade a small group of nodes and observe connection, state reporting, checks, and remote operations.
5. Roll out to the remaining Agents gradually so one change cannot remove visibility from every node at once.

If Dashboard requests a forced Agent update or logs show protocol, authentication, or field errors, follow the current release notes and issues instead of comparing version strings alone.

## Component Responsibilities and Feature Boundaries

Admin and user frontends are released independently. Official Dashboard releases bundle frontends selected by the build-time template manifest; third-party themes may not implement the same features. This guide describes current stable behavior directly.

| Feature | Current behavior and boundaries |
| --- | --- |
| Mobile terminal | The admin frontend provides key controls and a clipboard button; the Agent handles terminal input, sizing, and colors |
| GPU memory | The Agent reports per-card memory, Dashboard relays it, and the default user frontend displays it; memory collection currently supports Linux NVIDIA only |
| JWT sessions across IP changes | `allow_jwt_ip_change` is disabled by default; there is no admin-frontend switch, so use the configuration file or settings API |
| Online history | Dashboard stores online sessions in its database without TSDB; the default user frontend provides an Online tab with a one-day query selected by default |
| Online stats range | `online_stats_days` defaults to 7 days and accepts 7–3650 days, controlling both retention and the maximum query window |

Online history accumulates from received state reports and does not backfill previously unrecorded periods. The default user frontend offers 1/7/30-day options; the API maximum follows configured retention. Independently released components do not need identical version numbers.

## How should V0, V1, and V2 documentation be read?

- **V2:** the default target for current installation, configuration, API, and troubleshooting pages.
- **V1:** a historical product generation. Follow the current V2 installation and usage documentation rather than copying old configuration or commands.
- **V0:** old configuration formats, databases, and login flows may be incompatible with current releases. Pages retained at old URLs are historical references, not instructions for new deployments.
- **V1 in a community project name:** when an upstream repository or project name explicitly says V1, the documentation preserves the real name and labels it third-party or historical. It does not invent V2 compatibility.

## Common apparent version conflicts

### Why is the API still `/api/v1`?

API version and product generation are independent. The current [API documentation](/en_US/guide/api.html) follows routes implemented by Dashboard.

### Which behavior does this documentation describe?

Installation, configuration, API, and troubleshooting pages directly describe the current stable behavior. For example, web and Agent communication share a port, and local accounts support OAuth2 binding. Release history is for auditing and provenance, not a prerequisite for current usage steps.

### Why does a community project page still say V1?

Community pages describe third-party projects. Their maintainers determine names and compatibility. Official documentation cannot claim V2 support without upstream evidence. Check recent commits, releases, and issues before deployment.

## Pre-upgrade checklist

- Review [Dashboard Releases](https://github.com/nezhahq/nezha/releases) and [Agent Releases](https://github.com/nezhahq/agent/releases).
- Back up `/opt/nezha` or the actual mounted data, configuration, and TSDB directories.
- Record current Dashboard and Agent versions, installation method, domains, and reverse proxy configuration.
- Check database migrations, configuration-field changes, and removed features.
- Test login, Agent connectivity, WebSocket, gRPC, notifications, and authorized operations.
- Do not overwrite a current deployment with an old Compose file, configuration example, or binary.

See [Install Dashboard](/en_US/guide/dashboard.html), [Install Agent](/en_US/guide/agent.html), and [Backup and recovery](/en_US/guide/q5.html) for operational steps.
