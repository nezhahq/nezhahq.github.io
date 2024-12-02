import{_ as a,c as s,o as i,a4 as e}from"./chunks/framework.BmdFiWrL.js";const u=JSON.parse('{"title":"启用 GPU 监控","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/q9.md","filePath":"guide/q9.md","lastUpdated":1733103039000}'),l={name:"guide/q9.md"},n=e(`<h1 id="启用-gpu-监控" tabindex="-1">启用 GPU 监控 <a class="header-anchor" href="#启用-gpu-监控" aria-label="Permalink to &quot;启用 GPU 监控&quot;">​</a></h1><h2 id="启用-gpu-监控功能" tabindex="-1">启用 GPU 监控功能 <a class="header-anchor" href="#启用-gpu-监控功能" aria-label="Permalink to &quot;启用 GPU 监控功能&quot;">​</a></h2><h3 id="通过配置文件" tabindex="-1">通过配置文件 <a class="header-anchor" href="#通过配置文件" aria-label="Permalink to &quot;通过配置文件&quot;">​</a></h3><p>在 <code>/opt/nezha/agent/config.yml</code> 文件中启用 <code>gpu</code> 参数：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gpu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span></code></pre></div><p>修改保存后，重新启动 Agent 服务以使配置生效：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nezha-agent.service</span></span></code></pre></div><hr><h2 id="gpu-使用率监控支持" tabindex="-1">GPU 使用率监控支持 <a class="header-anchor" href="#gpu-使用率监控支持" aria-label="Permalink to &quot;GPU 使用率监控支持&quot;">​</a></h2><p>GPU 型号和 GPU 使用率是两个独立的监控项目，获取方式不同：</p><ol><li><p><strong>Windows 和 macOS</strong></p><ul><li>支持无依赖获取 GPU 使用率。</li><li>支持多品牌显卡（如 NVIDIA、AMD 等）。</li></ul></li><li><p><strong>Linux</strong></p><ul><li>仅支持 NVIDIA 和 AMD 显卡。</li><li>需要安装额外的驱动或工具。<br> 以下为在 Linux 上启用 GPU 使用率监控的具体步骤。</li></ul></li></ol><hr><h3 id="nvidia-显卡" tabindex="-1">NVIDIA 显卡 <a class="header-anchor" href="#nvidia-显卡" aria-label="Permalink to &quot;NVIDIA 显卡&quot;">​</a></h3><h4 id="依赖工具" tabindex="-1">依赖工具 <a class="header-anchor" href="#依赖工具" aria-label="Permalink to &quot;依赖工具&quot;">​</a></h4><p>NVIDIA 显卡使用 <code>nvidia-smi</code> 工具获取 GPU 使用率。此工具通常随官方驱动一起安装。</p><h4 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h4><ul><li>如果使用非官方驱动（如 <code>nouveau</code>），将无法获取 GPU 使用率。</li><li>请确保已正确安装 NVIDIA 官方驱动，并能通过 <code>nvidia-smi</code> 获取 GPU 数据。</li></ul><hr><h3 id="amd-显卡" tabindex="-1">AMD 显卡 <a class="header-anchor" href="#amd-显卡" aria-label="Permalink to &quot;AMD 显卡&quot;">​</a></h3><h4 id="依赖工具-1" tabindex="-1">依赖工具 <a class="header-anchor" href="#依赖工具-1" aria-label="Permalink to &quot;依赖工具&quot;">​</a></h4><p>AMD 显卡使用开源驱动 <code>amdgpu</code> 和工具 <code>rocm-smi</code> 获取 GPU 使用率。</p><h4 id="安装方法" tabindex="-1">安装方法 <a class="header-anchor" href="#安装方法" aria-label="Permalink to &quot;安装方法&quot;">​</a></h4><p>以下是主流 Linux 发行版的安装命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Arch Linux</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Sy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rocm-smi-lib</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Debian / Ubuntu</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rocm-smi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Fedora / RHEL 8+</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dnf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rocm-smi</span></span></code></pre></div><h4 id="手动安装-rocm-smi-lib" tabindex="-1">手动安装 <code>rocm_smi_lib</code> <a class="header-anchor" href="#手动安装-rocm-smi-lib" aria-label="Permalink to &quot;手动安装 \`rocm_smi_lib\`&quot;">​</a></h4><p>如果您的系统没有 <code>rocm-smi</code> 的预打包版本，则需要手动编译安装 <code>rocm_smi_lib</code>。</p><h5 id="环境依赖" tabindex="-1">环境依赖 <a class="header-anchor" href="#环境依赖" aria-label="Permalink to &quot;环境依赖&quot;">​</a></h5><p>确保已安装以下工具：</p><ul><li><code>git</code></li><li><code>cmake</code></li><li><code>gcc</code></li></ul><h5 id="安装步骤" tabindex="-1">安装步骤 <a class="header-anchor" href="#安装步骤" aria-label="Permalink to &quot;安装步骤&quot;">​</a></h5><ol><li><p><strong>Clone 仓库</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/ROCm/rocm_smi_lib</span></span></code></pre></div></li><li><p><strong>编译并安装</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rocm_smi_lib</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ..</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -j</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nproc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装库文件和头文件，默认安装到 /opt/rocm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div></li></ol>`,31),t=[n];function h(p,d,o,r,c,k){return i(),s("div",null,t)}const F=a(l,[["render",h]]);export{u as __pageData,F as default};