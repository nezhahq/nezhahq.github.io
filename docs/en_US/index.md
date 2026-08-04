---
layout: home

title: Nezha Monitoring V2 - Open-source server monitoring and operations
titleTemplate: Official Documentation
description: Official Nezha Monitoring V2 documentation for self-hosted multi-server metrics, website and port checks, alerts, web terminal, files, tasks, DDNS, APIs, installation, configuration, and troubleshooting.

hero:
  name: Nezha Monitoring V2
  text: Open-source, self-hosted server monitoring and operations
  tagline: Connect multiple Agents to one Dashboard to view server state, check websites and network services, send alerts, and perform authorized operations.
  image: https://raw.githubusercontent.com/nezhahq/nezha/master/.github/brand.svg
  actions:
    - theme: brand
      text: Preview
      link: https://qio.ng
    - theme: alt
      text: Install Dashboard →
      link: /en_US/guide/dashboard.html

features:
  - title: Multi-server state
    details: View online state, CPU, memory, disk, network traffic, and available system metrics from Linux, Windows, macOS, OpenWRT, Synology, and other documented environments.
  - title: Service checks and alerts
    details: Run HTTP GET, ICMP Ping, and TCPing from selected Agents, track availability, latency, and certificate state, and send alerts through notification groups.
  - title: Routine remote operations
    details: Use web terminal, file management, scheduled and triggered tasks, DDNS, NAT, REST API, and optional MCP according to granted permissions.
  - title: Self-hosted and open source
    details: Dashboard and Agent are published by NezhaHQ; the operator controls data, endpoints, users, storage, and integrations.
---

## What is Nezha Monitoring V2?

Nezha Monitoring V2 combines a central **Dashboard** with an **Agent** installed on every monitored device. Agents report host state and perform assigned network checks or authorized tasks. Dashboard manages identity and access, visualization, service monitoring, alert notifications, APIs, and configuration.

- [Product overview: capabilities, audience, and FAQs](/en_US/guide/overview.html)
- [Architecture and data flow: Dashboard, Agent, storage, and connections](/en_US/guide/architecture.html)
- [Version and compatibility: V2, component releases, and `/api/v1`](/en_US/guide/version-compatibility.html)
- [Security and privacy: production checklist](/en_US/guide/security.html)

## Typical use cases

| Scenario | Nezha V2 entry point |
| --- | --- |
| Multi-region VPS and cloud servers | Central online state, resources, traffic, groups, alerts, and authorized remote operations |
| Website and port availability | HTTP, Ping, TCP, latency, packet loss, HTTPS certificate state, and failure notifications |
| Home labs, NAS devices, and small teams | Self-hosted Dashboard, users, public or authenticated status views, tasks, and file operations |
| Internal automation and AI tools | Scoped API Tokens, REST API, and an MCP endpoint that is disabled by default |

If your primary goal is a public status page, second-by-second deep observability, the PromQL ecosystem, or enterprise network-device management, read the [comparison with Uptime Kuma, Netdata, Prometheus/Grafana, and Zabbix](/en_US/guide/comparison.html).

## Start in five steps

1. Read [Architecture and data flow](/en_US/guide/architecture.html) and prepare domains, ports, TLS, and backup storage.
2. [Install Dashboard](/en_US/guide/dashboard.html) and replace the default password immediately.
3. [Install Agent](/en_US/guide/agent.html), then confirm the first server stays online and reports continuously.
4. Configure [service monitoring](/en_US/guide/services.html) and [notifications](/en_US/guide/notifications.html).
5. Complete the [security and privacy checklist](/en_US/guide/security.html) before adding more users, APIs, or remote operations.

## Official resources

- [Dashboard source and releases](https://github.com/nezhahq/nezha)
- [Agent source and releases](https://github.com/nezhahq/agent)
- [Documentation source and issues](https://github.com/nezhahq/nezhahq.github.io)
- [Telegram English community](https://t.me/nezhamonitoring_global)
- [Telegram Chinese announcement channel](https://t.me/nezhanews)

## Frequently asked questions

### Which operating systems can Nezha Monitoring V2 monitor?

Official installation and documentation cover Linux, Windows, and macOS, with additional guidance for OpenWRT, Synology, and other environments. Available metrics depend on the operating system, permissions, hardware, and Agent configuration.

### Must Dashboard and Agent use the same version?

They are released independently and do not require identical version numbers. Read both release notes and validate on a small set of nodes before a broad upgrade. See [Version and compatibility](/en_US/guide/version-compatibility.html).

### Can Nezha V2 monitor websites and SSL certificates?

Yes. HTTP GET service monitoring checks URL availability, and HTTPS targets are also checked for certificate state. Ping and TCPing cover network reachability and ports.

### Must data be uploaded to a third-party cloud?

No. Dashboard and Agent can be self-hosted. Requests go to an external service only when you enable an integration such as OAuth2, notifications, DDNS, or a CDN.

### Why do current API routes still use `/api/v1`?

API route version and product generation are separate. The current product is V2 while the implemented REST API continues to use `/api/v1`. Do not change routes to `/api/v2` unless official code introduces them.
