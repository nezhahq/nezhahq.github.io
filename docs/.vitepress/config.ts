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
          { text: '使用指南', 
            link: '/', 
            activeMatch: '^/$|^/guide/' 
          },
          {
            text: '开发手册',
            link: '/developer/basics',
            activeMatch: '^/developer/'
          }
        ],

        sidebar: {
          '/guide/': getGuideSidebarZhCN(),
          '/developer/': getDeveloperSidebarZhCN(),
          '/': getGuideSidebarZhCN()
        },
        repo: 'nezhahq/nezhahq.github.io',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '在GitHub中编辑',
        lastUpdated: '上次更新'
      },
      '/en_US/': {
        label: 'English',
        nav: [
          { text: 'User Guide', link: '/en_US/', activeMatch: '^/$|^/en_US/guide/' },
          { text: 'Development Manual', link: '/en_US/developer/basics', activeMatch: '^/en_US/developer/' }
        ],
    
        sidebar: {
          '/en_US/guide/': getGuideSidebarEnUS(),
          '/en_US/developer/': getDeveloperSidebarEnUS(),
          '/en_US/': getGuideSidebarEnUS()
        },
        repo: 'nezhahq/nezhahq.github.io',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated'
      }
    }
  }
})

function getGuideSidebarZhCN() {
  return [
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
        { text: '主机', link: '/guide/servers' },
        { text: '服务', link: '/guide/services' },
        { text: '定时任务', link: '/guide/tasks' },
        { text: '报警通知', link: '/guide/notifications' },
        { text: '设置', link: '/guide/settings' }
      ]
    },
    {
      text: '常见问题',
      children: [
        { text: 'TG api被墙', link: '/guide/q1' },
        { text: 'Agent 启动/上线 问题自检流程', link: '/guide/q2' },
        { text: '如何反向代理 gRPC 端口', link: '/guide/q3' },
        { text: '实时通道断开/在线终端连接失败', link: '/guide/q4' },
        { text: '如何进行数据迁移、备份恢复？', link: '/guide/q5' }

      ]
    }
  ]
}

function getDeveloperSidebarZhCN() {
  return [
    {
      text: 'App Config',
      children: [ { text: 'Basics', link: '/developer/basics' } ]
    },
    {
      text: 'Theme Config',
      children: [
        { text: 'Homepage', link: '/developer/homepage' },
        { text: 'Algolia Search', link: '/developer/algolia-search' },
        { text: 'Carbon Ads', link: '/developer/carbon-ads' }
      ]
    }
  ]
}

function getGuideSidebarEnUS() {
  return [
    {
      text: 'Installation Manual',
      children: [
        { text: 'Install Dashboard', link: '/en_US/guide/dashboard' },
        { text: 'Install Agent', link: '/en_US/guide/agent' }
      ]
    },
    {
      text: 'Admin Panel',
      children: [
        { text: 'Servers', link: '/en_US/guide/servers' },
        { text: 'Services', link: '/en_US/guide/services' },
        { text: 'Tasks', link: '/en_US/guide/tasks' },
        { text: 'Notifications', link: '/en_US/guide/notifications' },
        { text: 'Settings', link: '/en_US/guide/settings' }
      ]
    },
    {
      text: 'FAQ',
      children: [
        { text: 'Let the Agent start/on-line, and the self-test process of the problem', link: '/en_US/guide/q2' },
        { text: 'Reverse Proxy gRPC Port (support Cloudflare CDN)', link: '/en_US/guide/q3' },
        { text: 'Real-time channel disconnection/online terminal connection failure', link: '/en_US/guide/q4' },
        { text: 'How do I migrate my data to the new server and restore my backups?', link: '/en_US/guide/q5' }
      ]
    }
  ]
}

function getDeveloperSidebarEnUS() {
  return [
    {
      text: 'App Config',
      children: [ { text: 'Basics', link: '/en_US/developer/basics' } ]
    },
    {
      text: 'Theme Config',
      children: [
        { text: 'Homepage', link: '/en_US/developer/homepage' },
        { text: 'Algolia Search', link: '/en_US/developer/algolia-search' },
        { text: 'Carbon Ads', link: '/en_US/developer/carbon-ads' }
      ]
    }
  ]
}
