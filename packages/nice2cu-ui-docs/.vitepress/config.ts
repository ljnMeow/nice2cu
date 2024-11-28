import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Nice2CU docs",
  description: "基于 vite + vue3 实现的移动端业务组件库",
  srcDir: './src',
  assetsDir: 'static',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/introduce' }
    ],
    sidebar: [
      {
        text: '开发指南',
        items: [
          { text: '介绍', link: '/introduce' },
          { text: '快速上手', link: '/getStartedQuickly' }
        ]
      },
      {
        text: '基础组件',
        items: [
          { text: 'nButton 按钮', link: '/basicComponents/nButton' },
          { text: 'nIcon 图标', link: '/basicComponents/nIcon' },
          { text: 'nCell 单元格', link: '/basicComponents/nCell' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ljnMeow/nice2cu' }
    ],
    search: {
      provider: "local",
    },
  },
})
