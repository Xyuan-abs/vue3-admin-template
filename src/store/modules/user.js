/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import { getToken, setToken, removeToken } from '@/utils/auth'

import { mock } from '@/api/mock'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    userInfo: {},
  }),
  getters: {
    username: (state) => state.userInfo?.name ?? '',
  },
  actions: {
    async login(params) {
      const res = await mock(params, 'token').catch((e) => console.error(e))
      if (res?.success) {
        setToken(res.data)
      }
    },
    /* 获取用户信息 */
    async getUserInfo() {
      const mockData = {
        name: 'admin',
      }

      const res = await mock('', mockData).catch((e) => console.error(e))
      if (res?.success) {
        this.userInfo = res.data
      }
    },
    // user logout
    logout() {
      removeToken() // must remove  token  first
      this.userInfo = {}
      location.reload()
    },
  },
})
