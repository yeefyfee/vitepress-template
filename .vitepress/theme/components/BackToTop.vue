<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

const onScroll = () => {
  visible.value = window.scrollY > 320
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition name="btt-fade">
    <button
      v-show="visible"
      class="btt-btn"
      aria-label="返回顶部"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.btt-btn {
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 40;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.btt-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.btt-btn svg {
  width: 18px;
  height: 18px;
}

.btt-fade-enter-active,
.btt-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.btt-fade-enter-from,
.btt-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .btt-btn {
    right: 16px;
    bottom: 16px;
  }
}
</style>
