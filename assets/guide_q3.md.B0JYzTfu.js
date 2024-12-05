import{_ as s,c as a,o as i,a4 as n}from"./chunks/framework.BmdFiWrL.js";const y=JSON.parse('{"title":"Dashboard 反向代理配置","description":"","frontmatter":{},"headers":[],"relativePath":"guide/q3.md","filePath":"guide/q3.md","lastUpdated":1733379391000}'),p={name:"guide/q3.md"},l=n(`<h1 id="dashboard-反向代理配置" tabindex="-1">Dashboard 反向代理配置 <a class="header-anchor" href="#dashboard-反向代理配置" aria-label="Permalink to &quot;Dashboard 反向代理配置&quot;">​</a></h1><p>从 V1 版本开始，不再区分 Dashboard 和 gRPC 端口，访问与通信均通过默认的 <code>8008</code> 端口。</p><hr><h2 id="nginx-配置示例" tabindex="-1">Nginx 配置示例 <a class="header-anchor" href="#nginx-配置示例" aria-label="Permalink to &quot;Nginx 配置示例&quot;">​</a></h2><p>以下是使用 Nginx 配置反向代理的示例：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">443</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ssl http2;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[::]:443 ssl http2;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # http2 on; # Nginx &gt; 1.25.1，请注释上面两行，启用此行</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server_name </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dashboard.example.com; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换为你的域名</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_certificate </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         /data/letsencrypt/fullchain.pem; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 域名证书路径</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_certificate_key </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     /data/letsencrypt/key.pem;       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 域名私钥路径</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_stapling </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_session_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_session_cache </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">shared:SSL:10m; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 如果与其他配置冲突，请注释此项</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_protocols </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">TLSv1.2 TLSv1.3;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    underscores_in_headers </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    set_real_ip_from </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">0.0.0.0/0; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换为你的 CDN 回源 IP 地址段</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    real_ip_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CF-Connecting-IP; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换为你的 CDN 提供的私有 header，此处为 CloudFlare 默认</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 如果你使用nginx作为最外层，把上面两行注释掉</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # grpc 相关    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ^~</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> /proto.NezhaService/ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nz-realip $http_CF_Connecting_IP; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换为你的 CDN 提供的私有 header，此处为 CloudFlare 默认</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # grpc_set_header nz-realip $remote_addr; # 如果你使用nginx作为最外层，就把上面一行注释掉，启用此行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_send_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_socket_keepalive </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        client_max_body_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10m</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_buffer_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4m</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">grpc://dashboard;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # websocket 相关</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~*</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> ^/api/v1/ws/(server|terminal|file)(.*)$ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nz-realip $http_cf_connecting_ip; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换为你的 CDN 提供的私有 header，此处为 CloudFlare 默认</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # proxy_set_header nz-realip $remote_addr; # 如果你使用nginx作为最外层，就把上面一行注释掉，启用此行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Origin https://$host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Upgrade $http_upgrade;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Connection </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;upgrade&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_send_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # web</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nz-realip $http_cf_connecting_ip; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换为你的 CDN 提供的私有 header，此处为 CloudFlare 默认</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # proxy_set_header nz-realip $remote_addr; # 如果你使用nginx作为最外层，就把上面一行注释掉，启用此行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_send_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_buffer_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">128k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_buffers </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 256k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_busy_buffers_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">256k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_max_temp_file_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">upstream</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dashboard </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    keepalive </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">512</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="caddy-配置示例" tabindex="-1">Caddy 配置示例 <a class="header-anchor" href="#caddy-配置示例" aria-label="Permalink to &quot;Caddy 配置示例&quot;">​</a></h2><p>以下是使用 Caddy 配置反向代理的示例：</p><div class="language-caddy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">caddy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dashboard.example.com {</span></span>
<span class="line"><span>    @grpcProto {</span></span>
<span class="line"><span>        path /proto.NezhaService/*</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    reverse_proxy @grpcProto {</span></span>
<span class="line"><span>        header_up Host {host}</span></span>
<span class="line"><span>        header_up nz-realip {http.CF-Connecting-IP} # 替换为你的 CDN 提供的私有 header，此处为 CloudFlare 默认</span></span>
<span class="line"><span>        # header_up nz-realip {remote_host} # 如果你使用caddy作为最外层，就把上面一行注释掉，启用此行</span></span>
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
<span class="line"><span>        header_up nz-realip {http.CF-Connecting-IP} # 替换为你的 CDN 提供的私有 header，此处为 CloudFlare 默认</span></span>
<span class="line"><span>        # header_up nz-realip {remote_host} # 如果你使用caddy作为最外层，就把上面一行注释掉，启用此行</span></span>
<span class="line"><span>        header_up Upgrade {http.upgrade}</span></span>
<span class="line"><span>        header_up Connection &quot;upgrade&quot;</span></span>
<span class="line"><span>        transport http {</span></span>
<span class="line"><span>            read_buffer 16384</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        to localhost:8008</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    \`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 配置注意事项</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **调整 Header**  </span></span>
<span class="line"><span>   根据您使用的 CDN 服务商，替换 \`CF-Connecting-IP\` 和相关配置为您的 CDN 提供的私有 header。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. **HTTPS 配置**  </span></span>
<span class="line"><span>   确保 SSL 证书路径正确，并已正确配置域名解析。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. **负载调整**  </span></span>
<span class="line"><span>   根据服务器性能和访问需求，可调整 \`keepalive\` 和 \`buffer\` 设置。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span></code></pre></div>`,10),e=[l];function h(t,k,r,d,E,c){return i(),a("div",null,e)}const o=s(p,[["render",h]]);export{y as __pageData,o as default};
