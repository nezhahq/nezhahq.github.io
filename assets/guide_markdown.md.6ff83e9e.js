import{_ as a,c as e,o as t,a as o}from"./app.54944ef9.js";var n="/assets/line-numbers-mobile.f5ca96ee.gif",s="/assets/line-numbers-desktop.cc304762.png";const v='{"title":"Markdown Extensions","description":"","frontmatter":{"sidebarDepth":3},"headers":[{"level":2,"title":"Header Anchors","slug":"header-anchors"},{"level":2,"title":"Links","slug":"links"},{"level":3,"title":"Internal Links","slug":"internal-links"},{"level":3,"title":"Page Suffix","slug":"page-suffix"},{"level":3,"title":"External Links","slug":"external-links"},{"level":2,"title":"Frontmatter","slug":"frontmatter"},{"level":2,"title":"GitHub-Style Tables","slug":"github-style-tables"},{"level":2,"title":"Emoji \u{1F389}","slug":"emoji"},{"level":2,"title":"Table of Contents","slug":"table-of-contents"},{"level":2,"title":"Custom Containers","slug":"custom-containers"},{"level":3,"title":"Default Title","slug":"default-title"},{"level":3,"title":"Custom Title","slug":"custom-title"},{"level":2,"title":"Syntax Highlighting in Code Blocks","slug":"syntax-highlighting-in-code-blocks"},{"level":2,"title":"Line Highlighting in Code Blocks","slug":"line-highlighting-in-code-blocks"},{"level":2,"title":"Line Numbers","slug":"line-numbers"},{"level":2,"title":"Import Code Snippets","slug":"import-code-snippets"},{"level":2,"title":"Advanced Configuration","slug":"advanced-configuration"}],"relativePath":"guide/markdown.md","lastUpdated":1652768268000}',p={},i=n,l=s,r=o(`<h1 id="markdown-extensions" tabindex="-1">Markdown Extensions <a class="header-anchor" href="#markdown-extensions" aria-hidden="true">#</a></h1><h2 id="header-anchors" tabindex="-1">Header Anchors <a class="header-anchor" href="#header-anchors" aria-hidden="true">#</a></h2><p>Headers automatically get anchor links applied. Rendering of anchors can be configured using the <code>markdown.anchor</code> option.</p><h2 id="links" tabindex="-1">Links <a class="header-anchor" href="#links" aria-hidden="true">#</a></h2><h3 id="internal-links" tabindex="-1">Internal Links <a class="header-anchor" href="#internal-links" aria-hidden="true">#</a></h3><p>Internal links are converted to router link for SPA navigation. Also, every <code>index.md</code> contained in each sub-directory will automatically be converted to <code>index.html</code>, with corresponding URL <code>/</code>.</p><p>For example, given the following directory structure:</p><div class="language-"><pre><code>.
\u251C\u2500 index.md
\u251C\u2500 foo
\u2502  \u251C\u2500 index.md
\u2502  \u251C\u2500 one.md
\u2502  \u2514\u2500 two.md
\u2514\u2500 bar
   \u251C\u2500 index.md
   \u251C\u2500 three.md
   \u2514\u2500 four.md
</code></pre></div><p>And providing you are in <code>foo/one.md</code>:</p><div class="language-md"><pre><code><span class="token url">[<span class="token content">Home</span>](<span class="token url">/</span>)</span> <span class="token comment">&lt;!-- sends the user to the root index.md --&gt;</span>
<span class="token url">[<span class="token content">foo</span>](<span class="token url">/foo/</span>)</span> <span class="token comment">&lt;!-- sends the user to index.html of directory foo --&gt;</span>
<span class="token url">[<span class="token content">foo heading</span>](<span class="token url">./#heading</span>)</span> <span class="token comment">&lt;!-- anchors user to a heading in the foo index file --&gt;</span>
<span class="token url">[<span class="token content">bar - three</span>](<span class="token url">../bar/three</span>)</span> <span class="token comment">&lt;!-- you can omit extention --&gt;</span>
<span class="token url">[<span class="token content">bar - three</span>](<span class="token url">../bar/three.md</span>)</span> <span class="token comment">&lt;!-- you can append .md --&gt;</span>
<span class="token url">[<span class="token content">bar - four</span>](<span class="token url">../bar/four.html</span>)</span> <span class="token comment">&lt;!-- or you can append .html --&gt;</span>
</code></pre></div><h3 id="page-suffix" tabindex="-1">Page Suffix <a class="header-anchor" href="#page-suffix" aria-hidden="true">#</a></h3><p>Pages and internal links get generated with the <code>.html</code> suffix by default.</p><h3 id="external-links" tabindex="-1">External Links <a class="header-anchor" href="#external-links" aria-hidden="true">#</a></h3><p>Outbound links automatically get <code>target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;</code>:</p><ul><li><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">vuejs.org</a></li><li><a href="https://github.com/vuejs/vitepress" target="_blank" rel="noopener noreferrer">VitePress on GitHub</a></li></ul><h2 id="frontmatter" tabindex="-1">Frontmatter <a class="header-anchor" href="#frontmatter" aria-hidden="true">#</a></h2><p><a href="https://jekyllrb.com/docs/front-matter/" target="_blank" rel="noopener noreferrer">YAML frontmatter</a> is supported out of the box:</p><div class="language-yaml"><pre><code><span class="token punctuation">---</span>
<span class="token key atrule">title</span><span class="token punctuation">:</span> Blogging Like a Hacker
<span class="token key atrule">lang</span><span class="token punctuation">:</span> en<span class="token punctuation">-</span>US
<span class="token punctuation">---</span>
</code></pre></div><p>This data will be available to the rest of the page, along with all custom and theming components.</p><p>For more details, see <a href="./frontmatter.html">Frontmatter</a>.</p><h2 id="github-style-tables" tabindex="-1">GitHub-Style Tables <a class="header-anchor" href="#github-style-tables" aria-hidden="true">#</a></h2><p><strong>Input</strong></p><div class="language-"><pre><code>| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
</code></pre></div><p><strong>Output</strong></p><table><thead><tr><th>Tables</th><th style="text-align:center;">Are</th><th style="text-align:right;">Cool</th></tr></thead><tbody><tr><td>col 3 is</td><td style="text-align:center;">right-aligned</td><td style="text-align:right;">$1600</td></tr><tr><td>col 2 is</td><td style="text-align:center;">centered</td><td style="text-align:right;">$12</td></tr><tr><td>zebra stripes</td><td style="text-align:center;">are neat</td><td style="text-align:right;">$1</td></tr></tbody></table><h2 id="emoji" tabindex="-1">Emoji \u{1F389} <a class="header-anchor" href="#emoji" aria-hidden="true">#</a></h2><p><strong>Input</strong></p><div class="language-"><pre><code>:tada: :100:
</code></pre></div><p><strong>Output</strong></p><p>\u{1F389} \u{1F4AF}</p><p>A <a href="https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json" target="_blank" rel="noopener noreferrer">list of all emojis</a> is available.</p><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-hidden="true">#</a></h2><p><strong>Input</strong></p><div class="language-"><pre><code>[[toc]]
</code></pre></div><p><strong>Output</strong></p><p><div class="table-of-contents"><ul><li><a href="#header-anchors">Header Anchors</a></li><li><a href="#links">Links</a><ul><li><a href="#internal-links">Internal Links</a></li><li><a href="#page-suffix">Page Suffix</a></li><li><a href="#external-links">External Links</a></li></ul></li><li><a href="#frontmatter">Frontmatter</a></li><li><a href="#github-style-tables">GitHub-Style Tables</a></li><li><a href="#emoji">Emoji</a></li><li><a href="#table-of-contents">Table of Contents</a></li><li><a href="#custom-containers">Custom Containers</a><ul><li><a href="#default-title">Default Title</a></li><li><a href="#custom-title">Custom Title</a></li></ul></li><li><a href="#syntax-highlighting-in-code-blocks">Syntax Highlighting in Code Blocks</a></li><li><a href="#line-highlighting-in-code-blocks">Line Highlighting in Code Blocks</a></li><li><a href="#line-numbers">Line Numbers</a></li><li><a href="#import-code-snippets">Import Code Snippets</a></li><li><a href="#advanced-configuration">Advanced Configuration</a></li></ul></div></p><p>Rendering of the TOC can be configured using the <code>markdown.toc</code> option.</p><h2 id="custom-containers" tabindex="-1">Custom Containers <a class="header-anchor" href="#custom-containers" aria-hidden="true">#</a></h2><p>Custom containers can be defined by their types, titles, and contents.</p><h3 id="default-title" tabindex="-1">Default Title <a class="header-anchor" href="#default-title" aria-hidden="true">#</a></h3><p><strong>Input</strong></p><div class="language-md"><pre><code>::: tip
This is a tip
:::

::: info
This is an info box
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in Internet Explorer or old versions of Edge.
:::
</code></pre></div><p><strong>Output</strong></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>This is a tip</p></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>This is an info box</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This is a warning</p></div><div class="danger custom-block"><p class="custom-block-title">WARNING</p><p>This is a dangerous warning</p></div><details class="details custom-block"><p>This is a details block, which does not work in Internet Explorer or Edge.</p></details><h3 id="custom-title" tabindex="-1">Custom Title <a class="header-anchor" href="#custom-title" aria-hidden="true">#</a></h3><p><strong>Input</strong></p><div class="language-md"><pre><code>::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello, VitePress!&#39;</span><span class="token punctuation">)</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre></div><p><strong>Output</strong></p><div class="danger custom-block"><p class="custom-block-title">STOP</p><p>Danger zone, do not proceed</p></div><details class="details custom-block"><summary>Click me to view the code</summary><div class="language-js"><pre><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello, VitePress!&#39;</span><span class="token punctuation">)</span>
</code></pre></div></details><h2 id="syntax-highlighting-in-code-blocks" tabindex="-1">Syntax Highlighting in Code Blocks <a class="header-anchor" href="#syntax-highlighting-in-code-blocks" aria-hidden="true">#</a></h2><p>VitePress uses <a href="https://prismjs.com" target="_blank" rel="noopener noreferrer">Prism</a> to highlight language syntax in Markdown code blocks, using coloured text. Prism supports a wide variety of programming languages. All you need to do is append a valid language alias to the beginning backticks for the code block:</p><p><strong>Input</strong></p><div class="language-"><pre><code>\`\`\`js
export default {
  name: &#39;MyComponent&#39;,
  // ...
}
\`\`\`
</code></pre></div><p><strong>Output</strong></p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;MyComponent&#39;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>Input</strong></p><div class="language-"><pre><code>\`\`\`html
&lt;ul&gt;
  &lt;li v-for=&quot;todo in todos&quot; :key=&quot;todo.id&quot;&gt;
    {{ todo.text }}
  &lt;/li&gt;
&lt;/ul&gt;
\`\`\`
</code></pre></div><p><strong>Output</strong></p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>todo in todos<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>todo.id<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ todo.text }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>A <a href="https://prismjs.com/#languages-list" target="_blank" rel="noopener noreferrer">list of valid languages</a> is available on Prism\u2019s site.</p><h2 id="line-highlighting-in-code-blocks" tabindex="-1">Line Highlighting in Code Blocks <a class="header-anchor" href="#line-highlighting-in-code-blocks" aria-hidden="true">#</a></h2><p><strong>Input</strong></p><div class="language-"><pre><code>\`\`\`js{4}
export default {
  data () {
    return {
      msg: &#39;Highlighted!&#39;
    }
  }
}
\`\`\`
</code></pre></div><p><strong>Output</strong></p><div class="language-js"><div class="highlight-lines"><br><br><br><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Highlighted!&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>In addition to a single line, you can also specify multiple single lines, ranges, or both:</p><ul><li>Line ranges: for example <code>{5-8}</code>, <code>{3-10}</code>, <code>{10-17}</code></li><li>Multiple single lines: for example <code>{4,7,9}</code></li><li>Line ranges and single lines: for example <code>{4,7-13,16,23-27,40}</code></li></ul><p><strong>Input</strong></p><div class="language-"><pre><code>\`\`\`js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: \`Highlighted!
      This line isn&#39;t highlighted,
      but this and the next 2 are.\`,
      motd: &#39;VitePress is awesome&#39;,
      lorem: &#39;ipsum&#39;,
    }
  }
}
\`\`\`
</code></pre></div><p><strong>Output</strong></p><div class="language-js"><div class="highlight-lines"><div class="highlighted">\xA0</div><br><br><div class="highlighted">\xA0</div><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span> <span class="token comment">// Highlighted</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Highlighted!
      This line isn&#39;t highlighted,
      but this and the next 2 are.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">motd</span><span class="token operator">:</span> <span class="token string">&#39;VitePress is awesome&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">lorem</span><span class="token operator">:</span> <span class="token string">&#39;ipsum&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="line-numbers" tabindex="-1">Line Numbers <a class="header-anchor" href="#line-numbers" aria-hidden="true">#</a></h2><p>You can enable line numbers for each code blocks via config:</p><div class="language-js"><pre><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lineNumbers</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>Demo:</li></ul><picture><source srcset="`+i+'" media="(max-width: 719px)"><img class="line-numbers-mobile-snap" src="'+n+'" alt="Image"></picture><picture><source srcset="'+l+'" media="(min-width: 720px)"><img class="line-numbers-desktop-snap" src="'+s+`" alt="Image"></picture><h2 id="import-code-snippets" tabindex="-1">Import Code Snippets <a class="header-anchor" href="#import-code-snippets" aria-hidden="true">#</a></h2><p>You can import code snippets from existing files via following syntax:</p><div class="language-md"><pre><code>&lt;&lt;&lt; @/filepath
</code></pre></div><p>It also supports <a href="#line-highlighting-in-code-blocks">line highlighting</a>:</p><div class="language-md"><pre><code>&lt;&lt;&lt; @/filepath{highlightLines}
</code></pre></div><p><strong>Input</strong></p><div class="language-md"><pre><code>&lt;&lt;&lt; @/snippets/snippet.js{2}
</code></pre></div><p><strong>Code file</strong></p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>Output</strong></p><div class="language-js"><div class="highlight-lines"><br><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>The value of <code>@</code> corresponds to the source root. By default it&#39;s the VitePress project root, unless <code>srcDir</code> is configured.</p></div><p>You can also use a <a href="https://code.visualstudio.com/docs/editor/codebasics#_folding" target="_blank" rel="noopener noreferrer">VS Code region</a> to only include the corresponding part of the code file. You can provide a custom region name after a <code>#</code> following the filepath (<code>snippet</code> by default):</p><p><strong>Input</strong></p><div class="language-md"><pre><code>&lt;&lt;&lt; @/snippets/snippet-with-region.js{1}
</code></pre></div><p><strong>Code file</strong></p><div class="language-js"><pre><code><span class="token comment">// #region snippet</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span>
<span class="token comment">// #endregion snippet</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> foo
</code></pre></div><p><strong>Output</strong></p><div class="language-js"><div class="highlight-lines"><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>
<span class="token punctuation">}</span></code></pre></div><h2 id="advanced-configuration" tabindex="-1">Advanced Configuration <a class="header-anchor" href="#advanced-configuration" aria-hidden="true">#</a></h2><p>VitePress uses <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it</a> as the Markdown renderer. A lot of the extensions above are implemented via custom plugins. You can further customize the <code>markdown-it</code> instance using the <code>markdown</code> option in <code>.vitepress/config.js</code>:</p><div class="language-js"><pre><code><span class="token keyword">const</span> anchor <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;markdown-it-anchor&#39;</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// options for markdown-it-anchor</span>
    <span class="token comment">// https://github.com/valeriangalliat/markdown-it-anchor#permalinks</span>
    <span class="token literal-property property">anchor</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">permalink</span><span class="token operator">:</span> anchor<span class="token punctuation">.</span>permalink<span class="token punctuation">.</span><span class="token function">headerLink</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// options for markdown-it-table-of-contents</span>
    <span class="token literal-property property">toc</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">includeLevel</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token function-variable function">config</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">md</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// use more markdown-it plugins!</span>
      md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;markdown-it-xxx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,104),c=[r];function d(u,g,h,k,m,f){return t(),e("div",null,c)}var y=a(p,[["render",d]]);export{v as __pageData,y as default};
