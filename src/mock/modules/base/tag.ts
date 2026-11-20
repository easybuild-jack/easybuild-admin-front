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

export const tagRoutes: MockRouteMap = {
  [`GET ${API_URLS.tag.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const keyword = (
      searchParams.get('tagName') ||
      searchParams.get('searchKeyWord') ||
      ''
    )
      .trim()
      .toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')
    const categoryCode = searchParams.get('categoryCode')

    const store = getBaseMockStore()
    const filtered = store.tags.filter((tag) => {
      if (keyword) {
        const target = `${tag.tagName} ${tag.tagCode} ${tag.subName || ''} ${tag.categoryName}`.toLowerCase()
        if (!target.includes(keyword)) return false
      }
      if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
        if (tag.forbiddenFlag !== Number(forbiddenFlagParam)) return false
      }
      if (categoryCode) {
        const matchedCat = store.categories.find(
          (c) => c.categoryCode === categoryCode || c.categoryId === categoryCode
        )
        if (
          tag.categoryCode !== categoryCode &&
          (!matchedCat || tag.categoryCode !== matchedCat.categoryCode)
        ) {
          return false
        }
      }
      return true
    })

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.tag.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const {
      tagId,
      tagName,
      subName = '',
      tagCode,
      tagDescribe = '',
      categoryCode = '',
      categoryName,
    } = body || {}

    if (!tagName || !String(tagName).trim()) {
      return mockError('标签名称不能为空')
    }

    const store = getBaseMockStore()
    const now = formatNow()
    const trimmedName = String(tagName).trim()
    const matchedCat = store.categories.find(
      (c) =>
        c.categoryCode === categoryCode ||
        String(c.categoryId) === String(categoryCode)
    )
    const resolvedCategoryName = categoryName || matchedCat?.categoryName || ''

    if (tagId) {
      const existing = store.tags.find((t) => String(t.tagId) === String(tagId))
      if (!existing) return mockError('标签不存在')
      Object.assign(existing, {
        tagName: trimmedName,
        subName,
        tagCode: tagCode || existing.tagCode,
        tagDescribe,
        categoryCode: matchedCat?.categoryCode || categoryCode,
        categoryName: resolvedCategoryName,
        updateTime: now,
      })
      return mockSuccess(existing, '编辑成功')
    }

    const newId = nextBaseMockId()
    const created = {
      tagId: newId,
      tagCode: tagCode || `TAG_${newId}`,
      tagName: trimmedName,
      subName,
      tagDescribe,
      categoryCode: matchedCat?.categoryCode || categoryCode,
      categoryName: resolvedCategoryName,
      forbiddenFlag: 0,
      insertTime: now,
      createTime: now,
      updateTime: now,
    }
    store.tags.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.tag.disable}`]: async (request) => {
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
    store.tags.forEach((tag) => {
      if (idSet.has(String(tag.tagId))) {
        tag.forbiddenFlag = value
        tag.updateTime = now
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.tag.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) return mockError('请选择要删除的标签')

    const store = getBaseMockStore()
    const idSet = new Set(ids)
    store.tags = store.tags.filter((t) => !idSet.has(String(t.tagId)))

    return mockSuccess(null, '删除成功')
  },

  [`GET ${API_URLS.tag.dropdownList}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const name = (searchParams.get('name') || '').trim().toLowerCase()

    const store = getBaseMockStore()
    const list = store.tags.filter((t) => {
      if (t.forbiddenFlag !== 0) return false
      if (name && !t.tagName.toLowerCase().includes(name)) return false
      return true
    })

    return mockSuccess(list, '查询成功')
  },
}

