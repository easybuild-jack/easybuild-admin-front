import type { User } from '@/types/user'

interface CustomerMockStore {
  users: User[]
  seq: number
}

function createInitialCustomerStore(): CustomerMockStore {
  return {
    seq: 6000,
    users: [
      {
        userId: '501',
        userNo: 'VIP20260001',
        phone: '13800138001',
        email: 'linxiaoming@example.com',
        name: '林晓明',
        avatar: '',
        gender: 'male',
        signature: '热爱生活，品质购物',
        realStatus: 1,
        vipLevel: 3,
        vipName: '钻石会员',
        referrerId: '',
        referrerName: '',
        forbiddenFlag: 0,
        flag: 'ACTIVE',
        extFlag: '',
        remark: '高频复购老客户',
        channelId: 'WX_MINI',
        channelName: '微信小程序',
        createTime: '2026-01-15 10:20:00',
        updateTime: '2026-04-10 14:30:00',
      },
      {
        userId: '502',
        userNo: 'VIP20260002',
        phone: '13912345602',
        email: 'chenyu@example.com',
        name: '陈雨晴',
        avatar: '',
        gender: 'female',
        signature: '发现好物每一天',
        realStatus: 1,
        vipLevel: 2,
        vipName: '黄金会员',
        referrerId: '501',
        referrerName: '林晓明',
        forbiddenFlag: 0,
        flag: 'ACTIVE',
        extFlag: '',
        remark: '老客推荐注册',
        channelId: 'WX_MINI',
        channelName: '微信小程序',
        createTime: '2026-01-22 15:40:00',
        updateTime: '2026-04-11 09:15:00',
      },
      {
        userId: '503',
        userNo: 'VIP20260003',
        phone: '13723456703',
        email: 'zhoujie@example.com',
        name: '周杰伦迷',
        avatar: '',
        gender: 'male',
        signature: '简单爱',
        realStatus: 1,
        vipLevel: 1,
        vipName: '白银会员',
        referrerId: '',
        referrerName: '',
        forbiddenFlag: 0,
        flag: 'NORMAL',
        extFlag: '',
        remark: '',
        channelId: 'APP_IOS',
        channelName: 'iOS App',
        createTime: '2026-02-04 11:05:00',
        updateTime: '2026-04-08 16:45:00',
      },
      {
        userId: '504',
        userNo: 'VIP20260004',
        phone: '13634567804',
        email: 'wumei@example.com',
        name: '吴美琪',
        avatar: '',
        gender: 'female',
        signature: '',
        realStatus: 0,
        vipLevel: 0,
        vipName: '普通会员',
        referrerId: '502',
        referrerName: '陈雨晴',
        forbiddenFlag: 0,
        flag: 'NEW',
        extFlag: '',
        remark: '活动页引流新用户',
        channelId: 'H5',
        channelName: 'H5 推广页',
        createTime: '2026-03-01 09:12:00',
        updateTime: '2026-04-09 18:20:00',
      },
      {
        userId: '505',
        userNo: 'VIP20260005',
        phone: '13545678905',
        email: 'zhenghao@example.com',
        name: '郑浩然',
        avatar: '',
        gender: 'male',
        signature: '追求极致性价比',
        realStatus: 1,
        vipLevel: 2,
        vipName: '黄金会员',
        referrerId: '',
        referrerName: '',
        forbiddenFlag: 1,
        flag: 'RISK',
        extFlag: '',
        remark: '异常刷单临时禁用',
        channelId: 'APP_ANDROID',
        channelName: 'Android App',
        createTime: '2026-03-10 13:50:00',
        updateTime: '2026-04-12 10:05:00',
      },
      {
        userId: '506',
        userNo: 'VIP20260006',
        phone: '13356789006',
        email: 'sunli@example.com',
        name: '孙丽娜',
        avatar: '',
        gender: 'female',
        signature: '健康饮食，品质生鲜',
        realStatus: 1,
        vipLevel: 3,
        vipName: '钻石会员',
        referrerId: '501',
        referrerName: '林晓明',
        forbiddenFlag: 0,
        flag: 'ACTIVE',
        extFlag: '',
        remark: '企业采购联系人',
        channelId: 'WX_MINI',
        channelName: '微信小程序',
        createTime: '2026-03-18 17:30:00',
        updateTime: '2026-04-14 11:50:00',
      },
    ],
  }
}

const globalForCustomerMock = globalThis as unknown as {
  __EASYBUILD_MOCK_CUSTOMER_DB__?: CustomerMockStore
}

export function getCustomerMockStore(): CustomerMockStore {
  if (!globalForCustomerMock.__EASYBUILD_MOCK_CUSTOMER_DB__) {
    globalForCustomerMock.__EASYBUILD_MOCK_CUSTOMER_DB__ = createInitialCustomerStore()
  }
  return globalForCustomerMock.__EASYBUILD_MOCK_CUSTOMER_DB__
}

export function nextCustomerMockId(): string {
  const store = getCustomerMockStore()
  store.seq += 1
  return String(store.seq)
}

