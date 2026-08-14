---
title: 命令行脚手架工具
description: 团队内部的工程化脚手架，一键生成符合规范的项目模板与 CI 配置。
date: 2025-04-20
tags: [Node.js, TypeScript, CLI]
link: https://github.com/
---

# 命令行脚手架工具

## 背景

团队每次新起项目都要重复配置 ESLint、Prettier、CI、目录结构，标准不统一导致后期协作成本高。于是做了一个交互式脚手架，开箱即用。

## 技术选型

- **Node.js + TypeScript**：跨平台，类型安全
- **Commander + Inquirer**：命令解析与交互式提示
- **模板引擎**：基于文件树渲染，支持条件性生成

## 核心特性

- 交互式选择技术栈（Vue / React / 纯 Node）
- 自动生成 ESLint / Prettier / Husky 配置
- 内置 GitHub Actions CI 模板
- 支持自定义模板扩展

## 成果

- 团队新项目初始化时间从 2 小时缩短到 5 分钟
- 统一了 20+ 仓库的工程规范
