import{_ as t,c as o,o as e,a as u}from"./app.3817bf4e.js";const v='{"title":"Create Token","description":"","frontmatter":{},"headers":[{"level":2,"title":"Create Token","slug":"create-token"},{"level":2,"title":"Authentication method","slug":"authentication-method"},{"level":2,"title":"How to use","slug":"how-to-use"}],"relativePath":"en_US/guide/api.md","lastUpdated":1681026579000}',n={},q=u(`<p><strong>Nezha Monitoring now supports querying the status information of the Agent in the Dashboard using the API</strong></p><h2 id="create-token" tabindex="-1">Create Token <a class="header-anchor" href="#create-token" aria-hidden="true">#</a></h2><p>API allows Token authentication method and Cookies authentication method<br> To create a new Token, after entering the admin panel, click on the avatar in the upper right corner and select &quot;API Token&quot; to enter the Token management page<br> Click &quot;Add Token&quot; and after customizing the notes, click &quot;Add&quot;<br> To delete a Token, please select the corresponding Token and click the delete icon on the right</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Token is the authentication tool of API, it is very important for your Dashboard&#39;s information security, please don&#39;t leak your Token to others</p></div><h2 id="authentication-method" tabindex="-1">Authentication method <a class="header-anchor" href="#authentication-method" aria-hidden="true">#</a></h2><p>Token authentication method:</p><div class="language-"><pre><code>Request Headers:  
Authorization: Token
</code></pre></div><h2 id="how-to-use" tabindex="-1">How to use <a class="header-anchor" href="#how-to-use" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>The negative timestamp in the example below is (0000-00-00)<br> It is currently used to indicate that the Agent has never reported since the Dashboard went live<br> However, it is not recommended to use positivity or negativity to determine the status</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>The request method is <code>Get</code> and the return format is <code>JSON</code>.</strong></p></div><ul><li>Get a list of servers: <code>GET /api/v1/server/list?tag=</code><br> query: tag (ServerTag means the group of servers, if this value is provided, only the servers in this group are queried)</li></ul><p>JSON Return Example:</p><div class="language-"><pre><code>{
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
</code></pre></div><ul><li>Get server details: <code>GET /api/v1/server/details?id=&amp;tag=</code><br> query: id (ServerID. Multiple IDs are separated by commas, provide this value to query the server corresponding to the ID, while ignoring the tag value)<br> query: tag (ServerTag, if this value is provided, only the servers in this group are queried)</li></ul><p>JSON Return Example:</p><div class="language-"><pre><code>{
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
</code></pre></div>`,16),a=[q];function i(r,s,d,l,c,p){return e(),o("div",null,a)}var m=t(n,[["render",i]]);export{v as __pageData,m as default};
