export const siteConfig = {
  name: 'EasyBuild Admin - 易构',
  shortName: 'EasyBuild Admin',
  title: 'EasyBuild Admin（易构）- 现代化中后台前端脚手架',
  description:
    '基于 Next.js 16、React 19、TypeScript 6、Tailwind CSS 4 与 Shadcn/ui 构建的现代化中后台前端框架与脚手架，支持后端驱动动态菜单、声明式表单、配置化数据表格与多主题切换，开箱即用。',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://admin.easybuild.pro',
  locale: 'zh_CN',
  keywords: [
    'EasyBuild Admin',
    '易构',
    '中后台前端脚手架',
    '中后台前端框架',
    '后台管理系统模板',
    'Next.js Admin',
    'Next.js 16',
    'React 19',
    'TypeScript 6',
    'Tailwind CSS 4',
    'Shadcn/ui',
    'Radix UI',
    'Zustand',
    '动态路由菜单',
    '前端工程化',
  ],
  author: {
    name: 'EasyBuild',
    url: 'https://github.com/easybuild-jack',
  },
  links: {
    github: 'https://github.com/easybuild-jack/easybuild-admin-front',
    backendApi: 'https://github.com/easybuild-jack/easybuild-admin-api',
    ecosystem: 'https://www.easybuild.pro',
  },
} as const

