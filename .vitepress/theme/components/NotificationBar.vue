<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()

interface NotifConfig {
  text: string
  link?: string
  linkText?: string
}

const notification = (theme.value as any).notification as NotifConfig | undefined

const textWrapEl = ref<HTMLElement | null>(null)
const textEl = ref<HTMLElement | null>(null)

// 检测文字是否溢出，溢出则复制一份用于无缝滚动
const checkOverflow = () => {
  const wrap = textWrapEl.value
  const text = textEl.value
  if (!wrap || !text) return
  const isOverflowing = text.scrollWidth > wrap.clientWidth
  if (isOverflowing && !text.querySelector('.nb-text-clone')) {
    const clone = text.firstChild?.cloneNode(true)
    if (clone) {
      const cloneSpan = document.createElement('span')
      cloneSpan.className = 'nb-text-clone'
      cloneSpan.textContent = '　　'
      cloneSpan.style.display = 'inline-block'
      text.appendChild(cloneSpan)
      const clone2 = text.firstChild?.cloneNode(true)
      if (clone2) text.appendChild(clone2)
    }
    text.classList.add('nb-scrolling')
    const duration = Math.max(6, text.scrollWidth / 40)
    text.style.animationDuration = duration + 's'
  }
}

onMounted(async () => {
  if (!notification?.text) return
  await nextTick()
  document.body.classList.add('has-nb')
  checkOverflow()
  window.addEventListener('resize', checkOverflow)
})

onBeforeUnmount(() => {
  document.body.classList.remove('has-nb')
  window.removeEventListener('resize', checkOverflow)
})
</script>

<template>
  <div v-if="notification?.text" class="nb-root">
    <div class="nb-inner">
      <!-- 橙色喇叭 icon -->
      <svg class="nb-icon" viewBox="0 0 24 24" fill="none" stroke="#ff9f0a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 11v2a1 1 0 0 0 1 1h2l4.5 4.5a.5.5 0 0 0 .85-.35V5.85a.5.5 0 0 0-.85-.35L6 10H4a1 1 0 0 0-1 1Z"/>
        <path d="M16 8a4 4 0 0 1 0 8"/>
        <path d="M19 5a8 8 0 0 1 0 14"/>
      </svg>
      <!-- 文字区域：超长时滚动显示 -->
      <div ref="textWrapEl" class="nb-text-wrap">
        <span ref="textEl" class="nb-text">{{ notification.text }}</span>
      </div>
      <!-- 链接：固定最右侧，双箭头 + 左右摆动动画 -->
      <a v-if="notification.link" :href="notification.link" class="nb-link" :aria-label="notification.linkText ?? '查看详情'">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="nb-link-icon">
          <path d="M8 6l5 6-5 6"/>
          <path d="M13 6l5 6-5 6"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.nb-root {
  width: 100%;
  border-bottom: 1px solid rgba(255, 159, 10, 0.15);
  font-size: 0.85rem;
  line-height: 1.5;
  color: #8a5a00;
}

.nb-inner {
  padding: 10px 8px 10px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}

.nb-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.nb-text-wrap {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  /* 文字在喇叭icon和查看icon之间居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.nb-text {
  display: inline-block;
  white-space: nowrap;
  letter-spacing: 0.01em;
  will-change: transform;
  text-align: center;
}

.nb-text.nb-scrolling {
  animation: nbScroll linear infinite;
}

@keyframes nbScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.nb-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #b06800;
  text-decoration: none;
  width: 28px;
  height: 28px;
  transition: color 0.2s ease, background 0.2s ease;
}

.nb-link:hover {
  color: #ff9f0a;
  background: rgba(255, 159, 10, 0.1);
}

.nb-link-icon {
  width: 18px;
  height: 18px;
  animation: nbArrow 1.6s ease-in-out infinite;
}

@keyframes nbArrow {
  0%, 100% { transform: translateX(0); }
  50%      { transform: translateX(3px); }
}

@media (max-width: 560px) {
  .nb-inner { padding: 10px 8px 10px 16px; gap: 8px; }
  .nb-text { font-size: 13px; }
}
</style>
