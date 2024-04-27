import{_ as s,o as n,c as a,R as o}from"./chunks/framework.44fd0451.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/api.md","filePath":"guide/api.md","lastUpdated":1714208627000}'),l={name:"guide/api.md"},p=o(`<p><strong>哪吒面板现在已经支持使用 API 接口查询面板中 Agent 的状态信息</strong></p><h2 id="创建-token" tabindex="-1">创建 Token <a class="header-anchor" href="#创建-token" aria-label="Permalink to &quot;创建 Token&quot;">​</a></h2><p>哪吒面板的 API 接口允许使用 Token 认证与 Cookies 认证<br> 要新建一个 Token，在进入管理面板后，点击右上角的头像，选择 “API Token”，进入 Token 管理页面<br> 点击 “添加 Token”，自定义备注后，点击 “添加”<br> 如需删除一个 Token，请选择相应的 Token，点击右侧的删除图标</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Token 是 API 接口的鉴权工具，它对你的面板的信息安全非常重要，请不要泄漏你的 Token 给他人</p></div><h2 id="认证方式" tabindex="-1">认证方式 <a class="header-anchor" href="#认证方式" aria-label="Permalink to &quot;认证方式&quot;">​</a></h2><p>Token 认证方式：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Request Headers:  </span></span>
<span class="line"><span style="color:#A6ACCD;">Authorization: Token</span></span></code></pre></div><h2 id="使用说明" tabindex="-1">使用说明 <a class="header-anchor" href="#使用说明" aria-label="Permalink to &quot;使用说明&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>下面示例中的负数时间戳为（0000-00-00）<br> 目前表示 Dashboard 上线后该 Agent 从未汇报过<br> 但不建议用正负性判断状态</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>请求方式为 <code>Get</code>，返回格式为 <code>JSON</code></strong></p></div><ul><li>获取服务器列表：<code>GET /api/v1/server/list?tag=</code><br> query: tag (ServerTag 是服务器的分组，提供此参数则仅查询该分组中的服务器)</li></ul><p>JSON 返回示例：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
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
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>获取服务器详情：<code>GET /api/v1/server/details?id=&amp;tag=</code><br> query: id (ServerID 多个 ID 以逗号分隔，提供此参数则查询该 ID 对应的服务器，同时无视tag参数)<br> query: tag (ServerTag 提供此参数则仅查询该分组下的服务器)</li></ul><p>JSON 返回示例：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
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
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,16),t=[p];function e(c,u,q,C,A,i){return n(),a("div",null,t)}const D=s(l,[["render",e]]);export{y as __pageData,D as default};
