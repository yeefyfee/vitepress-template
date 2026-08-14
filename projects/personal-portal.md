---
title: Markdown 驱动的个人门户
description: 基于 VitePress 的个人门户站点，所有内容由 Markdown 驱动，零运行时依赖。
date: 2026-08-01
tags: [VitePress, Vue, TypeScript]
link: https://github.com/
cover: /icon.png
pinned: true
---

# Markdown 驱动的个人门户

## 背景

想要一个能长期维护的个人站点：内容多变、结构稳定、不想被绑死在某个 CMS 上。最终选择 VitePress——构建时读取 Markdown，输出纯静态页面，部署零依赖。

## 技术选型

- **VitePress 1.x**：默认主题深度定制，通过 CSS 变量覆盖实现极简专业风格
- **Markdown 驱动**：项目案例用 `createContentLoader` 自动汇总，新增项目等于加一个 `.md`
- **设计令牌**：配色、字体、间距集中在 `vars.css`，换肤只改一个文件

## 核心实现

项目列表通过 VitePress 的数据加载器自动生成：

```ts
const raw = await createContentLoader('projects/*.md', {
  excerpt: true
}).load()
```

每个项目文件只需在 frontmatter 声明元信息，列表页与首页「最新项目」会自动收录，无需手动维护索引。

## 产出

- 首页 Banner + 模块导航
- 项目案例列表自动汇总
- 个人介绍、联系方式结构化页面
- 深色模式自适应

::: info 仓库
[GitHub](https://github.com/)
:::
