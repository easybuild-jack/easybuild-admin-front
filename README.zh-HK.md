<div align="center">

# EasyBuild Admin（易構）

**一款清爽、美觀、開箱即用的現代化中後台前端腳手架**

[English](./README.md) · [简体中文](./README.zh-CN.md) · 繁體中文（香港） · [繁體中文（台灣）](./README.zh-TW.md) · [日本語](./README.ja.md)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Yarn](https://img.shields.io/badge/Yarn-4.7.0-2C8EBB?logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![GitHub Stars](https://img.shields.io/github/stars/easybuild-jack/easybuild-admin-front?style=flat&color=f59e0b)](https://github.com/easybuild-jack/easybuild-admin-front/stargazers)

[線上演示](https://admin.easybuild.pro) · [配套後端倉庫](https://github.com/easybuild-jack/easybuild-admin-api) · [項目說明文檔](./docs/项目说明文档.md) · [開發文檔](./docs/开发文档.md)

</div>

---

## ✨ 項目簡介

**EasyBuild Admin（易構）** 是一套**業務無關、按需組裝、即插即用**的現代化中後台前端腳手架，基於 **Next.js 16 + React 19 + TypeScript 6 + Tailwind CSS 4 + Shadcn/ui** 構建。

所有選單與權限均由後端動態下發，前端不寫死任何具體業務邏輯；內置 30+ 基礎 UI 組件與 10+ 企業級自訂業務組件，並自帶免後端依賴的本地 Mock 引擎，Clone 後即可直接啟動體驗。

---

## 🚀 線上體驗

- **演示網址**：[https://admin.easybuild.pro](https://admin.easybuild.pro)
- **體驗賬號**：`admin` / `12345`
- 演示站完全運行在內置 Mock 接口（同域 Next.js API Route）上，並非真實後端；數據均為虛構，僅保存在記憶體中，可能隨時重置。

---

## 🎯 核心特性

- **動態選單驅動**：選單樹由後端接口下發並智能緩存 30 分鐘，新增模組只需建立頁面並於後端註冊選單資源，無需修改前端路由配置。
- **企業級自訂組件庫**：內置 `CustomTable`（左右固定列、零重繪捲動陰影、分頁、多選）、`CustomForm`（JSON 驅動 + Zod 4 校驗）、`CustomDialog`（支援全螢幕最大化）、`FileUpload`（圖片/影片/檔案 + 拖曳排序）、`DateRangePicker`、`MultiSelect`、`CategoryCascader` 與統一通知系統。
- **主題引擎與深色模式**：基於 CSS Variables 與 `next-themes`，內置 20+ 預設主題色，支援淺色/深色即時切換及跟隨系統設定。
- **離線本地 Mock**：開發環境內置 Next.js Catch-All Route Mock 分發器與 `globalThis` 記憶體態 CRUD，無需啟動後端即可完整體驗與除錯。
- **全鏈路類型安全**：TypeScript 6 覆蓋 API 協議、Store 狀態與組件 Props，配合統一 Axios 攔截器自動注入 Token 與處理異常。
- **AI 友好工程規範**：附帶純技術 [開發文檔](./docs/开发文档.md)，方便工程師與 AI Agent 快速上手二次開發。

---

## 🛠 技術棧

| 類別 | 技術方案 |
|---|---|
| 核心框架 | Next.js 16 (App Router / Turbopack) · React 19 · TypeScript 6 |
| 樣式與組件 | Tailwind CSS 4 · Shadcn/ui · Radix UI · Lucide Icons |
| 狀態與表單 | Zustand 5 · React Hook Form 7 · Zod 4 |
| 擴展能力 | Axios · Tiptap 3 · @dnd-kit · date-fns · next-themes |

---

## 📦 快速開始

### 環境要求

- **Node.js** `>= 20.9`
- **Yarn** `4.7.0`（由 Corepack 自動管理）

### 本地運行

```bash
# 1. 克隆倉庫
git clone https://github.com/easybuild-jack/easybuild-admin-front.git
cd easybuild-admin-front

# 2. 啟用 Corepack（自動切換至項目指定的 Yarn 4.7.0）
corepack enable

# 3. 安裝依賴
yarn install

# 4. 啟動開發環境（預設埠號 4000，內置本地 Mock）
yarn dev
```

啟動後打開 `http://localhost:4000`，使用預設 Mock 賬號 `admin` / `12345` 登入。

### 常用指令

```bash
yarn dev          # 開發環境（對接內置 Mock：.env.development）
yarn dev:test     # 測試環境（對接本地後端 http://localhost:5001/api：.env.test）
yarn build:prod   # 構建生產版本（.env.production）
yarn start:prod   # 啟動生產服務（埠號 4000）
yarn next typegen && yarn tsc --noEmit   # 類型檢查
```

### 環境變量

倉庫中提交的 `.env.development` / `.env.test` / `.env.production` 只包含公開、非敏感配置。本地覆蓋請寫入 `.env.local`（已被 git 忽略），切勿提交真實憑證。

| 變量 | 說明 | `.env.development` | `.env.production` |
|---|---|---|---|
| `NEXT_PUBLIC_ENV` | 運行模式；設為 `production` 時內置 Mock 接口**關閉**（返回 404） | `development` | `production` |
| `NEXT_PUBLIC_API_URL` | Axios 請求的接口基礎地址 | `/api` | `/api` |
| `NEXT_PUBLIC_UPLOAD_API_URL` | 文件上傳基礎地址 | `/api` | `/api` |
| `NEXT_PUBLIC_APP_NAME` | 應用名稱 | `EasyBuild-Admin-Dev` | `EasyBuild-Admin` |
| `NEXT_PUBLIC_SITE_URL` | SEO 元數據使用的網站地址（預設 `https://admin.easybuild.pro`） | – | `https://admin.easybuild.pro` |

### Mock 接口與部署

- Mock 接口由通配路由 `src/app/api/[...slug]/route.ts` 提供，並分發到 `src/mock/` 下的處理函數。數據只保存在伺服器記憶體中：重啟即重置，且不會在多個 Serverless 實例間共享。
- 使用倉庫自帶的 `.env.production` 執行 `yarn build:prod` 時 Mock 處於關閉狀態，需要把 `NEXT_PUBLIC_API_URL` / `NEXT_PUBLIC_UPLOAD_API_URL` 指向真實後端（如 [EasyBuild Admin API](https://github.com/easybuild-jack/easybuild-admin-api)）。
- 如需部署純 Mock 演示站（即 [admin.easybuild.pro](https://admin.easybuild.pro) 在 Vercel 上的方式），保持生產構建，並在託管平台環境變量中設定：

```bash
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_UPLOAD_API_URL=/api
```

本地等效指令：`NEXT_PUBLIC_ENV=development yarn build:prod && NEXT_PUBLIC_ENV=development yarn start:prod`。

---

## 🔗 配套後端項目

本腳手架配套提供標準後端接口實現，開箱即用：

- **EasyBuild Admin API**：[https://github.com/easybuild-jack/easybuild-admin-api](https://github.com/easybuild-jack/easybuild-admin-api)

```bash
git clone https://github.com/easybuild-jack/easybuild-admin-api.git
```

---

## 📚 相關文檔

- 📖 **[項目說明文檔](./docs/项目说明文档.md)**：完整的架構設計、組件能力一覽與後端對接協議說明
- 🛠 **[開發文檔](./docs/开发文档.md)**：面向二次開發與 AI Agent 的純技術手冊（目錄約定、數據流、新增/修改模組 SOP 與避坑清單）
- 📝 **[更新日誌](./CHANGELOG.md)**：版本發佈說明

---

## 🤝 回饋與交流

本項目目前為唯讀開源項目，暫不接受外部 Pull Request（詳見 [CONTRIBUTING.md](./CONTRIBUTING.md)）。

歡迎 **Fork** 後按需修改使用；如有問題或改進建議，歡迎提交 [Issues](https://github.com/easybuild-jack/easybuild-admin-front/issues)。

---

## ☕ 贊賞支持

如果 **EasyBuild Admin（易構）** 對你有幫助，歡迎請作者飲杯咖啡！

<table>
  <tr>
    <td align="center">
      <img src="./docs/assets/wechat-pay.jpg" alt="微信支付" height="240" />
      <br />
      <sub><b>微信支付（WeChat Pay）</b></sub>
    </td>
    <td align="center">
      <img src="./docs/assets/fps-pay.jpg" alt="轉數快 FPS" height="240" />
      <br />
      <sub><b>轉數快 FPS（ZA Bank · ID: 129613600）</b></sub>
    </td>
  </tr>
</table>

---

## 📄 許可證

本項目基於 [MIT 許可證](./LICENSE) 開源。Copyright (c) 2026 Jack Liu (easybuild-jack)。第三方聲明見 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。

---

## ⭐ Star History

如果這個項目對你有幫助，歡迎點一顆 **Star** 支持！

[![Star History Chart](https://api.star-history.com/svg?repos=easybuild-jack/easybuild-admin-front&type=Date)](https://star-history.com/#easybuild-jack/easybuild-admin-front&Date)

