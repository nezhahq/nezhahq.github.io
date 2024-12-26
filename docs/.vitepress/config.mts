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
    ],
    [
      'script',
      {
        async: '',
        crossorigin: 'anonymous',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3632738952115558'
      },
    ],
    ['link', { rel: 'icon', type: 'image/png', sizes: '193x193', href: '/logo.png' }],
  ],
  locales: {
    root: {
      lang: 'zh-CN',
      label: '简体中文',
      title: '哪吒服务器监控',
      description: '哪吒监控是一款轻量化的服务器监控和运维工具，提供实时性能监控与告警通知。作为开源项目，它支持企业自托管，保护数据隐私，并支持多语言。哪吒服务器监控安装简便，支持自定义监控项目，可满足不同服务器运维需求。',
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
      title: 'Nezha Server Monitoring',
      description: 'Nezha Monitoring is a lightweight server monitoring and maintenance tool that offers real-time performance monitoring and alert notifications. As an open-source project, it supports enterprise self-hosting to protect data privacy and supports multiple languages. Nezha server monitoring is easy to deploy, supports customizable monitoring projects, and meets various server maintenance needs.',
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
    logo: { src: '/logo.png', width: 24, height: 24, alt: 'NezhaLogo'},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nezhahq/nezhahq.github.io' },
      { icon: {svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>'}, link: 'https://t.me/nezhanews' },
    ],
    search: {
      provider: 'algolia',
      options:
      {
        appId: 'HP6QF6KMZD',
        apiKey: 'fb8bae9ed373d1057e0c07fcf32b3f1a',
        indexName: 'nezhahq',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      },
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
        { text: '通知', link: '/guide/notifications.html' },
        { text: 'DDNS', link: '/guide/ddns.html' },
        { text: '内网穿透', link: '/guide/nat.html' },
        { text: '设置', link: '/guide/settings.html' },
        { text: '分组', link: '/guide/group.html' }
      ],
    },
    {
      text: '常见问题',
      items: [
        { text: '反向代理 Telegram API', link: '/guide/q1.html' },
        { text: 'Agent 启动/上线 问题自检流程', link: '/guide/q2.html' },
        { text: 'Dashboard 反向代理配置', link: '/guide/q3.html' },
        { text: 'Websocket 连接失败', link: '/guide/q4.html' },
        { text: '面板数据迁移、备份和恢复', link: '/guide/q5.html' },
        { text: '设置每月重置流量统计', link: '/guide/q6.html' },
        { text: '自定义 Agent 监控项目', link: '/guide/q7.html' },
        { text: '启用 GPU 监控', link: '/guide/q9.html' },
        { text: '自定义 IP 地理位置数据库', link: '/guide/q11.html' },
        { text: '真实 IP 请求头', link: '/guide/q12.html' },
        { text: '初始化用户密码', link: '/guide/q13.html' }
      ]
    },
    {
      text: '排障指南',
      items: [
        { text: 'Dashboard 相关', link: '/guide/dashboardq.html' },
        { text: 'Agent 相关', link: '/guide/agentq.html' }
      ]
    }
  ]
}

function getCaseSidebarZhCN() {
  return [
    {
      text: '社区项目',
      items: [
        { text: 'Fake-agent，监控数据作弊器', link: '/case/case4.html' },
        { text: '使用 Argo 隧道的哪吒服务端', link: '/case/case5.html' },
        { text: 'Nezha Mobile - Nezha Dashboard 的 iOS 客户端', link: '/case/case6.html' },
        { text: 'MDPings - Nezha Dashboard 的 Android 客户端', link: '/case/case9.html' },
        { text: 'Broker for Nezha', link: '/case/case7.html' },
        { text: '适用于哪吒 V1 版本的 Telegram API Bot', link: '/case/case10.html' },
        { text: 'Serverless 哪吒 Telegram 机器人', link: '/case/case8.html' }
      ]
    }
  ]
}

function getDeveloperSidebarZhCN() {
  return [
    {
      text: '开发手册',
      items: [
        { text: 'API 文档', link: '/developer/api.html' },
        { text: 'i18n', link: '/developer/i18n.html' }
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
        { text: 'DDNS', link: '/en_US/guide/ddns.html' },
        { text: 'NAT traversal', link: '/en_US/guide/nat.html' },
        { text: 'Settings', link: '/en_US/guide/settings.html' },
        { text: 'Grouping', link: '/en_US/guide/group.html' }
      ]
    },
    {
      text: 'FAQ',
      items: [
        { text: 'Agent Startup/Online Troubleshooting Process', link: '/en_US/guide/q2.html' },
        { text: 'Dashboard Reverse Proxy Configuration', link: '/en_US/guide/q3.html' },
        { text: 'Websocket Connection Failure', link: '/en_US/guide/q4.html' },
        { text: 'Data Migration, Backup, and Recovery', link: '/en_US/guide/q5.html' },
        { text: 'Set Monthly Traffic Statistics ResetReset', link: '/en_US/guide/q6.html' },
        { text: 'Custom Agent Monitoring Items', link: '/en_US/guide/q7.html' },
        { text: 'Enable GPU monitoring', link: '/en_US/guide/q9.html' },
        { text: 'Real IP Request Header', link: '/en_US/guide/q12.html' },
        { text: 'Initialize User Password', link: '/en_US/guide/q13.html' }
      ]
    },
    {
      text: 'Troubleshooting Guide',
      items: [
        { text: 'Dashboard', link: '/en_US/guide/dashboardq.html' },
        { text: 'Agent', link: '/en_US/guide/agentq.html' }
      ]
    }
  ]
}

function getCaseSidebarEnUS() {
  return [
    {
      text: 'Community Projects',
      items: [
        { text: 'Nezha server over Argo tunnel', link: '/en_US/case/case5.html' },
        { text: 'Nezha Mobile - An iOS Client For Nezha Dashboard', link: '/en_US/case/case6.html' },
        { text: 'MDPings - Android Client for Nezha Dashboard', link: '/en_US/case/case9.html' },
        { text: 'Broker for Nezha', link: '/en_US/case/case7.html' },
        { text: 'Telegram API Bot for Nezha V1 Version', link: '/en_US/case/case10.html' },
        { text: 'Serverless Telegram Bot for Nezha', link: '/en_US/case/case8.html' }
      ]
    }
  ]
}

function getDeveloperSidebarEnUS() {
  return [
    {
      text: 'Development Manual',
      items: [
        { text: 'API documentation', link: '/en_US/developer/api.html' },
        { text: 'i18n', link: '/en_US/developer/i18n.html' }
      ]
    }
  ]
}
