<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomeShowcase from './components/HomeShowcase.vue'
import NotificationBar from './components/NotificationBar.vue'
import BackToTop from './components/BackToTop.vue'
import ProjectPrevNext from './components/ProjectPrevNext.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- 全站通知栏：header 下方，任何页面都会渲染（无通知时组件内部不显示） -->
    <template #layout-top>
      <NotificationBar />
    </template>

    <!--
      extra.css 中已隐藏默认的 .VPHero / .VPFeatures 区块；
      此处仅在 features-after 位置注入我们自定义的首页展示组件。
      注意：非首页页面时，home-features-after slot 不会渲染，因此不会出现 HomeShowcase。
    -->
    <template #home-features-after>
      <HomeShowcase />
    </template>

    <!-- 项目详情页底部：上一页 / 下一页导航（组件内部判断是否项目页） -->
    <template #doc-after>
      <ProjectPrevNext />
    </template>

    <!-- 全局返回顶部按钮（滚动超过阈值显示，position:fixed 不影响布局） -->
    <template #layout-bottom>
      <BackToTop />
    </template>
  </Layout>
</template>
