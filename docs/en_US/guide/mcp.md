---
outline: deep
---

# MCP Guide

The Dashboard includes an MCP (Model Context Protocol) HTTP endpoint for automation clients and LLM tool clients. Clients can list servers, read server details, run one-shot commands, read and write files, and mint temporary upload/download URLs for larger files.

MCP is disabled by default. Enable it in the Dashboard configuration file or admin settings before use:

```yaml
enable_mcp: true
```

After enabling it, the endpoint is:

```http
POST /mcp
Authorization: Bearer nzp_xxxxxxxxxxxxxxxxxxxx
Content-Type: application/json
```

`/mcp` only accepts API Tokens. It does not accept browser-login JWT. To create an `nzp_` token, choose scopes, and set a server allowlist, read [API Interface: API Token (PAT)](/en_US/guide/api.html#api-token-pat) first.

---

## Protocol Behavior

The current implementation supports MCP Streamable HTTP request/response over POST. It does not provide a standalone SSE session:

- `POST /mcp`: JSON-RPC request endpoint.
- `GET /mcp`: returns `405 Method Not Allowed`.
- `DELETE /mcp`: returns `405 Method Not Allowed`.

Supported JSON-RPC methods:

| Method | Description |
| --- | --- |
| `initialize` | Initializes the MCP session and returns protocol version, capabilities, and server info. |
| `notifications/initialized` | Initialization-complete notification; without an `id`, it returns `202 Accepted`. |
| `ping` | Heartbeat; with an `id`, it returns an empty result. |
| `tools/list` | Lists tools, including each tool's `inputSchema` and `outputSchema`. |
| `tools/call` | Calls a specific tool. |

The request body limit is 8 MiB. Each token is rate limited to about 10 requests per second and 120 requests per minute by default. When the limit is exceeded, regular JSON-RPC methods return 429; `tools/call` returns an MCP tool error with `isError: true`.

On successful `tools/call`, structured data is returned in `structuredContent`, and the same result is also provided as JSON text in `content[0].text`. On tool failure, the response only includes `isError: true` and text error content, without the success-result schema, so strict MCP clients do not validate an error object as if it were a success result.

---

## Client Configuration Example

Different MCP clients use different configuration field names. For clients that support a Streamable HTTP URL and custom headers, use this shape:

```json
{
  "mcpServers": {
    "nezha": {
      "url": "https://nezha.example.com/mcp",
      "headers": {
        "Authorization": "Bearer nzp_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

If your client requires an explicit transport, use HTTP or streamable-http according to that client's documentation. Do not use browser-login JWT, cookies, or OAuth browser sessions for `/mcp`.

---

## Simple Use Cases

These examples describe common user-facing workflows. In most MCP clients, you do not need to write JSON-RPC by hand; ask the client to perform the task and let it call the matching tools.

### Check Which Servers Are Online

You can ask your MCP client: "List the online servers and show the status of one server." The client will usually call `server.list` to find visible servers, then call `server.get` for the target server's status, system information, and GeoIP snapshot. The token needs at least `nezha:inventory:read` and `nezha:server:read`.

### Run a One-Off Inspection Command

You can ask the client to run a non-interactive inspection command on a selected server, such as checking disk usage, load, or service status. The tool is `server.exec`, and it requires `nezha:server:exec`. For these tokens, set a server ID allowlist so the token can only operate on explicitly approved servers.

### Read Logs or Config Files

When you want AI help with nginx, Caddy, or application logs, use `fs.list` to browse directories and `fs.read` to read a small log section or config file. The token needs `nezha:server:read`. For large logs, read ranges instead of returning the whole file at once.

### Update a Small Config File

To change a small config snippet, write a temporary script, or generate a diagnostic file, use `fs.write`; if your client is better at uploading a local file first, use `fs.upload_url`. These operations require `nezha:server:write`. Use `if_match_sha256` to avoid overwriting a file that someone else changed, and set a server ID allowlist for the token.

### Transfer Larger Files

For log bundles, backup snippets, or build artifacts, do not put file bytes into the JSON-RPC body. Use `fs.download_url` or `fs.upload_url` to mint a one-time HTTP URL, then transfer the file with a regular HTTP client. Each file is capped at 100 MiB, each URL can be used only once, and URLs are invalidated when they expire, the token is revoked, or MCP is disabled.

---

## Tools and Permissions

MCP tools are limited by three layers:

1. The API Token must be valid and unexpired.
2. The API Token must contain the tool's required scope.
3. The target server must be in the token's server ID allowlist, and the owner user must have permission for that server.

Registered tools:

| Tool | Required scope | Purpose |
| --- | --- | --- |
| `meta.whoami` | Any valid API Token | Returns current user ID, admin status, token ID, token name, scopes, and server allowlist. |
| `server.list` | `nezha:inventory:read` | Lists minimal metadata for servers visible to the token. |
| `server.get` | `nezha:server:read` | Reads Host/State/GeoIP snapshot for one server. |
| `server.exec` | `nezha:server:exec` | Runs a non-interactive one-shot command on the target server. |
| `fs.list` | `nezha:server:read` | Lists a directory. |
| `fs.read` | `nezha:server:read` | Reads file content, suitable for small files or ranged reads. |
| `fs.write` | `nezha:server:write` | Atomically writes a file. |
| `fs.delete` | `nezha:server:delete` | Deletes a file or directory. |
| `fs.download_url` | `nezha:server:read` | Mints a one-time HTTP download URL for files up to 100 MiB. |
| `fs.upload_url` | `nezha:server:write` | Mints a one-time HTTP upload URL for files up to 100 MiB. |

Tools that call the Agent require the target Agent version to be at least `v2.1.0`. Agents reporting either `2.1.0` or `v2.1.0` are accepted; older versions return an unsupported-MCP tool error.

---

## Call Examples

### Initialize

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {},
    "clientInfo": {
      "name": "my-client",
      "version": "1.0.0"
    }
  }
}
```

### Inspect the Current Token

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "meta.whoami",
    "arguments": {}
  }
}
```

### List Online Servers

Requires `nezha:inventory:read`:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "server.list",
    "arguments": {
      "online_only": true
    }
  }
}
```

### Read Server Details

Requires `nezha:server:read`:

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "server.get",
    "arguments": {
      "server_id": 1
    }
  }
}
```

### Run a Command

Requires `nezha:server:exec`:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "server.exec",
    "arguments": {
      "server_id": 1,
      "cmd": "uname",
      "args": ["-a"],
      "timeout_seconds": 30,
      "max_output_bytes": 65536
    }
  }
}
```

`server.exec` is a non-interactive one-shot command:

- It does not allocate a PTY.
- The default timeout is 30 seconds.
- `timeout_seconds` is capped at 300 seconds.
- stdout/stderr default to about 64 KiB each, and can be adjusted with `max_output_bytes`, subject to the Agent hard limit.
- For shell features such as pipes, redirection, or variable expansion, explicitly call a shell:

```json
{
  "server_id": 1,
  "cmd": "sh",
  "args": ["-c", "df -h | grep /data"],
  "timeout_seconds": 30
}
```

### List a Directory

Requires `nezha:server:read`:

```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "tools/call",
  "params": {
    "name": "fs.list",
    "arguments": {
      "server_id": 1,
      "path": "/var/log",
      "show_hidden": false
    }
  }
}
```

### Read a File

Requires `nezha:server:read`:

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "fs.read",
    "arguments": {
      "server_id": 1,
      "path": "/etc/hostname",
      "offset": 0,
      "length": 4096,
      "encoding": "utf8"
    }
  }
}
```

`fs.read` is intended for small files or ranged reads. It returns up to about 1 MiB by default. `encoding` can be `utf8` or `base64`.

### Write a File

Requires `nezha:server:write`:

```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "method": "tools/call",
  "params": {
    "name": "fs.write",
    "arguments": {
      "server_id": 1,
      "path": "/tmp/nezha-note.txt",
      "content": "hello from nezha mcp\n",
      "encoding": "utf8",
      "mode": "0644",
      "create_dirs": true
    }
  }
}
```

Use `if_match_sha256` as an optimistic lock to avoid overwriting a file that changed.

### Delete a File or Directory

Requires `nezha:server:delete`:

```json
{
  "jsonrpc": "2.0",
  "id": 9,
  "method": "tools/call",
  "params": {
    "name": "fs.delete",
    "arguments": {
      "server_id": 1,
      "path": "/tmp/nezha-note.txt",
      "recursive": false
    }
  }
}
```

Set `recursive: true` when deleting a non-empty directory.

---

## Large File Upload and Download

`fs.download_url` and `fs.upload_url` first mint a one-time temporary URL through MCP, then transfer the file through a regular HTTP client. File bytes do not go into the MCP JSON-RPC body, so these tools are better for larger files.

Limits and behavior:

- The default URL TTL is 300 seconds.
- The default TTL is 300 seconds. The tool schema recommends `ttl_seconds` from 30 to 600 seconds, and the server caps values above 600 to 600.
- Each URL can be used only once and is invalidated immediately after use.
- Each file is capped at 100 MiB.
- Each transfer is capped at 10 minutes.
- Temporary URL usage revalidates `enable_mcp`, token, scope, server allowlist, and user server permission.
- If the token is revoked or an administrator disables `enable_mcp`, unused URLs and in-flight transfers are revoked.

### Download URL

Requires `nezha:server:read`:

```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "method": "tools/call",
  "params": {
    "name": "fs.download_url",
    "arguments": {
      "server_id": 1,
      "path": "/var/log/syslog",
      "ttl_seconds": 300
    }
  }
}
```

The result contains:

```json
{
  "url": "https://nezha.example.com/mcp/download/<token>",
  "method": "GET",
  "expires_at": "2026-05-31T19:30:00+02:00"
}
```

Then download that URL with a regular HTTP GET client.

### Upload URL

Requires `nezha:server:write`:

```json
{
  "jsonrpc": "2.0",
  "id": 11,
  "method": "tools/call",
  "params": {
    "name": "fs.upload_url",
    "arguments": {
      "server_id": 1,
      "path": "/tmp/upload.bin",
      "ttl_seconds": 300,
      "mode": "0644",
      "create_dirs": true,
      "if_match_sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    }
  }
}
```

The result's `method` is `POST`. Upload requests must send `Content-Length`:

```shell
curl -X POST --data-binary @upload.bin \
  -H "Content-Length: $(wc -c < upload.bin)" \
  "https://nezha.example.com/mcp/upload/<token>"
```

For end-to-end integrity checking, append `?sha256=<64 hex chars>` to the upload URL. The Agent checks the actual content hash after receiving the file.

---

## Security Tips

- Create a dedicated token for MCP instead of reusing a general REST automation token.
- Set a server ID allowlist for MCP tokens, especially tokens with `server.exec` or `server.write`.
- Grant only the scopes needed. Do not grant write when read is enough, and do not grant `exec` when write is enough.
- Revoke tokens when they are no longer needed.
- Disabling `enable_mcp` immediately blocks new `/mcp` requests and revokes MCP temporary URLs, transfer streams, and in-flight MCP RPC calls.

---

## Related Pages

- [API Interface: API Token (PAT)](/en_US/guide/api.html#api-token-pat)
- [API Interface](/en_US/guide/api.html)
- [Dashboard configuration: enable_mcp](/en_US/configuration/dashboard.html#enable-mcp)
