import{_ as s,c as a,o as i,a4 as n}from"./chunks/framework.BmdFiWrL.js";const y=JSON.parse('{"title":"Dashboard Reverse Proxy Configuration","description":"","frontmatter":{},"headers":[],"relativePath":"en_US/guide/q3.md","filePath":"en_US/guide/q3.md","lastUpdated":1744544796000}'),e={name:"en_US/guide/q3.md"},p=n(`<h1 id="dashboard-reverse-proxy-configuration" tabindex="-1">Dashboard Reverse Proxy Configuration <a class="header-anchor" href="#dashboard-reverse-proxy-configuration" aria-label="Permalink to &quot;Dashboard Reverse Proxy Configuration&quot;">​</a></h1><p>Starting from version V1, Dashboard and gRPC share the default <code>8008</code> port for both access and communication.</p><hr><h2 id="nginx-configuration-example" tabindex="-1">Nginx Configuration Example <a class="header-anchor" href="#nginx-configuration-example" aria-label="Permalink to &quot;Nginx Configuration Example&quot;">​</a></h2><p>Below is an example configuration for setting up a reverse proxy using Nginx:</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">443</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ssl http2;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[::]:443 ssl http2;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Uncomment the next line and comment the above lines if using Nginx &gt; 1.25.1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # http2 on;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server_name </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dashboard.example.com; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Replace with your domain</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_certificate </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         /data/letsencrypt/fullchain.pem; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Path to your SSL certificate</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_certificate_key </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     /data/letsencrypt/key.pem;       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Path to your SSL private key</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_stapling </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_session_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_session_cache </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">shared:SSL:10m; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Comment out if it conflicts with other configurations</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_protocols </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">TLSv1.2 TLSv1.3;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    underscores_in_headers </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    set_real_ip_from </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">0.0.0.0/0; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Replace with your CDN&#39;s IP ranges</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    real_ip_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CF-Connecting-IP; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Replace with your CDN&#39;s private header, default for Cloudflare</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Comment the above two lines if Nginx is the outermost layer.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # gRPC Configuration</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ^~</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> /proto.NezhaService/ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nz-realip $http_CF_Connecting_IP; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Replace with your CDN&#39;s private header</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # Uncomment the next line and comment the above if Nginx is the outermost layer</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # grpc_set_header nz-realip $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_send_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_socket_keepalive </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        client_max_body_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10m</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_buffer_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4m</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        grpc_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">grpc://dashboard;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # WebSocket Configuration</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~*</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> ^/api/v1/ws/(server|terminal|file)(.*)$ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nz-realip $http_cf_connecting_ip; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Replace with your CDN&#39;s private header</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # Uncomment the next line and comment the above if Nginx is the outermost layer</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # proxy_set_header nz-realip $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Origin https://$host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Upgrade $http_upgrade;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Connection </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;upgrade&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_send_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Web Traffic Configuration</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nz-realip $http_cf_connecting_ip; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Replace with your CDN&#39;s private header</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # Uncomment the next line and comment the above if Nginx is the outermost layer</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # proxy_set_header nz-realip $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_read_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_send_timeout </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_buffer_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">128k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_buffers </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 256k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_busy_buffers_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">256k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_max_temp_file_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # If you use nginx as the outermost layer, enable this line to avoid protocols that cannot be accessed correctly</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">upstream</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dashboard </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    keepalive </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">512</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="caddy-configuration-example" tabindex="-1">Caddy Configuration Example <a class="header-anchor" href="#caddy-configuration-example" aria-label="Permalink to &quot;Caddy Configuration Example&quot;">​</a></h2><p>Below is an example configuration for setting up a reverse proxy using Caddy:</p><div class="language-caddy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">caddy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dashboard.example.com {</span></span>
<span class="line"><span>    @grpcProto {</span></span>
<span class="line"><span>        path /proto.NezhaService/*</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    reverse_proxy @grpcProto {</span></span>
<span class="line"><span>        header_up Host {host}</span></span>
<span class="line"><span>        header_up nz-realip {http.CF-Connecting-IP} # Replace with your CDN&#39;s private header</span></span>
<span class="line"><span>        # Uncomment the next line and comment the above if Caddy is the outermost layer</span></span>
<span class="line"><span>        # header_up nz-realip {remote_host};</span></span>
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
<span class="line"><span>        header_up nz-realip {http.CF-Connecting-IP} # Replace with your CDN&#39;s private header</span></span>
<span class="line"><span>        # Uncomment the next line and comment the above if Caddy is the outermost layer</span></span>
<span class="line"><span>        # header_up nz-realip {remote_host};</span></span>
<span class="line"><span>        transport http {</span></span>
<span class="line"><span>            read_buffer 16384</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        to localhost:8008</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h3 id="configuration-notes" tabindex="-1">Configuration Notes <a class="header-anchor" href="#configuration-notes" aria-label="Permalink to &quot;Configuration Notes&quot;">​</a></h3><ol><li><p><strong>Adjust Headers</strong><br> Replace <code>CF-Connecting-IP</code> and other header configurations based on your CDN provider&#39;s requirements.</p></li><li><p><strong>Enable HTTPS</strong><br> Ensure your SSL certificate paths are correct and domain resolution is properly set up.</p></li><li><p><strong>Optimize Performance</strong><br> Adjust <code>keepalive</code> and <code>buffer</code> settings based on your server&#39;s performance and traffic requirements.</p></li></ol><hr>`,14),t=[p];function l(h,r,k,o,d,c){return i(),a("div",null,t)}const E=s(e,[["render",l]]);export{y as __pageData,E as default};
