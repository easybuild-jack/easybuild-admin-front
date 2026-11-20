import { API_URLS } from '@/config/api-url'
import type { MockRouteMap } from '@/mock/types'
import {
  checkMockAuth,
  formatNow,
  mockError,
  mockSuccess,
  paginate,
  parseIdList,
} from '@/mock/utils'
import { getAuthMockStore, nextMockId } from './data'

export const departmentRoutes: MockRouteMap = {
  [`GET ${API_URLS.department.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const departmentName = (searchParams.get('departmentName') || '')
      .trim()
      .toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')

    const store = getAuthMockStore()
    const filtered = store.departments.filter((dept) => {
      if (
        departmentName &&
        !dept.departmentName.toLowerCase().includes(departmentName)
      ) {
        return false
      }
      if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
        if (dept.forbiddenFlag !== Number(forbiddenFlagParam)) {
          return false
        }
      }
      return true
    })

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.department.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const { departmentId, departmentName } = body || {}

    if (!departmentName || !String(departmentName).trim()) {
      return mockError('部门名称不能为空')
    }

    const store = getAuthMockStore()
    const now = formatNow()
    const trimmedName = String(departmentName).trim()

    if (departmentId) {
      const existing = store.departments.find(
        (d) => String(d.departmentId) === String(departmentId)
      )
      if (!existing) {
        return mockError('部门不存在')
      }
      existing.departmentName = trimmedName
      existing.lastUpdateTime = now
      return mockSuccess(existing, '编辑成功')
    }

    const created = {
      departmentId: nextMockId(),
      departmentName: trimmedName,
      forbiddenFlag: 0,
      type: 'INNER',
      insertTime: now,
      lastUpdateTime: now,
    }
    store.departments.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.department.disable}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)
    const value = Number(body?.value)

    if (ids.length === 0 || (value !== 0 && value !== 1)) {
      return mockError('参数错误')
    }

    const store = getAuthMockStore()
    const idSet = new Set(ids)
    const now = formatNow()

    store.departments.forEach((dept) => {
      if (idSet.has(String(dept.departmentId))) {
        dept.forbiddenFlag = value
        dept.lastUpdateTime = now
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.department.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) {
      return mockError('请选择要删除的部门')
    }

    const store = getAuthMockStore()
    const idSet = new Set(ids)
    store.departments = store.departments.filter(
      (dept) => !idSet.has(String(dept.departmentId))
    )

    return mockSuccess(null, '删除成功')
  },

  [`GET ${API_URLS.department.dropdownList}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const name = (searchParams.get('name') || '').trim().toLowerCase()

    const store = getAuthMockStore()
    const list = store.departments.filter((dept) => {
      if (dept.forbiddenFlag !== 0) return false
      if (name && !dept.departmentName.toLowerCase().includes(name)) return false
      return true
    })

    return mockSuccess(list, '查询成功')
  },
}

