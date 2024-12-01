import{_ as s,c as a,o as i,a4 as n}from"./chunks/framework.BmdFiWrL.js";const o=JSON.parse('{"title":"反向代理 面板","description":"","frontmatter":{},"headers":[],"relativePath":"guide/q3.md","filePath":"guide/q3.md","lastUpdated":1733053769000}'),p={name:"guide/q3.md"},l=n(`<h1 id="反向代理-面板" tabindex="-1">反向代理 面板 <a class="header-anchor" href="#反向代理-面板" aria-label="Permalink to &quot;反向代理 面板&quot;">​</a></h1><p>新版本不再区分Dashboard、gRPC端口，只有默认的8008端口。</p><ul><li><p>Nginx 配置 示例</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">443</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ssl http2;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[::]:443 ssl http2;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #http2 on; # Nginx &gt; 1.25.1 就把上面的 http2去掉 保留这行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server_name </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dashboard.nezha.example;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_certificate </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         /data/letsencrypt/fullchain.pem; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 你的域名证书路径</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_certificate_key </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     /data/letsencrypt/key.pem;       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 你的域名私钥路径</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_stapling </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_session_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_session_cache </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">shared:SSL:10m; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 此项可能会和其他配置文件冲突，如冲突请注释此项</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_protocols </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">TLSv1.2 TLSv1.3;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    underscores_in_headers </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    set_real_ip_from </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">0.0.0.0/0; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改为你的CDN回源IP地址段</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    real_ip_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CF-Connecting-IP; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改为你的CDN提供的私有header，此处为CloudFlare默认的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ^~</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> /proto.NezhaService/ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nz-realip $http_CF_Connecting_IP; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改为你的CDN提供的私有header，此处为CloudFlare默认的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_send_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_socket_keepalive </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">grpc://dashboard;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Origin https://$host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nz-realip $http_CF_Connecting_IP;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改为你的CDN提供的私有header，此处为CloudFlare默认的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_http_version </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Upgrade $http_upgrade;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Connection </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;upgrade&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_send_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://dashboard;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">upstream</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dashboard </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> localhost:8008;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    keepalive </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">512</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li><li><p>Caddy 配置 示例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dashboard.nezha.example {</span></span>
<span class="line"><span>    @grpcProto {</span></span>
<span class="line"><span>        path /proto.NezhaService/*</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    reverse_proxy @grpcProto {</span></span>
<span class="line"><span>        header_up Host {host}</span></span>
<span class="line"><span>        header_up nz-realip {http.CF-Connecting-IP} # 替换为你的 CDN 提供的私有 header，此处为 CloudFlare 默认的</span></span>
<span class="line"><span>        transport http {</span></span>
<span class="line"><span>            versions h2c</span></span>
<span class="line"><span>            read_buffer 4096</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        to localhost:8008</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    reverse_proxy {</span></span>
<span class="line"><span>        header_up Host {host}</span></span>
<span class="line"><span>        header_up Origin https://{host}</span></span>
<span class="line"><span>        header_up nz-realip {http.CF-Connecting-IP} # 替换为你的 CDN 提供的私有 header，此处为 CloudFlare 默认的</span></span>
<span class="line"><span>        header_up Upgrade {http.upgrade}</span></span>
<span class="line"><span>        header_up Connection &quot;upgrade&quot;</span></span>
<span class="line"><span>        transport http {</span></span>
<span class="line"><span>            read_buffer 16384</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        to localhost:8008</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div></li></ul>`,3),e=[l];function h(t,k,r,d,E,g){return i(),a("div",null,e)}const y=s(p,[["render",h]]);export{o as __pageData,y as default};
