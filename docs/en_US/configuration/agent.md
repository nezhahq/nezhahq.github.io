---
description: Nezha Monitoring V2 Agent YAML reference for Dashboard endpoint, connection secret, TLS, reporting, system metrics, custom IP API, updates, and command or NAT disable settings.
outline: deep
---

# Agent Configuration

The Agent configuration file is in YAML format.

In the admin frontend, you can modify the Agent's configuration and apply it directly; you can also batch apply options through the API, see the [API documentation](/en_US/developer/api.html) for details.

---

## File and effective values

Agent defaults to `config.yml` beside its executable; `-c` selects another path. Environment naming and precedence differ from Dashboard: read [loading rules](/en_US/configuration/environment.html). Defaults below describe missing values; required identity fields are explained individually.

## Options

- ##### **`client_secret`**

  - Type: `string`; default: required, no usable default.

  - The client secret used for secure communication with the Dashboard.
  - Connection secrets are bound to users. The current frontend does not provide a separate “copy connection secret” button; normally, use the installation command generated on the server page, or extract `NZ_CLIENT_SECRET` from that command.
  - If an administrator needs to configure an Agent for another user manually, read that user's `agent_secret` through the management API. Do not use the global `agent_secret_key` from the Dashboard configuration file for user-owned servers.
  - If this value is wrong, the Agent cannot authenticate with the Dashboard.

- ##### **`debug`**

  - Type: `bool`; default: `false`.

  - When set to `true`, enables logging.

- ##### **`disable_auto_update`**

  - Type: `bool`; default: `false`.

  - When set to `true`, disables the automatic update feature, enhancing system stability and security.

- ##### **`disable_command_execute`**

  - Type: `bool`; default: `false`.

  - When set to `true`, rejects command, terminal, file-management, MCP file/command operations, and remote configuration read/apply. Recover locally.

- ##### **`disable_force_update`**

  - Type: `bool`; default: `false`.

  - When set to `true`, rejects Dashboard-requested upgrades without disabling periodic checks. Also set `disable_auto_update: true` for manual-only maintenance.

- ##### **`disable_nat`**

  - Type: `bool`; default: `false`.

  - When set to `true`, rejects **NAT** tasks.

- ##### **`disable_send_query`**

  - Type: `bool`; default: `false`.

  - When set to `true`, rejects **TCPing**, **ICMP Ping**, and **HTTP GET** tasks.

- ##### **`gpu`**

  - Type: `bool`; default: `false`.

  - When set to `true`, enables GPU monitoring. Per-card memory is also reported for Linux NVIDIA GPUs; other platforms/vendors may still provide utilization only.
  - Note: Additional dependencies may be required for GPU monitoring. See the [GPU Monitoring Guide](/en_US/guide/q9.html) for details.

- ##### **`insecure_tls`**

  - Type: `bool`; default: `false`.

  - When set to `true`, disables certificate validation, suitable for scenarios using self-signed certificates.

- ##### **`ip_report_period`**

  - Type: `integer`; default: `1800`.

  - Sets the interval (in seconds) for local IP updates. The default is `1800` seconds (30 minutes).
  - Zero becomes `1800`; positive values below `30` are clamped to `30` seconds.

- ##### **`report_delay`**

  - Type: `integer`; default: `3`.

  - Sets the interval (in seconds) for system information reporting. The default is `3` seconds (valid range: 1-4 seconds).

- ##### **`server`**

  - Type: `string`; default: required, no usable default.

  - A `host:port` address without a scheme or path; IPv6 uses `[IPv6]:port`. TLS is controlled separately.

- ##### **`skip_connection_count`**

  - Type: `bool`; default: `false`.

  - When set to `true`, disables monitoring of network connection counts, suitable for servers with high connection volumes or limited resources.

- ##### **`skip_procs_count`**

  - Type: `bool`; default: `false`.

  - When set to `true`, disables monitoring of process counts to lower resource usage.

- ##### **`temperature`**

  - Type: `bool`; default: `false`.

  - When set to `true`, enables hardware temperature monitoring (only supported for specific hardware; unavailable for some VPS instances).

- ##### **`tls`**

  - Type: `bool`; default: `false`.

  - When set to `true`, enables SSL/TLS encryption for communication between the Agent and the Dashboard.
  - Enable this option if the Agent uses an SSL/TLS-enabled Nginx reverse proxy.

- ##### **`hard_drive_partition_allowlist`**

  - Type: `string[]`; default: `[]`.

  - A string array specifying the list of hard drive partitions to monitor.
  - Monitoring will only include the listed partitions.

- ##### **`nic_allowlist`**

  - Type: `map[string]bool`; default: `{}`.

  - A `map[string]bool` type whitelist specifying the network interfaces to monitor.
  - The key is the network interface name, and the value is `true` for monitoring and `false` for exclusion.
  - Empty uses built-in filtering, excluding common loopback/tunnel/container interfaces. A nonempty map includes only entries explicitly set to `true`; unlisted interfaces are excluded too.

- ##### **`use_gitee_to_upgrade`**

  - Type: `bool`; default: `false`.

  - When set to `true`, uses the Gitee repository as the automatic update source, better suited for servers in mainland China.

- ##### **`use_atomgit_to_upgrade`**

  - Type: `bool`; default: `false`.

  - When set to `true`, uses the AtomGit repository as the automatic update source. Usually only needed when the default update source is unstable.

- ##### **`use_ipv6_country_code`**

  - Type: `bool`; default: `false`.

  - When set to `true`, forces the use of IPv6 addresses for country code queries (default uses IPv4).

- ##### **`uuid`**

  - Type: `string`; default: generated and persisted if empty.

  - The unique identifier for the current Agent, used by the Dashboard to recognize the data source.
  - To replace an existing Agent in the Dashboard, manually set this parameter.

- ##### **`dns`**

  - Type: `string[]`; default: `[]`.

  - A string array to set custom DNS server lists.
  - When specified, the Agent will prioritize these DNS servers for domain resolution.

- ##### **`custom_ip_api`**

  - Type: `string[]`; default: `[]`.

  - A string array specifying custom IP query API endpoints.
  - The Agent will use these APIs to retrieve the server's public IP information.
  - Every entry must parse as a URL and use the `http` or `https` scheme. An entry that fails this validation prevents Agent startup or causes a remote configuration update to be rejected.

- ##### **`self_update_period`**

  - Type: `integer`; default: `0`.
  - Set the update interval manually (in minutes).
  - Zero chooses a random period from 30 minutes up to, but not including, 90. Positive values specify minutes. Update enablement and interval are read at startup: restart after changes.

---

## Apply Config

After modifying the parameters in the configuration file, you need to restart the Agent service for the changes to take effect. You can use the Agent's built-in service management or restart manually.

### Built-in Service Management

You can directly enter the following command to restart the default Agent service:

```shell
./nezha-agent service restart
```

For multiple Agent service scenarios, you can specify the corresponding configuration file:

```shell
./nezha-agent service -c ./config-6sc1f.yml restart
```

### Manual

1. **Restart the Service**  
   Use the following command to restart the default Agent service:

   ```bash
   sudo systemctl restart nezha-agent.service
   ```

2. **For Multiple Agent Services**  
   If running multiple Agent services on the same server, first list all Agent services:
   ```bash
   sudo systemctl list-units --type=service | grep nezha-agent
   ```
   Then restart each Agent service using the following command:
   ```bash
   sudo systemctl restart <service-name>
   ```
   Replace `<service-name>` with the actual listed service name. Built-in service management derives names from the executable and appends a configuration-path hash for nondefault configurations; do not assume an `@2` instance.


## Validation and remote operation boundaries

- `server` uses `host:port` without a URL scheme/path; IPv6 uses `[IPv6]:port`. `tls` controls encryption separately.
- `report_delay: 0` becomes `3`; values outside `1`–`4` after normalization fail validation. `ip_report_period: 0` becomes `1800`; smaller positive values are clamped to `30`.
- A nonempty `nic_allowlist` includes only interfaces explicitly set to `true`; missing entries are excluded. Empty uses built-in filtering, excluding common loopback/tunnel/container interfaces.
- `custom_ip_api` should return plain IP text or a Cloudflare-trace-style `ip=` line, not arbitrary JSON. It discovers public IPs, not geolocation.
- `disable_command_execute` blocks commands, terminal/file operations, MCP file/command tools, and remote configuration read/apply. Recover locally.
- `disable_force_update` blocks Dashboard-requested upgrades, not periodic checks. Set `disable_auto_update` too for fully manual maintenance.
- `self_update_period: 0` chooses a random interval from 30 minutes up to, but not including, 90. Update enablement/interval and debug are startup-read settings: restart fully after changing them.
- If both mirror flags are true, Gitee takes precedence over AtomGit. With neither forced, the updater may select a mirror based on detected country, otherwise GitHub.

## Related documentation

- [Agent installation](/en_US/guide/agent.html)
- [Architecture and data flow](/en_US/guide/architecture.html)
- [Security and privacy](/en_US/guide/security.html)
- [Agent troubleshooting](/en_US/guide/agentq.html)
