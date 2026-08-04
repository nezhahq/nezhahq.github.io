---
title: Nezha Monitoring V2 security and privacy guide
description: Production security checklist for Nezha Monitoring V2 covering TLS, reverse proxies, real IP, accounts, OAuth2, connection secrets, API Tokens, Agent privileges, remote operations, notifications, backups, and updates.
outline: deep
---

# Nezha Monitoring V2 security and privacy guide

Nezha Monitoring V2 can read server state and perform authorized operations, so Dashboard and Agent should be managed as privileged infrastructure components. This page describes trust boundaries and hardening checks. It does not claim that any configuration automatically meets a compliance standard or replace your organization's risk assessment.

## Start with the trust boundaries

| Boundary | Data or capability involved | Primary controls |
| --- | --- | --- |
| Browser → Dashboard | Public status, login credentials, management and operations requests | HTTPS, strong passwords, user roles, WAF, access control |
| Agent → Dashboard | Host information, IP addresses, resource state, check and task results | Connection secret, TLS, trusted endpoint, Agent updates |
| Dashboard → Agent | Terminal, file, task, update, NAT, and related operations | User permissions, PAT scopes, Agent disable settings, auditing and least privilege |
| Dashboard → external service | OAuth2 identity, notification content, DNS updates | Provider credentials, templates, callback Host, least-privilege API key |
| Dashboard local storage | Users, configuration, secrets, monitoring data, metric history | File permissions, disk and backup encryption, host isolation, restore tests |

## Do these immediately after installation

1. Replace the default Dashboard `admin` password.
2. Configure HTTPS for public endpoints. If TLS terminates at a reverse proxy, protect the proxy-to-Dashboard network path.
3. Restrict the Dashboard management surface to users who need to view or administer it.
4. Configure backups and test restoration instead of merely checking that backup files exist.
5. Update to supported stable Dashboard and Agent releases.

## TLS, domains, and reverse proxies

- Use TLS when browsers or Agents connect over a public network so credentials and monitoring data are not sent in clear text.
- A reverse proxy must forward normal HTTP, WebSocket, and gRPC correctly. An incomplete configuration can leave the web UI working while Agent or terminal traffic fails.
- Set `dashboard_host` to the stable public web Host and use `install_host` for the Agent endpoint. Do not conflate them when the endpoints differ.
- Add every public endpoint to `reserved_hosts` so a normal member cannot create a NAT domain that conflicts with Dashboard.
- Register OAuth2 callback URLs that match trusted Dashboard Hosts. Do not construct callbacks from an untrusted request Host.

See [Dashboard configuration](/en_US/configuration/dashboard.html) and [Dashboard reverse proxy](/en_US/guide/q3.html).

## Real IP and the built-in WAF

Trust `web_real_ip_header` or `agent_real_ip_header` only when a reverse proxy always covers Dashboard and overwrites that header. A client that can bypass the proxy and reach Dashboard directly may be able to forge it.

- Restrict the Dashboard origin port to trusted proxies or private networks.
- Use the exact header written by the deployed proxy; do not copy a CDN example blindly.
- Changing `web_real_ip_header` affects how the WAF identifies visitors. A bad value can collapse all users into one IP or trust forged addresses.
- Follow [Real IP request header](/en_US/guide/q12.html) for recovery and verification.

## Accounts, OAuth2, and sessions

- Give every operator an individual account; do not share an administrator password.
- Grant administrator access only to users who manage system settings, users, or WAF controls.
- OAuth2 is a binding method for local accounts. It does not remove the security responsibility for local accounts or callbacks.
- In production, prefer injecting the JWT signing secret through `NZ_JWTSECRETKEY` instead of storing it in YAML. Rotating the secret can invalidate active sessions.
- Enable `force_auth` when a public status view is not required, and also review the guest visibility of each server and service.

## Agent connection secrets

Treat connection secrets as passwords:

- Never paste an installation command containing `NZ_CLIENT_SECRET` into a public issue, chat, or log.
- Do not share one secret across unrelated users or environments.
- If exposure is suspected, replace the affected credential and redeploy the corresponding Agents.
- Give every Agent a unique UUID; regenerate it when copying configuration to avoid identity conflicts.
- Use `insecure_tls` only in a deliberately controlled temporary environment. Do not use it to bypass certificate validation on the public internet.

## API Tokens and MCP

API Tokens (PATs) are intended for scripts and automation and use `Authorization: Bearer ...`. When creating a Token:

- Grant only the scopes required by the task; do not default to `nezha:*`.
- Set an expiration and a rotation process.
- Keep it in a secret manager or protected environment variable, not a public repository or client-side page.
- Separate automation accounts from daily administrator accounts so access can be revoked and impact traced independently.

MCP is disabled by default and accepts PATs only. Once enabled, the tools available to a model or automation client are controlled by Token scope; file transfer also creates temporary streams. Read [API Tokens and MCP](/en_US/guide/api.html#mcp-access) before setting `enable_mcp`.

## Remote terminal, files, tasks, and NAT

These features can execute commands, read or write files, establish connections, or change DNS and forwarding state on an Agent host:

- Set `disable_command_execute: true` on Agents that do not need remote commands.
- Set `disable_force_update: true` when Dashboard must not force an Agent update, and take responsibility for security updates separately.
- Set `disable_nat: true` when NAT is not used.
- Restrict server execution, file, delete, and write access with user roles and PAT scopes.
- Close unused terminal and file sessions to release IOStream quota and reduce exposure time.
- Treat Dashboard administrator access as a privileged role that can affect all connected Agents.

## Notifications, DDNS, and provider credentials

- Notification bodies may include server names, IP addresses, resource state, or custom template data. Review the template and recipients before sending data to a third party.
- `enable_plain_ip_in_notification` is disabled by default. Send full IP addresses only when required.
- Notification and DDNS credentials are redacted in list responses, but edit behavior is documented on the relevant page. Redaction does not mean credentials are absent from disk or backups.
- Give DNS provider Tokens access only to the required zone or records instead of using an account-wide key.
- Before deleting a notification or DDNS provider, confirm that no rule still depends on it.

## Data, logs, and backups

- Restrict filesystem access to the Dashboard data directory, configuration, SQLite, and TSDB.
- Backups can contain accounts, secrets, IP addresses, server names, and history. Encrypt them and limit readers.
- Stop Dashboard before migration or a consistency-sensitive backup; after restoration, verify users, Agents, services, notifications, and history.
- Debug logs can contain internal paths, error context, or request information. Enable `debug` only while troubleshooting and protect or remove collected logs afterward.
- Configure an appropriate TSDB retention and free-space threshold. Longer retention increases both storage responsibility and the data exposure window.

## Updates and supply chain

- Obtain software only from [Dashboard Releases](https://github.com/nezhahq/nezha/releases), [Agent Releases](https://github.com/nezhahq/agent/releases), or sources referenced by the official installer.
- Read both repositories' notes and create a backup before upgrading; validate on a small number of nodes first.
- Do not run an untrusted theme, community script, or modified Agent. Community projects are outside official compatibility guarantees.
- If automatic or forced Agent updates are disabled, maintain your own version inventory and remediation timeline.

## Minimal monitoring-only deployment

If you need monitoring but no remote operations, begin with a reduced capability set:

1. Expose Dashboard only through HTTPS or a private network.
2. Enable `force_auth` and create only necessary users.
3. Disable command execution, forced updates, and NAT on Agents.
4. Keep MCP disabled and do not create broad-scope PATs.
5. Configure only required notifications and service checks.
6. Maintain an encrypted offline or off-site backup and run restoration drills.

For connection-specific diagnosis, continue with [Architecture and data flow](/en_US/guide/architecture.html), [Dashboard troubleshooting](/en_US/guide/dashboardq.html), and [Agent troubleshooting](/en_US/guide/agentq.html).
