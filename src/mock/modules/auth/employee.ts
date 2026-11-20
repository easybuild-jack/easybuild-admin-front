import { API_URLS } from '@/config/api-url'
import type { MockRouteMap } from '@/mock/types'
import {
checkMockAuth,
mockError,
mockSuccess,
paginate,
parseIdList,
} from '@/mock/utils'
import { getAuthMockStore,nextMockId } from './data'

export const employeeRoutes: MockRouteMap = {
  [`GET ${API_URLS.employee.list}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const searchKeyword = (searchParams.get('searchKeyword') || '')
      .trim()
      .toLowerCase()
    const forbiddenFlagParam = searchParams.get('forbiddenFlag')
    const departmentId = searchParams.get('departmentId')
    const rolesParam = searchParams.get('roles')

    const store = getAuthMockStore()
    const filterRoleIds = parseIdList(rolesParam)

    const filtered = store.employees.filter((emp) => {
      if (searchKeyword) {
        const target = [
          emp.loginName,
          emp.employeeName,
          emp.employeeCode,
          emp.mobile,
          emp.email,
          emp.departmentName,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!target.includes(searchKeyword)) {
          return false
        }
      }

      if (forbiddenFlagParam !== null && forbiddenFlagParam !== '') {
        if (emp.forbiddenFlag !== Number(forbiddenFlagParam)) {
          return false
        }
      }

      if (departmentId && String(emp.departmentId || '') !== departmentId) {
        return false
      }

      if (filterRoleIds.length > 0) {
        const empRoleIds = parseIdList(emp.roles)
        const hasMatch = filterRoleIds.some((rid) => empRoleIds.includes(rid))
        if (!hasMatch) {
          return false
        }
      }

      return true
    })

    const { records, total } = paginate(filtered, page, limit)
    return mockSuccess(records, '查询成功', total)
  },

  [`POST ${API_URLS.employee.save}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const store = getAuthMockStore()

    // 兼容修改员工密码接口（仅传 employeeId 和 password）
    if (
      body?.employeeId &&
      body?.password &&
      !body?.loginName &&
      !body?.employeeName
    ) {
      const target = store.employees.find(
        (e) => String(e.employeeId) === String(body.employeeId)
      )
      if (!target) {
        return mockError('员工不存在')
      }
      return mockSuccess(null, '密码修改成功')
    }

    const {
      employeeId,
      loginName,
      employeeName,
      mobile = '',
      email = '',
      departmentId = '',
      departmentName = '',
      position = '',
      roles = '',
      rolesName,
      employeeCode = '',
    } = body || {}

    if (!loginName || !employeeName) {
      return mockError('登录名和姓名不能为空')
    }

    const resolvedRolesName =
      rolesName ||
      parseIdList(roles)
        .map((rid) => store.roles.find((r) => String(r.roleId) === rid)?.roleName)
        .filter(Boolean)
        .join(',')

    const resolvedDeptName =
      departmentName ||
      store.departments.find((d) => String(d.departmentId) === String(departmentId))
        ?.departmentName ||
      ''

    if (employeeId) {
      const existing = store.employees.find(
        (e) => String(e.employeeId) === String(employeeId)
      )
      if (!existing) {
        return mockError('员工不存在')
      }
      Object.assign(existing, {
        loginName,
        employeeName,
        mobile,
        email,
        departmentId,
        departmentName: resolvedDeptName,
        position,
        roles,
        rolesName: resolvedRolesName,
        employeeCode,
      })
      return mockSuccess(existing, '编辑成功')
    }

    const created = {
      employeeId: nextMockId(),
      loginName,
      employeeName,
      mobile,
      email,
      departmentId,
      departmentName: resolvedDeptName,
      position,
      roles,
      rolesName: resolvedRolesName,
      employeeCode,
      forbiddenFlag: 0,
    }
    store.employees.unshift(created)
    return mockSuccess(created, '新增成功')
  },

  [`POST ${API_URLS.employee.disable}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)
    const value = Number(body?.value)

    if (ids.length === 0 || (value !== 0 && value !== 1)) {
      return mockError('参数错误')
    }

    const store = getAuthMockStore()
    const idSet = new Set(ids)

    store.employees.forEach((emp) => {
      if (idSet.has(String(emp.employeeId))) {
        emp.forbiddenFlag = value
      }
    })

    return mockSuccess(null, value === 0 ? '启用成功' : '禁用成功')
  },

  [`POST ${API_URLS.employee.delete}`]: async (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    const body = await request.json()
    const ids = parseIdList(body?.ids)

    if (ids.length === 0) {
      return mockError('请选择要删除的员工')
    }

    const store = getAuthMockStore()
    const idSet = new Set(ids)
    store.employees = store.employees.filter(
      (emp) => !idSet.has(String(emp.employeeId))
    )

    return mockSuccess(null, '删除成功')
  },
}

