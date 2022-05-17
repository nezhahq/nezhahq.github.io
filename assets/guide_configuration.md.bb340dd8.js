import{_ as n,c as s,o as e,a}from"./app.54944ef9.js";const h='{"title":"Configuration","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overview","slug":"overview"},{"level":2,"title":"Config Intellisense","slug":"config-intellisense"},{"level":2,"title":"Typed Theme Config","slug":"typed-theme-config"}],"relativePath":"guide/configuration.md","lastUpdated":1652768268000}',t={},o=a(`<h1 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-hidden="true">#</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>Without any configuration, the page is pretty minimal, and the user has no way to navigate around the site. To customize your site, let\u2019s first create a <code>.vitepress</code> directory inside your docs directory. This is where all VitePress-specific files will be placed. Your project structure is probably like this:</p><div class="language-bash"><pre><code><span class="token builtin class-name">.</span>
\u251C\u2500 docs
\u2502  \u251C\u2500 .vitepress
\u2502  \u2502  \u2514\u2500 config.js
\u2502  \u2514\u2500 index.md
\u2514\u2500 package.json
</code></pre></div><p>The essential file for configuring a VitePress site is <code>.vitepress/config.js</code>, which should export a JavaScript object:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Hello VitePress&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;Just playing around.&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Check out the <a href="./../config/basics.html">Config Reference</a> for a full list of options.</p><h2 id="config-intellisense" tabindex="-1">Config Intellisense <a class="header-anchor" href="#config-intellisense" aria-hidden="true">#</a></h2><p>Since VitePress ships with TypeScript typings, you can leverage your IDE&#39;s intellisense with jsdoc type hints:</p><div class="language-js"><pre><code><span class="token comment">/**
 * @type {import(&#39;vitepress&#39;).UserConfig}
 */</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> config
</code></pre></div><p>Alternatively, you can use the <code>defineConfig</code> helper at which should provide intellisense without the need for jsdoc annotations:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vitepress&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>VitePress also directly supports TS config files. You can use <code>.vitepress/config.ts</code> with the <code>defineConfig</code> helper as well.</p><h2 id="typed-theme-config" tabindex="-1">Typed Theme Config <a class="header-anchor" href="#typed-theme-config" aria-hidden="true">#</a></h2><p>By default, <code>defineConfig</code> helper leverages the theme config type from default theme:</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vitepress&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// Type is \`DefaultTheme.Config\`</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>If you use a custom theme and want type checks for the theme config, you&#39;ll need to use <code>defineConfigWithTheme</code> instead, and pass the config type for your custom theme via a generic argument:</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfigWithTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vitepress&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ThemeConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;your-theme&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token generic-function"><span class="token function">defineConfigWithTheme</span><span class="token generic class-name"><span class="token operator">&lt;</span>ThemeConfig<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// Type is \`ThemeConfig\`</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,18),p=[o];function i(c,r,l,d,u,f){return e(),s("div",null,p)}var g=n(t,[["render",i]]);export{h as __pageData,g as default};
