<script setup lang="ts">
import { computed } from 'vue'
import { data } from '@root/projects/index.data'

// data 是 ContentLoader 返回的响应式对象，posts 在加载完成前可能为 undefined
const posts = computed(() => data?.posts ?? [])

/* 无封面时用纯色占色块，基于标题 hash 选取首页配色方案中的纯色 */
const solidColors = [
  '#0a84ff',
  '#5e5ce6',
  '#30d158',
  '#ff9f0a',
  '#ff375f',
  '#bf5af2',
]

function coverColor(title: string) {
  let h = 0
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) >>> 0
  return solidColors[h % solidColors.length]
}

function firstChar(title: string) {
  return title.charAt(0)
}

function formatDate(d?: string) {
  if (!d) return ''
  const date = new Date(d)
  if (isNaN(date.getTime())) return d
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit' })
}
</script>

<template>
  <div class="pl-root">
    <!-- 页面标题区 -->
    <header class="pl-header">
      <h1 class="pl-page-title">交付案例</h1>
      <p class="pl-page-desc">已经完成交付的项目汇总，按时间倒序排列</p>
    </header>

    <!-- 大框卡片列表 -->
    <div class="pl-grid">
      <a
        v-for="(post, i) in posts"
        :key="post.url"
        :href="post.url"
        class="pl-card"
        :style="{ animationDelay: `${i * 100}ms` }"
      >
        <!-- 封面区：大图铺满，无边界 -->
        <div class="pl-cover">
          <img
            v-if="post.frontmatter.cover"
            :src="post.frontmatter.cover"
            :alt="post.frontmatter.title"
            class="pl-cover-img"
          />
          <div
            v-else
            class="pl-cover-fallback"
            :style="{ background: coverColor(post.frontmatter.title) }"
          >
            <span class="pl-cover-char">{{ firstChar(post.frontmatter.title) }}</span>
          </div>
          <!-- 渐变遮罩：保证文字可读性 -->
          <div class="pl-cover-mask" />
        </div>

        <!-- 信息区：浮于封面底部 -->
        <div class="pl-info">
          <div class="pl-info-top">
            <time class="pl-date">{{ formatDate(post.frontmatter.date) }}</time>
            <svg class="pl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </div>
          <h3 class="pl-title">{{ post.frontmatter.title }}</h3>
          <p v-if="post.frontmatter.description" class="pl-desc">
            {{ post.frontmatter.description }}
          </p>
        </div>
      </a>
    </div>

    <p v-if="!posts.length" class="pl-empty">
      暂无项目。在 <code>projects/</code> 目录下新建 Markdown 文件即可。
    </p>
  </div>
</template>

<style scoped>
.pl-root {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---- 页面标题 ---- */
.pl-header {
  padding: 80px 0 56px;
}

.pl-page-title {
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--vp-c-text-1);
}

.pl-page-desc {
  margin: 16px 0 0;
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  letter-spacing: -0.01em;
}

/* ---- 卡片网格：大框、无边界 ---- */
.pl-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  padding-bottom: 80px;
}

@media (min-width: 768px) {
  .pl-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }
}

.pl-card {
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  opacity: 0;
  transform: translateY(24px);
  animation: plIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes plIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pl-card:hover {
  transform: translateY(-4px);
}

/* ---- 封面区：大图铺满 ---- */
.pl-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
}

.pl-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.pl-card:hover .pl-cover-img {
  transform: scale(1.04);
}

.pl-cover-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.pl-card:hover .pl-cover-fallback {
  transform: scale(1.04);
}

.pl-cover-char {
  font-size: 4rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -0.04em;
}

.pl-cover-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.1) 40%,
    transparent 70%
  );
  pointer-events: none;
}

/* ---- 信息区：浮于封面底部 ---- */
.pl-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 28px 28px 24px;
  z-index: 1;
}

.pl-info-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.pl-date {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.04em;
}

.pl-arrow {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.3s ease;
}

.pl-card:hover .pl-arrow {
  transform: translate(3px, -3px);
  color: #fff;
}

.pl-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: #fff;
}

.pl-desc {
  margin: 8px 0 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ---- 空状态 ---- */
.pl-empty {
  padding: 4rem 2rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

/* ---- 移动端 ---- */
@media (max-width: 767px) {
  .pl-root {
    padding: 0 16px;
  }
  .pl-header {
    padding: 48px 0 32px;
  }
  .pl-grid {
    gap: 20px;
    padding-bottom: 48px;
  }
  .pl-info {
    padding: 20px 20px 18px;
  }
  .pl-title {
    font-size: 1.15rem;
  }
  .pl-desc {
    font-size: 0.82rem;
  }
  .pl-cover-char {
    font-size: 3rem;
  }
}

/* ---- 暗色模式 ---- */
.dark .pl-card {
  background: var(--vp-c-bg-soft);
}
</style>
