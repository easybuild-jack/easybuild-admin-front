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

export const brandRoutes: MockRouteMap = {
  [`GET ${API_URLS.brand.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const brandName = (searchParams.get('brandName') || '').trim().toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')
    const categoryCode = searchParams.get('categoryCode')

    const store = getBaseMockStore()
    const filtered = store.brands
      .filter((brand) => {
        if (brandName) {
          const target = `${brand.brandName} ${brand.categoryName} ${brand.describe}`.toLowerCase()
          if (!target.includes(brandName)) return false
        }
        if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
          if (brand.forbiddenFlag !== Number(forbiddenFlagParam)) return false
        }
        if (categoryCode) {
          const matchedCat = store.categories.find(
            (c) => c.categoryCode === categoryCode || c.categoryId === categoryCode
          )
          if (
            brand.categoryId !== categoryCode &&
            (!matchedCat || brand.categoryId !== matchedCat.categoryId)
          ) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => a.sort - b.sort)

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.brand.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const {
      brandId,
      brandName,
      categoryId = '',
      categoryName,
      icon = '',
      logo = '',
      describe = '',
      sort = 0,
    } = body || {}

    if (!brandName || !String(brandName).trim()) {
      return mockError('品牌名称不能为空')
    }

    const store = getBaseMockStore()
    const now = formatNow()
    const trimmedName = String(brandName).trim()
    const resolvedCategoryName =
      categoryName ||
      store.categories.find((c) => String(c.categoryId) === String(categoryId))
        ?.categoryName ||
      ''

    if (brandId) {
      const existing = store.brands.find(
        (b) => String(b.brandId) === String(brandId)
      )
      if (!existing) return mockError('品牌不存在')
      Object.assign(existing, {
        brandName: trimmedName,
        categoryId: String(categoryId),
        categoryName: resolvedCategoryName,
        icon,
        logo,
        describe,
        sort: Number(sort) || 0,
        lastUpdateTime: now,
      })
      return mockSuccess(existing, '编辑成功')
    }

    const created = {
      brandId: nextBaseMockId(),
      brandName: trimmedName,
      categoryId: String(categoryId),
      categoryName: resolvedCategoryName,
      icon,
      logo,
      describe,
      sort: Number(sort) || 0,
      forbiddenFlag: 0,
      insertTime: now,
      lastUpdateTime: now,
    }
    store.brands.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.brand.disable}`]: async (request) => {
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
    store.brands.forEach((brand) => {
      if (idSet.has(String(brand.brandId))) {
        brand.forbiddenFlag = value
        brand.lastUpdateTime = now
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.brand.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) return mockError('请选择要删除的品牌')

    const store = getBaseMockStore()
    const idSet = new Set(ids)
    store.brands = store.brands.filter((b) => !idSet.has(String(b.brandId)))

    return mockSuccess(null, '删除成功')
  },

  [`GET ${API_URLS.brand.dropdownList}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const name = (searchParams.get('name') || '').trim().toLowerCase()

    const store = getBaseMockStore()
    const list = store.brands
      .filter((b) => {
        if (b.forbiddenFlag !== 0) return false
        if (name && !b.brandName.toLowerCase().includes(name)) return false
        return true
      })
      .sort((a, b) => a.sort - b.sort)

    return mockSuccess(list, '查询成功')
  },
}

