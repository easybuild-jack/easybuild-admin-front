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
import { getAuthMockStore,getRoleResourceTree,nextMockId } from './data'

export const roleRoutes: MockRouteMap = {
  [`GET ${API_URLS.role.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const roleName = (searchParams.get('roleName') || '').trim().toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')

    const store = getAuthMockStore()
    const filtered = store.roles.filter((role) => {
      if (roleName && !role.roleName.toLowerCase().includes(roleName)) {
        return false
      }
      if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
        if (role.forbiddenFlag !== Number(forbiddenFlagParam)) {
          return false
        }
      }
      return true
    })

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.role.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const { roleId, roleName, remark } = body || {}

    if (!roleName || !String(roleName).trim()) {
      return mockError('角色名称不能为空')
    }

    const store = getAuthMockStore()
    const now = formatNow()
    const trimmedName = String(roleName).trim()

    if (roleId) {
      const existing = store.roles.find(
        (r) => String(r.roleId) === String(roleId)
      )
      if (!existing) {
        return mockError('角色不存在')
      }
      existing.roleName = trimmedName
      existing.remark = remark ?? existing.remark ?? ''
      existing.lastUpdateTime = now
      return mockSuccess(existing, '编辑成功')
    }

    const newId = nextMockId()
    const created = {
      roleId: newId,
      roleName: trimmedName,
      remark: remark || '',
      forbiddenFlag: 0,
      supperStatus: 0,
      type: 'CUSTOM',
      insertTime: now,
      lastUpdateTime: now,
    }
    store.roles.unshift(created)
    store.rolePermissions[newId] = []
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.role.disable}`]: async (request) => {
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

    store.roles.forEach((role) => {
      if (idSet.has(String(role.roleId))) {
        role.forbiddenFlag = value
        role.lastUpdateTime = now
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.role.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) {
      return mockError('请选择要删除的角色')
    }

    const store = getAuthMockStore()
    const idSet = new Set(ids)
    store.roles = store.roles.filter((role) => !idSet.has(String(role.roleId)))
    ids.forEach((id) => {
      delete store.rolePermissions[id]
    })

    return mockSuccess(null, '删除成功')
  },

  [`GET ${API_URLS.role.dropdownList}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const name = (searchParams.get('name') || '').trim().toLowerCase()

    const store = getAuthMockStore()
    const list = store.roles.filter((role) => {
      if (role.forbiddenFlag !== 0) return false
      if (name && !role.roleName.toLowerCase().includes(name)) return false
      return true
    })

    return mockSuccess(list, '查询成功')
  },

  [`GET ${API_URLS.role.roleResource}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const roleId = searchParams.get('roleId')

    if (!roleId) {
      return mockError('缺少角色ID')
    }

    const tree = getRoleResourceTree(roleId)
    return mockSuccess(tree, '查询成功')
  },

  [`POST ${API_URLS.role.saveRoleResource}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const roleId = body?.id !== undefined ? String(body.id) : ''

    if (!roleId) {
      return mockError('缺少角色ID')
    }

    const store = getAuthMockStore()
    const role = store.roles.find((r) => String(r.roleId) === roleId)
    if (!role) {
      return mockError('角色不存在')
    }

    store.rolePermissions[roleId] = parseIdList(body?.resourceIds)
    role.lastUpdateTime = formatNow()

    return mockSuccess(null, '权限保存成功')
  },
}

