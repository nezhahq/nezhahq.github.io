import{_ as n,c as s,o as a,a as e}from"./app.54944ef9.js";const h='{"title":"Theming","description":"","frontmatter":{},"headers":[{"level":2,"title":"Using a Custom Theme","slug":"using-a-custom-theme"},{"level":2,"title":"Extending the Default Theme","slug":"extending-the-default-theme"},{"level":3,"title":"Registering Global Components","slug":"registering-global-components"},{"level":3,"title":"Customizing CSS","slug":"customizing-css"},{"level":3,"title":"Layout Slots","slug":"layout-slots"}],"relativePath":"guide/theming.md","lastUpdated":1652768268000}',t={},o=e(`<h1 id="theming" tabindex="-1">Theming <a class="header-anchor" href="#theming" aria-hidden="true">#</a></h1><h2 id="using-a-custom-theme" tabindex="-1">Using a Custom Theme <a class="header-anchor" href="#using-a-custom-theme" aria-hidden="true">#</a></h2><p>You can enable a custom theme by adding the <code>.vitepress/theme/index.js</code> file (the &quot;theme entry file&quot;).</p><div class="language-bash"><pre><code><span class="token builtin class-name">.</span>
\u251C\u2500 docs
\u2502  \u251C\u2500 .vitepress
\u2502  \u2502  \u251C\u2500 theme
\u2502  \u2502  \u2502  \u2514\u2500 index.js
\u2502  \u2502  \u2514\u2500 config.js
\u2502  \u2514\u2500 index.md
\u2514\u2500 package.json
</code></pre></div><p>A VitePress custom theme is simply an object containing three properties and is defined as follows:</p><div class="language-ts"><pre><code><span class="token keyword">interface</span> <span class="token class-name">Theme</span> <span class="token punctuation">{</span>
  Layout<span class="token operator">:</span> Component <span class="token comment">// Vue 3 component</span>
  NotFound<span class="token operator">?</span><span class="token operator">:</span> Component
  enhanceApp<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>ctx<span class="token operator">:</span> EnhanceAppContext<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">EnhanceAppContext</span> <span class="token punctuation">{</span>
  app<span class="token operator">:</span> App <span class="token comment">// Vue 3 app instance</span>
  router<span class="token operator">:</span> Router <span class="token comment">// VitePress router instance</span>
  siteData<span class="token operator">:</span> Ref<span class="token operator">&lt;</span>SiteData<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The theme entry file should export the theme as its default export:</p><div class="language-js"><pre><code><span class="token comment">// .vitepress/theme/index.js</span>
<span class="token keyword">import</span> Layout <span class="token keyword">from</span> <span class="token string">&#39;./Layout.vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  Layout<span class="token punctuation">,</span>
  <span class="token function-variable function">NotFound</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&#39;custom 404&#39;</span><span class="token punctuation">,</span> <span class="token comment">// &lt;- this is a Vue 3 functional component</span>
  <span class="token function">enhanceApp</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> app<span class="token punctuation">,</span> router<span class="token punctuation">,</span> siteData <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// app is the Vue 3 app instance from \`createApp()\`. router is VitePress&#39;</span>
    <span class="token comment">// custom router. \`siteData\` is a \`ref\` of current site-level metadata.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>...where the <code>Layout</code> component could look like this:</p><div class="language-vue"><pre><code><span class="token comment">&lt;!-- .vitepress/theme/Layout.vue --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Custom Layout!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Content</span> <span class="token punctuation">/&gt;</span></span><span class="token comment">&lt;!-- this is where markdown content will be rendered --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>The default export is the only contract for a custom theme. Inside your custom theme, it works just like a normal Vite + Vue 3 application. Do note the theme also needs to be <a href="./using-vue.html#browser-api-access-restrictions">SSR-compatible</a>.</p><p>To distribute a theme, simply export the object in your package entry. To consume an external theme, import and re-export it from the custom theme entry:</p><div class="language-js"><pre><code><span class="token comment">// .vitepress/theme/index.js</span>
<span class="token keyword">import</span> Theme <span class="token keyword">from</span> <span class="token string">&#39;awesome-vitepress-theme&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> Theme
</code></pre></div><h2 id="extending-the-default-theme" tabindex="-1">Extending the Default Theme <a class="header-anchor" href="#extending-the-default-theme" aria-hidden="true">#</a></h2><p>If you want to extend and customize the default theme, you can import it from <code>vitepress/theme</code> and augment it in a custom theme entry. Here are some examples of common customizations:</p><h3 id="registering-global-components" tabindex="-1">Registering Global Components <a class="header-anchor" href="#registering-global-components" aria-hidden="true">#</a></h3><div class="language-js"><pre><code><span class="token comment">// .vitepress/theme/index.js</span>
<span class="token keyword">import</span> DefaultTheme <span class="token keyword">from</span> <span class="token string">&#39;vitepress/theme&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>DefaultTheme<span class="token punctuation">,</span>
  <span class="token function">enhanceApp</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> app <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// register global components</span>
    app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;MyGlobalComponent&#39;</span> <span class="token comment">/* ... */</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Since we are using Vite, you can also leverage Vite&#39;s <a href="https://vitejs.dev/guide/features.html#glob-import" target="_blank" rel="noopener noreferrer">glob import feature</a> to auto register a directory of components.</p><h3 id="customizing-css" tabindex="-1">Customizing CSS <a class="header-anchor" href="#customizing-css" aria-hidden="true">#</a></h3><p>The default theme CSS is customizable by overriding root level CSS variables:</p><div class="language-js"><pre><code><span class="token comment">// .vitepress/theme/index.js</span>
<span class="token keyword">import</span> DefaultTheme <span class="token keyword">from</span> <span class="token string">&#39;vitepress/theme&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./custom.css&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> DefaultTheme
</code></pre></div><div class="language-css"><pre><code><span class="token comment">/* .vitepress/theme/custom.css */</span>
<span class="token selector">:root</span> <span class="token punctuation">{</span>
  <span class="token property">--c-brand</span><span class="token punctuation">:</span> #646cff<span class="token punctuation">;</span>
  <span class="token property">--c-brand-light</span><span class="token punctuation">:</span> #747bff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>See <a href="https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css" target="_blank" rel="noopener noreferrer">default theme CSS variables</a> that can be overridden.</p><h3 id="layout-slots" tabindex="-1">Layout Slots <a class="header-anchor" href="#layout-slots" aria-hidden="true">#</a></h3><p>The default theme&#39;s <code>&lt;Layout/&gt;</code> component has a few slots that can be used to inject content at certain locations of the page. Here&#39;s an example of injecting a component into the top of the sidebar:</p><div class="language-js"><pre><code><span class="token comment">// .vitepress/theme/index.js</span>
<span class="token keyword">import</span> DefaultTheme <span class="token keyword">from</span> <span class="token string">&#39;vitepress/theme&#39;</span>
<span class="token keyword">import</span> MyLayout <span class="token keyword">from</span> <span class="token string">&#39;./MyLayout.vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>DefaultTheme<span class="token punctuation">,</span>
  <span class="token comment">// override the Layout with a wrapper component that injects the slots</span>
  <span class="token literal-property property">Layout</span><span class="token operator">:</span> MyLayout
<span class="token punctuation">}</span>
</code></pre></div><div class="language-vue"><pre><code><span class="token comment">&lt;!--.vitepress/theme/MyLayout.vue--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> DefaultTheme <span class="token keyword">from</span> <span class="token string">&#39;vitepress/theme&#39;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> Layout <span class="token punctuation">}</span> <span class="token operator">=</span> DefaultTheme
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Layout</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#sidebar-top</span><span class="token punctuation">&gt;</span></span>My custom sidebar top content<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Layout</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Full list of slots available in the default theme layout:</p><ul><li><code>navbar-search</code></li><li><code>sidebar-top</code></li><li><code>sidebar-bottom</code></li><li><code>page-top-ads</code></li><li><code>page-top</code></li><li><code>page-bottom</code></li><li><code>page-bottom-ads</code></li><li>Only when <code>home: true</code> is enabled via frontmatter: <ul><li><code>home-hero</code></li><li><code>home-features</code></li><li><code>home-footer</code></li></ul></li></ul>`,29),p=[o];function c(l,i,r,u,k,d){return a(),s("div",null,p)}var g=n(t,[["render",c]]);export{h as __pageData,g as default};
