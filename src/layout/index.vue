<!-- 
  名称：layout布局
  版本：1.0.0 
  作者：Xyuan
  时间：
 -->
<script setup>
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import SideBar from './components/side-bar/index.vue'
</script>

<template>
  <div class="app-wrapper">
    <side-bar></side-bar>
    <div class="main-container">
      <app-header class="app-header" />
      <app-main />
    </div>
  </div>
  <!-- 回到顶部按钮 -->
  <el-backtop>
    <div class="scroll-to-top">
      <i class="el-icon-caret-top"></i>
      <div>TOP</div>
    </div>
  </el-backtop>
</template>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .main-container {
    flex: 1;
    height: 100vh;
    padding-top: var(--header-height);
    padding-left: var(--side-bar-width);
    .app-main {
      height: calc(100vh - var(--header-height));
    }
  }
}
</style>
