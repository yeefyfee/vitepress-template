import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Layout from './Layout.vue'
import './styles/extra.css'

// 自动扫描 components/ 目录下所有 .vue 单文件组件并全局注册，
// 以后在 Markdown 里 <组件文件名/> 直接用，不再需要在 enhanceApp 里手动加 app.component。
// 组件名 = 去除扩展名后的 PascalCase 文件名（例如 WpTemplateList.vue → <WpTemplateList />）
const modules = import.meta.glob('./components/**/*.vue', { eager: true }) as Record<
  string,
  { default: any }
>
const componentEntries = Object.entries(modules).map(([path, mod]) => {
  const name = path
    .split('/')
    .pop()!
    .replace(/\.vue$/, '')
  return [name, mod.default] as const
})

export default {
  extends: DefaultTheme,
  Layout: () => h(Layout),
  enhanceApp({ app }) {
    for (const [name, component] of componentEntries) {
      // 幂等：已注册则跳过，避免 SSR + CSR 双阶段重复 Duplicate keys 告警
      if (!app.component(name)) {
        app.component(name, component)
      }
    }
  }
} satisfies Theme
