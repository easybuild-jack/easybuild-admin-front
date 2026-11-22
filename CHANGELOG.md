# Changelog

All notable changes to this project are documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-11-22

First official release of EasyBuild Admin, a Next.js 16 + React 19 + TypeScript 6 + Tailwind CSS 4 + Shadcn/ui admin frontend scaffold.

### Added

- Backend-driven navigation: menus and permissions are loaded from the API (`/auth/resource/employeeAuthResources`) and cached client-side for 30 minutes.
- Login with MD5-hashed password submission, `Access-Token` injection and unified error handling via centralized Axios interceptors.
- Modules backed by the built-in Mock API: home dashboard; base data (categories, brands, groups, tags); operation (banners); customers (users); permissions (departments, roles with resource-tree grant, employees); system (dictionaries and dictionary items); file upload.
- Custom components: `CustomTable` (sticky columns, scroll shadows, pagination, row selection), JSON-driven `CustomForm` with Zod 4 validation, `CustomDialog`, `FileUpload` with drag-and-drop sorting, `DateRangePicker`, `MultiSelect`, `CategoryCascader`, Tiptap rich-text editor and media preview.
- Theme engine with 20 preset color palettes and light/dark/system modes.
- Zero-backend Mock API served by the same-origin catch-all route `src/app/api/[...slug]/route.ts`, with in-memory CRUD; disabled when `NEXT_PUBLIC_ENV=production`.
- Site configuration, SEO metadata, sitemap, robots and dynamic Open Graph images.
- Documentation: multi-language READMEs (English, 简体中文, 繁體中文（香港/台灣）, 日本語), project overview and developer guide (Chinese), environment variable and Mock deployment notes.

### Known limitations

- Mock data is in-memory only: it resets on restart and is not shared across serverless instances.
- Goods, SPU, merchant, container, order and refund pages exist in the codebase but have no Mock handlers and are not part of the Mock menu; they require a real backend.
- Creating a new tag in Mock mode is not possible: the tag dialog loads categories with `groupId: 'tag'`, which the Mock category data does not contain, so the required category field has no options. Editing existing tags works.
- `yarn lint` (`next lint`) no longer works with Next.js 16, and the repository's `.eslintrc.json` is not picked up by ESLint 9; use `yarn next typegen && yarn tsc --noEmit` for type checking.
- No automated test suite is included.

[1.0.0]: https://github.com/easybuild-jack/easybuild-admin-front/releases/tag/v1.0.0
