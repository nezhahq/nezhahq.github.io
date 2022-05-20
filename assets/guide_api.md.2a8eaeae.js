import{_ as t,c as o,o as u,d as q}from"./app.2c402e15.js";const _='{"title":"API\u63A5\u53E3\uFF08\u5141\u8BB8\u4F7F\u7528API Token\u8BA4\u8BC1\u4E0ECookies\u8BA4\u8BC1\uFF09","description":"","frontmatter":{},"headers":[{"level":2,"title":"API\u63A5\u53E3\uFF08\u5141\u8BB8\u4F7F\u7528API Token\u8BA4\u8BC1\u4E0ECookies\u8BA4\u8BC1\uFF09","slug":"api\u63A5\u53E3\uFF08\u5141\u8BB8\u4F7F\u7528api-token\u8BA4\u8BC1\u4E0Ecookies\u8BA4\u8BC1\uFF09"}],"relativePath":"guide/api.md"}',n={},e=q(`<h2 id="api\u63A5\u53E3\uFF08\u5141\u8BB8\u4F7F\u7528api-token\u8BA4\u8BC1\u4E0Ecookies\u8BA4\u8BC1\uFF09" tabindex="-1">API\u63A5\u53E3\uFF08\u5141\u8BB8\u4F7F\u7528API Token\u8BA4\u8BC1\u4E0ECookies\u8BA4\u8BC1\uFF09 <a class="header-anchor" href="#api\u63A5\u53E3\uFF08\u5141\u8BB8\u4F7F\u7528api-token\u8BA4\u8BC1\u4E0Ecookies\u8BA4\u8BC1\uFF09" aria-hidden="true">#</a></h2><p>Token\u8BA4\u8BC1\u65B9\u5F0F\uFF1A</p><div class="language-"><pre><code>Request Headers:  
Authorization: Token
</code></pre></div><p>\u4E0B\u9762\u793A\u4F8B\u4E2D\u7684\u8D1F\u6570\u65F6\u95F4\u6233\u4E3A\uFF080000-00-00\uFF09<br> \u76EE\u524D\u8868\u793A\u9762\u677F\u4E0A\u7EBF\u540E\u8BE5\u670D\u52A1\u5668\u4ECE\u672A\u6C47\u62A5\u8FC7<br> \u4F46\u4E0D\u5EFA\u8BAE\u7528\u6B63\u8D1F\u6027\u5224\u65AD\u72B6\u6001</p><p>\u83B7\u53D6\u670D\u52A1\u5668\u5217\u8868\uFF1A<code>GET /api/v1/server/list?tag=</code><br> query: tag (ServerTag \u63D0\u4F9B\u6B64\u53C2\u6570\u5219\u4EC5\u67E5\u8BE2\u8BE5\u5206\u7EC4\u4E0B\u7684\u670D\u52A1\u5668)</p><div class="language-"><pre><code>{
    &quot;code&quot;: 0,
    &quot;message&quot;: &quot;success&quot;,
    &quot;result&quot;: [
        {
            &quot;id&quot;: 1,
            &quot;name&quot;: &quot;Server1&quot;,
            &quot;tag&quot;: &quot;Tag1&quot;,
            &quot;last_active&quot;: 1653014667,
            &quot;ipv4&quot;: &quot;1.1.1.1&quot;,
            &quot;ipv6&quot;: &quot;&quot;,
            &quot;valid_ip&quot;: &quot;1.1.1.1&quot;
        },
        {
            &quot;id&quot;: 2,
            &quot;name&quot;: &quot;Server2&quot;,
            &quot;tag&quot;: &quot;Tag2&quot;,
            &quot;last_active&quot;: -62135596800,
            &quot;ipv4&quot;: &quot;&quot;,
            &quot;ipv6&quot;: &quot;&quot;,
            &quot;valid_ip&quot;: &quot;&quot;
        }
    ]
}
</code></pre></div><p>\u83B7\u53D6\u670D\u52A1\u5668\u8BE6\u60C5\uFF1A<code>GET /api/v1/server/details?id=&amp;tag=</code><br> query: id (ServerID \u4EE5\u9017\u53F7\u5206\u9694 \u63D0\u4F9B\u6B64\u53C2\u6570\u5219\u67E5\u8BE2\u8BE5\u5217\u8868\u5BF9\u5E94\u7684\u670D\u52A1\u5668 \u540C\u65F6\u65E0\u89C6tag\u53C2\u6570)<br> query: tag (ServerTag \u63D0\u4F9B\u6B64\u53C2\u6570\u5219\u4EC5\u67E5\u8BE2\u8BE5\u5206\u7EC4\u4E0B\u7684\u670D\u52A1\u5668)</p><div class="language-"><pre><code>{
    &quot;code&quot;: 0,
    &quot;message&quot;: &quot;success&quot;,
    &quot;result&quot;: [
        {
            &quot;id&quot;: 1,
            &quot;name&quot;: &quot;Server1&quot;,
            &quot;tag&quot;: &quot;Tag1&quot;,
            &quot;last_active&quot;: 1653015042,
            &quot;ipv4&quot;: &quot;1.1.1.1&quot;,
            &quot;ipv6&quot;: &quot;&quot;,
            &quot;valid_ip&quot;: &quot;1.1.1.1&quot;,
            &quot;host&quot;: {
                &quot;Platform&quot;: &quot;darwin&quot;,
                &quot;PlatformVersion&quot;: &quot;12.3.1&quot;,
                &quot;CPU&quot;: [
                    &quot;Apple M1 Pro 1 Physical Core&quot;
                ],
                &quot;MemTotal&quot;: 17179869184,
                &quot;DiskTotal&quot;: 2473496842240,
                &quot;SwapTotal&quot;: 0,
                &quot;Arch&quot;: &quot;arm64&quot;,
                &quot;Virtualization&quot;: &quot;&quot;,
                &quot;BootTime&quot;: 1652683962,
                &quot;CountryCode&quot;: &quot;hk&quot;,
                &quot;Version&quot;: &quot;&quot;
            },
            &quot;status&quot;: {
                &quot;CPU&quot;: 17.330210772540017,
                &quot;MemUsed&quot;: 14013841408,
                &quot;SwapUsed&quot;: 0,
                &quot;DiskUsed&quot;: 2335048912896,
                &quot;NetInTransfer&quot;: 2710273234,
                &quot;NetOutTransfer&quot;: 695454765,
                &quot;NetInSpeed&quot;: 10806,
                &quot;NetOutSpeed&quot;: 5303,
                &quot;Uptime&quot;: 331080,
                &quot;Load1&quot;: 5.23486328125,
                &quot;Load5&quot;: 4.873046875,
                &quot;Load15&quot;: 3.99267578125,
                &quot;TcpConnCount&quot;: 195,
                &quot;UdpConnCount&quot;: 70,
                &quot;ProcessCount&quot;: 437
            }
        },
        {
            &quot;id&quot;: 2,
            &quot;name&quot;: &quot;Server2&quot;,
            &quot;tag&quot;: &quot;Tag2&quot;,
            &quot;last_active&quot;: -62135596800,
            &quot;ipv4&quot;: &quot;&quot;,
            &quot;ipv6&quot;: &quot;&quot;,
            &quot;valid_ip&quot;: &quot;&quot;,
            &quot;host&quot;: {
                &quot;Platform&quot;: &quot;&quot;,
                &quot;PlatformVersion&quot;: &quot;&quot;,
                &quot;CPU&quot;: null,
                &quot;MemTotal&quot;: 0,
                &quot;DiskTotal&quot;: 0,
                &quot;SwapTotal&quot;: 0,
                &quot;Arch&quot;: &quot;&quot;,
                &quot;Virtualization&quot;: &quot;&quot;,
                &quot;BootTime&quot;: 0,
                &quot;CountryCode&quot;: &quot;&quot;,
                &quot;Version&quot;: &quot;&quot;
            },
            &quot;status&quot;: {
                &quot;CPU&quot;: 0,
                &quot;MemUsed&quot;: 0,
                &quot;SwapUsed&quot;: 0,
                &quot;DiskUsed&quot;: 0,
                &quot;NetInTransfer&quot;: 0,
                &quot;NetOutTransfer&quot;: 0,
                &quot;NetInSpeed&quot;: 0,
                &quot;NetOutSpeed&quot;: 0,
                &quot;Uptime&quot;: 0,
                &quot;Load1&quot;: 0,
                &quot;Load5&quot;: 0,
                &quot;Load15&quot;: 0,
                &quot;TcpConnCount&quot;: 0,
                &quot;UdpConnCount&quot;: 0,
                &quot;ProcessCount&quot;: 0
            }
        }
    ]
}
</code></pre></div>`,8),a=[e];function i(r,s,d,p,c,l){return u(),o("div",null,a)}var T=t(n,[["render",i]]);export{_ as __pageData,T as default};
