import { defineConfig } from 'vitepress'

export default defineConfig({
  lastUpdated: true,
  lang: 'zh-CN',
  head: [
    ['script', { src: 'https://cdn.wwads.cn/js/makemoney.js', async: 'true' }],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-FDME8GJGTW'
      }
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-FDME8GJGTW');"
    ]
  ],
  locales: {
    root: {
      lang: 'zh-CN',
      label: '简体中文',
      title: '哪吒监控',
      description: '哪吒监控是一个轻量化的运维工具',
      link: '/',
      themeConfig: {
        lastUpdatedText: '上次更新',
        editLink: {
          pattern: 'https://github.com/nezhahq/nezhahq.github.io/edit/main/docs/:path',
          text: '在GitHub中编辑',
        },
        nav: [
          {
            text: '使用指南',
            link: '/',
            activeMatch: '^/$|^/guide/'
          },
          {
            text: '社区项目',
            link: '/case/index.html',
            activeMatch: '^/case/'
          },
          {
            text: '开发手册',
            link: '/developer/index.html',
            activeMatch: '^/developer/'
          }
        ],
        sidebar: {
          '/': getGuideSidebarZhCN(),
          '/guide/': getGuideSidebarZhCN(),
          '/case/': getCaseSidebarZhCN(),
          '/developer/': getDeveloperSidebarZhCN(),
        }
      }
    },
    en_US: {
      lang: 'en-US',
      label: 'English',
      title: 'Nezha Monitoring',
      description: 'Nezha Monitoring is a lightweight O&M tool',
      link: '/en_US/',
      themeConfig: {
        lastUpdatedText: 'Last Updated',
        editLink: {
          text: 'Edit this page on GitHub',
          pattern: 'https://github.com/nezhahq/nezhahq.github.io/edit/main/docs/:path',
        },
        nav: [
          { text: 'User Guide', link: '/en_US/', activeMatch: '^/en_US/guide/' },
          { text: 'Community Projects', link: '/en_US/case/index.html', activeMatch: '^/en_US/case/' },
          { text: 'Development Manual', link: '/en_US/developer/index.html', activeMatch: '^/en_US/developer/' }
        ],
        sidebar: {
          '/en_US/': getGuideSidebarEnUS(),
          '/en_US/guide/': getGuideSidebarEnUS(),
          '/en_US/case/': getCaseSidebarEnUS(),
          '/en_US/developer/': getDeveloperSidebarEnUS(),
        },
      },
    },
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nezhahq/nezhahq.github.io' }
    ],
    algolia: {
      appId: 'HP6QF6KMZD',
      apiKey: 'fb8bae9ed373d1057e0c07fcf32b3f1a',
      indexName: 'nezhahq'
    },
    footer: {
      message: 'This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) License',
      copyright: 'Copyright © 2022-present NezhaHQ'
    }
  }
})

function getGuideSidebarZhCN() {
  return [
    {
      text: '安装手册',
      items: [
        { text: '安装 Dashboard', link: '/guide/dashboard.html' },
        { text: '安装 Agent', link: '/guide/agent.html' }
      ]
    },
    {
      text: '管理面板配置',
      items: [
        { text: '服务器', link: '/guide/servers.html' },
        { text: '服务', link: '/guide/services.html' },
        { text: '任务', link: '/guide/tasks.html' },
        { text: '告警', link: '/guide/notifications.html' },
        { text: '设置', link: '/guide/settings.html' },
        { text: 'API', link: '/guide/api.html' }
      ],
    },
    {
      text: '常见问题',
      items: [
        { text: '反向代理 Telegram API', link: '/guide/q1.html' },
        { text: 'Agent 启动/上线 问题自检流程', link: '/guide/q2.html' },
        { text: '反向代理 gRPC 端口', link: '/guide/q3.html' },
        { text: '实时通道断开/在线终端连接失败', link: '/guide/q4.html' },
        { text: '面板数据迁移、备份和恢复', link: '/guide/q5.html' },
        { text: '设置每月重置流量统计', link: '/guide/q6.html' },
        { text: '自定义 Agent 监控项目', link: '/guide/q7.html' },
        { text: '使用 Cloudflare Access 作为 OAuth2 提供方', link: '/guide/q8' },
      ]
    },
    {
      text: '排障指南',
      items: [
        { text: 'Dashboard 相关', link: '/guide/dashboardq.html' },
        { text: 'Agent 相关', link: '/guide/agentq.html' },
        { text: '登录相关', link: '/guide/loginq.html' }
      ]
    }
  ]
}

function getCaseSidebarZhCN() {
  return [
    {
      text: '社区项目',
      items: [
        { text: '1. 搭建哪吒 Telegram 机器人', link: '/case/case1.html' },
        { text: '2. 使用 Siri 语音运行快捷指令查询服务器状态', link: '/case/case2.html' },
        { text: '3. 自建多用户多语言 Telegram 服务器状态查询机器人', link: '/case/case3.html' },
        { text: '4. Fake-agent，监控数据作弊器', link: '/case/case4.html' },
        { text: '5. 使用 Argo 隧道的哪吒服务端', link: '/case/case5.html' }
      ]
    }
  ]
}

function getDeveloperSidebarZhCN() {
  return [
    {
      text: '开发手册',
      items: [
        { text: '创建新主题', link: '/developer/theme.html' },
        { text: 'l10n', link: '/developer/l10n.html' }
      ]
    }
  ]
}

function getGuideSidebarEnUS() {
  return [
    {
      text: 'Installation Manual',
      items: [
        { text: 'Install Dashboard', link: '/en_US/guide/dashboard.html' },
        { text: 'Install Agent', link: '/en_US/guide/agent.html' }
      ]
    },
    {
      text: 'Admin Panel',
      items: [
        { text: 'Servers', link: '/en_US/guide/servers.html' },
        { text: 'Services', link: '/en_US/guide/services.html' },
        { text: 'Tasks', link: '/en_US/guide/tasks.html' },
        { text: 'Notifications', link: '/en_US/guide/notifications.html' },
        { text: 'Settings', link: '/en_US/guide/settings.html' },
        { text: 'API', link: '/en_US/guide/api.html' }
      ]
    },
    {
      text: 'FAQ',
      items: [
        { text: 'Agent Startup/Online Troubleshooting Process', link: '/en_US/guide/q2.html' },
        { text: 'Reverse Proxy gRPC Port (Support Cloudflare CDN)', link: '/en_US/guide/q3.html' },
        { text: 'Real-Time Channel Disconnection/Online Terminal Connection Failure', link: '/en_US/guide/q4.html' },
        { text: 'Perform Data Migration and Backup Recovery', link: '/en_US/guide/q5.html' },
        { text: 'Reset Traffic Statistics Monthly', link: '/en_US/guide/q6.html' },
        { text: 'Custom Agent Monitoring Projects', link: '/en_US/guide/q7.html' },
        { text: 'Use Cloudflare Access As OAuth2 Provider', link: '/en_US/guide/q8' },
      ]
    },
    {
      text: 'Troubleshooting Guide',
      items: [
        { text: 'Dashboard', link: '/en_US/guide/dashboardq.html' },
        { text: 'Agent', link: '/en_US/guide/agentq.html' },
        { text: 'Login', link: '/en_US/guide/loginq.html' }
      ]
    }
  ]
}

function getCaseSidebarEnUS() {
  return [
    {
      text: 'Community Projects',
      items: [
        { text: '1. Build your own Telegram bot to query server information', link: '/en_US/case/case1.html' },
        { text: '2. Use Siri to run shortcut to check server status', link: '/en_US/case/case2.html' },
        { text: '3. Self-hosted, multi-user, multi-lingual server status query Telegram bot', link: '/en_US/case/case3.html' },
        { text: '4. Fake-agent, monitoring data cheater', link: '/en_US/case/case4.html' },
        { text: '5. Nezha server over Argo tunnel', link: '/en_US/case/case5.html' }
      ]
    }
  ]
}

function getDeveloperSidebarEnUS() {
  return [
    {
      text: 'Development Manual',
      items: [
        { text: 'Create a new theme', link: '/en_US/developer/theme.html' },
        { text: 'l10n', link: '/en_US/developer/l10n.html' }
      ]
    }
  ]
}
