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
import { getOperationMockStore,nextOperationMockId } from './data'

export const bannerRoutes: MockRouteMap = {
  [`GET ${API_URLS.banner.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const bannerTitle = (searchParams.get('bannerTitle') || '')
      .trim()
      .toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')

    const store = getOperationMockStore()
    const filtered = store.banners
      .filter((banner) => {
        if (bannerTitle) {
          const target = `${banner.bannerTitle} ${banner.bannerDescription}`.toLowerCase()
          if (!target.includes(bannerTitle)) {
            return false
          }
        }
        if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
          if (banner.forbiddenFlag !== Number(forbiddenFlagParam)) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => (a.sort || 0) - (b.sort || 0))

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.banner.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const {
      bannerId,
      targetId = '',
      targetType = '',
      targetName = '',
      jumpUrl = '',
      jumpMinAppId = '',
      mediaType = 0,
      mediaUrl = '',
      jumpType = 1,
      bannerLocation = 'top',
      pageType = 'index',
      clientType = 1,
      bgColor = '#2563eb',
      bannerTitle = '',
      bannerDescription = '',
      shareFlag = 1,
      sort = 0,
    } = body || {}

    if (!bannerTitle || !String(bannerTitle).trim()) {
      return mockError('Banner 标题不能为空')
    }
    if (!mediaUrl) {
      return mockError('请上传媒体文件')
    }

    const store = getOperationMockStore()

    if (bannerId) {
      const existing = store.banners.find(
        (b) => String(b.bannerId) === String(bannerId)
      )
      if (!existing) {
        return mockError('Banner 不存在')
      }
      Object.assign(existing, {
        targetId,
        targetType,
        targetName,
        jumpUrl,
        jumpMinAppId,
        mediaType: Number(mediaType),
        mediaUrl,
        jumpType: Number(jumpType),
        bannerLocation,
        pageType,
        clientType: Number(clientType),
        bgColor,
        bannerTitle: String(bannerTitle).trim(),
        bannerDescription,
        shareFlag: Number(shareFlag),
        sort: Number(sort),
      })
      return mockSuccess(existing, '编辑成功')
    }

    const created = {
      bannerId: nextOperationMockId(),
      targetId,
      targetType,
      targetName,
      jumpUrl,
      jumpMinAppId,
      mediaType: Number(mediaType),
      mediaUrl,
      jumpType: Number(jumpType),
      bannerLocation,
      pageType,
      clientType: Number(clientType),
      bgColor,
      bannerTitle: String(bannerTitle).trim(),
      bannerDescription,
      shareFlag: Number(shareFlag),
      sort: Number(sort),
      forbiddenFlag: 0,
      insertTime: formatNow(),
    }
    store.banners.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.banner.disable}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)
    const value = Number(body?.value)

    if (ids.length === 0 || (value !== 0 && value !== 1)) {
      return mockError('参数错误')
    }

    const store = getOperationMockStore()
    const idSet = new Set(ids)

    store.banners.forEach((banner) => {
      if (idSet.has(String(banner.bannerId))) {
        banner.forbiddenFlag = value
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.banner.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) {
      return mockError('请选择要删除的 Banner')
    }

    const store = getOperationMockStore()
    const idSet = new Set(ids)
    store.banners = store.banners.filter(
      (banner) => !idSet.has(String(banner.bannerId))
    )

    return mockSuccess(null, '删除成功')
  },
}

