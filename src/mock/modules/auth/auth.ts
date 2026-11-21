import { API_URLS } from '@/config/api-url'
import type { MockRouteMap } from '@/mock/types'
import { checkMockAuth,mockError,mockSuccess } from '@/mock/utils'
import { MOCK_ACCOUNT,MOCK_MENUS,generateMockJwt,md5 } from './data'

export const authRoutes: MockRouteMap = {
  [`POST ${API_URLS.auth.login}`]: async (request) => {
    try {
      const body = await request.json()
      const { loginAccount, password } = body || {}

      const expectedMd5 = md5(MOCK_ACCOUNT.passwordPlain)
      const isAccountValid = loginAccount === MOCK_ACCOUNT.loginAccount
      const isPasswordValid =
        password === expectedMd5 || password === MOCK_ACCOUNT.passwordPlain

      if (!isAccountValid || !isPasswordValid) {
        return mockError('账号或密码错误（测试账号：admin / 12345）')
      }

      const accessToken = generateMockJwt(MOCK_ACCOUNT.userInfo)
      return mockSuccess({ accessToken }, '登录成功')
    } catch {
      return mockError('请求参数格式错误')
    }
  },

  [`GET ${API_URLS.auth.logout}`]: () => {
    return mockSuccess(null, '退出成功')
  },

  [`POST ${API_URLS.auth.resetPwd}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    return mockSuccess(null, '密码修改成功')
  },

  [`GET ${API_URLS.auth.resources}`]: (request) => {
    const authError = checkMockAuth(request)
    if (authError) return authError

    return mockSuccess(MOCK_MENUS, '获取菜单成功')
  },
}

