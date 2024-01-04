import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element-plus 组件
import ElementPlus from 'element-plus'
import '@/styles/element-plus.scss'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// element-plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 自定义插件
import { setupPlugins } from '@/plugins/index'

import '@/styles/index.scss' // css样式
import './permission' //路由权限

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

setupPlugins(app)

app.use(ElementPlus, { zIndex: 3000, locale: zhCn })
app.use(router)
app.use(store)

app.mount('#app')
