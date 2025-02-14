/**
 */

import {
  adminUserRoutes,
  normalUserRoutes,
  endRoutes,
  setRouter,
  resetRouter,
} from '@/router/index'

export const useRouterStore = defineStore('router', {
  state: () => ({
    routes: localStorage.getItem('routes') ? JSON.parse(localStorage.getItem('routes')) : [],
  }),
  getters: {},
  actions: {
    async setRoutes(role) {
      const routes = role === 'admin' ? adminUserRoutes : normalUserRoutes
      setRouter([...routes, ...endRoutes])
      this.routes = routes
      localStorage.setItem('routes', JSON.stringify(routes))
    },
    async resetRoutes() {
      resetRouter()
      this.routes = []
      localStorage.removeItem('routes')
    },
  },
})
