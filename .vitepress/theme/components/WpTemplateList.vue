<script setup lang="ts">
/* 与 ProjectList 保持 1:1 的视觉样式，仅数据源改为硬编码的两个境外独立站模板 */
interface WpTemplate {
  title: string
  description: string
  date: string       // 卡片右上角日期
  href: string       // 卡片点击跳转（public 下静态文件必须精确到 /index.html 避免 404）
  cover?: string     // 封面图，可空
  accent: string     // 无封面时的占色块品牌色
  initial: string    // 无封面时的首字母
  tags: string[]     // 展示用的标签
}

const templates: WpTemplate[] = [
  {
    title: '3C 数码科技独立站 · SONIC Pro',
    description: '全英文境外 TWS 耳机品牌站，深色科技风。含 Hero 大屏、技术特性、产品矩阵、技术规格、客户评价、CTA 等完整独立站模块。',
    date: '2026-08',
    href: '/wordpress/template-3c-tech/index.html',
    cover: '/wordpress/covers/3c-tech.jpg',
    accent: '#00d4ff',
    initial: 'S',
    tags: ['WordPress', 'WooCommerce', '英文 SEO', '3C/DTC']
  },
  {
    title: '时尚服饰杂志站 · MAISON NOIR',
    description: '全英文奢侈品服饰独立站，Quiet Luxury 杂志风。含公告栏、Lookbook 错视网格、工匠故事、产品栅格、Journal 专栏、Newsletter 订阅模块。',
    date: '2026-08',
    href: '/wordpress/template-fashion-apparel/index.html',
    cover: '/wordpress/covers/fashion-apparel.jpg',
    accent: '#8a6a4b',
    initial: 'M',
    tags: ['WordPress', 'Starter Site', '英文 SEO', '时尚品牌']
  },
  {
    title: 'B2B 外贸询盘站 · HARDWORKS 工业制造',
    description: '全英文 OEM/ODM 外贸询盘站，工业蓝橙配色。突出认证资质、核心加工能力、工厂介绍、产品分类，并以醒目的 RFQ CTA 引导客户上传图纸 24 小时内出报价。',
    date: '2026-08',
    href: '/wordpress/template-b2b-industrial/index.html',
    cover: '/wordpress/covers/b2b-industrial.jpg',
    accent: '#ff7a18',
    initial: 'H',
    tags: ['WordPress', 'B2B 外贸', '询盘 RFQ', '工业制造']
  },
  {
    title: 'SaaS 工具落地页 · FLOWRY 数据仪表盘',
    description: '全英文 SaaS 官网落地页，薄荷绿科技风。包含产品大图仪表盘 mockup、功能卡片、三档定价表、客户 Logo 墙、CTA 转化带，适合 Analytics / CRM / AI 工具。',
    date: '2026-08',
    href: '/wordpress/template-saas-analytics/index.html',
    cover: '/wordpress/covers/saas-analytics.jpg',
    accent: '#10b981',
    initial: 'F',
    tags: ['WordPress', 'SaaS Landing', '订阅转化', '数据分析']
  },
  {
    title: '宠物用品独立站 · PAWFECT & CO.',
    description: '全英文 DTC 宠物用品站，奶油色+鼠尾草绿温暖风格。突出订阅盒子、8 张产品卡片网格（主粮/零食/用品）、兽医背书证言、Subscribe & Save 18% 订阅转化。',
    date: '2026-08',
    href: '/wordpress/template-pet-supplies/index.html',
    cover: '/wordpress/covers/pet-supplies.jpg',
    accent: '#97ad87',
    initial: 'P',
    tags: ['WordPress', 'WooCommerce', '订阅盒子', '宠物用品 DTC']
  },
  {
    title: '家居家具品牌站 · OKA FORMA',
    description: '全英文日式极简家具站，原木+纸张配色，胡桃木/白蜡木/橡木主题。展示 6 个房间分类、Aruji 系列家具 8 件产品卡、工匠宣言、实体店预约 CTA，适合外贸家具独立站。',
    date: '2026-08',
    href: '/wordpress/template-home-furniture/index.html',
    cover: '/wordpress/covers/home-furniture.jpg',
    accent: '#8f7759',
    initial: 'Ō',
    tags: ['WordPress', '家居家具', '外贸独立站', 'Japandi 风']
  }
]

function formatDate(d: string) {
  return d
}
</script>

<template>
  <div class="pl-root">
    <!-- 页面标题区 -->
    <header class="pl-header">
      <h1 class="pl-page-title">WordPress 境外独立站模板,</h1>
      <p class="pl-page-desc">点击卡片在线预览</p>
    </header>

    <!-- 大框卡片列表（视觉 1:1 对齐项目页 ProjectList） -->
    <div class="pl-grid">
      <a
        v-for="(tpl, i) in templates"
        :key="tpl.href"
        :href="tpl.href"
        target="_blank"
        rel="noopener"
        class="pl-card"
        :style="{ animationDelay: `${i * 100}ms` }"
      >
        <!-- 封面区：大图铺满，无边界；有 cover 优先真实图，否则用品牌色占色块兜底 -->
        <div class="pl-cover">
          <img
            v-if="tpl.cover"
            :src="tpl.cover"
            :alt="tpl.title"
            class="pl-cover-img"
            loading="lazy"
          />
          <div
            v-else
            class="pl-cover-fallback"
            :style="{ background: tpl.accent }"
          >
            <span class="pl-cover-char">{{ tpl.initial }}</span>
          </div>
          <div class="pl-cover-mask" />
        </div>

        <!-- 信息区：浮于封面底部 -->
        <div class="pl-info">
          <div class="pl-info-top">
            <time class="pl-date">{{ formatDate(tpl.date) }}</time>
          </div>
          <h3 class="pl-title">{{ tpl.title }}</h3>
          <p class="pl-desc">{{ tpl.description }}</p>
          <div class="pl-tags">
            <span v-for="tag in tpl.tags" :key="tag" class="pl-tag">{{ tag }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* 与 ProjectList 保持 1:1 一致的样式，避免视觉漂移 */
.pl-root {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.pl-header {
  padding: 80px 0 56px;
}

.pl-page-title {
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 2.4rem);
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

.pl-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
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

/* 真实封面图：绝对定位铺满，hover 缓动放大，object-fit 避免拉伸 */
.pl-cover-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.pl-card:hover .pl-cover-img {
  transform: scale(1.06);
}

.pl-cover-char {
  font-size: 6rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: -0.04em;
}

.pl-cover-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.52) 0%,
    rgba(0, 0, 0, 0.14) 40%,
    transparent 72%
  );
  pointer-events: none;
}

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
  color: rgba(255, 255, 255, 0.72);
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
  color: rgba(255, 255, 255, 0.78);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pl-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.pl-tag {
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 767px) {
  .pl-root { padding: 0 16px; }
  .pl-header { padding: 48px 0 32px; }
  .pl-grid { gap: 20px; padding-bottom: 48px; }
  .pl-info { padding: 20px 20px 18px; }
  .pl-title { font-size: 1.15rem; }
  .pl-desc { font-size: 0.82rem; }
  .pl-cover-char { font-size: 4.2rem; }
}

.dark .pl-card {
  background: var(--vp-c-bg-soft);
}
</style>
