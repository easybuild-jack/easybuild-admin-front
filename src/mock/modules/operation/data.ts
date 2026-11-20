import type { Banner } from '@/types/banner'

interface OperationMockStore {
  banners: Banner[]
  seq: number
}

function makeBannerSvg(
  title: string,
  subtitle: string,
  fromColor: string,
  toColor: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="360" viewBox="0 0 900 360">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${fromColor}"/>
        <stop offset="100%" stop-color="${toColor}"/>
      </linearGradient>
    </defs>
    <rect width="900" height="360" rx="20" fill="url(#bg)"/>
    <circle cx="780" cy="70" r="130" fill="#ffffff" fill-opacity="0.12"/>
    <circle cx="120" cy="310" r="110" fill="#ffffff" fill-opacity="0.08"/>
    <text x="64" y="155" fill="#ffffff" font-family="sans-serif" font-size="44" font-weight="bold">${title}</text>
    <text x="64" y="215" fill="#ffffff" fill-opacity="0.9" font-family="sans-serif" font-size="22">${subtitle}</text>
    <rect x="64" y="255" width="140" height="40" rx="20" fill="#ffffff" fill-opacity="0.22"/>
    <text x="134" y="281" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="bold">立即查看</text>
  </svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`
}

function createInitialOperationStore(): OperationMockStore {
  return {
    seq: 7000,
    banners: [
      {
        bannerId: '601',
        targetId: 'act-spring-2026',
        targetType: 'activity',
        targetName: '春季焕新大促',
        jumpUrl: 'https://example.com/promo/spring',
        jumpMinAppId: '',
        mediaType: 0,
        mediaUrl: makeBannerSvg('春季焕新大促', '全场满 199 减 40 · 限时特惠', '#2563eb', '#06b6d4'),
        jumpType: 1,
        bannerLocation: 'top',
        pageType: 'index',
        clientType: 1,
        bgColor: '#2563eb',
        bannerTitle: '春季焕新大促主图',
        bannerDescription: '首页顶部主轮播活动 Banner',
        shareFlag: 1,
        sort: 1,
        forbiddenFlag: 0,
        insertTime: '2026-03-01 10:00:00',
      },
      {
        bannerId: '602',
        targetId: 'vip-day',
        targetType: 'member',
        targetName: '会员专享日',
        jumpUrl: '/pages/vip/index',
        jumpMinAppId: 'wx1234567890',
        mediaType: 0,
        mediaUrl: makeBannerSvg('超级会员专享日', '钻石会员折上 9 折 · 领百元券包', '#7c3aed', '#ec4899'),
        jumpType: 2,
        bannerLocation: 'top',
        pageType: 'index',
        clientType: 1,
        bgColor: '#7c3aed',
        bannerTitle: '超级会员专享日',
        bannerDescription: '每月 18 日会员专属福利入口',
        shareFlag: 1,
        sort: 2,
        forbiddenFlag: 0,
        insertTime: '2026-03-08 14:30:00',
      },
      {
        bannerId: '603',
        targetId: 'fresh-daily',
        targetType: 'category',
        targetName: '生鲜直采专场',
        jumpUrl: 'https://example.com/category/fresh',
        jumpMinAppId: '',
        mediaType: 0,
        mediaUrl: makeBannerSvg('源头生鲜直采', '每日新鲜送达 · 智能冷链锁鲜', '#059669', '#10b981'),
        jumpType: 1,
        bannerLocation: 'middle',
        pageType: 'index',
        clientType: 1,
        bgColor: '#059669',
        bannerTitle: '生鲜直采腰部通栏',
        bannerDescription: '首页中部生鲜频道推广图',
        shareFlag: 1,
        sort: 3,
        forbiddenFlag: 0,
        insertTime: '2026-03-15 09:20:00',
      },
      {
        bannerId: '604',
        targetId: 'new-user-gift',
        targetType: 'coupon',
        targetName: '新人首单礼',
        jumpUrl: 'https://example.com/new-user',
        jumpMinAppId: '',
        mediaType: 0,
        mediaUrl: makeBannerSvg('新人注册领豪礼', '首单立减 20 元 · 免配送费', '#ea580c', '#f59e0b'),
        jumpType: 1,
        bannerLocation: 'bottom',
        pageType: 'list',
        clientType: 1,
        bgColor: '#ea580c',
        bannerTitle: '列表页新人首单礼',
        bannerDescription: '商品列表页底部转化 Banner',
        shareFlag: 0,
        sort: 4,
        forbiddenFlag: 0,
        insertTime: '2026-03-22 16:10:00',
      },
      {
        bannerId: '605',
        targetId: 'winter-clearance',
        targetType: 'activity',
        targetName: '冬季清仓活动',
        jumpUrl: 'https://example.com/promo/winter',
        jumpMinAppId: '',
        mediaType: 0,
        mediaUrl: makeBannerSvg('冬季年终清仓', '已结束活动归档', '#475569', '#64748b'),
        jumpType: 1,
        bannerLocation: 'other',
        pageType: 'index',
        clientType: 1,
        bgColor: '#475569',
        bannerTitle: '冬季年终清仓（已下线）',
        bannerDescription: '历史过期活动图',
        shareFlag: 0,
        sort: 99,
        forbiddenFlag: 1,
        insertTime: '2026-01-05 08:00:00',
      },
    ],
  }
}

const globalForOperationMock = globalThis as unknown as {
  __EASYBUILD_MOCK_OPERATION_DB__?: OperationMockStore
}

export function getOperationMockStore(): OperationMockStore {
  if (!globalForOperationMock.__EASYBUILD_MOCK_OPERATION_DB__) {
    globalForOperationMock.__EASYBUILD_MOCK_OPERATION_DB__ = createInitialOperationStore()
  }
  return globalForOperationMock.__EASYBUILD_MOCK_OPERATION_DB__
}

export function nextOperationMockId(): string {
  const store = getOperationMockStore()
  store.seq += 1
  return String(store.seq)
}

