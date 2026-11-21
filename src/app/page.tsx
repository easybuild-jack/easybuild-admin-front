'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { usePageTitle } from '@/store'
import {
  Layers,
  Zap,
  ShieldCheck,
  Cpu,
  LayoutTemplate,
  Terminal,
  ArrowRight,
  Route,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  ArrowUpRight,
} from 'lucide-react'

const ADMIN_API_REPO_URL = 'https://github.com/easybuild-jack/easybuild-admin-api'
const ADMIN_API_GIT_URL = 'https://github.com/easybuild-jack/easybuild-admin-api.git'

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

const heroHighlights = [
  { label: '响应式布局', icon: LayoutTemplate },
  { label: '标准化 API', icon: Terminal },
  { label: '动态路由缓存', icon: Route },
]

const features = [
  {
    index: '01',
    title: '业务无关',
    description: '菜单权限由后端动态下发，前端不硬编码任何业务逻辑。',
    icon: Layers,
    accent: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-sky-500/10 ring-1 ring-sky-500/20',
  },
  {
    index: '02',
    title: '即插即用',
    description: '新增模块只需创建页面 + 后端注册，侧边栏自动出现，无需改路由。',
    icon: Zap,
    accent: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/10 ring-1 ring-amber-500/20',
  },
  {
    index: '03',
    title: '类型安全',
    description: 'TypeScript 6 全链路类型覆盖，从 API 到组件一气呵成。',
    icon: ShieldCheck,
    accent: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-500/10 ring-1 ring-emerald-500/20',
  },
  {
    index: '04',
    title: '现代化栈',
    description: 'Next.js 16 + React 19 + Shadcn/ui，享受极致性能与开发体验。',
    icon: Cpu,
    accent: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-500/10 ring-1 ring-violet-500/20',
  },
]

const techStack = [
  { name: 'React', version: 'v19', label: '框架核心' },
  { name: 'Next.js', version: 'v16', label: '应用框架' },
  { name: 'TypeScript', version: 'v6', label: '类型系统' },
  { name: 'Tailwind CSS', version: 'v4', label: '原子化样式' },
  { name: 'Shadcn/ui', version: 'Radix', label: '组件库' },
  { name: 'Zustand', version: 'v5', label: '状态管理' },
  { name: 'React Hook Form', version: 'v7', label: '表单引擎' },
  { name: 'Zod', version: 'v4', label: '声明式校验' },
  { name: 'Axios', version: 'HTTP', label: 'HTTP 通信' },
]

const productValues = [
  '业务解耦，接口驱动菜单',
  '标准 CRUD 模式，降低成本',
  '源码级组件，极致可维护性',
  '一键切换 20+ 预置主题色',
]

const quickStartSteps = [
  {
    step: '01',
    title: '启用 Corepack',
    desc: '自动激活项目指定的 Yarn 4.7.0',
    cmd: 'corepack enable',
  },
  {
    step: '02',
    title: '安装项目依赖',
    desc: '拉取前端依赖包',
    cmd: 'yarn install',
  },
  {
    step: '03',
    title: '启动开发环境',
    desc: '默认端口 4000，内置本地 Mock 接口',
    cmd: 'yarn dev',
  },
]

export default function Home() {
  const { setPageTitle } = usePageTitle()
  const [guideOpen, setGuideOpen] = useState(false)
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null)

  useEffect(() => {
    setPageTitle('系统首页')
  }, [setPageTitle])

  const handleCopy = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd)
      setCopiedCmd(cmd)
      setTimeout(() => setCopiedCmd(null), 1800)
    } catch {
      // ignore clipboard failure
    }
  }

  return (
    <div className="relative min-h-full p-5 sm:p-8 lg:p-10 max-w-[1360px] mx-auto space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm dark:bg-card/60">
        {/* Top specular highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Subtle architectural grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 75% 20%, black 20%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 75% 20%, black 20%, transparent 100%)',
          }}
        />

        {/* Ambient theme-adaptive glow */}
        <div
          className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full blur-[110px] opacity-20 dark:opacity-25"
          style={{ backgroundColor: 'hsl(var(--primary))' }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full blur-[100px] opacity-10 dark:opacity-15"
          style={{ backgroundColor: 'hsl(var(--primary))' }}
        />

        <div className="relative z-10 p-7 sm:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-3.5 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                New Generation Scaffold
              </div>

              {/* Display Title */}
              <div className="space-y-3">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.15] text-foreground">
                  EasyBuild Admin
                  <span className="mx-3 font-light text-muted-foreground/40">—</span>
                  <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                    易构
                  </span>
                </h1>
                <p className="text-[15px] sm:text-base text-muted-foreground leading-[1.85] max-w-2xl">
                  一款清爽、美观、开箱即用的现代化中后台前端框架，为全栈工程师、前端及后端工程师量身打造。遵循
                  <span className="mx-1 font-semibold text-foreground underline decoration-primary/40 decoration-2 underline-offset-4">
                    业务无关、按需组装、即插即用
                  </span>
                  的核心理念。
                </p>
              </div>

              {/* Highlight Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {heroHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-foreground/90 shadow-xs backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary/[0.04]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-3.5 w-3.5" />
                    </span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Companion Backend API Repo Card */}
            <div className="w-full lg:w-[340px] shrink-0 rounded-2xl border border-border/70 bg-background/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-primary/40 dark:bg-background/50">
              <a
                href={ADMIN_API_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background shadow-xs transition-transform duration-300 group-hover:scale-105">
                    <GitHubIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary">
                      Backend API
                    </div>
                    <div className="font-display text-[15px] font-bold tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                      Admin 后台接口项目
                    </div>
                  </div>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-card text-muted-foreground transition-all duration-200 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                配套后端接口仓库，遵循统一响应规范与动态菜单协议，开箱联调。
              </p>

              <div className="mt-3.5 flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2">
                <a
                  href={ADMIN_API_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={ADMIN_API_GIT_URL}
                  className="font-mono text-[11.5px] text-foreground/85 hover:text-primary transition-colors truncate"
                >
                  easybuild-jack/easybuild-admin-api.git
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(ADMIN_API_GIT_URL)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-background hover:text-primary transition-colors"
                  aria-label="复制后台接口仓库地址"
                >
                  {copiedCmd === ADMIN_API_GIT_URL ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((item) => (
          <Card
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-6 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md dark:bg-card/50"
          >
            {/* Subtle top hover accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-start justify-between mb-5">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${item.iconBg} ${item.accent}`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground/45 group-hover:text-primary/70 transition-colors">
                {item.index}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-[17px] font-bold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="text-[13.5px] leading-[1.7] text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </section>

      {/* Tech Stack & Side Panels */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tech Stack Matrix */}
        <Card className="lg:col-span-8 rounded-2xl border border-border/70 bg-card/80 p-6 sm:p-7 shadow-xs dark:bg-card/50">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-5 w-1 rounded-full bg-primary" />
              <div className="flex items-baseline gap-2.5">
                <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                  技术架构概览
                </h2>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                  / Tech Stack
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/80 px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              {techStack.length} Core Modules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group relative flex flex-col justify-between rounded-xl border border-border/60 bg-background/70 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-xs dark:bg-background/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-[14.5px] font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {tech.name}
                  </span>
                  <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10.5px] font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {tech.version}
                  </span>
                </div>
                <div className="mt-2.5 text-xs font-medium tracking-wide text-muted-foreground">
                  {tech.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-5">
          {/* Quick Start CTA Card */}
          <Card
            role="button"
            tabIndex={0}
            onClick={() => setGuideOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setGuideOpen(true)
              }
            }}
            className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.10] via-primary/[0.04] to-card p-6 shadow-xs cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Quick Start
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                  快速上手指南
                </h3>
                <p className="text-[13.5px] text-muted-foreground">
                  三步启动开发环境
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Card>

          {/* Product Value Card */}
          <Card className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-xs dark:bg-card/50 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[17px] font-bold tracking-tight text-foreground">
                产品价值
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60">
                Value
              </span>
            </div>
            <ul className="space-y-3.5">
              {productValues.map((text, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-[13.5px] leading-relaxed text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-foreground/85">{text}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Quick Start Dialog */}
      <Dialog open={guideOpen} onOpenChange={setGuideOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold">
              快速上手指南
            </DialogTitle>
            <DialogDescription>
              三步启动开发环境（默认端口 4000，内置本地 Mock 接口，账号{' '}
              <code className="font-mono text-xs text-foreground">admin</code> /
              密码 <code className="font-mono text-xs text-foreground">12345</code>）
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            {quickStartSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-border/70 bg-muted/35 p-3.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      {item.step}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.desc}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2">
                  <code className="font-mono text-xs text-foreground">
                    {item.cmd}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.cmd)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`复制命令 ${item.cmd}`}
                  >
                    {copiedCmd === item.cmd ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500">已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>复制</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
