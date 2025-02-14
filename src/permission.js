import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

import { getToken } from '@/utils/auth'

import { useUserStore } from './store/modules/user'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next('/')
    } else {
      const userStore = useUserStore()

      if (!userStore.userInfo) {
        await userStore.getUserInfo()
        next({ ...to, replace: true })
      } else {
        next()
        NProgress.done()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
