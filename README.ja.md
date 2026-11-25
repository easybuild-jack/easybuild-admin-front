<div align="center">

# EasyBuild Admin

**クリーンで美しく、すぐに使えるモダンな管理画面フロントエンド・スキャフォールド**

[English](./README.md) · [简体中文](./README.zh-CN.md) · [繁體中文（香港）](./README.zh-HK.md) · [繁體中文（台灣）](./README.zh-TW.md) · 日本語

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Yarn](https://img.shields.io/badge/Yarn-4.7.0-2C8EBB?logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![GitHub Stars](https://img.shields.io/github/stars/easybuild-jack/easybuild-admin-front?style=flat&color=f59e0b)](https://github.com/easybuild-jack/easybuild-admin-front/stargazers)

[オンラインデモ](https://admin.easybuild.pro) · [バックエンド API](https://github.com/easybuild-jack/easybuild-admin-api) · [プロジェクト概要 (ZH)](./docs/项目说明文档.md) · [開発ドキュメント (ZH)](./docs/开发文档.md) · [CLI 利用ガイド (ZH)](./docs/前端脚手架使用手册.md)

</div>

---

## ✨ 概要

**EasyBuild Admin** は、**Next.js 16 + React 19 + TypeScript 6 + Tailwind CSS 4 + Shadcn/ui** で構築された、**業務非依存・オンデマンド構成・プラグアンドプレイ**のモダンな管理画面フロントエンド・スキャフォールドです。

メニューと権限はすべてバックエンドから動的に配信され、フロントエンド側に特定の業務ロジックをハードコードしません。30 以上のアクセシブルな基本 UI コンポーネント、10 以上のエンタープライズ向けカスタムコンポーネント、さらにバックエンド不要のローカル Mock エンジンを内蔵しており、クローンしてすぐに起動・体験できます。

---

## 🚀 オンラインデモ

- **デモ URL**：[https://admin.easybuild.pro](https://admin.easybuild.pro)
- **デモアカウント**：`admin` / `12345`

---

## 🎯 主な特徴

- **バックエンド駆動の動的メニュー**：ナビゲーションツリーを API から取得し 30 分間キャッシュ。新モジュール追加時はページ作成とバックエンド側のメニュー登録のみで、フロントエンドのルート設定変更は不要です。
- **エンタープライズ向けカスタムコンポーネント**：`CustomTable`（左右固定列・再レンダリングなしのスクロールシャドウ・ページネーション・行選択）、`CustomForm`（JSON 設定駆動 + Zod 4 バリデーション）、`CustomDialog`（最大化対応）、`FileUpload`（画像/動画/ファイル + ドラッグ並べ替え）、`DateRangePicker`、`MultiSelect`、`CategoryCascader`、統一トースト通知を標準装備。
- **テーマエンジン & ダークモード**：CSS Variables と `next-themes` により 20 種類以上のプリセットテーマカラーとライト/ダーク/システム連動の即時切り替えに対応。
- **ローカル Mock エンジン内蔵**：開発モードでは Next.js Catch-All Route と `globalThis` 永続化によるインメモリ CRUD が動作し、バックエンド未起動でも全機能を検証可能。
- **エンドツーエンドの型安全性**：API 契約・Zustand Store・コンポーネント Props を TypeScript 6 で一貫管理し、Axios インターセプターによる `Access-Token` 自動付与と共通エラーハンドリングを実装。
- **AI フレンドリーな開発設計**：エンジニアおよび AI コーディングエージェント向けの技術マニュアル（[開発ドキュメント](./docs/开发文档.md)）を同梱。

---

## 🛠 技術スタック

| カテゴリ | 採用技術 |
|---|---|
| コア | Next.js 16 (App Router / Turbopack) · React 19 · TypeScript 6 |
| UI / スタイル | Tailwind CSS 4 · Shadcn/ui · Radix UI · Lucide Icons |
| 状態管理 / フォーム | Zustand 5 · React Hook Form 7 · Zod 4 |
| エコシステム | Axios · Tiptap 3 · @dnd-kit · date-fns · next-themes |

---

## 📦 クイックスタート

> clone せずにスキャフォールドで作成する場合：`npx easybuild-admin my-project`（詳細は [CLI 利用ガイド (ZH)](./docs/前端脚手架使用手册.md)）。

### 動作要件

- **Node.js** `>= 20.9`
- **Yarn** `4.7.0`（Corepack で自動管理）

### ローカル起動

```bash
# 1. リポジトリをクローン
git clone https://github.com/easybuild-jack/easybuild-admin-front.git
cd easybuild-admin-front

# 2. Corepack を有効化（指定バージョンの Yarn 4.7.0 を自動適用）
corepack enable

# 3. 依存パッケージをインストール
yarn install

# 4. 開発サーバーを起動（ポート 4000・ローカル Mock 内蔵）
yarn dev
```

ブラウザで `http://localhost:4000` を開き、デモアカウント `admin` / `12345` でログインしてください。

### スクリプト一覧

```bash
yarn dev          # 開発モード（内蔵 Mock を使用：.env.development）
yarn dev:test     # テストモード（ローカルバックエンド http://localhost:5001/api：.env.test）
yarn build:prod   # 本番ビルド（.env.production）
yarn start:prod   # 本番サーバー起動（ポート 4000）
yarn lint         # ESLint チェック
```

---

## 🔗 連携バックエンド

本スキャフォールドとそのまま連携できる標準バックエンド API もオープンソースで公開しています：

- **EasyBuild Admin API**：[https://github.com/easybuild-jack/easybuild-admin-api](https://github.com/easybuild-jack/easybuild-admin-api)

```bash
git clone https://github.com/easybuild-jack/easybuild-admin-api.git
```

---

## 📚 ドキュメント

- 📖 **[プロジェクト概要 (ZH)](./docs/项目说明文档.md)**：アーキテクチャ全体像、コンポーネント一覧、バックエンド API 仕様
- 🛠 **[開発ドキュメント (ZH)](./docs/开发文档.md)**：ディレクトリ構成、データフロー、モジュール追加・改修手順、開発ガイドライン
- 🧰 **[CLI 利用ガイド (ZH)](./docs/前端脚手架使用手册.md)**：`npx easybuild-admin` でのプロジェクト作成手順（パラメータ、テンプレートのリリース固定、トラブルシューティング、終了コード）

---

## 🤝 フィードバック & Issues

本リポジトリは現在読み取り専用のオープンソースプロジェクトとして公開しており、外部からの Pull Request は受け付けておりません（詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) をご参照ください）。

**Fork** してご自身のプロジェクトに合わせて自由にカスタマイズしていただけます。不具合報告やご提案は [Issues](https://github.com/easybuild-jack/easybuild-admin-front/issues) よりお知らせください。

---

## ☕ スポンサー / Buy Me a Coffee

**EasyBuild Admin** が開発の役に立ちましたら、コーヒー 1 杯分の応援をいただけると励みになります！

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

## ⭐ Star History

このプロジェクトが気に入っていただけたら、ぜひ **Star** で応援してください！

[![Star History Chart](https://api.star-history.com/svg?repos=easybuild-jack/easybuild-admin-front&type=Date)](https://star-history.com/#easybuild-jack/easybuild-admin-front&Date)

