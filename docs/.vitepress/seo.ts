import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { HeadConfig, TransformContext } from 'vitepress'

export const SITE_URL = 'https://nezha.wiki'

const DOCS_ROOT = fileURLToPath(new URL('../', import.meta.url))
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const SOFTWARE_ID = `${SITE_URL}/#software`

const officialRepositories = [
  'https://github.com/nezhahq/nezha',
  'https://github.com/nezhahq/agent',
  'https://github.com/nezhahq/nezhahq.github.io'
]

type PageData = TransformContext['pageData']

function isEnglish(relativePath: string): boolean {
  return relativePath.startsWith('en_US/')
}

function sourceExists(relativePath: string): boolean {
  return existsSync(new URL(relativePath, `file://${DOCS_ROOT}/`))
}

export function routeForSource(relativePath: string): string {
  const route = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
  if (route === 'index') return '/'
  if (route === 'en_US/index') return '/en_US/'
  return `/${route}.html`
}

function sourcePair(relativePath: string): { zh: string; en: string } | undefined {
  const zh = isEnglish(relativePath) ? relativePath.slice('en_US/'.length) : relativePath
  const en = `en_US/${zh}`
  if (!sourceExists(zh) || !sourceExists(en)) return undefined
  return { zh, en }
}

function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href
}

export function descriptionForPage(pageData: PageData): string {
  const explicitDescription = pageData.frontmatter.description
  if (typeof explicitDescription === 'string' && explicitDescription.trim()) {
    return explicitDescription.trim()
  }

  const title = pageData.title || (isEnglish(pageData.relativePath) ? 'Nezha Monitoring V2 documentation' : '哪吒监控 V2 文档')
  if (isEnglish(pageData.relativePath)) {
    return `Official Nezha Monitoring V2 documentation for ${title}. Learn the relevant features, configuration steps, operational boundaries, use cases, and troubleshooting guidance for Dashboard and Agent.`
  }
  return `哪吒监控 V2 官方文档：${title}。了解相关功能、配置步骤、使用场景、权限边界和常见问题，并查看 Dashboard 与 Agent 的准确说明。`
}

function alternateHead(relativePath: string): HeadConfig[] {
  const pair = sourcePair(relativePath)
  if (!pair) return []

  const zhUrl = absoluteUrl(routeForSource(pair.zh))
  const enUrl = absoluteUrl(routeForSource(pair.en))
  return [
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: zhUrl }],
    ['link', { rel: 'alternate', hreflang: 'en', href: enUrl }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: zhUrl }]
  ]
}

function breadcrumbSchema(relativePath: string, title: string, canonical: string, language: string) {
  const homeUrl = isEnglish(relativePath) ? `${SITE_URL}/en_US/` : `${SITE_URL}/`
  const homeName = isEnglish(relativePath) ? 'Nezha Monitoring V2 documentation' : '哪吒监控 V2 文档'
  const items = [{ '@type': 'ListItem', position: 1, name: homeName, item: homeUrl }]

  if (canonical !== homeUrl) {
    items.push({ '@type': 'ListItem', position: 2, name: title, item: canonical })
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    inLanguage: language,
    itemListElement: items
  }
}

function structuredData(context: TransformContext, canonical: string, description: string, language: string) {
  const headline = context.pageData.title || context.title
  const isHomeLayout = context.pageData.frontmatter.layout === 'home'
  const isCollection = isHomeLayout && !['index.md', 'en_US/index.md'].includes(context.pageData.relativePath)
  const pageType = isCollection ? 'CollectionPage' : isHomeLayout ? 'WebPage' : 'TechArticle'
  const pageEntity: Record<string, unknown> = {
    '@type': pageType,
    '@id': `${canonical}#page`,
    url: canonical,
    headline,
    name: headline,
    description,
    inLanguage: language,
    mainEntityOfPage: canonical,
    about: { '@id': SOFTWARE_ID },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID }
  }

  if (pageType === 'TechArticle') {
    pageEntity.author = { '@id': ORGANIZATION_ID }
  }

  if (context.pageData.lastUpdated) {
    pageEntity.dateModified = new Date(context.pageData.lastUpdated).toISOString()
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'NezhaHQ',
      url: SITE_URL,
      sameAs: officialRepositories
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: 'Nezha Monitoring V2 Documentation',
      alternateName: '哪吒监控 V2 文档',
      publisher: { '@id': ORGANIZATION_ID },
      inLanguage: ['zh-CN', 'en']
    },
    {
      '@type': 'SoftwareApplication',
      '@id': SOFTWARE_ID,
      name: 'Nezha Monitoring V2',
      alternateName: '哪吒监控 V2',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Server monitoring and operations',
      softwareVersion: 'V2',
      isAccessibleForFree: true,
      codeRepository: 'https://github.com/nezhahq/nezha',
      sameAs: officialRepositories
    },
    pageEntity,
    breadcrumbSchema(context.pageData.relativePath, headline, canonical, language)
  ]

  return { '@context': 'https://schema.org', '@graph': graph }
}

export function seoHead(context: TransformContext): HeadConfig[] {
  const canonical = absoluteUrl(routeForSource(context.pageData.relativePath))
  const description = context.description
  const language = isEnglish(context.pageData.relativePath) ? 'en' : 'zh-CN'
  const isHomeLayout = context.pageData.frontmatter.layout === 'home'
  const image = `${SITE_URL}/logo.png`
  const imageAlt = language === 'en' ? 'Nezha Monitoring V2 logo' : '哪吒监控 V2 标志'
  const jsonLd = JSON.stringify(structuredData(context, canonical, description, language)).replace(/</g, '\\u003c')

  return [
    ['link', { rel: 'canonical', href: canonical }],
    ...alternateHead(context.pageData.relativePath),
    ['meta', { property: 'og:type', content: isHomeLayout ? 'website' : 'article' }],
    ['meta', { property: 'og:site_name', content: 'Nezha Monitoring V2 Documentation' }],
    ['meta', { property: 'og:locale', content: language === 'en' ? 'en_US' : 'zh_CN' }],
    ['meta', { property: 'og:title', content: context.title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: canonical }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:width', content: '193' }],
    ['meta', { property: 'og:image:height', content: '193' }],
    ['meta', { property: 'og:image:alt', content: imageAlt }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: context.title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: image }],
    ['meta', { name: 'twitter:image:alt', content: imageAlt }],
    ['script', { type: 'application/ld+json' }, jsonLd]
  ]
}

export function sitemapItems(items: Array<{ url: string; links?: Array<{ lang: string; url: string }>; [key: string]: unknown }>) {
  return items.map((item) => {
    const sitemapUrl = canonicalSitemapPath(item.url)
    if (!item.links?.length) return { ...item, url: sitemapUrl }

    const links = item.links.map((link) => ({
      lang: link.url.startsWith('en_US/') ? 'en' : 'zh-CN',
      url: absoluteUrl(canonicalSitemapPath(link.url))
    }))
    const zh = links.find((link) => link.lang === 'zh-CN')
    if (zh) links.push({ lang: 'x-default', url: zh.url })
    return { ...item, url: sitemapUrl, links }
  })
}

function canonicalSitemapPath(path: string): string {
  if (!path || path === '/' || path === 'en_US/') return path || '/'
  return path.endsWith('/') ? `${path}index.html` : path
}
