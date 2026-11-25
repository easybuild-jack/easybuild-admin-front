<div align="center">

# EasyBuild Admin（易构）

**一款清爽、美观、开箱即用的现代化中后台前端脚手架**

[English](./README.md) · 简体中文 · [繁體中文（香港）](./README.zh-HK.md) · [繁體中文（台灣）](./README.zh-TW.md) · [日本語](./README.ja.md)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Yarn](https://img.shields.io/badge/Yarn-4.7.0-2C8EBB?logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![GitHub Stars](https://img.shields.io/github/stars/easybuild-jack/easybuild-admin-front?style=flat&color=f59e0b)](https://github.com/easybuild-jack/easybuild-admin-front/stargazers)

[在线演示](https://admin.easybuild.pro) · [配套后端仓库](https://github.com/easybuild-jack/easybuild-admin-api) · [项目说明文档](./docs/项目说明文档.md) · [开发文档](./docs/开发文档.md) · [脚手架使用手册](./docs/前端脚手架使用手册.md)

</div>

---

## ✨ 项目简介

**EasyBuild Admin（易构）** 是一套**业务无关、按需组装、即插即用**的现代化中后台前端脚手架，基于 **Next.js 16 + React 19 + TypeScript 6 + Tailwind CSS 4 + Shadcn/ui** 构建。

所有菜单与权限均由后端动态下发，前端不硬编码具体业务逻辑；内置 30+ 基础 UI 组件与 10+ 高级中后台业务组件，并自带零后端依赖的本地 Mock 引擎，clone 即可启动体验。

---

## 🚀 在线体验

- **演示地址**：[https://admin.easybuild.pro](https://admin.easybuild.pro)
- **体验账号**：`admin` / `12345`

---

## 🎯 核心特性

- **动态菜单驱动**：菜单树由后端接口下发并智能缓存 30 分钟，新增模块只需创建页面并注册菜单资源，无需改动前端路由配置。
- **高级业务组件库**：内置 `CustomTable`（左右固定列、零重渲染滚动阴影、分页、多选）、`CustomForm`（JSON 驱动 + Zod 4 校验）、`CustomDialog`（支持最大化）、`FileUpload`（图片/视频/文件 + 拖拽排序）、`DateRangePicker`、`MultiSelect`、`CategoryCascader` 与统一通知系统。
- **主题与暗黑模式**：基于 CSS Variables 与 `next-themes`，内置 20+ 预置主题色，支持深浅模式即时切换与跟随系统。
- **离线本地 Mock**：开发环境内置 Next.js Catch-All Route Mock 分发器与 `globalThis` 内存态 CRUD，无需启动后端即可完整联调与体验。
- **全链路类型安全**：TypeScript 6 覆盖 API 协议、Store 状态与组件 Props，搭配统一 Axios 拦截器实现 Token 自动注入与异常兜底。
- **AI 友好工程规范**：内置纯技术 [开发文档](./docs/开发文档.md)，帮助人类工程师与 AI Agent 快速上手二次开发。

---

## 🛠 技术栈

| 类别 | 技术方案 |
|---|---|
| 核心框架 | Next.js 16 (App Router / Turbopack) · React 19 · TypeScript 6 |
| 样式与组件 | Tailwind CSS 4 · Shadcn/ui · Radix UI · Lucide Icons |
| 状态与表单 | Zustand 5 · React Hook Form 7 · Zod 4 |
| 扩展能力 | Axios · Tiptap 3 · @dnd-kit · date-fns · next-themes |

---

## 📦 快速开始

> 也可以不 clone，直接用脚手架创建：`npx easybuild-admin my-project`，完整说明见 [脚手架使用手册](./docs/前端脚手架使用手册.md)。

### 环境要求

- **Node.js** `>= 20.9`
- **Yarn** `4.7.0`（由 Corepack 自动管理）

### 本地运行

```bash
# 1. 克隆仓库
git clone https://github.com/easybuild-jack/easybuild-admin-front.git
cd easybuild-admin-front

# 2. 启用 Corepack（自动激活项目指定的 Yarn 4.7.0）
corepack enable

# 3. 安装依赖
yarn install

# 4. 启动开发环境（默认端口 4000，内置本地 Mock）
yarn dev
```

启动后访问 `http://localhost:4000`，使用默认 Mock 账号 `admin` / `12345` 登录。

### 常用命令

```bash
yarn dev          # 开发环境（对接内置 Mock：.env.development）
yarn dev:test     # 测试环境（对接本地后端 http://localhost:5001/api：.env.test）
yarn build:prod   # 构建生产版本（.env.production）
yarn start:prod   # 启动生产服务（端口 4000）
yarn lint         # 代码规范检查
```

---

## 🔗 配套后端项目

本脚手架配套提供标准后端接口实现，开箱联调：

- **EasyBuild Admin API**：[https://github.com/easybuild-jack/easybuild-admin-api](https://github.com/easybuild-jack/easybuild-admin-api)

```bash
git clone https://github.com/easybuild-jack/easybuild-admin-api.git
```

---

## 📚 相关文档

- 📖 **[项目说明文档](./docs/项目说明文档.md)**：完整的架构设计、组件能力一览与后端对接协议说明
- 🛠 **[开发文档](./docs/开发文档.md)**：面向二次开发与 AI Agent 的纯技术手册（目录约定、数据流、新增/修改模块 SOP 与避坑清单）
- 🧰 **[脚手架使用手册](./docs/前端脚手架使用手册.md)**：用 `npx easybuild-admin` 创建项目的完整说明（参数、交互流程、模板版本策略、常见问题与退出码）

---

## 🤝 反馈与交流

本项目目前为只读开源项目，暂不接受外部 Pull Request（详见 [CONTRIBUTING.md](./CONTRIBUTING.md)）。

欢迎 **Fork** 后按需修改使用；如果在使用过程中遇到问题或有改进建议，欢迎提交 [Issues](https://github.com/easybuild-jack/easybuild-admin-front/issues)。

---

## ☕ 赞赏支持

如果 **EasyBuild Admin（易构）** 对你有帮助，欢迎请作者喝杯咖啡！

<table>
  <tr>
    <td align="center">
      <img src="./docs/assets/wechat-pay.jpg" alt="微信支付" height="240" />
      <br />
      <sub><b>微信支付</b></sub>
    </td>
    <td align="center">
      <img src="./docs/assets/fps-pay.jpg" alt="转数快 FPS" height="240" />
      <br />
      <sub><b>转数快 FPS（ZA Bank · ID: 129613600）</b></sub>
    </td>
  </tr>
</table>

---

## ⭐ Star History

如果这个项目对你有帮助，欢迎点一个 **Star** 支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=easybuild-jack/easybuild-admin-front&type=Date)](https://star-history.com/#easybuild-jack/easybuild-admin-front&Date)

