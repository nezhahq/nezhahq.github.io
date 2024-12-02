import{_ as e,c as a,o,a4 as l}from"./chunks/framework.BmdFiWrL.js";const u=JSON.parse('{"title":"l10n 本地化开发指南","description":"","frontmatter":{},"headers":[],"relativePath":"developer/l10n.md","filePath":"developer/l10n.md","lastUpdated":1733103039000}'),t={name:"developer/l10n.md"},r=l('<h1 id="l10n-本地化开发指南" tabindex="-1">l10n 本地化开发指南 <a class="header-anchor" href="#l10n-本地化开发指南" aria-label="Permalink to &quot;l10n 本地化开发指南&quot;">​</a></h1><p><strong>哪吒监控的 Dashboard 已经添加本地化，支持多个语言，你可以在开发新功能时遵循以下步骤来支持本地化</strong></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><ol><li>你可以直接使用 <code>/resource/l10n/zh-CN.toml</code> 中已有的文本配置来替换新功能中的文本</li><li>如果新功能中有新增文本，请参考 <code>zh-CN.toml</code> 的配置文本，将新文本拉取到 <code>zh-CN.toml</code> 等其他语言的配置文件中，并添加翻译</li></ol><h2 id="新本地化文本的添加" tabindex="-1">新本地化文本的添加 <a class="header-anchor" href="#新本地化文本的添加" aria-label="Permalink to &quot;新本地化文本的添加&quot;">​</a></h2><ol><li>在 <code>/resource/l10n/</code> 中添加新的语言文本配置</li><li>在新的语言文本配置中拉取其他语言已有的文本配置</li><li>为新的语言文本配置添加翻译</li></ol>',6),n=[r];function d(c,i,s,_,h,p){return o(),a("div",null,n)}const f=e(t,[["render",d]]);export{u as __pageData,f as default};