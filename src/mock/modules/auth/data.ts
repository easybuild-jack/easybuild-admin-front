import crypto from 'crypto'
import type { MenuResource } from '@/config/routes'
import type { TokenContent } from '@/types/token'
import type { Department } from '@/types/department'
import type { Role } from '@/types/role'
import type { Employee } from '@/types/employee'

export const MOCK_ACCOUNT = {
  loginAccount: 'admin',
  passwordPlain: '12345',
  userInfo: {
    cachedKey: 'mock-admin-session',
    code: 'admin',
    name: '超级管理员',
    type: 'account',
    userId: '1',
  } satisfies TokenContent,
}

export function md5(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex')
}

export function generateMockJwt(content: TokenContent): string {
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    'utf8'
  ).toString('base64url')

  const payload = Buffer.from(
    JSON.stringify({
      content: JSON.stringify(content),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    }),
    'utf8'
  ).toString('base64url')

  const signature = Buffer.from('mock-signature', 'utf8').toString('base64url')
  return `${header}.${payload}.${signature}`
}

export const MOCK_MENUS: MenuResource[] = [
  {
    resourceId: 'baseSetting',
    name: 'baseSetting',
    title: '基础设置',
    path: '/base',
    sort: 1,
    children: [
      {
        resourceId: 'categoryManage',
        name: 'categoryManage',
        title: '分类管理',
        path: '/base/category',
        sort: 1,
      },
      {
        resourceId: 'brandManage',
        name: 'brandManage',
        title: '品牌管理',
        path: '/base/brand',
        sort: 2,
      },
      {
        resourceId: 'groupManage',
        name: 'groupManage',
        title: '分组管理',
        path: '/base/group',
        sort: 3,
      },
      {
        resourceId: 'tagManage',
        name: 'tagManage',
        title: '标签管理',
        path: '/base/tag',
        sort: 4,
      },
    ],
  },
  {
    resourceId: 'operationSetting',
    name: 'operationSetting',
    title: '运营管理',
    path: '/operation',
    sort: 2,
    children: [
      {
        resourceId: 'bannerManage',
        name: 'bannerManage',
        title: 'Banner管理',
        path: '/operation/banner',
        sort: 1,
      },
    ],
  },
  {
    resourceId: 'customerManage',
    name: 'customerManage',
    title: '会员管理',
    path: '/customer',
    sort: 3,
    children: [
      {
        resourceId: 'userInfoManage',
        name: 'userInfoManage',
        title: '用户管理',
        path: '/customer/user',
        sort: 1,
      },
    ],
  },
  {
    resourceId: 'authManage',
    name: 'authManage',
    title: '权限管理',
    path: '/auth',
    sort: 4,
    children: [
      {
        resourceId: 'departmentManage',
        name: 'departmentManage',
        title: '部门管理',
        path: '/auth/department',
        sort: 1,
      },
      {
        resourceId: 'roleManage',
        name: 'roleManage',
        title: '角色管理',
        path: '/auth/role',
        sort: 2,
      },
      {
        resourceId: 'employeeManage',
        name: 'employeeManage',
        title: '员工管理',
        path: '/auth/employee',
        sort: 3,
      },
    ],
  },
  {
    resourceId: 'dictManage',
    name: 'systemSetting',
    title: '系统设置',
    path: '/system',
    sort: 5,
    children: [
      {
        resourceId: 'dictManage',
        name: 'dictManage',
        title: '字典管理',
        path: '/system/dict',
        sort: 1,
      },
    ],
  },
]

export interface RoleResourceNode {
  id: string
  name: string
  checked?: boolean
  children?: RoleResourceNode[]
}

interface AuthMockStore {
  departments: Department[]
  roles: Role[]
  rolePermissions: Record<string, string[]>
  employees: Employee[]
  seq: number
}

const DEFAULT_ACTIONS = [
  { key: 'view', name: '查看' },
  { key: 'add', name: '新增' },
  { key: 'edit', name: '编辑' },
  { key: 'delete', name: '删除' },
  { key: 'disable', name: '启用/禁用' },
]

function buildBaseResourceTree(): RoleResourceNode[] {
  return MOCK_MENUS.map((menu) => ({
    id: menu.resourceId,
    name: menu.title,
    children: (menu.children || []).map((child) => ({
      id: child.resourceId,
      name: child.title,
      children: DEFAULT_ACTIONS.map((action) => ({
        id: `${child.resourceId}:${action.key}`,
        name: action.name,
      })),
    })),
  }))
}

function collectAllResourceIds(nodes: RoleResourceNode[]): string[] {
  const ids: string[] = []
  for (const node of nodes) {
    ids.push(node.id)
    if (node.children) {
      ids.push(...collectAllResourceIds(node.children))
    }
  }
  return ids
}

function createInitialStore(): AuthMockStore {
  const baseTree = buildBaseResourceTree()
  const allResourceIds = collectAllResourceIds(baseTree)

  return {
    seq: 1000,
    departments: [
      {
        departmentId: '101',
        departmentName: '总经办',
        forbiddenFlag: 0,
        type: 'INNER',
        insertTime: '2026-01-10 09:00:00',
        lastUpdateTime: '2026-03-15 14:20:00',
      },
      {
        departmentId: '102',
        departmentName: '技术研发部',
        forbiddenFlag: 0,
        type: 'INNER',
        insertTime: '2026-01-10 09:05:00',
        lastUpdateTime: '2026-03-18 11:30:00',
      },
      {
        departmentId: '103',
        departmentName: '产品设计部',
        forbiddenFlag: 0,
        type: 'INNER',
        insertTime: '2026-01-12 10:15:00',
        lastUpdateTime: '2026-03-20 16:45:00',
      },
      {
        departmentId: '104',
        departmentName: '运营推广部',
        forbiddenFlag: 0,
        type: 'INNER',
        insertTime: '2026-01-15 14:00:00',
        lastUpdateTime: '2026-04-02 09:10:00',
      },
      {
        departmentId: '105',
        departmentName: '仓储物流部',
        forbiddenFlag: 0,
        type: 'INNER',
        insertTime: '2026-02-01 08:30:00',
        lastUpdateTime: '2026-04-08 17:00:00',
      },
      {
        departmentId: '106',
        departmentName: '客户服务部',
        forbiddenFlag: 1,
        type: 'INNER',
        insertTime: '2026-02-10 11:20:00',
        lastUpdateTime: '2026-04-12 15:10:00',
      },
    ],
    roles: [
      {
        roleId: '201',
        roleName: '超级管理员',
        forbiddenFlag: 0,
        remark: '拥有系统全部模块及操作权限',
        supperStatus: 1,
        type: 'SYSTEM',
        insertTime: '2026-01-10 09:00:00',
        lastUpdateTime: '2026-04-01 10:00:00',
      },
      {
        roleId: '202',
        roleName: '运营经理',
        forbiddenFlag: 0,
        remark: '负责商品、Banner、订单与会员运营管理',
        supperStatus: 0,
        type: 'CUSTOM',
        insertTime: '2026-01-18 10:30:00',
        lastUpdateTime: '2026-04-05 14:15:00',
      },
      {
        roleId: '203',
        roleName: '仓储管理员',
        forbiddenFlag: 0,
        remark: '负责货柜与商品库存管理',
        supperStatus: 0,
        type: 'CUSTOM',
        insertTime: '2026-02-02 09:40:00',
        lastUpdateTime: '2026-04-09 16:20:00',
      },
      {
        roleId: '204',
        roleName: '客服专员',
        forbiddenFlag: 0,
        remark: '负责订单查询、退款处理及客户维护',
        supperStatus: 0,
        type: 'CUSTOM',
        insertTime: '2026-02-15 13:25:00',
        lastUpdateTime: '2026-04-11 11:05:00',
      },
      {
        roleId: '205',
        roleName: '审计只读角色',
        forbiddenFlag: 1,
        remark: '仅支持数据查看与审计导出',
        supperStatus: 0,
        type: 'CUSTOM',
        insertTime: '2026-03-01 15:00:00',
        lastUpdateTime: '2026-04-15 18:00:00',
      },
    ],
    rolePermissions: {
      '201': allResourceIds,
      '202': [
        'operationSetting',
        'bannerManage',
        'bannerManage:view',
        'bannerManage:add',
        'bannerManage:edit',
        'baseSetting',
        'categoryManage',
        'categoryManage:view',
        'brandManage',
        'brandManage:view',
      ],
      '203': [
        'baseSetting',
        'categoryManage',
        'categoryManage:view',
        'groupManage',
        'groupManage:view',
      ],
      '204': [
        'customerManage',
        'userInfoManage',
        'userInfoManage:view',
        'userInfoManage:edit',
      ],
      '205': ['baseSetting', 'brandManage', 'brandManage:view'],
    },
    employees: [
      {
        employeeId: '301',
        loginName: 'admin',
        employeeName: '超级管理员',
        employeeCode: 'EB0001',
        mobile: '13800138000',
        email: 'admin@easybuild.com',
        departmentId: '101',
        departmentName: '总经办',
        position: '系统管理员',
        roles: '201',
        rolesName: '超级管理员',
        forbiddenFlag: 0,
      },
      {
        employeeId: '302',
        loginName: 'zhangsan',
        employeeName: '张三',
        employeeCode: 'EB0002',
        mobile: '13912345678',
        email: 'zhangsan@easybuild.com',
        departmentId: '102',
        departmentName: '技术研发部',
        position: '前端架构师',
        roles: '201,202',
        rolesName: '超级管理员,运营经理',
        forbiddenFlag: 0,
      },
      {
        employeeId: '303',
        loginName: 'lisi',
        employeeName: '李四',
        employeeCode: 'EB0003',
        mobile: '13723456789',
        email: 'lisi@easybuild.com',
        departmentId: '104',
        departmentName: '运营推广部',
        position: '高级运营经理',
        roles: '202',
        rolesName: '运营经理',
        forbiddenFlag: 0,
      },
      {
        employeeId: '304',
        loginName: 'wangwu',
        employeeName: '王五',
        employeeCode: 'EB0004',
        mobile: '13634567890',
        email: 'wangwu@easybuild.com',
        departmentId: '105',
        departmentName: '仓储物流部',
        position: '仓储主管',
        roles: '203',
        rolesName: '仓储管理员',
        forbiddenFlag: 0,
      },
      {
        employeeId: '305',
        loginName: 'zhaoliu',
        employeeName: '赵六',
        employeeCode: 'EB0005',
        mobile: '13545678901',
        email: 'zhaoliu@easybuild.com',
        departmentId: '106',
        departmentName: '客户服务部',
        position: '客服组长',
        roles: '204',
        rolesName: '客服专员',
        forbiddenFlag: 1,
      },
      {
        employeeId: '306',
        loginName: 'chenqi',
        employeeName: '陈七',
        employeeCode: 'EB0006',
        mobile: '13356789012',
        email: 'chenqi@easybuild.com',
        departmentId: '103',
        departmentName: '产品设计部',
        position: '产品经理',
        roles: '202,204',
        rolesName: '运营经理,客服专员',
        forbiddenFlag: 0,
      },
    ],
  }
}

const globalForMock = globalThis as unknown as {
  __EASYBUILD_MOCK_AUTH_DB__?: AuthMockStore
}

export function getAuthMockStore(): AuthMockStore {
  if (!globalForMock.__EASYBUILD_MOCK_AUTH_DB__) {
    globalForMock.__EASYBUILD_MOCK_AUTH_DB__ = createInitialStore()
  }
  return globalForMock.__EASYBUILD_MOCK_AUTH_DB__
}

export function nextMockId(prefix = ''): string {
  const store = getAuthMockStore()
  store.seq += 1
  return `${prefix}${store.seq}`
}

export function getRoleResourceTree(roleId: string): RoleResourceNode[] {
  const store = getAuthMockStore()
  const checkedSet = new Set(store.rolePermissions[roleId] || [])
  const baseTree = buildBaseResourceTree()

  const applyChecked = (nodes: RoleResourceNode[]): RoleResourceNode[] =>
    nodes.map((node) => ({
      ...node,
      checked: checkedSet.has(node.id),
      ...(node.children ? { children: applyChecked(node.children) } : {}),
    }))

  return applyChecked(baseTree)
}

