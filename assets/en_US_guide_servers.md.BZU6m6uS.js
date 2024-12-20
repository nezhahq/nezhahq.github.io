import{_ as s,c as a,o as i,a4 as e}from"./chunks/framework.BmdFiWrL.js";const g=JSON.parse('{"title":"Servers","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en_US/guide/servers.md","filePath":"en_US/guide/servers.md","lastUpdated":1734688054000}'),t={name:"en_US/guide/servers.md"},n=e(`<h1 id="servers" tabindex="-1">Servers <a class="header-anchor" href="#servers" aria-label="Permalink to &quot;Servers&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The <strong>Servers</strong> section is responsible for managing Agents, serving as the core foundation for Nezha monitoring and enabling additional functionalities.</p><hr><h2 id="installation-commands" tabindex="-1">Installation Commands <a class="header-anchor" href="#installation-commands" aria-label="Permalink to &quot;Installation Commands&quot;">​</a></h2><p>Refer to the <a href="/en_US/guide/agent.html">Agent Installation Guide</a>.<br> The recommended approach is <strong>one-click installation</strong>:</p><ol><li>Configure the necessary parameters.</li><li>Navigate to the servers page in the Dashboard and click the <code>Installation Command</code> icon.</li><li>Copy the generated installation command and run it on the target server to complete the setup.</li></ol><hr><h2 id="forced-updates" tabindex="-1">Forced Updates <a class="header-anchor" href="#forced-updates" aria-label="Permalink to &quot;Forced Updates&quot;">​</a></h2><p>Agent update behavior is controlled by the following parameters:</p><ul><li><code>disable-auto-update</code>: Disables automatic updates.</li><li><code>disable-force-update</code>: Disables forced updates.</li></ul><h3 id="default-behavior" tabindex="-1">Default Behavior <a class="header-anchor" href="#default-behavior" aria-label="Permalink to &quot;Default Behavior&quot;">​</a></h3><p>By default, the Agent updates automatically without manual intervention.</p><h3 id="manual-forced-updates" tabindex="-1">Manual Forced Updates <a class="header-anchor" href="#manual-forced-updates" aria-label="Permalink to &quot;Manual Forced Updates&quot;">​</a></h3><p>If automatic updates are disabled, you can manually update the Agent by selecting the target server and executing a <strong>forced update</strong>.<br><strong>Note</strong>: If the <code>disable-force-update</code> parameter is enabled, forced updates will not work.</p><hr><h2 id="data-column-descriptions" tabindex="-1">Data Column Descriptions <a class="header-anchor" href="#data-column-descriptions" aria-label="Permalink to &quot;Data Column Descriptions&quot;">​</a></h2><p>The servers page in the Dashboard displays the following fields:</p><ul><li><strong>Version</strong>: Displays the current Agent version.</li><li><strong>Enable DDNS</strong>: <code>True</code> indicates that the Dashboard will automatically update DNS records if the server&#39;s IP changes.</li><li><strong>Hidden from Guests</strong>: <code>True</code> hides the server from guest users in the Dashboard.</li><li><strong>Remarks</strong>: <ul><li><strong>Private Remarks</strong>: Visible only to authenticated users.</li><li><strong>Public Remarks</strong>: Visible to all users, suitable for displaying general information.</li><li>Users can customize remarks based on their needs. Refer to <a href="#public-remarks-configuration">Public Remarks Configuration</a> for details.</li></ul></li><li><strong>Command Line</strong>: Provides access to WebShell and the File manager. Users can remotely execute commands, manage files, and upload/download files directly through the Dashboard.</li></ul><hr><h2 id="webshell" tabindex="-1">WebShell <a class="header-anchor" href="#webshell" aria-label="Permalink to &quot;WebShell&quot;">​</a></h2><p>The WebShell feature allows users to remotely access the server&#39;s command-line interface through the Dashboard. It supports both Linux and Windows systems.</p><ul><li><strong>Quick Commands</strong>: Use <code>Ctrl+Shift+V</code> to paste commands.</li><li><strong>Restrictions</strong>: If the <code>disable-command-execute</code> parameter is enabled, the WebShell feature will be disabled.</li><li><strong>Connection Issues</strong>: If you encounter connection problems, refer to the <a href="/en_US/guide/q4.html">WebSocket Connection Issues Guide</a> for troubleshooting.</li></ul><hr><h2 id="public-remarks-configuration" tabindex="-1">Public Remarks Configuration <a class="header-anchor" href="#public-remarks-configuration" aria-label="Permalink to &quot;Public Remarks Configuration&quot;">​</a></h2><p>Nezha monitoring allows users to configure and display custom public information on the Dashboard, such as billing details or traffic information.</p><hr><h3 id="configuration-example" tabindex="-1">Configuration Example <a class="header-anchor" href="#configuration-example" aria-label="Permalink to &quot;Configuration Example&quot;">​</a></h3><p>Below is a JSON configuration example for public remarks:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;billingDataMod&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;startDate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2024-12-08T12:58:17.636Z&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;endDate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2024-12-08T12:58:17.636Z&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,   </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;autoRenewal&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                     </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;cycle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Year&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                        </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;amount&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;200EUR&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;planDataMod&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;bandwidth&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;30Mbps&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                  </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;trafficVol&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1TB/Month&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,              </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;trafficType&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                    </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;IPv4&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                            </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;IPv6&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                            </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;networkRoute&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;4837&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                 </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;extra&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Einstein&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="field-descriptions" tabindex="-1">Field Descriptions <a class="header-anchor" href="#field-descriptions" aria-label="Permalink to &quot;Field Descriptions&quot;">​</a></h4><ol><li><p><strong>Billing Information (<code>billingDataMod</code>)</strong>:</p><ul><li><strong><code>startDate</code></strong>: Start date of the billing period (ISO format).</li><li><strong><code>endDate</code></strong>: End date of the billing period (ISO format).</li><li><strong><code>autoRenewal</code></strong>: Automatic renewal status, <code>1</code> for enabled.</li><li><strong><code>cycle</code></strong>: Billing cycle (e.g., <code>Month</code>, <code>Year</code>).</li><li><strong><code>amount</code></strong>: Billing amount and currency.</li></ul></li><li><p><strong>Traffic and Network Configuration (<code>planDataMod</code>)</strong>:</p><ul><li><strong><code>bandwidth</code></strong>: Server bandwidth information.</li><li><strong><code>trafficVol</code></strong>: Traffic quota and cycle.</li><li><strong><code>trafficType</code></strong>: Traffic type, <code>1</code> for inbound only, <code>2</code> for both inbound and outbound.</li><li><strong><code>IPv4</code> / <code>IPv6</code></strong>: Number of supported IPv4 or IPv6 addresses.</li><li><strong><code>networkRoute</code></strong>: Network route information (e.g., AS4837).</li><li><strong><code>extra</code></strong>: Additional remarks for custom information.</li></ul></li></ol><hr><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>Use Tools for Easy Configuration</strong><br> If you&#39;re unfamiliar with JSON configuration, you can use a third-party generator to quickly create public remarks:<br><a href="https://nezhainfojson.pages.dev/" target="_blank" rel="noreferrer">Public Remarks Generator</a></p><p>Copy the generated JSON into the corresponding public remarks section in the Dashboard and save the changes to display the information on the Dashboard front end.</p></div>`,34),o=[n];function l(r,h,d,p,c,u){return i(),a("div",null,o)}const E=s(t,[["render",l]]);export{g as __pageData,E as default};