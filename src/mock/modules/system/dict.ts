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
import { getSystemMockStore,nextSystemMockId } from './data'

export const dictRoutes: MockRouteMap = {
  // ===== 字典主表 =====
  [`GET ${API_URLS.dict.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const dictName = (searchParams.get('dictName') || '').trim().toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')

    const store = getSystemMockStore()
    const filtered = store.dicts.filter((dict) => {
      if (dictName) {
        const target = [dict.dictName, dict.dictCode, dict.moduleName]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!target.includes(dictName)) {
          return false
        }
      }
      if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
        if (dict.forbiddenFlag !== Number(forbiddenFlagParam)) {
          return false
        }
      }
      return true
    })

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.dict.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const {
      dictId,
      dictName,
      dictCode,
      dictDescribe = '',
      moduleName = '',
    } = body || {}

    if (!dictName || !String(dictName).trim()) {
      return mockError('字典名称不能为空')
    }
    if (!dictCode || !String(dictCode).trim()) {
      return mockError('字典编码不能为空')
    }

    const store = getSystemMockStore()
    const now = formatNow()
    const trimmedName = String(dictName).trim()
    const trimmedCode = String(dictCode).trim()

    if (dictId) {
      const existing = store.dicts.find((d) => String(d.dictId) === String(dictId))
      if (!existing) {
        return mockError('字典不存在')
      }
      existing.dictName = trimmedName
      existing.dictCode = trimmedCode
      existing.dictDescribe = dictDescribe
      existing.moduleName = moduleName
      existing.lastUpdateTime = now
      return mockSuccess(existing, '编辑成功')
    }

    const created = {
      dictId: nextSystemMockId(),
      dictName: trimmedName,
      dictCode: trimmedCode,
      dictDescribe,
      moduleName,
      forbiddenFlag: 0,
      insertTime: now,
      lastUpdateTime: now,
    }
    store.dicts.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.dict.disable}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)
    const value = Number(body?.value)

    if (ids.length === 0 || (value !== 0 && value !== 1)) {
      return mockError('参数错误')
    }

    const store = getSystemMockStore()
    const idSet = new Set(ids)
    const now = formatNow()

    store.dicts.forEach((dict) => {
      if (idSet.has(String(dict.dictId))) {
        dict.forbiddenFlag = value
        dict.lastUpdateTime = now
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.dict.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) {
      return mockError('请选择要删除的字典')
    }

    const store = getSystemMockStore()
    const idSet = new Set(ids)
    store.dicts = store.dicts.filter((dict) => !idSet.has(String(dict.dictId)))
    store.dictItems = store.dictItems.filter(
      (item) => !idSet.has(String(item.dictId))
    )

    return mockSuccess(null, '删除成功')
  },

  // ===== 字典项明细 =====
  [`GET ${API_URLS.dictItem.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const dictId = searchParams.get('dictId')
    const dictKey = (searchParams.get('dictKey') || '').trim().toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')

    const store = getSystemMockStore()
    const filtered = store.dictItems.filter((item) => {
      if (dictId && String(item.dictId) !== String(dictId)) {
        return false
      }
      if (dictKey) {
        const target = `${item.dictKey} ${item.dictValue}`.toLowerCase()
        if (!target.includes(dictKey)) {
          return false
        }
      }
      if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
        if (item.forbiddenFlag !== Number(forbiddenFlagParam)) {
          return false
        }
      }
      return true
    })

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.dictItem.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const { dictItemId, dictId, dictKey, dictValue } = body || {}

    if (!dictId) {
      return mockError('缺少字典ID')
    }
    if (!dictKey || !String(dictKey).trim()) {
      return mockError('字典项键不能为空')
    }
    if (!dictValue || !String(dictValue).trim()) {
      return mockError('字典项值不能为空')
    }

    const store = getSystemMockStore()
    const trimmedKey = String(dictKey).trim()
    const trimmedValue = String(dictValue).trim()

    if (dictItemId) {
      const existing = store.dictItems.find(
        (item) => String(item.dictItemId) === String(dictItemId)
      )
      if (!existing) {
        return mockError('字典项不存在')
      }
      existing.dictKey = trimmedKey
      existing.dictValue = trimmedValue
      return mockSuccess(existing, '编辑成功')
    }

    const created = {
      dictItemId: nextSystemMockId(),
      dictId: String(dictId),
      dictKey: trimmedKey,
      dictValue: trimmedValue,
      forbiddenFlag: 0,
    }
    store.dictItems.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.dictItem.disable}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)
    const value = Number(body?.value)

    if (ids.length === 0 || (value !== 0 && value !== 1)) {
      return mockError('参数错误')
    }

    const store = getSystemMockStore()
    const idSet = new Set(ids)
    store.dictItems.forEach((item) => {
      if (idSet.has(String(item.dictItemId))) {
        item.forbiddenFlag = value
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.dictItem.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) {
      return mockError('请选择要删除的字典项')
    }

    const store = getSystemMockStore()
    const idSet = new Set(ids)
    store.dictItems = store.dictItems.filter(
      (item) => !idSet.has(String(item.dictItemId))
    )

    return mockSuccess(null, '删除成功')
  },
}

