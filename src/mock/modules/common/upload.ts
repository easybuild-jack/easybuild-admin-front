import type { MockRouteMap } from '@/mock/types'
import { mockError,mockSuccess } from '@/mock/utils'

function createPlaceholderSvg(label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
    <rect width="800" height="400" rx="16" fill="url(#g)"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="28" font-weight="bold">${label}</text>
  </svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`
}

export const uploadRoutes: MockRouteMap = {
  'POST /file/upload': async (request) => {
    try {
      const formData = await request.formData()
      const file = formData.get('file')

      if (!file || !(file instanceof File)) {
        return mockError('未找到上传文件')
      }

      // 对于 2MB 以内的图片，直接转成 data URL，前端可立即真实预览
      if (file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`
        return mockSuccess(dataUrl, '上传成功')
      }

      // 大文件或视频返回占位预览地址
      const safeName = file.name.replace(/[<>&"']/g, '').slice(0, 24) || 'Mock File'
      return mockSuccess(createPlaceholderSvg(safeName), '上传成功')
    } catch {
      return mockError('文件上传失败')
    }
  },
}

