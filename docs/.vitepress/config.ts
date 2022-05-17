import { defineConfig } from 'vitepress'

export default defineConfig({
  locales: {
    '/': {
        lang: 'zh-CN',
        title: '哪吒监控',
        description: '哪吒监控是一个轻量化的运维工具',
    },
    '/en_US/': {
        lang: 'en-US',
        title: 'Nezha Monitoring',
        description: 'Nezha Monitoring is a lightweight O&M tool',
    }
  },
  
  themeConfig: {
    locales: {
      '/': {
        label: '简体中文',
        nav: [
          { text: '使用指南', link: '/', activeMatch: '^/$|^/guide/' },
          {
            text: '开发手册',
            link: '/config/basics',
            activeMatch: '^/config/'
          }
        ],
    
        sidebar: {
          '/guide/': getGuideSidebarZhCN(),
          '/config/': getConfigSidebarZhCN(),
          '/': getGuideSidebarZhCN()
        },
        repo: 'nezhahq/nezhahq.github.io',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',

        algolia: {
        appId: '8J64VVRP8K',
        apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
        indexName: 'vitepress'
       },

        carbonAds: {
        carbon: 'CEBDT27Y',
        custom: 'CKYD62QM',
        placement: 'vuejsorg'
       }
      },
      '/en_US/': {
        label: 'English',
        nav: [
          { text: 'User Guide', link: '/en_US/', activeMatch: '^/$|^/guide/' },
          {
            text: 'Development Manual',
            link: '/en_US/config/basics',
            activeMatch: '^/config/'
          }
        ],
    
        sidebar: {
          '/guide/': getGuideSidebarEnUS(),
          '/config/': getConfigSidebarEnUS(),
          '/': getGuideSidebarEnUS()
        },
        repo: 'nezhahq/nezhahq.github.io',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',

        algolia: {
        appId: '8J64VVRP8K',
        apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
        indexName: 'vitepress'
       },

        carbonAds: {
        carbon: 'CEBDT27Y',
        custom: 'CKYD62QM',
        placement: 'vuejsorg'
       }
      }
    }
  }
})

function getGuideSidebarZhCN() {
  return [
    {
      text: '哪吒监控',
      children: [
        { text: '介绍', link: '/' }
      ]
    },
    {
      text: '安装手册',
      children: [
        { text: '安装 Dashboard', link: '/guide/dashboard' },
        { text: '安装 Agent', link: '/guide/agent' }
      ]
    },
    {
      text: '管理面板配置',
      children: [
        { text: '主机', link: '/guide/frontmatter' },
        { text: '服务', link: '/guide/theming' },
        { text: '定时任务', link: '/guide/api' },
        { text: '报警通知', link: '/guide/api' },
        { text: '设置', link: '/guide/differences-from-vuepress' }
      ]
    },
    {
      text: '常见问题',
      children: [
        { text: '问题1', link: '/guide/frontmatter' },
        { text: '问题2', link: '/guide/theming' },
        { text: '问题3', link: '/guide/api' },
        { text: '问题4', link: '/guide/api' },
        { text: '问题5', link: '/guide/differences-from-vuepress' }
      ]
    }
  ]
}

function getConfigSidebarZhCN() {
  return [
    {
      text: 'App Config',
      children: [{ text: 'Basics', link: '/config/basics' }]
    },
    {
      text: 'Theme Config',
      children: [
        { text: 'Homepage', link: '/config/homepage' },
        { text: 'Algolia Search', link: '/config/algolia-search' },
        { text: 'Carbon Ads', link: '/config/carbon-ads' }
      ]
    }
  ]
}

function getGuideSidebarEnUS() {
  return [
    {
      text: 'Nezha Monitoring',
      children: [
        { text: 'Introduction', link: '/en_US/' }
      ]
    },
    {
      text: 'Installation',
      children: [
        { text: 'Install Dashboard', link: '/en_US/guide/dashboard' },
        { text: 'Install Agent', link: '/en_US/guide/agent' }
      ]
    },
    {
      text: 'Advanced Configuration',
      children: [
        { text: 'Servers', link: '/guide/frontmatter' },
        { text: 'Services', link: '/guide/theming' },
        { text: 'Tasks', link: '/guide/api' },
        { text: 'Notifications', link: '/guide/api' },
        { text: 'Settings', link: '/guide/differences-from-vuepress' }
      ]
    },
    {
      text: 'FAQ',
      children: [
        { text: '问题1', link: '/guide/frontmatter' },
        { text: '问题2', link: '/guide/theming' },
        { text: '问题3', link: '/guide/api' },
        { text: '问题4', link: '/guide/api' },
        { text: '问题5', link: '/guide/differences-from-vuepress' }
      ]
    }
  ]
}

function getConfigSidebarEnUS() {
  return [
    {
      text: 'App Config',
      children: [{ text: 'Basics', link: '/en_US/config/basics' }]
    },
    {
      text: 'Theme Config',
      children: [
        { text: 'Homepage', link: '/en_US/config/homepage' },
        { text: 'Algolia Search', link: '/en_US/config/algolia-search' },
        { text: 'Carbon Ads', link: '/en_US/config/carbon-ads' }
      ]
    }
  ]
}
