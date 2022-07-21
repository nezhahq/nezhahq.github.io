import{_ as t,c as o,o as u,a as q}from"./app.4f7c959e.js";const T='{"title":"\u521B\u5EFAToken","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u521B\u5EFAToken","slug":"\u521B\u5EFAtoken"},{"level":2,"title":"\u8BA4\u8BC1\u65B9\u5F0F","slug":"\u8BA4\u8BC1\u65B9\u5F0F"},{"level":2,"title":"\u4F7F\u7528\u8BF4\u660E","slug":"\u4F7F\u7528\u8BF4\u660E"}],"relativePath":"guide/api.md","lastUpdated":1658415076000}',n={},e=q(`<p><strong>\u54EA\u5412\u9762\u677F\u73B0\u5728\u5DF2\u7ECF\u652F\u6301\u4F7F\u7528API\u63A5\u53E3\u67E5\u8BE2\u9762\u677F\u4E2DAgent\u7684\u72B6\u6001\u4FE1\u606F</strong></p><h2 id="\u521B\u5EFAtoken" tabindex="-1">\u521B\u5EFAToken <a class="header-anchor" href="#\u521B\u5EFAtoken" aria-hidden="true">#</a></h2><p>\u54EA\u5412\u9762\u677F\u7684API\u63A5\u53E3\u5141\u8BB8\u4F7F\u7528Token\u8BA4\u8BC1\u4E0ECookies\u8BA4\u8BC1<br> \u8981\u65B0\u5EFA\u4E00\u4E2AToken\uFF0C\u5728\u8FDB\u5165\u7BA1\u7406\u9762\u677F\u540E\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2\u7684\u5934\u50CF\uFF0C\u9009\u62E9 \u201CAPI Token\u201D\uFF0C\u8FDB\u5165Token\u7BA1\u7406\u9875\u9762<br> \u70B9\u51FB \u201C\u6DFB\u52A0Token\u201D\uFF0C\u81EA\u5B9A\u4E49\u5907\u6CE8\u540E\uFF0C\u70B9\u51FB \u201C\u6DFB\u52A0\u201D<br> \u5982\u9700\u5220\u9664\u4E00\u4E2AToken\uFF0C\u8BF7\u9009\u62E9\u76F8\u5E94\u7684Token\uFF0C\u70B9\u51FB\u53F3\u4FA7\u7684\u5220\u9664\u56FE\u6807</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Token\u662FAPI\u63A5\u53E3\u7684\u9274\u6743\u5DE5\u5177\uFF0C\u5B83\u5BF9\u4F60\u7684\u9762\u677F\u7684\u4FE1\u606F\u5B89\u5168\u975E\u5E38\u91CD\u8981\uFF0C\u8BF7\u4E0D\u8981\u6CC4\u6F0F\u4F60\u7684Token\u7ED9\u4ED6\u4EBA</p></div><h2 id="\u8BA4\u8BC1\u65B9\u5F0F" tabindex="-1">\u8BA4\u8BC1\u65B9\u5F0F <a class="header-anchor" href="#\u8BA4\u8BC1\u65B9\u5F0F" aria-hidden="true">#</a></h2><p>Token\u8BA4\u8BC1\u65B9\u5F0F\uFF1A</p><div class="language-"><pre><code>Request Headers:  
Authorization: Token
</code></pre></div><h2 id="\u4F7F\u7528\u8BF4\u660E" tabindex="-1">\u4F7F\u7528\u8BF4\u660E <a class="header-anchor" href="#\u4F7F\u7528\u8BF4\u660E" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>\u4E0B\u9762\u793A\u4F8B\u4E2D\u7684\u8D1F\u6570\u65F6\u95F4\u6233\u4E3A\uFF080000-00-00\uFF09<br> \u76EE\u524D\u8868\u793ADashboard\u4E0A\u7EBF\u540E\u8BE5Agent\u4ECE\u672A\u6C47\u62A5\u8FC7<br> \u4F46\u4E0D\u5EFA\u8BAE\u7528\u6B63\u8D1F\u6027\u5224\u65AD\u72B6\u6001</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>\u8BF7\u6C42\u65B9\u5F0F\u4E3A <code>Get</code>\uFF0C\u8FD4\u56DE\u683C\u5F0F\u4E3A <code>JSON</code></strong></p></div><ul><li>\u83B7\u53D6\u670D\u52A1\u5668\u5217\u8868\uFF1A<code>GET /api/v1/server/list?tag=</code><br> query: tag (ServerTag\u662F\u670D\u52A1\u5668\u7684\u5206\u7EC4\uFF0C\u63D0\u4F9B\u6B64\u53C2\u6570\u5219\u4EC5\u67E5\u8BE2\u8BE5\u5206\u7EC4\u4E2D\u7684\u670D\u52A1\u5668)</li></ul><p>JSON\u8FD4\u56DE\u793A\u4F8B\uFF1A</p><div class="language-"><pre><code>{
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
</code></pre></div><ul><li>\u83B7\u53D6\u670D\u52A1\u5668\u8BE6\u60C5\uFF1A<code>GET /api/v1/server/details?id=&amp;tag=</code><br> query: id (ServerID \u591A\u4E2AID\u4EE5\u9017\u53F7\u5206\u9694\uFF0C\u63D0\u4F9B\u6B64\u53C2\u6570\u5219\u67E5\u8BE2\u8BE5ID\u5BF9\u5E94\u7684\u670D\u52A1\u5668\uFF0C\u540C\u65F6\u65E0\u89C6tag\u53C2\u6570)<br> query: tag (ServerTag \u63D0\u4F9B\u6B64\u53C2\u6570\u5219\u4EC5\u67E5\u8BE2\u8BE5\u5206\u7EC4\u4E0B\u7684\u670D\u52A1\u5668)</li></ul><p>JSON\u8FD4\u56DE\u793A\u4F8B\uFF1A</p><div class="language-"><pre><code>{
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
</code></pre></div>`,16),a=[e];function s(r,i,d,l,c,p){return u(),o("div",null,a)}var g=t(n,[["render",s]]);export{T as __pageData,g as default};
