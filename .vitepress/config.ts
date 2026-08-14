import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// 站点配置：所有导航/侧边栏在此集中维护
// 维护者：通常只需改 siteTitle、nav、sidebar 即可调整站点结构
export default defineConfig({
  lang: 'zh-CN',
  title: 'hi 欢迎来到这里',
  description: 'theo的个人站点，10年职业开发，端到端交付',

  // 站点标识（public/logo.svg）
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon.png' }]
  ],

  // Vite 配置：添加项目根目录 alias，避免 Windows 相对路径跨盘符解析 bug
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
        '@root': fileURLToPath(new URL('../', import.meta.url))
      }
    }
  },

  // 主题配置：沿用默认主题，仅做内容注入与样式覆盖
  themeConfig: {
    siteTitle: '首页',

    // 全站通知栏：有内容时在 header 下方显示，空则不显示
    notification: {
      text: '🎉 粉丝活动：小红书点赞+关注，评论私信我完成超低价私人站点接单！',
      link: '/notifications/20260814-fans',
      linkText: '立即查看'
    },

    // 顶部导航
    nav: [
      { text: '项目', link: '/projects/' },
      { text: '联系', link: '/#contact' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏：按目录分组，方便长文档导航
    sidebar: {
      '/about': [
        {
          text: '关于',
          items: [
            { text: '个人介绍', link: '/about' }
          ]
        }
      ]
    },

    // 搜索
    search: {
      provider: 'local'
    },

    // 社交链接（右上角图标）
    socialLinks: [
      {
        icon: {
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>'
        },
        link: 'https://www.xiaohongshu.com/user/profile/668239c70000000003033cdd'
      }
    ],

    // 页脚
    footer: {
      message: '本站点由个人独立经营 · 致力打造高质量的个人IP',
      copyright: 'Copyright © 2026'
    },

    outline: {
      level: [2, 3],
      label: '本页导航'
    },

    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部'
  }
})
