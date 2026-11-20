import { NextRequest, NextResponse } from 'next/server'
import type { MockMethod, MockRouteMap } from './types'
import { mockError } from './utils'
import { authRoutes } from './modules/auth/auth'
import { departmentRoutes } from './modules/auth/department'
import { roleRoutes } from './modules/auth/role'
import { employeeRoutes } from './modules/auth/employee'
import { dictRoutes } from './modules/system/dict'
import { userRoutes } from './modules/customer/user'
import { uploadRoutes } from './modules/common/upload'
import { bannerRoutes } from './modules/operation/banner'
import { groupRoutes } from './modules/base/group'
import { categoryRoutes } from './modules/base/category'
import { brandRoutes } from './modules/base/brand'
import { tagRoutes } from './modules/base/tag'

const mockRoutes: MockRouteMap = {
  ...authRoutes,
  ...departmentRoutes,
  ...roleRoutes,
  ...employeeRoutes,
  ...dictRoutes,
  ...userRoutes,
  ...uploadRoutes,
  ...bannerRoutes,
  ...groupRoutes,
  ...categoryRoutes,
  ...brandRoutes,
  ...tagRoutes,
}

export async function dispatchMockRequest(
  request: NextRequest,
  method: MockMethod,
  path: string
): Promise<NextResponse> {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    return NextResponse.json({ code: 'NOT_FOUND', data: null, msg: 'Not Found' }, { status: 404 })
  }

  const key = `${method} ${path}`
  const handler = mockRoutes[key]

  if (!handler) {
    return NextResponse.json(
      { code: 'ERROR', data: null, msg: `Mock 接口未实现：${key}` },
      { status: 404 }
    )
  }

  try {
    return await handler(request)
  } catch (error: any) {
    console.error(`[Mock Error] ${key}:`, error)
    return mockError(error?.message || 'Mock 接口处理异常')
  }
}

