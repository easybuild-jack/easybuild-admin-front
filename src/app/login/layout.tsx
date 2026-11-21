import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '登录',
  description: '登录 EasyBuild Admin（易构）现代化中后台前端脚手架控制台。',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

