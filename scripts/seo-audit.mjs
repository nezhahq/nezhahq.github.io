import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const distDir = new URL('../docs/.vitepress/dist/', import.meta.url)
const repoDir = new URL('../', import.meta.url)
const siteUrl = 'https://nezha.wiki'
const homeLayoutFiles = new Set([
  'index.html',
  'en_US/index.html',
  'case/index.html',
  'en_US/case/index.html',
  'developer/index.html',
  'en_US/developer/index.html'
])

function read(relativePath) {
  const path = new URL(relativePath, distDir)
  assert.ok(existsSync(path), `Missing generated file: ${relativePath}`)
  return readFileSync(path, 'utf8')
}

function readSource(relativePath) {
  return readFileSync(new URL(relativePath, repoDir), 'utf8')
}

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = join(directory, entry.name)
    if (entry.isDirectory()) return htmlFiles(absolute)
    if (!entry.isFile() || !entry.name.endsWith('.html')) return []
    const path = relative(new URL('.', distDir).pathname, absolute).split(sep).join('/')
    return path === '404.html' ? [] : [path]
  })
}

function canonicalFor(file) {
  if (file === 'index.html') return `${siteUrl}/`
  if (file === 'en_US/index.html') return `${siteUrl}/en_US/`
  return `${siteUrl}/${file}`
}

function counterpartFor(file) {
  if (file.startsWith('en_US/')) return file.slice('en_US/'.length)
  return `en_US/${file}`
}

function attribute(html, tagPattern, name) {
  const tag = html.match(tagPattern)?.[0]
  return tag?.match(new RegExp(`${name}="([^"]+)"`))?.[1]
}

const robots = read('robots.txt')
assert.match(robots, /^User-agent:\s*\*/m)
assert.match(robots, /^Allow:\s*\/$/m)
assert.match(robots, /^Sitemap:\s*https:\/\/nezha\.wiki\/sitemap\.xml$/m)

const sitemap = read('sitemap.xml')
assert.match(sitemap, /<loc>https:\/\/nezha\.wiki\/<\/loc>/)
assert.match(sitemap, /<loc>https:\/\/nezha\.wiki\/en_US\/<\/loc>/)
assert.match(sitemap, /<loc>https:\/\/nezha\.wiki\/guide\/overview\.html<\/loc>/)
assert.match(sitemap, /hreflang="zh-CN"/)
assert.match(sitemap, /hreflang="en"/)

const llms = read('llms.txt')
assert.match(llms, /^# Nezha Monitoring V2$/m)
assert.match(llms, /https:\/\/github\.com\/nezhahq\/nezha/)
assert.match(llms, /https:\/\/github\.com\/nezhahq\/agent/)

const packageJson = JSON.parse(readSource('package.json'))
assert.match(packageJson.scripts.test, /npm run build/, 'npm test must build fresh generated output')
assert.match(packageJson.scripts.test, /npm run test:seo/, 'npm test must run the generated-site SEO audit')

const pagesWorkflow = readSource('.github/workflows/pages.yaml')
const workflowBuild = pagesWorkflow.indexOf('npm run build')
const workflowAudit = pagesWorkflow.indexOf('npm run test:seo')
assert.ok(workflowBuild >= 0 && workflowAudit > workflowBuild, 'Pages workflow must run test:seo after build and before deployment')

const pages = htmlFiles(new URL('.', distDir).pathname)
assert.ok(pages.length >= 100, `Expected at least 100 content pages, found ${pages.length}`)
const pageSet = new Set(pages)
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort()
const expectedLocations = pages.map(canonicalFor).sort()
assert.deepEqual(sitemapLocations, expectedLocations, 'Sitemap URLs must exactly match generated canonical content pages')

const descriptions = new Map()
for (const file of pages) {
  const html = read(file)
  const expectedCanonical = canonicalFor(file)
  const canonicalTags = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)]
  assert.equal(canonicalTags.length, 1, `${file}: expected exactly one canonical tag`)
  const canonical = attribute(html, /<link\b[^>]*rel="canonical"[^>]*>/, 'href')
  assert.equal(canonical, expectedCanonical, `${file}: incorrect canonical URL`)

  const descriptionTags = [...html.matchAll(/<meta\b[^>]*name="description"[^>]*>/g)]
  assert.equal(descriptionTags.length, 1, `${file}: expected exactly one description tag`)
  const description = attribute(html, /<meta\b[^>]*name="description"[^>]*>/, 'content')
  assert.ok(description && description.length >= 50, `${file}: missing or too-short description`)
  const duplicate = descriptions.get(description)
  assert.equal(duplicate, undefined, `${file}: duplicates description from ${duplicate}`)
  descriptions.set(description, file)

  assert.ok(attribute(html, /<meta\b[^>]*property="og:title"[^>]*>/, 'content'), `${file}: missing og:title`)
  assert.equal(attribute(html, /<meta\b[^>]*property="og:url"[^>]*>/, 'content'), expectedCanonical, `${file}: incorrect og:url`)
  assert.equal(attribute(html, /<meta\b[^>]*property="og:image"[^>]*>/, 'content'), `${siteUrl}/logo.png`, `${file}: missing official og:image`)
  assert.ok(attribute(html, /<meta\b[^>]*property="og:image:alt"[^>]*>/, 'content'), `${file}: missing og:image:alt`)
  assert.ok(attribute(html, /<meta\b[^>]*name="twitter:card"[^>]*>/, 'content'), `${file}: missing twitter:card`)
  assert.equal(attribute(html, /<meta\b[^>]*name="twitter:image"[^>]*>/, 'content'), `${siteUrl}/logo.png`, `${file}: missing twitter:image`)
  const jsonLdText = html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)?.[1]
  assert.ok(jsonLdText, `${file}: missing JSON-LD`)
  const jsonLd = JSON.parse(jsonLdText)
  const graph = jsonLd['@graph']
  assert.ok(Array.isArray(graph), `${file}: JSON-LD @graph is missing`)
  const expectedPageType = homeLayoutFiles.has(file)
    ? (file.includes('/case/') || file.startsWith('case/') || file.includes('/developer/') || file.startsWith('developer/') ? 'CollectionPage' : 'WebPage')
    : 'TechArticle'
  const expectedOgType = homeLayoutFiles.has(file) ? 'website' : 'article'
  assert.equal(attribute(html, /<meta\b[^>]*property="og:type"[^>]*>/, 'content'), expectedOgType, `${file}: incorrect og:type`)
  assert.ok(graph.some((entry) => entry['@type'] === expectedPageType && entry.url === expectedCanonical), `${file}: missing canonical ${expectedPageType} schema`)
  assert.ok(graph.some((entry) => entry['@type'] === 'BreadcrumbList'), `${file}: missing BreadcrumbList schema`)

  const counterpart = counterpartFor(file)
  if (pages.includes(counterpart)) {
    const zhFile = file.startsWith('en_US/') ? counterpart : file
    const enFile = file.startsWith('en_US/') ? file : counterpart
    assert.match(html, new RegExp(`<link\\b[^>]*hreflang="zh-CN"[^>]*href="${canonicalFor(zhFile).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), `${file}: missing zh-CN alternate`)
    assert.match(html, new RegExp(`<link\\b[^>]*hreflang="en"[^>]*href="${canonicalFor(enFile).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), `${file}: missing en alternate`)
    assert.match(html, new RegExp(`<link\\b[^>]*hreflang="x-default"[^>]*href="${canonicalFor(zhFile).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), `${file}: missing x-default alternate`)
  }

  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1]
    if ((!href.startsWith('/') && !href.startsWith('#')) || href.startsWith('//')) continue
    const [path, rawFragment = ''] = href.split('#', 2)
    let targetFile = file
    if (path && path !== '/') {
      if (path.endsWith('/')) {
        targetFile = `${path.slice(1)}index.html`
      } else {
        assert.ok(path.endsWith('.html'), `${file}: internal content link is not canonical .html form: ${href}`)
        targetFile = path.slice(1)
      }
    } else if (path === '/') {
      targetFile = 'index.html'
    }
    assert.ok(pageSet.has(targetFile), `${file}: broken internal link ${href}`)

    if (rawFragment) {
      let fragment
      try {
        fragment = decodeURIComponent(rawFragment)
      } catch {
        assert.fail(`${file}: malformed URL fragment ${href}`)
      }
      const targetHtml = targetFile === file ? html : read(targetFile)
      assert.ok(targetHtml.includes(`id="${fragment}"`), `${file}: broken internal fragment ${href}`)
    }
  }
}

const zhHome = read('index.html')
assert.match(zhHome, /哪吒监控 V2/)
assert.match(zhHome, /href="https:\/\/qio\.ng"/, 'Chinese homepage must retain the Dashboard preview link')
assert.match(zhHome, /src="https:\/\/raw\.githubusercontent\.com\/nezhahq\/nezha\/master\/\.github\/brand\.svg"/, 'Chinese homepage must retain the official Dashboard brand image')
assert.match(zhHome, /href="\/guide\/overview\.html"/)
assert.match(zhHome, /href="\/guide\/architecture\.html"/)
assert.match(zhHome, /href="\/guide\/version-compatibility\.html"/)

const enHome = read('en_US/index.html')
assert.match(enHome, /Nezha Monitoring V2/)
assert.match(enHome, /href="https:\/\/qio\.ng"/, 'English homepage must retain the Dashboard preview link')
assert.match(enHome, /src="https:\/\/raw\.githubusercontent\.com\/nezhahq\/nezha\/master\/\.github\/brand\.svg"/, 'English homepage must retain the official Dashboard brand image')
assert.match(enHome, /href="\/en_US\/guide\/overview\.html"/)
assert.match(enHome, /href="\/en_US\/guide\/architecture\.html"/)
assert.match(enHome, /href="\/en_US\/guide\/version-compatibility\.html"/)

console.log(`SEO audit passed for ${pages.length} generated content pages.`)
