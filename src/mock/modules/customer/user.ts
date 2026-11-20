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
import { getCustomerMockStore, nextCustomerMockId } from './data'

export const userRoutes: MockRouteMap = {
  [`GET ${API_URLS.user.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const searchKeyWord = (
      searchParams.get('searchKeyWord') ||
      searchParams.get('searchKeyword') ||
      ''
    )
      .trim()
      .toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')

    const store = getCustomerMockStore()
    const filtered = store.users.filter((user) => {
      if (searchKeyWord) {
        const target = [
          user.name,
          user.phone,
          user.userNo,
          user.email,
          user.vipName,
          user.channelName,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!target.includes(searchKeyWord)) {
          return false
        }
      }
      if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
        if (user.forbiddenFlag !== Number(forbiddenFlagParam)) {
          return false
        }
      }
      return true
    })

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.user.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const {
      userId,
      userNo,
      phone,
      email = '',
      name = '',
      avatar = '',
      gender = '',
      signature = '',
      realStatus = 0,
      vipLevel = 0,
      vipName = '普通会员',
      referrerId = '',
      referrerName = '',
      flag = 'NORMAL',
      extFlag = '',
      remark = '',
      channelId = 'ADMIN',
      channelName = '后台录入',
    } = body || {}

    if (!phone || !String(phone).trim()) {
      return mockError('手机号不能为空')
    }

    const store = getCustomerMockStore()
    const now = formatNow()

    if (userId) {
      const existing = store.users.find(
        (u) => String(u.userId) === String(userId)
      )
      if (!existing) {
        return mockError('会员不存在')
      }
      Object.assign(existing, {
        phone: String(phone).trim(),
        email,
        name: name || existing.name,
        userNo: userNo || existing.userNo,
        avatar: avatar ?? existing.avatar,
        gender: gender ?? existing.gender,
        signature: signature ?? existing.signature,
        remark: remark ?? existing.remark,
        updateTime: now,
      })
      return mockSuccess(existing, '编辑成功')
    }

    const newId = nextCustomerMockId()
    const created = {
      userId: newId,
      userNo: userNo || `VIP2026${newId}`,
      phone: String(phone).trim(),
      email,
      name: name || `用户${String(phone).slice(-4)}`,
      avatar,
      gender,
      signature,
      realStatus,
      vipLevel,
      vipName,
      referrerId,
      referrerName,
      forbiddenFlag: 0,
      flag,
      extFlag,
      remark,
      channelId,
      channelName,
      createTime: now,
      updateTime: now,
    }
    store.users.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.user.disable}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)
    const value = Number(body?.value)

    if (ids.length === 0 || (value !== 0 && value !== 1)) {
      return mockError('参数错误')
    }

    const store = getCustomerMockStore()
    const idSet = new Set(ids)
    const now = formatNow()

    store.users.forEach((user) => {
      if (idSet.has(String(user.userId))) {
        user.forbiddenFlag = value
        user.updateTime = now
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.user.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) {
      return mockError('请选择要删除的会员')
    }

    const store = getCustomerMockStore()
    const idSet = new Set(ids)
    store.users = store.users.filter((user) => !idSet.has(String(user.userId)))

    return mockSuccess(null, '删除成功')
  },
}

