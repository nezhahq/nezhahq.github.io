import{_ as n,c as e,o as a,a as s}from"./app.3817bf4e.js";const g='{"title":"Reverse Proxy gRPC Port (support Cloudflare CDN)","description":"","frontmatter":{},"headers":[],"relativePath":"en_US/guide/q3.md","lastUpdated":1678899700000}',t={},o=s(`<h4 id="reverse-proxy-grpc-port-support-cloudflare-cdn" tabindex="-1">Reverse Proxy gRPC Port (support Cloudflare CDN) <a class="header-anchor" href="#reverse-proxy-grpc-port-support-cloudflare-cdn" aria-hidden="true">#</a></h4><p>Use Nginx or Caddy to reverse proxy gRPC</p><ul><li>Nginx configuration files</li></ul><div class="language-nginx"><pre><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl http2</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span> [::]:443 ssl http2</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> data.example.com</span><span class="token punctuation">;</span> <span class="token comment"># The domain name where the Agent connects to Dashboard</span>

    <span class="token directive"><span class="token keyword">ssl_certificate</span>          /data/letsencrypt/fullchain.pem</span><span class="token punctuation">;</span> <span class="token comment"># Your domain certificate path</span>
    <span class="token directive"><span class="token keyword">ssl_certificate_key</span>      /data/letsencrypt/key.pem</span><span class="token punctuation">;</span>       <span class="token comment"># Your domain&#39;s private key path</span>

    <span class="token directive"><span class="token keyword">underscores_in_headers</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">grpc_read_timeout</span> <span class="token number">300s</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">grpc_send_timeout</span> <span class="token number">300s</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">grpc_socket_keepalive</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">grpc_pass</span> grpc://grpcservers</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">upstream</span> grpcservers</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> localhost:5555</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">keepalive</span> <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>Caddy configuration files</li></ul><div class="language-"><pre><code>data.example.com:443 { # The domain name where the Agent connects to Dashboard
    reverse_proxy {
        to localhost:5555
        transport http {
            versions h2c 2
        }
    }
}
</code></pre></div><p>Dashboard Configuration</p><ul><li>First login to the Dashboard and enter the admin panel, go to the settings page, fill in the <code>CDN Bypassed Domain/IP</code> with the domain name you configured in Nginx or Caddy, for example <code>data.example.com</code>, and save it.</li><li>Then open the <code>/opt/nezha/dashboard/data/config.yaml</code> file in the panel server and change <code>proxygrpcport</code> to the port that Nginx or Caddy is listening on, such as <code>443</code> as set in the previous step. Since we have SSL/TLS enabled in Nginx or Caddy, we need to set <code>tls</code> to <code>true</code>, restart the panel when you are done.</li></ul><p>Agent Configuration</p><ul><li>Log in to the admin panel, copy the one-click install command, and run the one-click install command on the corresponding server to reinstall the agent.</li></ul><p>Enable Cloudflare CDN (optional)</p><p>According to Cloudflare gRPC requirements: gRPC services must listen on port 443 and must support TLS and HTTP/2. So if you need to enable CDN, you must use port 443 when configuring Nginx or Caddy reverse proxy gRPC and configure the certificate (Caddy will automatically apply and configure the certificate).</p><ul><li>Log in to Cloudflare and select the domain you are using. Go to the <code>Network</code> page and turn on the <code>gRPC</code> switch, then go to the <code>DNS</code> page, find the resolution record of the domain with gRPC configuration, and turn on the orange cloud icon to enable CDN.</li></ul>`,13),p=[o];function c(r,i,l,d,u,k){return a(),e("div",null,p)}var m=n(t,[["render",c]]);export{g as __pageData,m as default};
