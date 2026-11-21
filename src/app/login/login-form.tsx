'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Eye, EyeOff, Loader2, Lock, User } from 'lucide-react'
import type { LoginForm as LoginFormData } from '@/types/user'
import { cn } from '@/lib/utils'

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    loginAccount: 'admin',
    password: '12345',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting || isLoading) return

    try {
      setIsSubmitting(true)
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = isLoading || isSubmitting

  const inputStyles = cn(
    'h-11 rounded-xl bg-muted/40 border-border/80 pl-10 text-sm transition-all duration-200',
    'focus:bg-background focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )

  const iconStyles =
    'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70 transition-colors duration-200 group-focus-within:text-primary'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="group space-y-2">
          <label
            htmlFor="login-account"
            className="block text-xs font-semibold tracking-wide text-foreground"
          >
            账号
          </label>
          <div className="relative">
            <Input
              id="login-account"
              type="text"
              required
              minLength={2}
              autoComplete="username"
              placeholder="请输入账号"
              value={formData.loginAccount}
              onChange={(e) =>
                setFormData({ ...formData, loginAccount: e.target.value })
              }
              className={inputStyles}
              disabled={isDisabled}
              title="请填写账号（至少2位字符）"
              onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
                if (e.currentTarget.validity.valueMissing) {
                  e.currentTarget.setCustomValidity('哎呀，是不是忘记填写账号了？')
                } else if (e.currentTarget.validity.tooShort) {
                  e.currentTarget.setCustomValidity('账号至少需要2位字符哦')
                }
              }}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                e.currentTarget.setCustomValidity('')
              }}
            />
            <User className={iconStyles} />
          </div>
        </div>

        <div className="group space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold tracking-wide text-foreground"
            >
              密码
            </label>
            <span className="font-mono text-[11px] text-muted-foreground/70">
              MD5 加密传输
            </span>
          </div>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={5}
              autoComplete="current-password"
              placeholder="请输入密码"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={cn(inputStyles, 'pr-11')}
              disabled={isDisabled}
              title="请填写密码（至少5位字符）"
              onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
                if (e.currentTarget.validity.valueMissing) {
                  e.currentTarget.setCustomValidity('密码可不能忘记输入哦')
                } else if (e.currentTarget.validity.tooShort) {
                  e.currentTarget.setCustomValidity('密码至少需要5位字符哦')
                }
              }}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                e.currentTarget.setCustomValidity('')
              }}
            />
            <Lock className={iconStyles} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                'absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-primary focus:outline-none transition-colors duration-200',
                isDisabled && 'cursor-not-allowed opacity-50 pointer-events-none'
              )}
              disabled={isDisabled}
              aria-label={showPassword ? '隐藏密码' : '显示密码'}
            >
              {showPassword ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className={cn(
          'group w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm',
          'transition-all duration-200 shadow-[0_10px_24px_-8px_hsl(var(--primary)/0.4)] hover:shadow-[0_14px_28px_-8px_hsl(var(--primary)/0.5)] hover:-translate-y-0.5 active:translate-y-0',
          isDisabled && 'opacity-70 cursor-not-allowed hover:transform-none shadow-none'
        )}
        disabled={isDisabled}
      >
        {isDisabled ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>验证中...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span>登录系统</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        )}
      </Button>
    </form>
  )
}
