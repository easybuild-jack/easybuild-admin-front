import type { Dict } from '@/types/dict'
import type { DictItem } from '@/types/dict-item'

interface SystemMockStore {
  dicts: Dict[]
  dictItems: DictItem[]
  seq: number
}

function createInitialSystemStore(): SystemMockStore {
  return {
    seq: 5000,
    dicts: [
      {
        dictId: '401',
        dictName: '订单状态',
        dictCode: 'ORDER_STATUS',
        dictDescribe: '订单流转各阶段状态定义',
        moduleName: '订单模块',
        forbiddenFlag: 0,
        insertTime: '2026-01-12 09:30:00',
        lastUpdateTime: '2026-04-02 10:15:00',
      },
      {
        dictId: '402',
        dictName: '支付方式',
        dictCode: 'PAY_CHANNEL',
        dictDescribe: '支持的在线及线下支付渠道',
        moduleName: '订单模块',
        forbiddenFlag: 0,
        insertTime: '2026-01-12 09:35:00',
        lastUpdateTime: '2026-04-05 14:00:00',
      },
      {
        dictId: '403',
        dictName: '退款原因',
        dictCode: 'REFUND_REASON',
        dictDescribe: '用户申请售后退款的可选原因',
        moduleName: '订单模块',
        forbiddenFlag: 0,
        insertTime: '2026-01-18 11:00:00',
        lastUpdateTime: '2026-04-06 16:20:00',
      },
      {
        dictId: '404',
        dictName: '商品计量单位',
        dictCode: 'GOODS_UNIT',
        dictDescribe: '商品销售与库存计量的标准单位',
        moduleName: '商品模块',
        forbiddenFlag: 0,
        insertTime: '2026-01-25 15:10:00',
        lastUpdateTime: '2026-04-10 09:45:00',
      },
      {
        dictId: '405',
        dictName: '货柜温区类型',
        dictCode: 'CONTAINER_TEMP_TYPE',
        dictDescribe: '智能货柜存储温区分类',
        moduleName: '存放模块',
        forbiddenFlag: 0,
        insertTime: '2026-02-05 10:00:00',
        lastUpdateTime: '2026-04-12 11:30:00',
      },
      {
        dictId: '406',
        dictName: '历史配送渠道',
        dictCode: 'LEGACY_DELIVERY',
        dictDescribe: '已停用的旧版配送方式字典',
        moduleName: '系统模块',
        forbiddenFlag: 1,
        insertTime: '2026-02-12 14:20:00',
        lastUpdateTime: '2026-04-14 18:10:00',
      },
    ],
    dictItems: [
      // 订单状态
      { dictItemId: '4001', dictId: '401', dictKey: 'PENDING_PAY', dictValue: '待支付', forbiddenFlag: 0 },
      { dictItemId: '4002', dictId: '401', dictKey: 'PAID', dictValue: '已支付', forbiddenFlag: 0 },
      { dictItemId: '4003', dictId: '401', dictKey: 'SHIPPED', dictValue: '已发货', forbiddenFlag: 0 },
      { dictItemId: '4004', dictId: '401', dictKey: 'COMPLETED', dictValue: '已完成', forbiddenFlag: 0 },
      { dictItemId: '4005', dictId: '401', dictKey: 'CANCELLED', dictValue: '已取消', forbiddenFlag: 0 },
      // 支付方式
      { dictItemId: '4006', dictId: '402', dictKey: 'WECHAT', dictValue: '微信支付', forbiddenFlag: 0 },
      { dictItemId: '4007', dictId: '402', dictKey: 'ALIPAY', dictValue: '支付宝', forbiddenFlag: 0 },
      { dictItemId: '4008', dictId: '402', dictKey: 'BALANCE', dictValue: '余额支付', forbiddenFlag: 0 },
      { dictItemId: '4009', dictId: '402', dictKey: 'CASH', dictValue: '现金支付', forbiddenFlag: 1 },
      // 退款原因
      { dictItemId: '4010', dictId: '403', dictKey: 'DAMAGED', dictValue: '商品破损', forbiddenFlag: 0 },
      { dictItemId: '4011', dictId: '403', dictKey: 'WRONG_ITEM', dictValue: '错发/漏发', forbiddenFlag: 0 },
      { dictItemId: '4012', dictId: '403', dictKey: 'NO_NEED', dictValue: '不想要了', forbiddenFlag: 0 },
      // 商品计量单位
      { dictItemId: '4013', dictId: '404', dictKey: 'PCS', dictValue: '件', forbiddenFlag: 0 },
      { dictItemId: '4014', dictId: '404', dictKey: 'BOX', dictValue: '箱', forbiddenFlag: 0 },
      { dictItemId: '4015', dictId: '404', dictKey: 'BOTTLE', dictValue: '瓶', forbiddenFlag: 0 },
      { dictItemId: '4016', dictId: '404', dictKey: 'KG', dictValue: '千克', forbiddenFlag: 0 },
      // 货柜温区类型
      { dictItemId: '4017', dictId: '405', dictKey: 'NORMAL', dictValue: '常温区', forbiddenFlag: 0 },
      { dictItemId: '4018', dictId: '405', dictKey: 'COLD', dictValue: '冷藏区(0~4℃)', forbiddenFlag: 0 },
      { dictItemId: '4019', dictId: '405', dictKey: 'FROZEN', dictValue: '冷冻区(-18℃)', forbiddenFlag: 0 },
      // 历史配送渠道
      { dictItemId: '4020', dictId: '406', dictKey: 'SELF_VAN', dictValue: '自营厢货', forbiddenFlag: 1 },
    ],
  }
}

const globalForSystemMock = globalThis as unknown as {
  __EASYBUILD_MOCK_SYSTEM_DB__?: SystemMockStore
}

export function getSystemMockStore(): SystemMockStore {
  if (!globalForSystemMock.__EASYBUILD_MOCK_SYSTEM_DB__) {
    globalForSystemMock.__EASYBUILD_MOCK_SYSTEM_DB__ = createInitialSystemStore()
  }
  return globalForSystemMock.__EASYBUILD_MOCK_SYSTEM_DB__
}

export function nextSystemMockId(): string {
  const store = getSystemMockStore()
  store.seq += 1
  return String(store.seq)
}

