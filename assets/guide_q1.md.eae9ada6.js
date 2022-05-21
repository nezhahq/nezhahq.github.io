import{_ as n,c as s,o as a,d as e}from"./app.c59cf861.js";const v='{"title":"\u51C6\u5907\u5DE5\u4F5C","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u51C6\u5907\u5DE5\u4F5C","slug":"\u51C6\u5907\u5DE5\u4F5C"},{"level":2,"title":"NGINX\u914D\u7F6E","slug":"nginx\u914D\u7F6E"},{"level":2,"title":"\u4F7F\u7528\u65B9\u5F0F","slug":"\u4F7F\u7528\u65B9\u5F0F"},{"level":2,"title":"\u9632\u6B62\u76D7\u7528","slug":"\u9632\u6B62\u76D7\u7528"}],"relativePath":"guide/q1.md"}',t={},p=e(`<h2 id="\u51C6\u5907\u5DE5\u4F5C" tabindex="-1">\u51C6\u5907\u5DE5\u4F5C <a class="header-anchor" href="#\u51C6\u5907\u5DE5\u4F5C" aria-hidden="true">#</a></h2><p><strong>\u4F60\u53EF\u4EE5\u9009\u62E9CloudFlare\u7684workers\u8FDB\u884C\u53CD\u4EE3,\u4F46\u5927\u9646\u7684\u7F51\u7EDC\u4F60\u61C2\u7684,\u8FD9\u91CC\u4ECB\u7ECD\u7528\u4F60\u81EA\u5DF1\u670D\u52A1\u5668\u53CD\u4EE3\u65B9\u5F0F</strong><br> \u642D\u5EFA\u4E00\u4E2ATGbot api\u53CD\u4EE3\uFF0C\u4F60\u9700\u8981\uFF1A<br> 1.\u4E00\u4E2A\u4E0D\u53D7GFW\u5C01\u9501\u7684\u670D\u52A1\u5668(\u4E14\u5B89\u88C5\u597Dnginx)<br> 2.\u4E00\u4E2A\u57DF\u540D(\u63D0\u524D\u7533\u8BF7SSL\u8BC1\u4E66) <br></p><h2 id="nginx\u914D\u7F6E" tabindex="-1">NGINX\u914D\u7F6E <a class="header-anchor" href="#nginx\u914D\u7F6E" aria-hidden="true">#</a></h2><p>\u7F16\u8F91\u4F60nginx\u7684\u914D\u7F6E\u6587\u4EF6,\u5728http{}\u4E2D\u52A0\u4E0A\u5982\u4E0B\u914D\u7F6E</p><div class="language-nginx"><pre><code><span class="token comment"># http\u5F3A\u5236\u8DF3\u8F6C\u5230htpps</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span> [::]:80</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> yourDomainName</span><span class="token punctuation">;</span>

    <span class="token comment"># Enforce HTTPS</span>
    <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">## https</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">listen</span> [::]:443 ssl</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">server_name</span> yourDomainName</span><span class="token punctuation">;</span>

        <span class="token comment">## ssl\u5BC6\u94A5\u8DEF\u5F84\u81EA\u5DF1\u6539\u6539</span>
	<span class="token directive"><span class="token keyword">ssl_certificate</span> server.pem</span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">ssl_certificate_key</span> server.key</span><span class="token punctuation">;</span>

        <span class="token comment">## root\u975E\u5FC5\u8981</span>
	<span class="token directive"><span class="token keyword">root</span> /var/www/tgbot/</span><span class="token punctuation">;</span>

        <span class="token comment">## dns\u5FC5\u987B\u5199\uFF0C\u4E0D\u7136\u4F1A\u62A5502\u9519\u8BEF</span>
        <span class="token directive"><span class="token keyword">resolver</span> 8.8.8.8</span><span class="token punctuation">;</span>

        <span class="token comment">## \u4EE5bot\u5F00\u5934\u7684\u8BF7\u6C42\u90FD\u4F1A\u88AB\u6B63\u5219\u5339\u914D\u5230</span>
        <span class="token directive"><span class="token keyword">location</span> ~* ^/bot</span> <span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">proxy_buffering</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
                <span class="token directive"><span class="token keyword">proxy_pass</span>  https://api.telegram.org<span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
                <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">## \u548C\u4E0A\u9762root\u4E00\u6837\u975E\u5FC5\u8981\uFF0C\u8FD9\u4E2A\u4E3B\u8981\u662F\u7528\u6765\u786E\u8BA4\u670D\u52A1\u5668\u72B6\u6001\u7684\u3002\u4E5F\u53EF\u4EE5\u6539\u6210return 403</span>
	<span class="token directive"><span class="token keyword">location</span> /</span><span class="token punctuation">{</span> 
		<span class="token directive"><span class="token keyword">try_files</span> /<span class="token variable">$uri</span> <span class="token variable">$uri</span> /index.html</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

        <span class="token comment">## no log no fix</span>
        <span class="token directive"><span class="token keyword">error_log</span>    /var/log/tg.log  error</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>yourDomainName</code>-\u4F60\u51C6\u5907\u7684\u57DF\u540D<br><code>ssl_certificate</code>-SSL\u8BC1\u4E66\u8DEF\u5F84<br><code>ssl_certificate_key</code>-SSL\u8BC1\u4E66\u8DEF\u5F84<br><br></p><h2 id="\u4F7F\u7528\u65B9\u5F0F" tabindex="-1">\u4F7F\u7528\u65B9\u5F0F <a class="header-anchor" href="#\u4F7F\u7528\u65B9\u5F0F" aria-hidden="true">#</a></h2><p>\u{1F389}\u7136\u540E\u6267\u884C<code>systemctl restart nginx</code>\u56DE\u5230nezha\u5C06\u539F\u6765\u7684https://api.telegram.org/ \u66FF\u6362\u4E3Ahttps://yourDomainName/ ,\u5373\u53EF\u6B63\u5E38\u63A8\u9001\u6D88\u606F <br></p><h2 id="\u9632\u6B62\u76D7\u7528" tabindex="-1">\u9632\u6B62\u76D7\u7528 <a class="header-anchor" href="#\u9632\u6B62\u76D7\u7528" aria-hidden="true">#</a></h2><p><code>serverIp</code>-\u4F60\u76D1\u63A7\u9E21\u7684ip\u5730\u5740,\u4F60\u7CFB\u7EDF\u5B89\u88C5\u7684\u90A3\u4E2A\u5C31\u7528\u90A3\u4E2A\u547D\u4EE4,ufw iptables\u90FD\u53EF.</p><div class="language-bash"><pre><code><span class="token comment">#ubuntu</span>
ufw allow proto tcp from serverIp to any port <span class="token number">443</span>
<span class="token comment">#centos</span>
iptables -I INPUT -p tcp --dport <span class="token number">443</span> -j DROP
iptables -I INPUT -s serverIp -p tcp --dport <span class="token number">443</span> -j ACCEPT
</code></pre></div>`,11),o=[p];function c(r,l,i,k,d,u){return a(),s("div",null,o)}var _=n(t,[["render",c]]);export{v as __pageData,_ as default};
