<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { data } from '../../../projects/index.data'

const route = useRoute()

// posts 可能在 SSR 阶段未就绪，用 computed 保护
const posts = computed(() => data?.posts ?? [])

// 当前页面 url 规范化：去掉 .html 后缀
const currentUrl = computed(() => {
  const path = route.path
  if (!path) return ''
  let u = path
  if (u.endsWith('.html')) u = u.slice(0, -5)
  if (u.endsWith('/')) u = u.slice(0, -1)
  return u
})

// 是否是项目详情页（排除列表页 /projects/）
const isProjectPage = computed(() => {
  const u = currentUrl.value
  if (!u) return false
  return u.startsWith('/projects/') && u !== '/projects'
})

// 当前项目在 posts 中的索引（posts 按日期倒序，最新在前 = 列表最上方）
const currentIndex = computed(() => {
  if (!isProjectPage.value) return -1
  return posts.value.findIndex(p => {
    let pu = p.url ?? ''
    if (pu.endsWith('.html')) pu = pu.slice(0, -5)
    if (pu.endsWith('/')) pu = pu.slice(0, -1)
    return pu === currentUrl.value
  })
})

// 上一页 = 列表中上方的项目（更新，倒序中 index - 1）
const prev = computed(() => {
  const i = currentIndex.value
  const list = posts.value
  if (i <= 0) return null
  return list[i - 1]
})

// 下一页 = 列表中下方的项目（更旧，倒序中 index + 1）
const next = computed(() => {
  const i = currentIndex.value
  const list = posts.value
  if (i < 0 || i >= list.length - 1) return null
  return list[i + 1]
})
</script>

<template>
  <div v-if="isProjectPage && (prev || next)" class="pn-root">
    <div class="pn-row">
      <!-- 上一页（更旧） -->
      <a v-if="prev" :href="prev.url" class="pn-item pn-prev">
        <span class="pn-dir">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          上一页
        </span>
        <span class="pn-title">{{ prev.frontmatter.title }}</span>
      </a>
      <span v-else class="pn-item pn-placeholder" />

      <!-- 下一页（更新） -->
      <a v-if="next" :href="next.url" class="pn-item pn-next">
        <span class="pn-dir">
          下一页
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
        <span class="pn-title">{{ next.frontmatter.title }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.pn-root {
  margin-top: 3rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.pn-row {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}

.pn-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-decoration: none;
  color: var(--vp-c-text-2);
  transition: padding-left 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.2s ease;
}

.pn-prev {
  align-items: flex-start;
}

.pn-next {
  align-items: flex-end;
  text-align: right;
}

.pn-placeholder {
  visibility: hidden;
}

.pn-dir {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.pn-dir svg {
  width: 14px;
  height: 14px;
}

.pn-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.2s ease;
}

.pn-prev:hover {
  padding-left: 8px;
}

.pn-prev:hover .pn-title {
  color: var(--vp-c-brand-1);
}

.pn-next:hover {
  padding-right: 8px;
}

.pn-next:hover .pn-title {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .pn-row {
    flex-direction: column;
    gap: 16px;
  }
  .pn-next {
    align-items: flex-start;
    text-align: left;
  }
}
</style>
