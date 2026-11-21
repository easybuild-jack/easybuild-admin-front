'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import CryptoJS from 'crypto-js'
import { Loader2, Moon, Sun } from 'lucide-react'
import { LoginForm } from './login-form'
import { loginConfig } from '@/config/login/login-config'
import { API_URLS } from '@/config/api-url'
import { http } from '@/api/http'
import { showMessage, showError } from '@/components/custom/notifications'
import { themeColors, type ThemeColor } from '@/config/theme-colors'
import { cn } from '@/lib/utils'
import type { LoginForm as LoginFormType } from '@/types/user'
import type { TokenContent, TokenData } from '@/types/token'

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    const tokenData = JSON.parse(jsonPayload) as TokenData
    const content = JSON.parse(tokenData.content) as TokenContent
    return content
  } catch (error) {
    console.error('Token parsing failed:', error)
    return null
  }
}

const showcaseCards = [
  {
    code: '01 / MENU',
    title: '动态路由菜单',
    desc: '接口下发权限树',
  },
  {
    code: '02 / STACK',
    title: 'TypeScript 6',
    desc: '全链路类型覆盖',
  },
  {
    code: '03 / THEME',
    title: '25+ 预置主题',
    desc: '深浅模式即时生效',
  },
]

export default function Login() {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const applyThemeColor = useCallback(
    (color: ThemeColor) => {
      const root = document.documentElement
      const colors = themeColors[color]
      const isDark = resolvedTheme === 'dark'
      const colorSet = isDark ? colors.dark : colors.light

      Object.entries(colorSet).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value)
      })
    },
    [resolvedTheme]
  )

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme-color') as ThemeColor
    if (saved && themeColors[saved]) {
      applyThemeColor(saved)
    }
  }, [applyThemeColor])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const handleSubmit = async (data: LoginFormType) => {
    try {
      setIsLoading(true)
      const encryptedData = {
        ...data,
        password: CryptoJS.MD5(data.password).toString(),
        type: 'account',
      }
      const response = await http.post(API_URLS.auth.login, encryptedData)
      const res = response.data

      localStorage.setItem('access-token', res.accessToken)

      const userInfo = parseJwt(res.accessToken)
      if (userInfo) {
        localStorage.setItem('user-info', JSON.stringify(userInfo))
      }

      showMessage({
        title: '登录成功',
        description: '欢迎回来！',
      })

      router.push('/')
    } catch (error: any) {
      showError({
        title: '登录失败',
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-background text-foreground">
      {/* Left Brand Showcase Panel (Desktop) */}
      <aside className="hidden lg:flex lg:col-span-7 relative overflow-hidden bg-muted/40 dark:bg-[#080a0f] text-foreground border-r border-border/70 dark:border-white/[0.06] p-10 xl:p-14 flex-col justify-between select-none transition-colors duration-300">
        {/* Subtle Architectural Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.06] text-foreground"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage:
              'radial-gradient(ellipse 85% 75% at 30% 30%, black 25%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 85% 75% at 30% 30%, black 25%, transparent 100%)',
          }}
        />

        {/* Ambient Theme-Adaptive Glows */}
        <div
          className="pointer-events-none absolute -top-28 -left-24 h-96 w-96 rounded-full blur-[120px] opacity-[0.16] dark:opacity-30"
          style={{ backgroundColor: 'hsl(var(--primary))' }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full blur-[120px] opacity-[0.12] dark:opacity-20"
          style={{ backgroundColor: 'hsl(var(--primary))' }}
        />

        {/* Top Brand Lockup */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-sm font-extrabold tracking-tight shadow-md">
              EB
            </div>
            <div>
              <div className="font-display text-[15px] font-bold tracking-tight leading-none text-foreground">
                {loginConfig.name}
              </div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary mt-1.5 opacity-90">
                易构 · BMS
              </div>
            </div>
          </div>

          <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-border/80 bg-background/70 dark:border-white/10 dark:bg-white/[0.04] text-muted-foreground backdrop-blur-sm">
            Next.js 16 · React 19
          </span>
        </div>

        {/* Center Editorial Statement & Mini Architecture Cards */}
        <div className="relative z-10 my-12 space-y-9">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Enterprise Scaffold
            </div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.2] text-foreground">
              <span className="mb-2 block text-xl font-bold tracking-[0.01em] text-primary xl:text-[22px]">
                {loginConfig.brand}
              </span>
              <span className="block text-3xl xl:text-[38px]">
                {loginConfig.tagline}
              </span>
            </h1>
            <p className="text-sm leading-7 text-muted-foreground max-w-lg">
              {loginConfig.subDescription}，前端按需搭建、即配即用，助力团队高效构建企业级管理平台。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3.5 max-w-xl">
            {showcaseCards.map((card) => (
              <div
                key={card.code}
                className="rounded-xl border border-border/70 bg-background/75 dark:border-white/10 dark:bg-white/[0.04] p-4 shadow-xs dark:shadow-none backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-background dark:hover:bg-white/[0.06]"
              >
                <div className="font-mono text-[10px] tracking-wider text-muted-foreground/80 mb-2.5">
                  {card.code}
                </div>
                <div className="font-display text-[13px] font-semibold text-foreground mb-1">
                  {card.title}
                </div>
                <div className="text-xs leading-relaxed text-muted-foreground">
                  {card.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="relative z-10 flex items-center justify-between border-t border-border/70 dark:border-white/10 pt-6 text-xs text-muted-foreground">
          <span>
            &copy; {new Date().getFullYear()} {loginConfig.name}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground/75">
            Shadcn/ui · Tailwind CSS 4
          </span>
        </div>
      </aside>

      {/* Right Focused Sign-In Studio */}
      <main className="lg:col-span-5 relative flex flex-col justify-between bg-background px-6 py-8 sm:px-12 lg:px-14">
        {/* Top Bar: Mobile Brand + Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 lg:invisible">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display text-xs font-extrabold">
              EB
            </div>
            <span className="font-display text-sm font-bold tracking-tight">
              {loginConfig.name}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            title={mounted && resolvedTheme === 'dark' ? '切换浅色模式' : '切换深色模式'}
            aria-label="切换深浅主题"
          >
            {mounted && resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Centered Form Area */}
        <div className="relative my-auto py-8">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute -inset-4 z-50 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-xs font-medium tracking-wider text-muted-foreground">
                  安全验证中...
                </span>
              </div>
            </div>
          )}

          <div
            className={cn(
              'w-full max-w-[368px] mx-auto space-y-8 transition-opacity duration-200',
              isLoading && 'opacity-60 pointer-events-none'
            )}
          >
            <div className="space-y-2">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Sign In
              </p>
              <h2 className="font-display text-2xl sm:text-[26px] font-extrabold tracking-tight text-foreground">
                欢迎回来
              </h2>
              <p className="text-sm text-muted-foreground">
                请输入您的管理账号以进入工作台
              </p>
            </div>

            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />

            {/* Subtle Mock Account Hint */}
            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/40 px-4 py-3 text-xs">
              <span className="text-muted-foreground">Mock 体验账号</span>
              <span className="font-mono font-semibold text-foreground">
                admin / 12345
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Mobile Copyright */}
        <div className="text-center lg:text-right text-xs text-muted-foreground/60">
          <span className="lg:hidden">
            &copy; {new Date().getFullYear()} {loginConfig.name}. All rights reserved.
          </span>
        </div>
      </main>
    </div>
  )
}
