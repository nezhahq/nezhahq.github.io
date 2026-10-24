---
description: Practical Nezha Monitoring V2 recipes for HTTPS proxies, built-in TLS, lightweight Agents, restricted operations, online history, and TSDB, with verification and rollback.
outline: deep
---

# Configuration recipes and verification

These are **fragments to merge into existing files**, not complete replacements for production configuration. Identify the [active configuration sources](/en_US/configuration/environment.html), preserve secrets and UUIDs, and replace example domains.

## HTTPS reverse proxy

Assume the proxy and Dashboard run on the same host, exposed as `https://monitor.example.com`:

```yaml
listen_host: "127.0.0.1"
listen_port: 8008
install_host: "monitor.example.com:443"
dashboard_host: "monitor.example.com"
reserved_hosts: "monitor.example.com"
tls: true
web_real_ip_header: "X-Real-IP"
agent_real_ip_header: "X-Real-IP"
```

Matching Agent fragment:

```yaml
server: "monitor.example.com:443"
tls: true
insecure_tls: false
report_delay: 3
```

The proxy must forward HTTP/WebSocket and gRPC over HTTP/2, set trustworthy real-IP headers, and prevent bypass access to the backend. See the complete [reverse-proxy guide](/en_US/guide/q3.html). A working homepage alone is not sufficient verification.

Inside Docker, `127.0.0.1` is the container's own loopback. For published ports, bind Dashboard to a reachable container address and restrict publication on the host, for example `127.0.0.1:8008:8008`. A separate proxy container should use their shared container network. Do not copy the bare-metal bind address unchanged.

**Verify:** user and `/dashboard/` pages load; WebSocket returns `101` and streams updates; Agents remain online; reported client IPs are correct. **Rollback:** restore the original files and proxy configuration and restart the relevant services. Do not hide certificate errors by disabling verification.

## Dashboard built-in HTTPS

```yaml
listen_host: "0.0.0.0"
listen_port: 8008
https:
  listen_port: 8443
  tls_cert_path: "/etc/nezha/tls/fullchain.pem"
  tls_key_path: "/etc/nezha/tls/privkey.pem"
install_host: "monitor.example.com:8443"
dashboard_host: "monitor.example.com:8443"
reserved_hosts: "monitor.example.com"
tls: true
```

Certificate and key paths must be readable inside the process/container, and the certificate must match the hostname. Built-in HTTPS **adds** a listener; it does not disable the HTTP `listen_port`. Restrict plaintext access through firewall or container publication rules. `https.insecure_tls` is not a switch that makes clients trust self-signed certificates.

**Verify:** access the selected HTTPS port, validate the certificate chain, and connect a test Agent with the matching address and `insecure_tls: false`. Logs should reflect the actual listeners.

## Lightweight collection and explicit interfaces

```yaml
report_delay: 4
ip_report_period: 1800
skip_connection_count: true
skip_procs_count: true
gpu: false
temperature: false
nic_allowlist:
  eth0: true
hard_drive_partition_allowlist:
  - "/"
```

Replace `eth0` and mount paths with actual names. A nonempty NIC map is an allowlist, not merely a list of interfaces to exclude when false. Unlisted interfaces are excluded too. An empty map uses built-in filtering rather than unconditionally counting every virtual interface. See [custom collection](/en_US/guide/q7.html) for partition selection.

**Verify:** compare host load, speed, and capacity against system tools. Check for omitted primary interfaces and double-counted container bridges. Less frequent reporting reduces chart detail and can affect observation of short anomalies.

## Metrics-only, without remote operations

```yaml
disable_command_execute: true
disable_nat: true
disable_send_query: true
disable_auto_update: true
disable_force_update: true
```

This profile suits nodes with manually maintained binaries and host-metrics-only requirements. It restricts commands, terminal/file operations, remote configuration, NAT, and TCP/ICMP/HTTP probes. It also blocks legitimate service monitoring and MCP remediation, so it is not a universal recommended default.

**Verify:** host metrics continue updating while restricted tasks are rejected. **Rollback:** edit locally and restart. Once commands are disabled, do not depend on Dashboard to re-enable them remotely.

## Online history and time-series storage

```yaml
online_stats_days: 30
tsdb:
  data_path: "data/tsdb"
  retention_days: 30
  min_free_disk_space_gb: 1
  max_memory_mb: 256
  write_buffer_size: 512
  write_buffer_flush_interval: 5
memory:
  go_mem_limit_mb: 768
```

Adjust memory budgets for hardware and fleet size; the example is not a capacity guarantee. `go_mem_limit_mb` is a Go runtime soft limit, not a process/container hard cap. TSDB cache memory is not the entire process footprint.

First-time TSDB enablement drops the old `service_histories` table without migrating its history. Back up first. Online sessions remain database-backed and do not depend on TSDB. Relative `data_path` uses the working directory; persist that location inside containers.

**Verify:** logs show `TSDB initialized successfully`, settings return `tsdb_enabled: true`, newly collected historical metrics can be queried, and disk space is sufficient. Public online-history limits still apply: retaining 30 days does not let guests query all 30 days.

**Rollback:** stop the process and restore configuration and backups. Clearing `data_path` alone does not restore deleted legacy history. See the [TSDB guide](/en_US/guide/q15.html).

## Symptom lookup

| Symptom | Check first |
| --- | --- |
| Homepage works, Agent offline | gRPC/HTTP2 forwarding, Agent address/TLS, user connection secret |
| Page loads without live updates | WebSocket upgrade and proxy headers, not the reporting interval first |
| Settings disappear after container recreation | Persistent mounts for configuration, database, and TSDB |
| Remote configuration accepted but unchanged | Application delay, persistence errors, startup-only consumers, environment overrides |
| Virtual interface missing | Default filtering and `nic_allowlist`, not Dashboard charts first |
| Old history absent after TSDB enablement | No automatic legacy-table migration; verify new data, actual path, and disk state |
