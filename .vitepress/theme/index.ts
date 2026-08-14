import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Layout from './Layout.vue'
import ProjectList from './components/ProjectList.vue'
import './styles/extra.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(Layout),
  enhanceApp({ app }) {
    // 同步注册：MD 中直接使用 <ProjectList /> 时，SSR 阶段需要组件已就绪
    app.component('ProjectList', ProjectList)
  }
} satisfies Theme
