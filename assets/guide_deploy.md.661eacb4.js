import{_ as e,c as s,o as n,a}from"./app.54944ef9.js";var t="/assets/vercel-configuration.e8badd11.png";const b='{"title":"Deploying","description":"","frontmatter":{"sidebarDepth":3},"headers":[{"level":2,"title":"Building The Docs","slug":"building-the-docs"},{"level":3,"title":"Testing The Docs Locally","slug":"testing-the-docs-locally"},{"level":2,"title":"GitHub Pages","slug":"github-pages"},{"level":3,"title":"GitHub Pages and Travis CI","slug":"github-pages-and-travis-ci"},{"level":2,"title":"GitLab Pages and GitLab CI","slug":"gitlab-pages-and-gitlab-ci"},{"level":2,"title":"Netlify","slug":"netlify"},{"level":2,"title":"Google Firebase","slug":"google-firebase"},{"level":2,"title":"Surge","slug":"surge"},{"level":2,"title":"Heroku","slug":"heroku"},{"level":2,"title":"Vercel","slug":"vercel"}],"relativePath":"guide/deploy.md","lastUpdated":1652768268000}',o={},p=a(`<h1 id="deploying" tabindex="-1">Deploying <a class="header-anchor" href="#deploying" aria-hidden="true">#</a></h1><p>The following guides are based on some shared assumptions:</p><ul><li>You are placing your docs inside the <code>docs</code> directory of your project;</li><li>You are using the default build output location (<code>.vitepress/dist</code>);</li><li>VitePress is installed as a local dependency in your project, and you have setup the following npm scripts:</li></ul><div class="language-json"><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vitepress build docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:serve&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vitepress serve docs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="building-the-docs" tabindex="-1">Building The Docs <a class="header-anchor" href="#building-the-docs" aria-hidden="true">#</a></h2><p>You may run <code>yarn docs:build</code> command to build the docs.</p><div class="language-bash"><pre><code>$ <span class="token function">yarn</span> docs:build
</code></pre></div><p>By default, the build output will be placed at <code>.vitepress/dist</code>. You may deploy this <code>dist</code> folder to any of your preferred platforms.</p><h3 id="testing-the-docs-locally" tabindex="-1">Testing The Docs Locally <a class="header-anchor" href="#testing-the-docs-locally" aria-hidden="true">#</a></h3><p>Once you&#39;ve built the docs, you may test them locally by running <code>yarn docs:serve</code> command.</p><div class="language-bash"><pre><code>$ <span class="token function">yarn</span> docs:build
$ <span class="token function">yarn</span> docs:serve
</code></pre></div><p>The <code>serve</code> command will boot up local static web server that serves the files from <code>.vitepress/dist</code> at <code>http://localhost:5000</code>. It&#39;s an easy way to check if the production build looks OK in your local environment.</p><p>You may configure the port of the server py passing <code>--port</code> flag as an argument.</p><div class="language-json"><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:serve&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vitepress serve docs --port 8080&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Now the <code>docs:serve</code> method will launch the server at <code>http://localhost:8080</code>.</p><h2 id="github-pages" tabindex="-1">GitHub Pages <a class="header-anchor" href="#github-pages" aria-hidden="true">#</a></h2><ol><li><p>Set the correct <code>base</code> in <code>docs/.vitepress/config.js</code>.</p><p>If you are deploying to <code>https://&lt;USERNAME&gt;.github.io/</code>, you can omit <code>base</code> as it defaults to <code>&#39;/&#39;</code>.</p><p>If you are deploying to <code>https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;/</code>, for example your repository is at <code>https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code>, then set <code>base</code> to <code>&#39;/&lt;REPO&gt;/&#39;</code>.</p></li><li><p>Inside your project, create <code>deploy.sh</code> with the following content (with highlighted lines uncommented appropriately), and run it to deploy:</p></li></ol><div class="language-bash"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><div class="highlighted">\xA0</div><br><br><br></div><pre><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># abort on errors</span>
<span class="token builtin class-name">set</span> -e

<span class="token comment"># build</span>
<span class="token function">npm</span> run docs:build

<span class="token comment"># navigate into the build output directory</span>
<span class="token builtin class-name">cd</span> docs/.vitepress/dist

<span class="token comment"># if you are deploying to a custom domain</span>
<span class="token comment"># echo &#39;www.example.com&#39; &gt; CNAME</span>

<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> -A
<span class="token function">git</span> commit -m <span class="token string">&#39;deploy&#39;</span>

<span class="token comment"># if you are deploying to https://&lt;USERNAME&gt;.github.io</span>
<span class="token comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git main</span>

<span class="token comment"># if you are deploying to https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</span>
<span class="token comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git main:gh-pages</span>

<span class="token builtin class-name">cd</span> -
</code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You can also run the above script in your CI setup to enable automatic deployment on each push.</p></div><h3 id="github-pages-and-travis-ci" tabindex="-1">GitHub Pages and Travis CI <a class="header-anchor" href="#github-pages-and-travis-ci" aria-hidden="true">#</a></h3><ol><li><p>Set the correct <code>base</code> in <code>docs/.vitepress/config.js</code>.</p><p>If you are deploying to <code>https://&lt;USERNAME or GROUP&gt;.github.io/</code>, you can omit <code>base</code> as it defaults to <code>&#39;/&#39;</code>.</p><p>If you are deploying to <code>https://&lt;USERNAME or GROUP&gt;.github.io/&lt;REPO&gt;/</code>, for example your repository is at <code>https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code>, then set <code>base</code> to <code>&#39;/&lt;REPO&gt;/&#39;</code>.</p></li><li><p>Create a file named <code>.travis.yml</code> in the root of your project.</p></li><li><p>Run <code>yarn</code> or <code>npm install</code> locally and commit the generated lockfile (that is <code>yarn.lock</code> or <code>package-lock.json</code>).</p></li><li><p>Use the GitHub Pages deploy provider template, and follow the <a href="https://docs.travis-ci.com/user/deployment/pages" target="_blank" rel="noopener noreferrer">Travis CI documentation</a>.</p></li></ol><div class="language-yaml"><pre><code><span class="token key atrule">language</span><span class="token punctuation">:</span> node_js
<span class="token key atrule">node_js</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> lts/*
<span class="token key atrule">install</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> yarn install <span class="token comment"># npm ci</span>
<span class="token key atrule">script</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> yarn docs<span class="token punctuation">:</span>build <span class="token comment"># npm run docs:build</span>
<span class="token key atrule">deploy</span><span class="token punctuation">:</span>
  <span class="token key atrule">provider</span><span class="token punctuation">:</span> pages
  <span class="token key atrule">skip_cleanup</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">local_dir</span><span class="token punctuation">:</span> docs/.vitepress/dist
  <span class="token comment"># A token generated on GitHub allowing Travis to push code on you repository.</span>
  <span class="token comment"># Set in the Travis settings page of your repository, as a secure variable.</span>
  <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $GITHUB_TOKEN
  <span class="token key atrule">keep_history</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">on</span><span class="token punctuation">:</span>
    <span class="token key atrule">branch</span><span class="token punctuation">:</span> main
</code></pre></div><h2 id="gitlab-pages-and-gitlab-ci" tabindex="-1">GitLab Pages and GitLab CI <a class="header-anchor" href="#gitlab-pages-and-gitlab-ci" aria-hidden="true">#</a></h2><ol><li><p>Set the correct <code>base</code> in <code>docs/.vitepress/config.js</code>.</p><p>If you are deploying to <code>https://&lt;USERNAME or GROUP&gt;.gitlab.io/</code>, you can omit <code>base</code> as it defaults to <code>&#39;/&#39;</code>.</p><p>If you are deploying to <code>https://&lt;USERNAME or GROUP&gt;.gitlab.io/&lt;REPO&gt;/</code>, for example your repository is at <code>https://gitlab.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code>, then set <code>base</code> to <code>&#39;/&lt;REPO&gt;/&#39;</code>.</p></li><li><p>Set <code>outDir</code> in <code>.vitepress/config.js</code> to <code>../public</code>.</p></li><li><p>Create a file called <code>.gitlab-ci.yml</code> in the root of your project with the content below. This will build and deploy your site whenever you make changes to your content:</p></li></ol><div class="language-yaml"><pre><code><span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>16.5.0
<span class="token key atrule">pages</span><span class="token punctuation">:</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy
  <span class="token key atrule">cache</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> node_modules/
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> yarn install <span class="token comment"># npm install</span>
    <span class="token punctuation">-</span> yarn docs<span class="token punctuation">:</span>build <span class="token comment"># npm run docs:build</span>
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> public
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
</code></pre></div><h2 id="netlify" tabindex="-1">Netlify <a class="header-anchor" href="#netlify" aria-hidden="true">#</a></h2><ol><li>On <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>, setup up a new project from GitHub with the following settings:</li></ol><ul><li><strong>Build Command:</strong> <code>vitepress build docs</code> or <code>yarn docs:build</code> or <code>npm run docs:build</code></li><li><strong>Publish directory:</strong> <code>docs/.vitepress/dist</code></li></ul><ol start="2"><li>Hit the deploy button.</li></ol><h2 id="google-firebase" tabindex="-1">Google Firebase <a class="header-anchor" href="#google-firebase" aria-hidden="true">#</a></h2><ol><li><p>Make sure you have <a href="https://www.npmjs.com/package/firebase-tools" target="_blank" rel="noopener noreferrer">firebase-tools</a> installed.</p></li><li><p>Create <code>firebase.json</code> and <code>.firebaserc</code> at the root of your project with the following content:</p></li></ol><p><code>firebase.json</code>:</p><div class="language-json"><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;hosting&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;public&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./docs/.vitepress/dist&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;ignore&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>.firebaserc</code>:</p><div class="language-js"><pre><code><span class="token punctuation">{</span>
 <span class="token string-property property">&quot;projects&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token string-property property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;YOUR_FIREBASE_ID&gt;&quot;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="3"><li>After running <code>yarn docs:build</code> or <code>npm run docs:build</code>, deploy using the command <code>firebase deploy</code>.</li></ol><h2 id="surge" tabindex="-1">Surge <a class="header-anchor" href="#surge" aria-hidden="true">#</a></h2><ol><li><p>First install <a href="https://www.npmjs.com/package/surge" target="_blank" rel="noopener noreferrer">surge</a>, if you haven\u2019t already.</p></li><li><p>Run <code>yarn docs:build</code> or <code>npm run docs:build</code>.</p></li><li><p>Deploy to surge by typing <code>surge docs/.vitepress/dist</code>.</p></li></ol><p>You can also deploy to a <a href="https://surge.sh/help/adding-a-custom-domain" target="_blank" rel="noopener noreferrer">custom domain</a> by adding <code>surge docs/.vitepress/dist yourdomain.com</code>.</p><h2 id="heroku" tabindex="-1">Heroku <a class="header-anchor" href="#heroku" aria-hidden="true">#</a></h2><ol><li><p>Install <a href="https://devcenter.heroku.com/articles/heroku-cli" target="_blank" rel="noopener noreferrer">Heroku CLI</a>.</p></li><li><p>Create a Heroku account by <a href="https://signup.heroku.com" target="_blank" rel="noopener noreferrer">signing up</a>.</p></li><li><p>Run <code>heroku login</code> and fill in your Heroku credentials:</p></li></ol><div class="language-bash"><pre><code>$ heroku login
</code></pre></div><ol start="4"><li>Create a file called <code>static.json</code> in the root of your project with the below content:</li></ol><p><code>static.json</code>:</p><div class="language-json"><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;root&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./docs/.vitepress/dist&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>This is the configuration of your site; read more at <a href="https://github.com/heroku/heroku-buildpack-static" target="_blank" rel="noopener noreferrer">heroku-buildpack-static</a>.</p><ol start="5"><li>Set up your Heroku git remote:</li></ol><div class="language-bash"><pre><code><span class="token comment"># version change</span>
$ <span class="token function">git</span> init
$ <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
$ <span class="token function">git</span> commit -m <span class="token string">&quot;My site ready for deployment.&quot;</span>

<span class="token comment"># creates a new app with a specified name</span>
$ heroku apps:create example

<span class="token comment"># set buildpack for static sites</span>
$ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
</code></pre></div><ol start="6"><li>Deploy your site:</li></ol><div class="language-bash"><pre><code><span class="token comment"># publish site</span>
$ <span class="token function">git</span> push heroku main

<span class="token comment"># opens a browser to view the Dashboard version of Heroku CI</span>
$ heroku <span class="token function">open</span>
</code></pre></div><h2 id="vercel" tabindex="-1">Vercel <a class="header-anchor" href="#vercel" aria-hidden="true">#</a></h2><p>To deploy your VitePress app with a <a href="https://vercel.com/docs/concepts/git" target="_blank" rel="noopener noreferrer">Vercel for Git</a>, make sure it has been pushed to a Git repository.</p><p>Go to <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">https://vercel.com/new</a> and import the project into Vercel using your Git of choice (GitHub, GitLab or BitBucket). Follow the wizard to select the project root with the project&#39;s <code>package.json</code> and override the build step using <code>yarn docs:build</code> or <code>npm run docs:build</code> and the output dir to be <code>./docs/.vitepress/dist</code></p><p><img src="`+t+'" alt=""></p><p>After your project has been imported, all subsequent pushes to branches will generate Preview Deployments, and all changes made to the Production Branch (commonly &quot;main&quot;) will result in a Production Deployment.</p><p>Once deployed, you will get a URL to see your app live, such as the following: <a href="https://vitepress.vercel.app" target="_blank" rel="noopener noreferrer">https://vitepress.vercel.app</a></p>',56),c=[p];function l(i,r,d,u,h,g){return n(),s("div",null,c)}var y=e(o,[["render",l]]);export{b as __pageData,y as default};
