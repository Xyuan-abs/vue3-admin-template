<!-- 
  名称：侧边导航
 -->
<script setup>
import Logo from '../Logo.vue'
import SideBarItem from './Item.vue'

import { asyncRoutes } from '@/router/index.js'

const router = useRouter()
const routes = useRoute()

const menuList = asyncRoutes

const activeMenu = computed(() => {
  const curRoute = routes.matched[routes.matched.length - 1]
  const { path, meta } = curRoute
  return meta.activePath || path
})

function handleSelect(path) {
  router.push({ path })
}
</script>

<template>
  <view class="side-bar">
    <logo class="logo" />
    <el-menu :default-active="activeMenu" @select="handleSelect">
      <side-bar-item v-for="(menu, i) in menuList" :key="'item' + i" :item="menu" />
    </el-menu>
  </view>
</template>

<style lang="scss" scoped>
.side-bar {
  position: fixed;
  width: var(--side-bar-width);
  height: 100vh;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0px 6px;
  background-color: #fff;

  .logo {
    margin-bottom: 6px;
  }

  :deep(.el-menu) {
    border-right: 0;

    .el-menu-item,
    .el-sub-menu {
      margin-top: 6px;
    }

    .el-sub-menu__title,
    .el-menu-item {
      font-size: 14px;
      color: #515a6e !important;
      background: #fff !important;
      height: 50px;
      overflow: hidden;
      line-height: 50px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      border-radius: 4px;
      &.is-active,
      &:hover {
        color: var(--el-color-primary) !important;
        background-color: var(--el-color-primary-light-9) !important;
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          content: '';
          background-color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
