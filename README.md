<div align="center">

# EasyBuild Admin

**A clean, modern, out-of-the-box Admin Frontend Scaffold**

English · [简体中文](./README.zh-CN.md) · [繁體中文（香港）](./README.zh-HK.md) · [繁體中文（台灣）](./README.zh-TW.md) · [日本語](./README.ja.md)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Yarn](https://img.shields.io/badge/Yarn-4.7.0-2C8EBB?logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![GitHub Stars](https://img.shields.io/github/stars/easybuild-jack/easybuild-admin-front?style=flat&color=f59e0b)](https://github.com/easybuild-jack/easybuild-admin-front/stargazers)

[Live Demo](https://admin.easybuild.pro) · [Backend API Repo](https://github.com/easybuild-jack/easybuild-admin-api) · [Project Overview (ZH)](./docs/项目说明文档.md) · [Developer Guide (ZH)](./docs/开发文档.md)

</div>

---

## ✨ Introduction

**EasyBuild Admin** is a **business-agnostic, modular, plug-and-play** modern admin frontend scaffold built with **Next.js 16 + React 19 + TypeScript 6 + Tailwind CSS 4 + Shadcn/ui**.

All navigation menus and permissions are dynamically driven by backend APIs without hardcoding business logic on the frontend. It ships with 30+ accessible UI primitives, 10+ enterprise-grade custom components, and a built-in zero-backend local Mock engine so you can clone and run immediately.

---

## 🚀 Live Demo

- **URL**: [https://admin.easybuild.pro](https://admin.easybuild.pro)
- **Demo Account**: `admin` / `12345`
- The demo runs entirely on the built-in Mock API (a same-origin Next.js API Route), not a real backend. All data is fictional, kept in memory, and may be reset at any time.

---

## 🎯 Key Features

- **Backend-Driven Dynamic Menus**: Navigation trees are fetched from the backend and cached for 30 minutes. Adding a new module only requires creating the page and registering the menu resource—no frontend route config changes needed.
- **Enterprise Custom Components**: Includes `CustomTable` (left/right sticky columns, zero-rerender scroll shadows, pagination, row selection), `CustomForm` (JSON-driven + Zod 4 validation), `CustomDialog` (with maximize toggle), `FileUpload` (image/video/file + drag-and-drop sorting), `DateRangePicker`, `MultiSelect`, `CategoryCascader`, and unified toast notifications.
- **Theme Engine & Dark Mode**: Powered by CSS Variables and `next-themes` with 20+ preset theme colors and instant light/dark/system switching.
- **Built-in Local Mock Engine**: Development mode routes `/api/*` through a Next.js Catch-All Route dispatcher with `globalThis`-persisted in-memory CRUD—run the full app offline without starting a backend.
- **End-to-End Type Safety**: TypeScript 6 across API contracts, Zustand stores, and component props, paired with centralized Axios interceptors for automatic `Access-Token` injection and unified error handling.
- **AI-Friendly Engineering Setup**: Ships with a dedicated [Developer Guide](./docs/开发文档.md) for fast onboarding by both human engineers and AI coding agents.

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| Core | Next.js 16 (App Router / Turbopack) · React 19 · TypeScript 6 |
| UI & Styling | Tailwind CSS 4 · Shadcn/ui · Radix UI · Lucide Icons |
| State & Forms | Zustand 5 · React Hook Form 7 · Zod 4 |
| Ecosystem | Axios · Tiptap 3 · @dnd-kit · date-fns · next-themes |

---

## 📦 Quick Start

### Prerequisites

- **Node.js** `>= 20.9`
- **Yarn** `4.7.0` (managed automatically via Corepack)

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/easybuild-jack/easybuild-admin-front.git
cd easybuild-admin-front

# 2. Enable Corepack (activates Yarn 4.7.0 automatically)
corepack enable

# 3. Install dependencies
yarn install

# 4. Start the development server (port 4000, built-in Mock API)
yarn dev
```

Open `http://localhost:4000` in your browser and sign in with `admin` / `12345`.

### Scripts

```bash
yarn dev          # Development mode with built-in Mock API (.env.development)
yarn dev:test     # Test mode targeting local backend http://localhost:5001/api (.env.test)
yarn build:prod   # Production build (.env.production)
yarn start:prod   # Start production server on port 4000
yarn next typegen && yarn tsc --noEmit   # Type check
```

### Environment Variables

Committed `.env.development` / `.env.test` / `.env.production` files contain only public, non-secret settings. Put local overrides in `.env.local` (git-ignored); never commit real credentials.

| Variable | Description | `.env.development` | `.env.production` |
|---|---|---|---|
| `NEXT_PUBLIC_ENV` | Runtime mode; the built-in Mock API is **disabled** (returns 404) when set to `production` | `development` | `production` |
| `NEXT_PUBLIC_API_URL` | API base URL used by the Axios client | `/api` | `/api` |
| `NEXT_PUBLIC_UPLOAD_API_URL` | File upload base URL | `/api` | `/api` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `EasyBuild-Admin-Dev` | `EasyBuild-Admin` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO metadata (defaults to `https://admin.easybuild.pro`) | – | `https://admin.easybuild.pro` |

### Mock API & Deployment

- The Mock API is served by the catch-all route `src/app/api/[...slug]/route.ts` and dispatched to handlers in `src/mock/`. Data lives in server memory only: it resets on restart and is not shared between serverless instances.
- `yarn build:prod` with the committed `.env.production` turns the Mock off, so point `NEXT_PUBLIC_API_URL` / `NEXT_PUBLIC_UPLOAD_API_URL` at your real backend (e.g. [EasyBuild Admin API](https://github.com/easybuild-jack/easybuild-admin-api)).
- To host a Mock-only demo (as [admin.easybuild.pro](https://admin.easybuild.pro) does on Vercel), keep the production build but set these variables in the hosting environment:

```bash
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_UPLOAD_API_URL=/api
```

Locally the equivalent is `NEXT_PUBLIC_ENV=development yarn build:prod && NEXT_PUBLIC_ENV=development yarn start:prod`.

---

## 🔗 Companion Backend

A matching backend API implementation is open-sourced for seamless integration:

- **EasyBuild Admin API**: [https://github.com/easybuild-jack/easybuild-admin-api](https://github.com/easybuild-jack/easybuild-admin-api)

```bash
git clone https://github.com/easybuild-jack/easybuild-admin-api.git
```

---

## 📚 Documentation

- 📖 **[Project Overview (ZH)](./docs/项目说明文档.md)**: Full architecture overview, component catalog, and backend API conventions
- 🛠 **[Developer Guide (ZH)](./docs/开发文档.md)**: Pure technical handbook covering directory layout, data flow, adding/modifying modules, and best practices
- 📝 **[Changelog](./CHANGELOG.md)**: Release notes

---

## 🤝 Feedback & Issues

This repository is currently maintained as a read-only open-source project and does not accept external Pull Requests (see [CONTRIBUTING.md](./CONTRIBUTING.md)).

You are welcome to **Fork** and customize it for your own projects. For bugs or suggestions, please open an [Issue](https://github.com/easybuild-jack/easybuild-admin-front/issues).

---

## ☕ Sponsor / Buy Me a Coffee

If **EasyBuild Admin** saves you time or helps your project, feel free to buy me a cup of coffee!

<table>
  <tr>
    <td align="center">
      <img src="./docs/assets/wechat-pay.jpg" alt="WeChat Pay" height="240" />
      <br />
      <sub><b>WeChat Pay</b></sub>
    </td>
    <td align="center">
      <img src="./docs/assets/fps-pay.jpg" alt="FPS (ZA Bank)" height="240" />
      <br />
      <sub><b>FPS (ZA Bank · ID: 129613600)</b></sub>
    </td>
  </tr>
</table>

---

## 📄 License

Released under the [MIT License](./LICENSE). Copyright (c) 2026 Jack Liu (easybuild-jack). Third-party notices are listed in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

---

## ⭐ Star History

If you find this project helpful, please consider giving it a **Star**!

[![Star History Chart](https://api.star-history.com/svg?repos=easybuild-jack/easybuild-admin-front&type=Date)](https://star-history.com/#easybuild-jack/easybuild-admin-front&Date)
