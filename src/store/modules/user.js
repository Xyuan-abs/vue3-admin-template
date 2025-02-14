/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import { getToken, setToken, removeToken } from '@/utils/auth'

import { gp } from '@/plugins/index'

import { login, getUserInfo } from '@/api/user'
import { mock } from '@/api/mock'

import { useRouterStore } from './router'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    userInfo: null,
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
        await this.getUserInfo()
      } else {
        gp.$baseMessage({ message: res?.msg || '登录失败', type: 'error' })
      }
      return res
    },
    /* 获取用户信息 */
    async getUserInfo() {
      // const res = await getUserInfo().catch((e) => console.error(e))
      const res = await mock(
        {},
        { role: localStorage.getItem('index') % 2 === 0 ? 'admin' : 'editor' },
      )
      if (res?.success) {
        this.userInfo = res.data
        const routerStore = useRouterStore()
        routerStore.setRoutes(res.data.role)
      }
    },
    // user logout
    logout() {
      removeToken() // must remove  token  first
      location.reload()

      const routerStore = useRouterStore()
      routerStore.resetRoutes()
    },
  },
})
