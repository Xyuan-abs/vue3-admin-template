import { createRouter, createWebHashHistory } from 'vue-router'
// 还有 createWebHistory  和 createMemoryHistory

/* Layout */
import Layout from '@/layout/index.vue'

/**
 * 固定路由
 *  所有的用户都可以访问
 */
export const staticRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true,
  },
]

export const asyncRoutes = []

/**
 * 动态路由
 *  登录后彩灯访问的路由
 */
export const adminUserRoutes = formatterRoutes([
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/example',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/example/index.vue'),
        meta: {
          title: '示例',
          icon: 'Menu',
        },
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'Tools',
    },
    children: [
      {
        path: 'userRole',
        name: 'UserRole',
        component: () => import('@/views/user/roleManagement/index.vue'),
        meta: {
          title: '角色管理',
        },
      },
      {
        path: 'userMenu',
        name: 'UserMenu',
        component: () => import('@/views/user/menuManagement/index.vue'),
        meta: {
          title: '菜单管理',
        },
      },
      {
        path: 'userAccount',
        name: 'UserAccount',
        component: () => import('@/views/user/accountManagement/index.vue'),
        meta: {
          title: '账号管理',
        },
      },
    ],
  },
])

export const normalUserRoutes = formatterRoutes([
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
    ],
  },
])

// 格式化 菜单路由
function formatterRoutes(routes, prePath = '') {
  return routes.map((route) => {
    route.path = prePath ? `${prePath}${route.path ? '/' + route.path : route.path}` : route.path
    if (route.children) {
      route.children = formatterRoutes(route.children, route.path)

      // 当子路由存在 与 当前路由 路径相同时（即 子路由 path:''）,同步当前路由的名称和图标
      const root = route.children.find((d) => d.path === route.path)
      if (root) {
        route.meta = { ...(route.meta ?? {}), ...{ title: root.meta.title, icon: root.meta.icon } }
      }
    }
    return route
  })
}

/**
 * 结尾路由
 */
export const endRoutes = [
  // 没有匹配地址，跳转到 404，要放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/404',
    hidden: true,
  },
]

const routes = [...staticRoutes]

function addRouter(routes) {
  routes.forEach((route) => {
    if (!router.hasRoute(route.name)) router.addRoute(route)
    if (route.children) addRouter(route.children)
  })
}

export function setRouter(routes) {
  addRouter(routes)
}

export function resetRouter() {
  const index = localStorage.getItem('index') ?? 1
  localStorage.setItem('index', +index + 1)
  // const newRouter = createRouter({
  //   history: createWebHashHistory(),
  //   routes: routes, // 初始路由配置（仅保留需要的路由）
  // })
  // router.matcher = newRouter.matcher // 替换当前路由实例的匹配器
}

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({
    top: 0,
  }),
  routes,
})

export default router
