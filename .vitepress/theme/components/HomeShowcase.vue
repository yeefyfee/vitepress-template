<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { data } from '../../../projects/index.data'

/* ============================================================
 * HomeShowcase —— 丝滑滚动 · 去卡片化
 * 保留第一版配色氛围 + 圆润 SVG 图标
 * 移除悬浮式内容容器（无卡片背景/边框/阴影）
 * 布局非矩阵式，模块用分割线与留白定位
 * 模块顺序：Profile → Skills → Service & Slogan → Contact
 * ============================================================ */

// 动态统计项目数量
const projectCount = data.posts.length

const setupReveal = () => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hs-in')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )
  document.querySelectorAll('.hs-reveal').forEach((el) => io.observe(el))
  return () => io.disconnect()
}

let cleanupReveal: (() => void) | undefined

onMounted(() => {
  cleanupReveal = setupReveal()
})

onUnmounted(() => cleanupReveal?.())
</script>

<template>
  <div class="hs-root">
    <!-- ======================= 1. Hero 个人简介大屏 ======================= -->
    <section class="hs-hero">
      <div class="hs-hero-bg">
        <div class="hs-hero-orb hs-orb-a"></div>
        <div class="hs-hero-orb hs-orb-b"></div>
        <div class="hs-hero-orb hs-orb-c"></div>
        <div class="hs-hero-grid"></div>
      </div>

      <div class="hs-hero-inner">
        <h1 class="hs-reveal hs-hero-name">
          Theo
        </h1>

        <p class="hs-reveal hs-hero-title">
          全栈工程师 · <em>产品设计</em> · 系统架构
        </p>

        <p class="hs-reveal hs-hero-tagline">
          把复杂问题拆解为简洁系统。<br />
          用代码塑造体验，用设计传递温度。
        </p>

        <!-- 统计：一行展示，数字带颜色 -->
        <div class="hs-reveal hs-hero-stats">
          <div class="hs-stat">
            <span class="hs-stat-n">10+</span>
            <span class="hs-stat-l">年经验</span>
          </div>
          <div class="hs-stat-sep"></div>
          <div class="hs-stat">
            <span class="hs-stat-n">{{ projectCount }}</span>
            <span class="hs-stat-l">个项目</span>
          </div>
        </div>

        <div class="hs-reveal hs-hero-actions">
          <a href="/projects/" class="hs-btn hs-btn-primary">
            <span>查看作品</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ======================= 2. Skills 技能展示 · 横向跑马灯 ======================= -->
    <section id="skills" class="hs-section">
      <div class="hs-section-head hs-section-head-left">
        <h2 class="hs-reveal hs-section-title">
          全方位能力，<span class="hs-accent">端到端交付</span>
        </h2>
        <p class="hs-reveal hs-section-sub">
          从像素到架构，从前端交互到后端服务，独立完整闭环。
        </p>
      </div>

      <!-- 横向跑马灯：图标 + 名称横向滚动展示 -->
      <div class="hs-reveal hs-skills-marquee">
        <div class="hs-marquee-track">
          <!-- 第一组（8项） -->
          <div class="hs-marquee-item">
            <div class="hs-skill-icon hs-skill-icon-frontend">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="7" y="11" width="50" height="42" rx="12"/>
                <path d="M7 20h50"/>
                <circle cx="13" cy="15.5" r="1.6" fill="currentColor"/>
                <circle cx="18.5" cy="15.5" r="1.6" fill="currentColor"/>
                <path d="M22 32h10M22 38h16M38 44l6-6-6-6"/>
              </svg>
            </div>
            <span class="hs-marquee-name">前端工程</span>
          </div>

          <div class="hs-marquee-item">
            <div class="hs-skill-icon hs-skill-icon-backend">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <ellipse cx="32" cy="15" rx="20" ry="7"/>
                <path d="M12 15v17c0 3.9 8.9 7 20 7s20-3.1 20-7V15"/>
                <path d="M12 32v17c0 3.9 8.9 7 20 7s20-3.1 20-7V32"/>
                <path d="M26 22c3 1 7 1 10 0M26 39c3 1 7 1 10 0"/>
              </svg>
            </div>
            <span class="hs-marquee-name">后端服务</span>
          </div>

          <div class="hs-marquee-item">
            <div class="hs-skill-icon hs-skill-icon-miniapp">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="32" cy="32" r="22"/>
                <path d="M18 26c4 4 10 4 14 0"/>
                <path d="M18 38c4-4 10-4 14 0"/>
                <path d="M32 20c-2 6-2 18 0 24"/>
                <path d="M36 28c4-2 8-2 12 0"/>
                <path d="M36 36c4 2 8 2 12 0"/>
              </svg>
            </div>
            <span class="hs-marquee-name">小程序</span>
          </div>

          <div class="hs-marquee-item">
            <div class="hs-skill-icon hs-skill-icon-app">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="14" y="6" width="36" height="52" rx="14"/>
                <rect x="14" y="6" width="36" height="52" rx="14" transform="rotate(90 32 32)"/>
                <circle cx="32" cy="32" r="3" fill="currentColor"/>
              </svg>
            </div>
            <span class="hs-marquee-name">移动APP</span>
          </div>

          <div class="hs-marquee-item">
            <div class="hs-skill-icon hs-skill-icon-deploy">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M32 10v28"/>
                <path d="m22 28 10 10 10-10"/>
                <path d="M14 48h36"/>
                <path d="M18 48v4a6 6 0 0 0 6 6h16a6 6 0 0 0 6-6v-4"/>
              </svg>
            </div>
            <span class="hs-marquee-name">上线交付</span>
          </div>

          <div class="hs-marquee-item">
            <div class="hs-skill-icon hs-skill-icon-ai">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="32" cy="32" r="14"/>
                <circle cx="32" cy="32" r="6"/>
                <path d="M32 8v6M32 50v6M8 32h6M50 32h6M14.5 14.5l4.3 4.3M45.2 45.2l4.3 4.3M49.5 14.5l-4.3 4.3M18.8 45.2l-4.3 4.3"/>
              </svg>
            </div>
            <span class="hs-marquee-name">AI & 数据</span>
          </div>

          <div class="hs-marquee-item">
            <div class="hs-skill-icon hs-skill-icon-chat">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 18a4 4 0 0 1 4-4h36a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H26l-12 10v-10h-4a4 4 0 0 1-4-4V18z"/>
                <path d="M22 28h20M22 36h14"/>
              </svg>
            </div>
            <span class="hs-marquee-name">技术交流</span>
          </div>

          <div class="hs-marquee-item">
            <div class="hs-skill-icon hs-skill-icon-community">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="22" cy="22" r="8"/>
                <circle cx="42" cy="22" r="8"/>
                <path d="M6 50c0-8 7-14 16-14s16 6 16 14"/>
                <path d="M30 50c0-7 6-11 12-11s12 4 12 11"/>
              </svg>
            </div>
            <span class="hs-marquee-name">社区建设</span>
          </div>

          <!-- 复制一组（8项）用于无缝循环 -->
          <div class="hs-marquee-item" aria-hidden="true">
            <div class="hs-skill-icon hs-skill-icon-frontend">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="7" y="11" width="50" height="42" rx="12"/>
                <path d="M7 20h50"/>
                <circle cx="13" cy="15.5" r="1.6" fill="currentColor"/>
                <circle cx="18.5" cy="15.5" r="1.6" fill="currentColor"/>
                <path d="M22 32h10M22 38h16M38 44l6-6-6-6"/>
              </svg>
            </div>
            <span class="hs-marquee-name">前端工程</span>
          </div>

          <div class="hs-marquee-item" aria-hidden="true">
            <div class="hs-skill-icon hs-skill-icon-backend">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <ellipse cx="32" cy="15" rx="20" ry="7"/>
                <path d="M12 15v17c0 3.9 8.9 7 20 7s20-3.1 20-7V15"/>
                <path d="M12 32v17c0 3.9 8.9 7 20 7s20-3.1 20-7V32"/>
                <path d="M26 22c3 1 7 1 10 0M26 39c3 1 7 1 10 0"/>
              </svg>
            </div>
            <span class="hs-marquee-name">后端服务</span>
          </div>

          <div class="hs-marquee-item" aria-hidden="true">
            <div class="hs-skill-icon hs-skill-icon-miniapp">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="32" cy="32" r="22"/>
                <path d="M18 26c4 4 10 4 14 0"/>
                <path d="M18 38c4-4 10-4 14 0"/>
                <path d="M32 20c-2 6-2 18 0 24"/>
                <path d="M36 28c4-2 8-2 12 0"/>
                <path d="M36 36c4 2 8 2 12 0"/>
              </svg>
            </div>
            <span class="hs-marquee-name">小程序</span>
          </div>

          <div class="hs-marquee-item" aria-hidden="true">
            <div class="hs-skill-icon hs-skill-icon-app">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="14" y="6" width="36" height="52" rx="14"/>
                <rect x="14" y="6" width="36" height="52" rx="14" transform="rotate(90 32 32)"/>
                <circle cx="32" cy="32" r="3" fill="currentColor"/>
              </svg>
            </div>
            <span class="hs-marquee-name">移动APP</span>
          </div>

          <div class="hs-marquee-item" aria-hidden="true">
            <div class="hs-skill-icon hs-skill-icon-deploy">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M32 10v28"/>
                <path d="m22 28 10 10 10-10"/>
                <path d="M14 48h36"/>
                <path d="M18 48v4a6 6 0 0 0 6 6h16a6 6 0 0 0 6-6v-4"/>
              </svg>
            </div>
            <span class="hs-marquee-name">上线交付</span>
          </div>

          <div class="hs-marquee-item" aria-hidden="true">
            <div class="hs-skill-icon hs-skill-icon-ai">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="32" cy="32" r="14"/>
                <circle cx="32" cy="32" r="6"/>
                <path d="M32 8v6M32 50v6M8 32h6M50 32h6M14.5 14.5l4.3 4.3M45.2 45.2l4.3 4.3M49.5 14.5l-4.3 4.3M18.8 45.2l-4.3 4.3"/>
              </svg>
            </div>
            <span class="hs-marquee-name">AI & 数据</span>
          </div>

          <div class="hs-marquee-item" aria-hidden="true">
            <div class="hs-skill-icon hs-skill-icon-chat">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 18a4 4 0 0 1 4-4h36a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H26l-12 10v-10h-4a4 4 0 0 1-4-4V18z"/>
                <path d="M22 28h20M22 36h14"/>
              </svg>
            </div>
            <span class="hs-marquee-name">技术交流</span>
          </div>

          <div class="hs-marquee-item" aria-hidden="true">
            <div class="hs-skill-icon hs-skill-icon-community">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="22" cy="22" r="8"/>
                <circle cx="42" cy="22" r="8"/>
                <path d="M6 50c0-8 7-14 16-14s16 6 16 14"/>
                <path d="M30 50c0-7 6-11 12-11s12 4 12 11"/>
              </svg>
            </div>
            <span class="hs-marquee-name">社区建设</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================= 3. Service 服务保障 & Slogan ======================= -->
    <section class="hs-section hs-service">
      <!-- Slogan：大字排版区，无卡片，用渐变文字与分割线 -->
      <div class="hs-reveal hs-slogan">
        <div class="hs-slogan-mark">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 22c0-6 4-10 10-10 3 0 5.5 1.5 7 3"/>
            <path d="M22 12c0 6-3 11-8 14"/>
            <path d="M34 22c0-6 4-10 10-10 3 0 5.5 1.5 7 3"/>
            <path d="M42 12c0 6-3 11-8 14"/>
            <path d="M22 40c6 8 16 12 26 12 2 0 4-.2 6-.6"/>
          </svg>
        </div>
        <p class="hs-slogan-text">
          少即是多，<br />慢但更快。
        </p>
      </div>

      <div class="hs-service-main">
        <div class="hs-section-head hs-service-head">
          <h2 class="hs-reveal hs-section-title">
            交付的不止代码，<br />更是<span class="hs-accent">长久的价值</span>
          </h2>
        </div>

        <!-- 服务保障：纵向列表，分割线分隔，无卡片 -->
        <ul class="hs-guarantees">
          <li class="hs-reveal hs-guarantee">
            <div class="hs-guarantee-icon hs-gi-1">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M24 6 7 14v10c0 11 7.5 17.5 17 19 9.5-1.5 17-8 17-19V14L24 6z"/>
                <path d="m17 24 5 5 9-10"/>
              </svg>
            </div>
            <div>
              <h4>品质保障</h4>
              <p>单元测试、类型系统、Code Review 三道防线，保证可维护性。</p>
            </div>
          </li>

          <li class="hs-reveal hs-guarantee">
            <div class="hs-guarantee-icon hs-gi-2">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="24" cy="24" r="18"/>
                <path d="M24 12v12l9 5"/>
              </svg>
            </div>
            <div>
              <h4>按时交付</h4>
              <p>透明的里程碑与周报，进度随时可查，源码完整交付，绝不延期。</p>
            </div>
          </li>

          <li class="hs-reveal hs-guarantee">
            <div class="hs-guarantee-icon hs-gi-3">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 30c0-9 7-16 16-16s16 7 16 16v8H8v-8z"/>
                <path d="M16 30c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
                <circle cx="24" cy="34" r="2.4" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h4>隐私与安全</h4>
              <p>NDA 协议、最小权限原则、数据加密，尊重你的商业机密。</p>
            </div>
          </li>

          <li class="hs-reveal hs-guarantee">
            <div class="hs-guarantee-icon hs-gi-4">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 24c0-4 3-7 7-7h4l3-6h10l3 6h4c4 0 7 3 7 7v10c0 3-2 6-5 6H12c-3 0-5-3-5-6V24z"/>
                <circle cx="17" cy="40" r="3"/>
                <circle cx="31" cy="40" r="3"/>
              </svg>
            </div>
            <div>
              <h4>后期维护</h4>
              <p>交付后 1 个月免费维护，后续可续签，无忧迭代。</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ======================= 4. Contact 联系方式 ======================= -->
    <section id="contact" class="hs-section">
      <div class="hs-section-head">
        <h2 class="hs-reveal hs-section-title">
          有想法？<span class="hs-accent">一起聊聊吧</span>
        </h2>
        <p class="hs-reveal hs-section-sub">
          无论是项目合作、技术交流还是一杯咖啡的邀约，我都欢迎。
        </p>
      </div>

      <!-- 联系方式：纵向列表，分割线分隔，无卡片 -->
      <div class="hs-contact-list">
        <a href="mailto:hello@example.com" class="hs-reveal hs-contact-item">
          <div class="hs-contact-icon hs-ci-mail">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="10" width="36" height="28" rx="7"/>
              <path d="m8 14 16 12L40 14"/>
            </svg>
          </div>
          <div class="hs-contact-text">
            <div class="hs-contact-label">Email</div>
            <div class="hs-contact-value">theobuild@163.com</div>
          </div>
        </a>

        <a href="javascript:;" class="hs-reveal hs-contact-item">
          <div class="hs-contact-icon hs-ci-wechat">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 10C9.7 10 3 15.8 3 23c0 4 2.3 7.6 6 10l-1.5 5L15 34c1 .2 2 .3 3 .3"/>
              <path d="M30 18c8.3 0 15 5.8 15 13s-6.7 13-15 13c-1 0-2-.1-3-.3l-5.5 4 1.5-5c-3.7-2.4-6-6-6-10 0-7.2 6.7-13 15-13z"/>
              <circle cx="13" cy="21" r="1.6" fill="currentColor"/>
              <circle cx="22" cy="21" r="1.6" fill="currentColor"/>
              <circle cx="25" cy="27" r="1.6" fill="currentColor"/>
              <circle cx="34" cy="27" r="1.6" fill="currentColor"/>
            </svg>
          </div>
          <div class="hs-contact-text">
            <div class="hs-contact-label">微信</div>
            <div class="hs-contact-value">Oii9023</div>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ============================================================
 * Design Tokens · 保留第一版配色，去卡片化
 * ============================================================ */
.hs-root {
  --hs-color-bg: #fafafa;
  --hs-color-bg-2: #f3f3f5;
  --hs-color-fg: #0d0d0f;
  --hs-color-fg-2: #5b5b66;
  --hs-color-fg-3: #9898a3;
  --hs-color-accent: #0a84ff;
  --hs-color-accent-2: #5e5ce6;
  --hs-color-line: rgba(0, 0, 0, 0.08);
  color: var(--hs-color-fg);
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  background: var(--hs-color-bg);
}

@media (prefers-color-scheme: dark) {
  .hs-root {
    --hs-color-bg: #08080a;
    --hs-color-bg-2: #111114;
    --hs-color-fg: #f5f5f7;
    --hs-color-fg-2: #a1a1aa;
    --hs-color-fg-3: #6b6b76;
    --hs-color-line: rgba(255, 255, 255, 0.1);
  }
}

/* ============================================================
 * Reveal · 滚动入场
 * ============================================================ */
.hs-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
.hs-reveal.hs-in {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================================
 * 1. Hero
 * ============================================================ */
.hs-hero {
  position: relative;
  min-height: calc(100vh - 114px);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  /* 顶部用紧凑 padding 代替垂直居中：内容紧贴通知栏下方，无大片空白 */
  padding: 60px 24px 100px;
}
.hs-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.hs-hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: hsFloat 18s ease-in-out infinite;
}
.hs-orb-a {
  width: 520px; height: 520px;
  background: radial-gradient(circle at 30% 30%, #0a84ff, transparent 60%);
  top: -40px; left: -80px;
}
.hs-orb-b {
  width: 460px; height: 460px;
  background: radial-gradient(circle at 70% 40%, #5e5ce6, transparent 60%);
  bottom: -140px; right: -60px;
  animation-delay: -6s;
}
.hs-orb-c {
  width: 380px; height: 380px;
  background: radial-gradient(circle at 50% 50%, #bf5af2, transparent 60%);
  top: 40%; left: 55%;
  animation-delay: -12s;
  opacity: 0.32;
}
.hs-hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(120, 120, 140, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(120, 120, 140, 0.06) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}
@keyframes hsFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -30px) scale(1.05); }
  66% { transform: translate(-24px, 18px) scale(0.96); }
}

.hs-hero-inner {
  position: relative;
  z-index: 1;
  text-align: left;
  max-width: 640px;
  padding-left: 8%;
}
.hs-hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--hs-color-line);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--hs-color-fg-2);
  font-weight: 500;
}
.hs-hero-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #30d158;
  box-shadow: 0 0 0 4px rgba(48, 209, 88, 0.15);
  animation: hsPulse 2s ease-in-out infinite;
}
@keyframes hsPulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(48, 209, 88, 0.15); }
  50% { box-shadow: 0 0 0 8px rgba(48, 209, 88, 0.05); }
}

.hs-hero-name {
  margin: 32px 0 14px;
  font-size: clamp(42px, 10vw, 70px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.02;
  background: linear-gradient(180deg, var(--hs-color-fg) 0%, var(--hs-color-fg-2) 160%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hs-hero-title {
  margin: 0 0 20px;
  font-size: clamp(18px, 2.2vw, 26px);
  font-weight: 500;
  color: var(--hs-color-fg-2);
  letter-spacing: -0.01em;
}
.hs-hero-title em {
  font-style: normal;
  color: var(--hs-color-accent);
  font-weight: 600;
}
.hs-hero-tagline {
  margin: 0 auto 44px;
  max-width: 580px;
  font-size: clamp(15px, 1.6vw, 18px);
  line-height: 1.7;
  color: var(--hs-color-fg-3);
}

.hs-hero-actions {
  display: inline-flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 68px;
}
.hs-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.hs-btn svg {
  width: 18px; height: 18px;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.hs-btn-primary {
  background: var(--hs-color-fg);
  color: var(--hs-color-bg);
}
.hs-btn-primary:hover {
  transform: translateY(-2px);
  background: var(--hs-color-accent);
}
.hs-btn-primary:hover svg {
  transform: translateX(3px);
}
.hs-btn-ghost {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--hs-color-line);
  color: var(--hs-color-fg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.hs-btn-ghost:hover {
  border-color: var(--hs-color-fg-3);
  transform: translateY(-2px);
}

/* 统计：一行内联展示，数字带颜色 */
.hs-hero-stats {
  display: flex;
  align-items: baseline;
  gap: 24px;
  margin-bottom: 44px;
}
.hs-stat {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
}
.hs-stat-n {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, var(--hs-color-accent), var(--hs-color-accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hs-stat-l {
  font-size: 14px;
  color: var(--hs-color-fg-3);
}
.hs-stat-sep {
  width: 1px;
  height: 18px;
  background: var(--hs-color-line);
  align-self: center;
}

/* ============================================================
 * Section Common
 * ============================================================ */
.hs-section {
  position: relative;
  padding: 140px 24px;
  max-width: 1100px;
  margin: 0 auto;
}
.hs-section-head {
  text-align: center;
  margin-bottom: 72px;
}
.hs-eyebrow {
  display: inline-block;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hs-color-accent);
  font-weight: 600;
  margin-bottom: 18px;
}
.hs-section-title {
  font-size: clamp(36px, 5.4vw, 60px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.08;
  margin: 0;
}
.hs-section-sub {
  margin: 22px auto 0;
  max-width: 620px;
  font-size: 17px;
  line-height: 1.7;
  color: var(--hs-color-fg-2);
}
.hs-accent {
  background: linear-gradient(120deg, var(--hs-color-accent), var(--hs-color-accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ============================================================
 * 2. Skills · 横向跑马灯
 * ============================================================ */
.hs-section-head-left {
  text-align: left;
  margin-bottom: 56px;
}
.hs-section-head-left .hs-section-sub {
  margin-left: 0;
}

.hs-skills-marquee {
  overflow: hidden;
  width: 100%;
  position: relative;
  /* 两侧渐隐遮罩 */
  mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
}
.hs-marquee-track {
  display: flex;
  align-items: center;
  gap: 48px;
  width: max-content;
  animation: hsMarquee 52s linear infinite;
}
.hs-skills-marquee:hover .hs-marquee-track {
  animation-play-state: paused;
}
@keyframes hsMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.hs-marquee-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.hs-marquee-item:hover {
  transform: translateY(-6px);
}
.hs-marquee-name {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--hs-color-fg-2);
  white-space: nowrap;
}

.hs-skill-icon {
  width: 72px;
  height: 72px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hs-skill-icon svg {
  width: 38px;
  height: 38px;
}
.hs-skill-icon-frontend    { background: linear-gradient(135deg, #0a84ff22, #0a84ff0a); color: #0a84ff; }
.hs-skill-icon-backend     { background: linear-gradient(135deg, #30d15822, #30d1580a); color: #30d158; }
.hs-skill-icon-miniapp     { background: linear-gradient(135deg, #07c16022, #07c1600a); color: #07c160; }
.hs-skill-icon-app         { background: linear-gradient(135deg, #ff375f22, #ff375f0a); color: #ff375f; }
.hs-skill-icon-deploy      { background: linear-gradient(135deg, #ff9f0a22, #ff9f0a0a); color: #ff9f0a; }
.hs-skill-icon-ai          { background: linear-gradient(135deg, #5e5ce622, #5e5ce60a); color: #5e5ce6; }
.hs-skill-icon-chat        { background: linear-gradient(135deg, #bf5af222, #bf5af20a); color: #bf5af2; }
.hs-skill-icon-community   { background: linear-gradient(135deg, #00b4d822, #00b4d80a); color: #00b4d8; }

/* ============================================================
 * 3. Service & Slogan
 * ============================================================ */
.hs-service {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: start;
  max-width: 1180px;
}

/* Slogan：大字排版，无卡片，渐变文字 */
.hs-slogan {
  padding: 20px 0;
}
.hs-slogan-mark {
  width: 68px;
  height: 68px;
  color: var(--hs-color-accent);
  margin-bottom: 36px;
}
.hs-slogan-mark svg {
  width: 100%;
  height: 100%;
}
.hs-slogan-text {
  margin: 0 0 24px;
  font-size: clamp(32px, 3.6vw, 48px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  background: linear-gradient(120deg, var(--hs-color-accent), var(--hs-color-accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hs-slogan-author {
  margin: 0;
  font-size: 14px;
  color: var(--hs-color-fg-3);
  letter-spacing: 0.04em;
}

.hs-service-head {
  text-align: left;
  margin-bottom: 48px;
}

/* 服务保障：纵向列表，分割线分隔，无卡片 */
.hs-guarantees {
  list-style: none;
  padding: 0;
  margin: 0;
}
.hs-guarantee {
  display: flex;
  align-items: flex-start;
  gap: 22px;
  padding: 28px 0;
  border-top: 1px solid var(--hs-color-line);
  transition: padding-left 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.hs-guarantee:last-child {
  border-bottom: 1px solid var(--hs-color-line);
}
.hs-guarantee:hover {
  padding-left: 12px;
}
.hs-guarantee-icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hs-guarantee-icon svg {
  width: 28px;
  height: 28px;
}
.hs-gi-1 { background: #30d15818; color: #30d158; }
.hs-gi-2 { background: #0a84ff18; color: #0a84ff; }
.hs-gi-3 { background: #ff9f0a18; color: #ff9f0a; }
.hs-gi-4 { background: #bf5af218; color: #bf5af2; }

.hs-guarantee h4 {
  margin: 4px 0 6px;
  font-size: 17px;
  font-weight: 600;
}
.hs-guarantee p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--hs-color-fg-2);
}

/* ============================================================
 * 4. Contact · 纵向列表，分割线分隔，无卡片
 * ============================================================ */
.hs-contact-list {
  max-width: 760px;
  margin: 0 auto;
}
.hs-contact-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 26px 0;
  border-top: 1px solid var(--hs-color-line);
  text-decoration: none;
  color: inherit;
  transition: padding-left 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.hs-contact-item:last-child {
  border-bottom: 1px solid var(--hs-color-line);
}
.hs-contact-item:hover {
  padding-left: 14px;
}
.hs-contact-icon {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hs-contact-icon svg {
  width: 24px;
  height: 24px;
}
.hs-ci-mail   { background: #0a84ff18; color: #0a84ff; }
.hs-ci-wechat { background: #30d15818; color: #30d158; }
.hs-ci-phone  { background: #bf5af218; color: #bf5af2; }

.hs-contact-label {
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--hs-color-fg-3);
  margin-bottom: 3px;
}
.hs-contact-value {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.005em;
}

/* ============================================================
 * Responsive
 * ============================================================ */
@media (max-width: 860px) {
  .hs-hero { padding: 60px 20px 80px; }
  .hs-hero-inner { padding-left: 0; }
  .hs-hero-stats { gap: 16px; flex-wrap: wrap; }
  .hs-stat-n { font-size: 22px; }
  .hs-section { padding: 90px 20px; }
  .hs-service {
    grid-template-columns: 1fr;
    gap: 56px;
  }
  .hs-service-head { text-align: center; }
  .hs-skill-icon { width: 60px; height: 60px; border-radius: 18px; }
  .hs-skill-icon svg { width: 32px; height: 32px; }
  .hs-marquee-name { font-size: 13px; }
}
@media (max-width: 480px) {
  .hs-hero-stats { gap: 12px; }
  .hs-guarantee { gap: 16px; }
  .hs-contact-item { gap: 16px; }
}
</style>
