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
import { getBaseMockStore, nextBaseMockId } from './data'

export const groupRoutes: MockRouteMap = {
  [`GET ${API_URLS.group.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const keyword = (
      searchParams.get('groupName') ||
      searchParams.get('searchKeyWord') ||
      ''
    )
      .trim()
      .toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')

    const store = getBaseMockStore()
    const filtered = store.groups.filter((group) => {
      if (keyword) {
        const target = `${group.groupName} ${group.groupCode} ${group.groupDescribe || ''}`.toLowerCase()
        if (!target.includes(keyword)) return false
      }
      if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
        if (group.forbiddenFlag !== Number(forbiddenFlagParam)) return false
      }
      return true
    })

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.group.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const { groupId, groupName, groupDescribe = '', groupCode } = body || {}

    if (!groupName || !String(groupName).trim()) {
      return mockError('分组名称不能为空')
    }

    const store = getBaseMockStore()
    const trimmedName = String(groupName).trim()

    if (groupId) {
      const existing = store.groups.find(
        (g) => String(g.groupId) === String(groupId)
      )
      if (!existing) return mockError('分组不存在')
      existing.groupName = trimmedName
      existing.groupDescribe = groupDescribe
      if (groupCode) existing.groupCode = groupCode
      return mockSuccess(existing, '编辑成功')
    }

    const newId = nextBaseMockId()
    const created = {
      groupId: newId,
      groupCode: groupCode || `GRP_${newId}`,
      groupName: trimmedName,
      groupDescribe,
      forbiddenFlag: 0,
      insertTime: formatNow(),
    }
    store.groups.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.group.disable}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)
    const value = Number(body?.value)

    if (ids.length === 0 || (value !== 0 && value !== 1)) {
      return mockError('参数错误')
    }

    const store = getBaseMockStore()
    const idSet = new Set(ids)
    store.groups.forEach((group) => {
      if (idSet.has(String(group.groupId))) {
        group.forbiddenFlag = value
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.group.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) return mockError('请选择要删除的分组')

    const store = getBaseMockStore()
    const idSet = new Set(ids)
    store.groups = store.groups.filter((g) => !idSet.has(String(g.groupId)))

    return mockSuccess(null, '删除成功')
  },

  [`GET ${API_URLS.group.dropdownList}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const name = (searchParams.get('name') || '').trim().toLowerCase()

    const store = getBaseMockStore()
    const list = store.groups.filter((g) => {
      if (g.forbiddenFlag !== 0) return false
      if (name && !g.groupName.toLowerCase().includes(name)) return false
      return true
    })

    return mockSuccess(list, '查询成功')
  },
}

