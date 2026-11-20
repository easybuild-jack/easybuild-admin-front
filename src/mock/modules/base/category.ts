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
import { getBaseMockStore,nextBaseMockId } from './data'

export const categoryRoutes: MockRouteMap = {
  [`GET ${API_URLS.category.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const keyword = (
      searchParams.get('categoryName') ||
      searchParams.get('searchKeyWord') ||
      ''
    )
      .trim()
      .toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')
    const groupId = searchParams.get('groupId')
    const levelParam = searchParams.get('level')

    const store = getBaseMockStore()
    const filtered = store.categories
      .filter((cat) => {
        if (keyword) {
          const target = `${cat.categoryName} ${cat.categoryCode} ${cat.parentName} ${cat.categoryDescribe}`.toLowerCase()
          if (!target.includes(keyword)) return false
        }
        if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
          if (cat.forbiddenFlag !== Number(forbiddenFlagParam)) return false
        }
        if (groupId && cat.groupId !== groupId) {
          return false
        }
        if (levelParam !== null && levelParam !== '') {
          if (cat.level !== Number(levelParam)) return false
        }
        return true
      })
      .sort((a, b) => a.level - b.level || a.sort - b.sort)

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.category.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const {
      categoryId,
      categoryName,
      categoryDescribe = '',
      parentId = '0',
      parentName,
      level = 1,
      sort = 0,
      groupId = 'GRP_GOODS',
    } = body || {}

    if (!categoryName || !String(categoryName).trim()) {
      return mockError('分类名称不能为空')
    }

    const store = getBaseMockStore()
    const now = formatNow()
    const trimmedName = String(categoryName).trim()
    const resolvedParentName =
      parentName ||
      (parentId && parentId !== '0'
        ? store.categories.find((c) => String(c.categoryId) === String(parentId))
            ?.categoryName || ''
        : '顶级分类')

    if (categoryId) {
      const existing = store.categories.find(
        (c) => String(c.categoryId) === String(categoryId)
      )
      if (!existing) return mockError('分类不存在')
      Object.assign(existing, {
        categoryName: trimmedName,
        categoryDescribe,
        parentId: String(parentId || '0'),
        parentName: resolvedParentName,
        level: Number(level) || 1,
        sort: Number(sort) || 0,
        groupId: groupId || existing.groupId,
        lastUpdateTime: now,
      })
      return mockSuccess(existing, '编辑成功')
    }

    const newId = nextBaseMockId()
    const created = {
      categoryId: newId,
      categoryCode: `CAT_${newId}`,
      categoryName: trimmedName,
      categoryDescribe,
      parentId: String(parentId || '0'),
      parentName: resolvedParentName,
      level: Number(level) || 1,
      sort: Number(sort) || 0,
      groupId: groupId || 'GRP_GOODS',
      forbiddenFlag: 0,
      insertTime: now,
      lastUpdateTime: now,
    }
    store.categories.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.category.disable}`]: async (request) => {
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
    const now = formatNow()
    store.categories.forEach((cat) => {
      if (idSet.has(String(cat.categoryId))) {
        cat.forbiddenFlag = value
        cat.lastUpdateTime = now
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.category.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) return mockError('请选择要删除的分类')

    const store = getBaseMockStore()
    const idSet = new Set(ids)
    store.categories = store.categories.filter(
      (cat) => !idSet.has(String(cat.categoryId))
    )

    return mockSuccess(null, '删除成功')
  },

  [`GET ${API_URLS.category.dropdownList}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const categoryName = (searchParams.get('categoryName') || '')
      .trim()
      .toLowerCase()
    const groupId = searchParams.get('groupId')
    const levelParam = searchParams.get('level')
    const parentId = searchParams.get('parentId')

    const store = getBaseMockStore()
    const list = store.categories
      .filter((cat) => {
        if (cat.forbiddenFlag !== 0) return false
        if (categoryName && !cat.categoryName.toLowerCase().includes(categoryName)) {
          return false
        }
        if (groupId && cat.groupId !== groupId) return false
        if (levelParam !== null && levelParam !== '' && cat.level !== Number(levelParam)) {
          return false
        }
        if (parentId && String(cat.parentId) !== String(parentId)) {
          return false
        }
        return true
      })
      .sort((a, b) => a.sort - b.sort)

    return mockSuccess(list, '查询成功')
  },
}

