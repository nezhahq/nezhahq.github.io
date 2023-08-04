import{_ as s,o as n,c as a,R as o}from"./chunks/framework.1625126e.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en_US/guide/api.md","filePath":"en_US/guide/api.md","lastUpdated":1691117191000}'),t={name:"en_US/guide/api.md"},e=o(`<p><strong>Nezha Monitoring now supports querying the status information of the Agent in the Dashboard using the API</strong></p><h2 id="create-token" tabindex="-1">Create Token <a class="header-anchor" href="#create-token" aria-label="Permalink to &quot;Create Token&quot;">​</a></h2><p>API allows Token authentication method and Cookies authentication method<br> To create a new Token, after entering the admin panel, click on the avatar in the upper right corner and select &quot;API Token&quot; to enter the Token management page<br> Click &quot;Add Token&quot; and after customizing the notes, click &quot;Add&quot;<br> To delete a Token, please select the corresponding Token and click the delete icon on the right</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Token is the authentication tool of API, it is very important for your Dashboard&#39;s information security, please don&#39;t leak your Token to others</p></div><h2 id="authentication-method" tabindex="-1">Authentication method <a class="header-anchor" href="#authentication-method" aria-label="Permalink to &quot;Authentication method&quot;">​</a></h2><p>Token authentication method:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Request Headers:  </span></span>
<span class="line"><span style="color:#A6ACCD;">Authorization: Token</span></span></code></pre></div><h2 id="how-to-use" tabindex="-1">How to use <a class="header-anchor" href="#how-to-use" aria-label="Permalink to &quot;How to use&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>The negative timestamp in the example below is (0000-00-00)<br> It is currently used to indicate that the Agent has never reported since the Dashboard went live<br> However, it is not recommended to use positivity or negativity to determine the status</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>The request method is <code>Get</code> and the return format is <code>JSON</code>.</strong></p></div><ul><li>Get a list of servers: <code>GET /api/v1/server/list?tag=</code><br> query: tag (ServerTag means the group of servers, if this value is provided, only the servers in this group are queried)</li></ul><p>JSON Return Example:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;code&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;message&quot;: &quot;success&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;result&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;id&quot;: 1,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;name&quot;: &quot;Server1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;tag&quot;: &quot;Tag1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;last_active&quot;: 1653014667,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;ipv4&quot;: &quot;1.1.1.1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;ipv6&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;valid_ip&quot;: &quot;1.1.1.1&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;id&quot;: 2,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;name&quot;: &quot;Server2&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;tag&quot;: &quot;Tag2&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;last_active&quot;: -62135596800,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;ipv4&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;ipv6&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;valid_ip&quot;: &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>Get server details: <code>GET /api/v1/server/details?id=&amp;tag=</code><br> query: id (ServerID. Multiple IDs are separated by commas, provide this value to query the server corresponding to the ID, while ignoring the tag value)<br> query: tag (ServerTag, if this value is provided, only the servers in this group are queried)</li></ul><p>JSON Return Example:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;code&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;message&quot;: &quot;success&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;result&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;id&quot;: 1,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;name&quot;: &quot;Server1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;tag&quot;: &quot;Tag1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;last_active&quot;: 1653015042,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;ipv4&quot;: &quot;1.1.1.1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;ipv6&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;valid_ip&quot;: &quot;1.1.1.1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;host&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Platform&quot;: &quot;darwin&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;PlatformVersion&quot;: &quot;12.3.1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;CPU&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                    &quot;Apple M1 Pro 1 Physical Core&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">                ],</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;MemTotal&quot;: 17179869184,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;DiskTotal&quot;: 2473496842240,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;SwapTotal&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Arch&quot;: &quot;arm64&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Virtualization&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;BootTime&quot;: 1652683962,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;CountryCode&quot;: &quot;hk&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Version&quot;: &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;status&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;CPU&quot;: 17.330210772540017,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;MemUsed&quot;: 14013841408,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;SwapUsed&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;DiskUsed&quot;: 2335048912896,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;NetInTransfer&quot;: 2710273234,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;NetOutTransfer&quot;: 695454765,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;NetInSpeed&quot;: 10806,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;NetOutSpeed&quot;: 5303,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Uptime&quot;: 331080,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Load1&quot;: 5.23486328125,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Load5&quot;: 4.873046875,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Load15&quot;: 3.99267578125,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;TcpConnCount&quot;: 195,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;UdpConnCount&quot;: 70,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;ProcessCount&quot;: 437</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;id&quot;: 2,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;name&quot;: &quot;Server2&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;tag&quot;: &quot;Tag2&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;last_active&quot;: -62135596800,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;ipv4&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;ipv6&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;valid_ip&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;host&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Platform&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;PlatformVersion&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;CPU&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;MemTotal&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;DiskTotal&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;SwapTotal&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Arch&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Virtualization&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;BootTime&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;CountryCode&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Version&quot;: &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;status&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;CPU&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;MemUsed&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;SwapUsed&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;DiskUsed&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;NetInTransfer&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;NetOutTransfer&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;NetInSpeed&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;NetOutSpeed&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Uptime&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Load1&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Load5&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;Load15&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;TcpConnCount&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;UdpConnCount&quot;: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;ProcessCount&quot;: 0</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,16),l=[e];function p(u,c,i,r,q,C){return n(),a("div",null,l)}const d=s(t,[["render",p]]);export{y as __pageData,d as default};
