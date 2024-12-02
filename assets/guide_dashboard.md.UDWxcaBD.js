import{_ as s,c as a,o as i,a4 as h}from"./chunks/framework.BmdFiWrL.js";const E=JSON.parse('{"title":"安装 Dashboard","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/dashboard.md","filePath":"guide/dashboard.md","lastUpdated":1733103039000}'),t={name:"guide/dashboard.md"},n=h(`<h1 id="安装-dashboard" tabindex="-1">安装 Dashboard <a class="header-anchor" href="#安装-dashboard" aria-label="Permalink to &quot;安装 Dashboard&quot;">​</a></h1><h2 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h2><p>搭建哪吒监控的 Dashboard，你需要：</p><ol><li>一台可以连接公网的服务器。防火墙和安全策略需放行 8008 端口，否则无法访问或接收数据。单核 512MB 内存的服务器即可满足大多数使用场景。</li><li>一个已设置好 A 记录，指向 Dashboard 服务器 IP 的域名。</li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>如果你想使用 CDN，请准备两个域名：</p><ul><li>一个配置好 CDN，用作公开访问，CDN 需支持 WebSocket 协议；</li><li>另一个域名不使用 CDN，用作 Agent 与 Dashboard 的通信。</li></ul><p>本文档以 &quot;dashboard.example.com&quot; 和 &quot;data.example.com&quot; 为例。</p></div><h2 id="在服务器中安装-dashboard" tabindex="-1">在服务器中安装 Dashboard <a class="header-anchor" href="#在服务器中安装-dashboard" aria-label="Permalink to &quot;在服务器中安装 Dashboard&quot;">​</a></h2><p>在面板服务器中，运行以下安装脚本：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -L</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://raw.githubusercontent.com/nezhahq/scripts/refs/heads/main/install.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nezha.sh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nezha.sh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./nezha.sh</span></span></code></pre></div><p>如果你的服务器位于中国大陆，可以使用镜像：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -L</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://gitee.com/naibahq/scripts/raw/main/install.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nezha.sh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nezha.sh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CN=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./nezha.sh</span></span></code></pre></div><p>以 Docker 安装为例，安装完成后按提示输入以下信息：</p><ul><li><code>请输入站点标题:</code> - 自定义站点标题。</li><li><code>请输入暴露端口:</code> - 公开访问端口（默认 8008，可自定义）。</li><li><code>请指定后台语言:</code> - 选择语言偏好。</li></ul><p>输入完成后，等待拉取 Docker 镜像。安装结束后，如果一切正常，你可以通过域名和端口号访问 Dashboard，例如：<br><code>http://dashboard.example.com:8008</code></p><p>如果需要再次运行安装脚本，可输入以下命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./nezha.sh</span></span></code></pre></div><p>打开管理脚本。</p><h2 id="登录到-dashboard-配置界面" tabindex="-1">登录到 Dashboard 配置界面 <a class="header-anchor" href="#登录到-dashboard-配置界面" aria-label="Permalink to &quot;登录到 Dashboard 配置界面&quot;">​</a></h2><p>后台管理界面的路径为 <code>/dashboard</code>，你只需访问：<br><code>http://dashboard.example.com:8008/dashboard</code></p><p>首次登录的默认用户名和密码均为 <code>admin</code>。</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>默认密码为弱密码，对于高权限的面板来说，使用弱密码非常危险！<br> 建议安装后立即进入管理页面：点击头像 → “个人信息” → “更新个人资料”修改密码。<br> 建议密码长度至少 18 位，并混合大小写字母、数字及符号。</p></div><h2 id="配置反向代理" tabindex="-1">配置反向代理 <a class="header-anchor" href="#配置反向代理" aria-label="Permalink to &quot;配置反向代理&quot;">​</a></h2><p><strong>本文档以宝塔面板配置反向代理 Dashboard 的过程作为示范。随着未来版本的变化，部分功能入口可能会有所调整，本文档仅供参考。</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>本项目并不依赖宝塔面板。你可以使用任何服务器面板，或手动安装 Nginx 或 Caddy 来配置 SSL 和反向代理。</p><p>如果你认为无需通过 80 或 443 端口访问 Dashboard，可以直接使用安装脚本部署并运行哪吒监控，无需安装 Nginx 或其他 Web 服务器。</p></div><p>以宝塔面板为例，在宝塔面板中新建站点，填写公开访问域名，如 <code>http://dashboard.example.com</code>，然后点击“设置”，进入站点设置，选择“反向代理” → “新建反向代理”。</p><ol><li>自定义代理名称，在“目标 URL”中填入：<br><code>http://127.0.0.1:8008</code><br> 点击“保存”。</li><li>打开刚创建的反向代理右边的“配置文件”，将内容替换为以下代码：</li></ol><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#PROXY-START/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Origin https://$host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nz-realip $http_CF_Connecting_IP;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_http_version </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Upgrade $http_upgrade;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Connection </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;upgrade&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> ^/(ws|terminal/.+|file/.+)$ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_http_version </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Upgrade $http_upgrade;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Connection </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Upgrade&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $http_host;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#PROXY-END/</span></span></code></pre></div><ol start="3"><li>点击“保存”。</li></ol><p>现在，你可以直接通过域名访问面板，例如：<br><code>http://dashboard.example.com</code></p><h2 id="更新-dashboard" tabindex="-1">更新 Dashboard <a class="header-anchor" href="#更新-dashboard" aria-label="Permalink to &quot;更新 Dashboard&quot;">​</a></h2><p>运行脚本：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./nezha.sh</span></span></code></pre></div><p>选择重启面板并更新。</p>`,32),p=[n];function e(l,d,k,r,o,c){return i(),a("div",null,p)}const y=s(t,[["render",e]]);export{E as __pageData,y as default};