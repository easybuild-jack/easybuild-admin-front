import { NextRequest, NextResponse } from 'next/server'
import { API_CODE } from '@/config/constants'
import type { ApiResponse } from '@/types/api'

export function mockSuccess<T = any>(
  data: T,
  msg = '操作成功',
  count?: number
) {
  const body: ApiResponse<T> = {
    code: API_CODE.OK,
    data,
    msg,
    ...(count !== undefined ? { count } : {}),
  }
  return NextResponse.json(body)
}

export function mockError(msg = '操作失败', code: string = API_CODE.ERROR) {
  const body: ApiResponse<null> = {
    code,
    data: null,
    msg,
  }
  return NextResponse.json(body)
}

export function mockUnlogin(msg = '未登录或登录已过期') {
  return mockError(msg, API_CODE.UNLOGIN)
}

export function checkMockAuth(request: NextRequest) {
  const token = request.headers.get('access-token')
  if (!token) {
    return mockUnlogin()
  }
  return null
}

export function paginate<T>(list: T[], page = 1, limit = 10) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 10
  const start = (safePage - 1) * safeLimit
  return {
    records: list.slice(start, start + safeLimit),
    total: list.length,
  }
}

export function parseIdList(ids: unknown): string[] {
  if (Array.isArray(ids)) {
    return ids.map(String).filter(Boolean)
  }
  if (typeof ids === 'string') {
    return ids
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  if (typeof ids === 'number') {
    return [String(ids)]
  }
  return []
}

export function formatNow(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}
