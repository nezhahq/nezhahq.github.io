import{_ as a,c as n,o as s,a as e}from"./app.54944ef9.js";const y='{"title":"Theme Config: Algolia Search","description":"","frontmatter":{},"headers":[{"level":2,"title":"Internationalization (i18n)","slug":"internationalization-i18n"}],"relativePath":"config/algolia-search.md","lastUpdated":1652768268000}',t={},p=e(`<h1 id="theme-config-algolia-search" tabindex="-1">Theme Config: Algolia Search <a class="header-anchor" href="#theme-config-algolia-search" aria-hidden="true">#</a></h1><p>The <code>themeConfig.algolia</code> option allows you to use <a href="https://docsearch.algolia.com" target="_blank" rel="noopener noreferrer">Algolia DocSearch</a>. To enable it, you need to provide at least appId, apiKey and indexName:</p><div class="language-js"><pre><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">algolia</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">appId</span><span class="token operator">:</span> <span class="token string">&#39;your_app_id&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&#39;your_api_key&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">indexName</span><span class="token operator">:</span> <span class="token string">&#39;index_name&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>For more options, check out <a href="https://docsearch.algolia.com/docs/api/" target="_blank" rel="noopener noreferrer">Algolia DocSearch&#39;s documentation</a>. You can pass any extra option alongside other options, e.g. passing <code>searchParameters</code>:</p><div class="language-js"><pre><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">algolia</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">appId</span><span class="token operator">:</span> <span class="token string">&#39;your_app_id&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&#39;your_api_key&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">indexName</span><span class="token operator">:</span> <span class="token string">&#39;index_name&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">searchParameters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">facetFilters</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;tags:guide,api&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="internationalization-i18n" tabindex="-1">Internationalization (i18n) <a class="header-anchor" href="#internationalization-i18n" aria-hidden="true">#</a></h2><p>If you have multiple locales in your documentation and you have defined a <code>locales</code> object in your <code>themeConfig</code>:</p><div class="language-js"><pre><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">locales</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">algolia</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">appId</span><span class="token operator">:</span> <span class="token string">&#39;your_app_id&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&#39;your_api_key&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">indexName</span><span class="token operator">:</span> <span class="token string">&#39;index_name&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>VitePress will automatically add a <code>lang</code> <em>facetFilter</em> to the <code>searchParameters.facetFilter</code> array with the correct language value. Algolia automatically adds the correct facet filter based on the <code>lang</code> attribute on the <code>&lt;html&gt;</code> tag. This will match search results with the currently viewed language of the page.</p>`,9),o=[p];function r(l,c,i,u,k,d){return s(),n("div",null,o)}var g=a(t,[["render",r]]);export{y as __pageData,g as default};
