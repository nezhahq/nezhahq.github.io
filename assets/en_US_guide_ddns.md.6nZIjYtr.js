import{_ as e,c as i,o as t,a4 as o}from"./chunks/framework.BmdFiWrL.js";const k=JSON.parse('{"title":"DDNS","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en_US/guide/ddns.md","filePath":"en_US/guide/ddns.md","lastUpdated":1729180996000}'),s={name:"en_US/guide/ddns.md"},a=o(`<h1 id="ddns" tabindex="-1">DDNS <a class="header-anchor" href="#ddns" aria-label="Permalink to &quot;DDNS&quot;">​</a></h1><p>The DDNS functionality is designed for servers with dynamic IP addresses. When the Agent server reports a new IP (every 10 minutes), Dashboard will automatically update the DNS record based on the configuration.</p><h3 id="why-should-i-use-nezha-s-ddns-functionality" tabindex="-1">Why should I use Nezha&#39;s DDNS functionality? <a class="header-anchor" href="#why-should-i-use-nezha-s-ddns-functionality" aria-label="Permalink to &quot;Why should I use Nezha&#39;s DDNS functionality?&quot;">​</a></h3><ul><li>Convenient centralized management of DDNS settings, instead of deploying a DDNS service on every server.</li><li>Your confidential information is only stored on the Dashboard server, preventing leaks.</li></ul><h3 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h3><p>You can directly add DDNS configurations in the Dashboard management page.</p><ol><li>Click on the &quot;Dynamic DNS&quot; option in the menu bar to enter the configuration page.</li><li>Click the &quot;New Profile&quot; button and fill in the required information in the pop-up window. Option details: <ul><li><strong>Name</strong>: The name of the configuration.</li><li><strong>DDNS Provider</strong>: The type of provider, determining the method used to update DNS records.</li><li><strong>Domains (separate with comma)</strong>: The domain(s), if you enter multiple domains, they should be separated by commas. IDNs (Internationalized Domain Names) are supported.</li><li><strong>Maximum retry attempts</strong>: The number of attempts for updating DDNS, default is 3, and the range is between 1 and 10.</li><li><strong>DDNS Credential 1</strong> and <strong>DDNS Credential 2</strong> are optional. Typically, at least one needs to be provided. The <a href="#provider-list">table</a> below lists the options for all providers.</li></ul></li><li>If using the <code>webhook</code> provider, the corresponding options need to be filled out as required. For detailed instructions, see <a href="#webhook-configuration">Webhook Configuration</a>.</li><li>You need to check at least one of <strong>IPv4 Enabled</strong> and <strong>IPv6 Enabled</strong>; otherwise, no update operations will be performed.</li><li>After adding a new configuration, you also need to modify the server settings to activate DDNS. Server-related options include: <ul><li><strong>Enable DDNS</strong>: Enable DDNS functionality for this server.</li><li><strong>DDNS Profiles</strong>: The list of DDNS configuration IDs to use, searchable by configuration name.</li></ul></li></ol><h2 id="webhook-configuration" tabindex="-1">Webhook Configuration <a class="header-anchor" href="#webhook-configuration" aria-label="Permalink to &quot;Webhook Configuration&quot;">​</a></h2><p>Webhook requires manually constructing HTTP requests, suitable for using other provider services when operations are simple.</p><p>Webhook option descriptions:</p><ul><li><strong>Webhook URL</strong>: The URL for the HTTP request, where parameters can use placeholders.</li><li><strong>Webhook Request Method</strong>: The HTTP request method. Supported methods include <code>GET</code>, <code>POST</code>, <code>PATCH</code>, <code>DELETE</code>, and <code>PUT</code>.</li><li><strong>Webhook Request Type</strong>: The format of the HTTP request body, either <code>JSON</code> or <code>Form</code>.</li><li><strong>Webhook Request Headers</strong>: HTTP request headers, filled in JSON format, but nesting is not supported.</li><li><strong>Webhook Request Body</strong>: The HTTP request body. It won&#39;t be used for <code>GET</code> and <code>DELETE</code>. If you need to use a nested format, you must choose <code>JSON</code> as the request type.</li></ul><p>Supported Webhook placeholders:</p><ul><li><code>#ip#</code>: Host IP.</li><li><code>#domain#</code>: DDNS domain. Each request is made separately for each domain, so this value will be a single domain string.</li><li><code>#type#</code>: IP type, either <code>&quot;ipv4&quot;</code> or <code>&quot;ipv6&quot;</code>.</li><li><code>#record#</code>: Record type, either <code>&quot;A&quot;</code> or <code>&quot;AAAA&quot;</code>.</li><li><code>#access_id#</code>: DDNS Credential 1.</li><li><code>#access_secret#</code>: DDNS Credential 2.</li></ul><h3 id="oray-webhook-example" tabindex="-1">Oray Webhook Example <a class="header-anchor" href="#oray-webhook-example" aria-label="Permalink to &quot;Oray Webhook Example&quot;">​</a></h3><details><summary>Click to expand/collapse</summary><ul><li>URL：<code>http://ddns.oray.com/ph/update?hostname=#domain#&amp;myip=#ip#</code></li><li>Request Method: <code>GET</code></li><li>Request Header：<code>{&quot;Authorization&quot;: &quot;Basic pass&quot;}</code>, replace <code>pass</code> with the Base64-encoded userpass (e.g., <code>user:pass</code> becomes <code>dXNlcjpwYXNzCg==</code>).</li><li>Oray only supports A records, so only enable IPv4. Other Webhook options are not required.</li></ul></details><h2 id="provider-list" tabindex="-1">Provider List <a class="header-anchor" href="#provider-list" aria-label="Permalink to &quot;Provider List&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Provider</th><th>Credential 1 (ID)</th><th>Credential 2 (Secret)</th></tr></thead><tbody><tr><td><code>dummy</code></td><td>❌️</td><td>❌️</td></tr><tr><td><code>webhook</code></td><td>Optional</td><td>Optional</td></tr><tr><td><code>cloudflare</code></td><td>❌️</td><td>✅</td></tr><tr><td><code>tencentcloud</code></td><td>✅</td><td>✅</td></tr></tbody></table><h2 id="viewing-logs" tabindex="-1">Viewing Logs <a class="header-anchor" href="#viewing-logs" aria-label="Permalink to &quot;Viewing Logs&quot;">​</a></h2><p>In the Dashboard logs, you can see the relevant logs for the DDNS functionality. When configured correctly, there will be corresponding log entries when updating DNS records.</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dashboard_1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 2024/03/16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 23:16:25</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> NEZH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">A</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 正在尝试更新域名</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ddns.example.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DDNS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1/3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dashboard_1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 2024/03/16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 23:16:28</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> NEZH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">A</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 尝试更新域名</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ddns.example.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DDNS成功</span></span></code></pre></div>`,20),n=[a];function d(r,l,h,c,p,u){return t(),i("div",null,n)}const m=e(s,[["render",d]]);export{k as __pageData,m as default};
