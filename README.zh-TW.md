<div align="center">

# EasyBuild Admin（易構）

**一款清爽、美觀、開箱即用的現代化中後台前端鷹架**

[English](./README.md) · [简体中文](./README.zh-CN.md) · [繁體中文（香港）](./README.zh-HK.md) · 繁體中文（台灣） · [日本語](./README.ja.md)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Yarn](https://img.shields.io/badge/Yarn-4.7.0-2C8EBB?logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![GitHub Stars](https://img.shields.io/github/stars/easybuild-jack/easybuild-admin-front?style=flat&color=f59e0b)](https://github.com/easybuild-jack/easybuild-admin-front/stargazers)

[線上展示](https://admin.easybuild.pro) · [配套後端專案](https://github.com/easybuild-jack/easybuild-admin-api) · [專案說明文件](./docs/项目说明文档.md) · [開發文件](./docs/开发文档.md)

</div>

---

## ✨ 專案簡介

**EasyBuild Admin（易構）** 是一套**業務無關、按需組裝、即插即用**的現代化中後台前端鷹架，基於 **Next.js 16 + React 19 + TypeScript 6 + Tailwind CSS 4 + Shadcn/ui** 建構。

所有選單與權限皆由後端動態下發，前端不寫死任何具體業務邏輯；內建 30+ 基礎 UI 元件與 10+ 企業級自訂業務元件，並附帶免後端依賴的本地 Mock 引擎，Clone 後即可直接啟動體驗。

---

## 🚀 線上體驗

- **展示網址**：[https://admin.easybuild.pro](https://admin.easybuild.pro)
- **體驗帳號**：`admin` / `12345`
- 示範站完全執行在內建 Mock 介面（同網域 Next.js API Route）上，並非真實後端；資料皆為虛構，僅存放於記憶體，可能隨時重置。

---

## 🎯 核心特色

- **動態選單驅動**：選單樹由後端 API 下發並智慧快取 30 分鐘，新增模組只需建立頁面並於後端註冊選單資源，無需更動前端路由設定。
- **企業級自訂元件庫**：內建 `CustomTable`（左右凍結欄、零重繪捲動陰影、分頁、多選）、`CustomForm`（JSON 驅動 + Zod 4 驗證）、`CustomDialog`（支援最大化）、`FileUpload`（圖片/影片/檔案 + 拖曳排序）、`DateRangePicker`、`MultiSelect`、`CategoryCascader` 與統一通知系統。
- **主題引擎與深色模式**：基於 CSS Variables 與 `next-themes`，內建 20+ 預設主題色，支援淺色/深色即時切換與跟隨系統。
- **離線本地 Mock**：開發環境內建 Next.js Catch-All Route Mock 分發器與 `globalThis` 記憶體態 CRUD，不需啟動後端即可完整體驗與除錯。
- **全鏈路型別安全**：TypeScript 6 涵蓋 API 協定、Store 狀態與元件 Props，搭配統一 Axios 攔截器自動注入 Token 與例外處理。
- **AI 友善工程規範**：附帶純技術 [開發文件](./docs/开发文档.md)，協助工程師與 AI Agent 快速上手二次開發。

---

## 🛠 技術棧

| 類別 | 技術方案 |
|---|---|
| 核心框架 | Next.js 16 (App Router / Turbopack) · React 19 · TypeScript 6 |
| 樣式與元件 | Tailwind CSS 4 · Shadcn/ui · Radix UI · Lucide Icons |
| 狀態與表單 | Zustand 5 · React Hook Form 7 · Zod 4 |
| 擴充能力 | Axios · Tiptap 3 · @dnd-kit · date-fns · next-themes |

---

## 📦 快速開始

### 環境需求

- **Node.js** `>= 20.9`
- **Yarn** `4.7.0`（由 Corepack 自動管理）

### 本地啟動

```bash
# 1. 複製儲存庫
git clone https://github.com/easybuild-jack/easybuild-admin-front.git
cd easybuild-admin-front

# 2. 啟用 Corepack（自動啟用專案指定的 Yarn 4.7.0）
corepack enable

# 3. 安裝相依套件
yarn install

# 4. 啟動開發環境（預設埠號 4000，內建本地 Mock）
yarn dev
```

啟動後瀏覽 `http://localhost:4000`，使用預設 Mock 帳號 `admin` / `12345` 登入。

### 常用指令

```bash
yarn dev          # 開發環境（串接內建 Mock：.env.development）
yarn dev:test     # 測試環境（串接本地後端 http://localhost:5001/api：.env.test）
yarn build:prod   # 建置正式環境版本（.env.production）
yarn start:prod   # 啟動正式環境服務（埠號 4000）
yarn next typegen && yarn tsc --noEmit   # 型別檢查
```

### 環境變數

儲存庫中提交的 `.env.development` / `.env.test` / `.env.production` 僅包含公開、非敏感設定。本機覆寫請寫入 `.env.local`（已被 git 忽略），切勿提交真實憑證。

| 變數 | 說明 | `.env.development` | `.env.production` |
|---|---|---|---|
| `NEXT_PUBLIC_ENV` | 執行模式；設為 `production` 時內建 Mock 介面**關閉**（回傳 404） | `development` | `production` |
| `NEXT_PUBLIC_API_URL` | Axios 請求的 API 基礎位址 | `/api` | `/api` |
| `NEXT_PUBLIC_UPLOAD_API_URL` | 檔案上傳基礎位址 | `/api` | `/api` |
| `NEXT_PUBLIC_APP_NAME` | 應用程式名稱 | `EasyBuild-Admin-Dev` | `EasyBuild-Admin` |
| `NEXT_PUBLIC_SITE_URL` | SEO 中繼資料使用的網站位址（預設 `https://admin.easybuild.pro`） | – | `https://admin.easybuild.pro` |

### Mock 介面與部署

- Mock 介面由萬用路由 `src/app/api/[...slug]/route.ts` 提供，並分派到 `src/mock/` 下的處理函式。資料只存放在伺服器記憶體：重新啟動即重置，且不會在多個 Serverless 執行個體間共享。
- 使用儲存庫內建的 `.env.production` 執行 `yarn build:prod` 時 Mock 為關閉狀態，需要將 `NEXT_PUBLIC_API_URL` / `NEXT_PUBLIC_UPLOAD_API_URL` 指向真實後端（如 [EasyBuild Admin API](https://github.com/easybuild-jack/easybuild-admin-api)）。
- 如需部署純 Mock 示範站（即 [admin.easybuild.pro](https://admin.easybuild.pro) 在 Vercel 上的方式），保持正式環境建置，並在託管平台環境變數中設定：

```bash
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_UPLOAD_API_URL=/api
```

本機等效指令：`NEXT_PUBLIC_ENV=development yarn build:prod && NEXT_PUBLIC_ENV=development yarn start:prod`。

---

## 🔗 配套後端專案

本鷹架配套提供標準後端 API 實作，開箱串接：

- **EasyBuild Admin API**：[https://github.com/easybuild-jack/easybuild-admin-api](https://github.com/easybuild-jack/easybuild-admin-api)

```bash
git clone https://github.com/easybuild-jack/easybuild-admin-api.git
```

---

## 📚 相關文件

- 📖 **[專案說明文件](./docs/项目说明文档.md)**：完整的架構設計、元件能力一覽與後端串接協定說明
- 🛠 **[開發文件](./docs/开发文档.md)**：面向二次開發與 AI Agent 的純技術手冊（目錄約定、資料流、新增/修改模組 SOP 與注意事項）
- 📝 **[更新紀錄](./CHANGELOG.md)**：版本發布說明

---

## 🤝 回饋與交流

本專案目前為唯讀開源專案，暫不接受外部 Pull Request（詳見 [CONTRIBUTING.md](./CONTRIBUTING.md)）。

歡迎 **Fork** 後依需求修改使用；若遇到問題或有改進建議，歡迎提交 [Issues](https://github.com/easybuild-jack/easybuild-admin-front/issues)。

---

## ☕ 贊助支持

如果 **EasyBuild Admin（易構）** 對你有幫助，歡迎請作者喝杯咖啡！

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

## 📄 授權條款

本專案以 [MIT 授權條款](./LICENSE) 開源。Copyright (c) 2026 Jack Liu (easybuild-jack)。第三方聲明請見 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。

---

## ⭐ Star History

如果這個專案對你有幫助，歡迎點一顆 **Star** 支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=easybuild-jack/easybuild-admin-front&type=Date)](https://star-history.com/#easybuild-jack/easybuild-admin-front&Date)

