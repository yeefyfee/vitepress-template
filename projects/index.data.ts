import { createContentLoader, type ContentData } from 'vitepress'

/**
 * 项目案例数据加载器
 * --------------------------------------------------
 * 自动扫描 projects/*.md，按 frontmatter.date 倒序汇总。
 * 维护者：新增项目只需在 projects/ 下新建一个 .md 文件，
 * 列表页与首页「最新项目」会自动收录，无需改动本文件。
 *
 * 约定的 frontmatter 字段：
 *   title       项目标题（必填）
 *   description 一句话简介
 *   date        发布日期 YYYY-MM-DD（用于排序）
 *   tags        标签数组
 *   link        外部链接（如 GitHub 仓库）
 *   cover       封面图路径（可选，放 public/ 下）
 *   pinned      true 时置顶
 */

interface ProjectItem extends ContentData {
  frontmatter: {
    title?: string
    description?: string
    date?: string
    tags?: string[]
    link?: string
    cover?: string
    pinned?: boolean
  }
}

export interface ProjectListData {
  posts: ProjectItem[]
}

export default {
  async load(): Promise<ProjectListData> {
    const raw = await createContentLoader('projects/*.md', {
      excerpt: true
    }).load()

    // 排除列表页自身（projects/index.md）
    const posts = raw
      .filter((p): p is ProjectItem => !p.url.endsWith('/projects/'))
      .sort((a, b) => {
        const pa = a.frontmatter.pinned ? 1 : 0
        const pb = b.frontmatter.pinned ? 1 : 0
        if (pa !== pb) return pb - pa
        const da = a.frontmatter.date ? +new Date(a.frontmatter.date) : 0
        const db = b.frontmatter.date ? +new Date(b.frontmatter.date) : 0
        return db - da
      })

    return { posts }
  }
}
