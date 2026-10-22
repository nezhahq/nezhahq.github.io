---
title: Nezha MCP — AI-Powered Server Management and Operations
description: Connect Codex, OpenClaw, and Claude Code to Nezha MCP for natural-language fleet inspections, incident diagnosis, authorized commands, file management, and verified changes, with practical workflows and setup guidance.
outline: deep
keywords:
  - Nezha MCP
  - AI operations
  - AI server management
  - Codex
  - OpenClaw
  - Claude Code
  - Model Context Protocol
faq:
  - question: What is Nezha MCP?
    answer: Nezha MCP is a standard tool interface connecting AI assistants to servers. It provides server inventory, current state, remote commands, and file operations. AI interprets your goal; Nezha supplies the operational tools.
  - question: Can I use it with Codex, OpenClaw, and Claude Code?
    answer: Clients supporting HTTP MCP and Bearer tokens can connect. Codex and Claude Code support remote MCP. OpenClaw needs an MCP client available to its current runtime or mcporter.
  - question: Does Nezha include an AI model or chatbot?
    answer: No model is bundled. Nezha supplies monitoring and operations tools; your chosen AI client provides the model, conversation, reasoning, and workflow orchestration.
  - question: Can MCP configure alerts, query historical metrics, or manage every Dashboard setting?
    answer: MCP provides server state, command, and file tools. Alert and task configuration, historical metrics, and other Dashboard settings require the Nezha admin UI or REST API.
  - question: Can I automate incident response?
    answer: You can build workflows for diagnosis, authorized remediation, and verification. The client or external workflow provides scheduling, alert reception, and action confirmation. Nezha trigger tasks can execute reviewed scripts.
  - question: Can data still reach an AI provider when Nezha is self-hosted?
    answer: Dashboard and server Agents can be self-hosted. With an external model, the client may send prompts, tool results, logs, or file contents to the model provider. Data handling depends on model deployment and the client's policies.
---

<script setup>
import McpFeature from '../../.vitepress/theme/components/McpFeature.vue'
</script>

<McpFeature locale="en" />

## Turn monitoring data into action

**Nezha MCP connects your AI assistant to servers you already monitor: check status, read logs, run commands, manage files, and verify the results.** Describe your goal in natural language. AI organizes the steps; Nezha supplies the tools to work on your servers.

MCP (Model Context Protocol) is a standard for connecting AI to external tools. Reuse your existing Nezha connections without installing a model on every server. Your chosen AI client supplies the model and conversation.

### Less switching between tools

- **Inspect multiple servers together.** Gather findings in one report, reducing repeated logins, copied commands, and manual summaries.
- **Move from finding issues to handling them.** Go beyond explaining a metric: inspect relevant logs, run diagnostics, and carry out operations you authorize.
- **Check again after a change.** Compare configurations and service state before and after, so a successful command is backed by a service check.
- **Use your familiar AI tools.** Bring server management into Codex, OpenClaw, or Claude Code. You control which servers and operations they can access.

## Four practical ways to start {#scenarios}

The first two scenarios draw on real fleet inspections and memory-alert investigations. The other two show workflows you can build.

### 1. Fleet inspection: find the servers that need attention

> “Check disk space and software runtimes on all authorized servers. List issues that need attention and unreachable hosts separately. Do not change anything.”

AI retrieves your server inventory, checks current state, runs inspection commands, and prepares a per-server report. Before security updates, it can also distinguish host software from container workloads to help establish what needs inspection and updating.

**What you get:** Which servers need attention, the supporting findings, and what remains unknown. Offline or unchecked items stay separate from healthy ones.

### 2. Incident diagnosis: work out what to do about a memory alert

> “Why does this server keep triggering memory alerts? Inspect processes and relevant logs, and suggest a response. Do not stop services yet.”

AI examines current state, processes, and system logs to investigate causes and propose a targeted response. The process consuming the most memory is not necessarily the one the system terminated; checking logs helps avoid conclusions based on a single metric.

**What you get:** Likely causes, supporting findings, and a response plan to review. For recurring response, a reviewed script can run through a Nezha alert-triggered task; alerts and tasks are configured through the admin UI or REST API.

### 3. Configuration changes: make sure the service works afterward

> “Review this configuration change. Preserve the original and the diff, apply the approved update, then check syntax and service availability.”

AI reads the configuration, prepares a diff, uses file tools to check for conflicting writes, and runs service-specific validation and reload commands. Your workflow needs to arrange backups, approval, and recovery steps.

**What you get:** A record of what changed, which checks passed, and whether the service recovered—not just a message saying the command ran.

### 4. Routine automation: get inspection results in chat

> “Summarize server health daily. When an alert arrives, investigate first, act only within the pre-approved scope, and report the result.”

Connect Nezha MCP to a configured assistant schedule or alert-notification workflow. AI can then gather current state, investigate issues, and deliver a summary when needed. The assistant or external workflow provides scheduling, alert reception, and messaging.

**What you get:** Routine inspection summaries and incident responses informed by current conditions. You define the scope of automated action; enabling MCP does not hand over autonomous control by default.

## Choose your familiar AI tool

- **Codex:** Inspect the running server environment and verify changes while working on code, configuration, or deployment issues.
- **Claude Code:** Combine log inspection, diagnostic commands, and file changes in a step-by-step troubleshooting conversation.
- **OpenClaw:** Start inspections from chat, then combine configured schedules and messaging channels for routine operations.

Use a client that supports HTTP MCP and Bearer tokens. OpenClaw needs an MCP client available to its current runtime or mcporter. See [Connect AI clients](/en_US/guide/mcp.html#connect-clients) for setup.

## Get started with one status check

**New to Nezha?** [Install Dashboard](/en_US/guide/dashboard.html) and an [Agent](/en_US/guide/agent.html) to bring your server online. If your servers are already connected:

1. **Enable access:** Enable MCP in Nezha and create a dedicated personal access token (PAT), limiting access to the servers and tools you need.
2. **Connect your assistant:** Follow the [setup guide](/en_US/guide/mcp.html#connect-clients) and confirm it can read the authorized server list.
3. **Try a read-only query:** Send the request below and check the returned servers and state. Add command execution and file-write access later as needed.

> “List the servers I can view and summarize their online status and disk usage. Do not run commands or change files. List any unknown states separately.”

::: tip Start with queries, then add automation
MCP is disabled by default. Commands run with the permissions of the Nezha Agent on the server; execution access is not read-only access. Arrange client-side confirmation for operations that stop services, delete data, or change configuration. See [permissions and security](/en_US/guide/mcp.html) and [data privacy](/en_US/guide/security.html).
:::

## Frequently asked questions {#faq}

### What is Nezha MCP?

Nezha MCP is a standard tool interface connecting AI assistants to servers. It provides server inventory, current state, remote commands, and file operations. AI interprets your goal; Nezha supplies the operational tools.

### Can I use it with Codex, OpenClaw, and Claude Code?

Clients supporting HTTP MCP and Bearer tokens can connect. Codex and Claude Code support remote MCP. OpenClaw needs an MCP client available to its current runtime or mcporter.

### Does Nezha include an AI model or chatbot?

No model is bundled. Nezha supplies monitoring and operations tools; your chosen AI client provides the model, conversation, reasoning, and workflow orchestration.

### Can MCP configure alerts, query historical metrics, or manage every Dashboard setting?

MCP provides server state, command, and file tools. Alert and task configuration, historical metrics, and other Dashboard settings require the Nezha admin UI or REST API.

### Can I automate incident response?

You can build workflows for diagnosis, authorized remediation, and verification. The client or external workflow provides scheduling, alert reception, and action confirmation. Nezha trigger tasks can execute reviewed scripts.

### Can data still reach an AI provider when Nezha is self-hosted?

Dashboard and server Agents can be self-hosted. With an external model, the client may send prompts, tool results, logs, or file contents to the model provider. Data handling depends on model deployment and the client's policies.
