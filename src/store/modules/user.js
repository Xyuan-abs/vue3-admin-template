/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import {
  getToken,
  setToken,
  removeToken,
  getUserInfo as getUserInfoCache,
  setUserInfo,
  removeUserInfo,
} from '@/utils/auth'

import { gp } from '@/plugins/index'

import { login, getUserInfo } from '@/api/user'
import { mock } from '@/api/mock'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    userInfo: getUserInfoCache(),
  }),
  getters: {
    username: (state) => state.userInfo?.name ?? '',
  },
  actions: {
    async login(params = {}) {
      const { account, password } = params
      // const res = await login({ account, password }).catch((e) => console.error(e))
      const res = await mock({ account, password }, { data: 'token' }).catch((e) =>
        console.error(e),
      )

      if (res?.success) {
        setToken(res.data)
        this.getUserInfo()
      } else {
        gp.$baseMessage({ message: res?.msg || '登录失败', type: 'error' })
      }
      return res
    },
    /* 获取用户信息 */
    async getUserInfo() {
      const res = await getUserInfo().catch((e) => console.error(e))
      if (res?.success) {
        this.userInfo = res.data
        setUserInfo(res.data)
      }
    },
    // user logout
    logout() {
      removeToken() // must remove  token  first
      location.reload()
      removeUserInfo('userInfo', {})
    },
  },
})
