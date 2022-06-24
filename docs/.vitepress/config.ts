import { defineConfig } from 'vitepress'

export default defineConfig({
  lastUpdated: true,
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
          { text: '社区项目', 
            link: '/case/index', 
            activeMatch: '^/case/' 
          },
          {
            text: '开发手册',
            link: '/developer/index',
            activeMatch: '^/developer/'
          }
        ],

        sidebar: {
          '/guide/': getGuideSidebarZhCN(),
          '/case/': getCaseSidebarZhCN(),
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
          { text: 'User Guide', link: '/en_US/', activeMatch: '^/en_US/guide/' },
          { text: 'Community Projects', link: '/en_US/case/index', activeMatch: '^/en_US/case/' },
          { text: 'Development Manual', link: '/en_US/developer/index', activeMatch: '^/en_US/developer/' }
        ],
    
        sidebar: {
          '/en_US/guide/': getGuideSidebarEnUS(),
          '/en_US/case/': getCaseSidebarEnUS(),
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
    },
    algolia: {
      appId: 'HP6QF6KMZD',
      apiKey: 'fb8bae9ed373d1057e0c07fcf32b3f1a',
      indexName: 'nezhahq'
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
        { text: '设置', link: '/guide/settings' },
        { text: 'API', link: '/guide/api' }
      ]
    },
    {
      text: '常见问题',
      children: [
        { text: 'TG api被墙', link: '/guide/q1' },
        { text: 'Agent 启动/上线 问题自检流程', link: '/guide/q2' },
        { text: '如何反向代理 gRPC 端口', link: '/guide/q3' },
        { text: '实时通道断开/在线终端连接失败', link: '/guide/q4' },
        { text: '如何进行数据迁移、备份恢复？', link: '/guide/q5' },
        { text: '如何每月重置流量统计？', link: '/guide/q6' }
      ]
    },
    {
      text: '排障指南',
      children: [
        { text: 'Dashboard相关', link: '/guide/dashboardq' },
        { text: 'Agent相关', link: '/guide/agentq' },
        { text: '登录相关', link: '/guide/loginq' }
      ]
    }
  ]
}

function getCaseSidebarZhCN() {
  return [
    {
      text: '社区项目',
      children: [
        { text: '1. 搭建哪吒 Telegram 机器人', link: '/case/case1' },
        { text: '2. 使用Siri语音运行快捷指令查询服务器状态', link: '/case/case2' },
        { text: '3. 自建多用户多语言 Telegram 服务器状态查询机器人', link: '/case/case3' },
        { text: '4. Fake-agent，监控数据作弊器', link: '/case/case4' }
      ]
    }
  ]
}

function getDeveloperSidebarZhCN() {
  return [
    {
      text: '开发手册',
      children: [
        { text: '创建新主题', link: '/developer/theme' },
        { text: 'l10n', link: '/developer/l10n' }
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
        { text: 'Settings', link: '/en_US/guide/settings' },
        { text: 'API', link: '/en_US/guide/api' }
      ]
    },
    {
      text: 'FAQ',
      children: [
        { text: 'Let the Agent start/on-line, and the self-test process of the problem', link: '/en_US/guide/q2' },
        { text: 'Reverse Proxy gRPC Port (support Cloudflare CDN)', link: '/en_US/guide/q3' },
        { text: 'Real-time channel disconnection/online terminal connection failure', link: '/en_US/guide/q4' },
        { text: 'How do I migrate my data to the new server and restore my backups?', link: '/en_US/guide/q5' },
        { text: 'How to set up a monthly reset of data statistics?', link: '/en_US/guide/q6' }
      ]
    },
    {
      text: 'Troubleshooting Guide',
      children: [
        { text: 'Dashboard', link: '/en_US/guide/dashboardq' },
        { text: 'Agent', link: '/en_US/guide/agentq' },
        { text: 'Login', link: '/en_US/guide/loginq' }
      ]
    }
  ]
}

function getCaseSidebarEnUS() {
  return [
    {
      text: 'Community Projects',
      children: [
        { text: '1. Build your own Telegram bot to query server information', link: '/en_US/case/case1' },
        { text: '2. Use Siri to run shortcut to check server status', link: '/en_US/case/case2' },
        { text: '3. Self-hosted, multi-user, multi-lingual server status query Telegram bot', link: '/en_US/case/case3' },
        { text: '4. Fake-agent, monitoring data cheater', link: '/en_US/case/case4' }
      ]
    }
  ]
}

function getDeveloperSidebarEnUS() {
  return [
    {
      text: 'Development Manual',
      children: [
        { text: 'Create a new theme', link: '/en_US/developer/theme' },
        { text: 'l10n', link: '/en_US/developer/l10n' }
      ]
    }
  ]
}
