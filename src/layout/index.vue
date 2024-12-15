<!-- 
  名称：layout布局
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
      <div class="app-main">
        <app-main />
      </div>
      <p class="copyright">Copyright &copy; {{ new Date().getFullYear() }} Vue Admin Template</p>
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
$copyrightHeight: 48px;
.app-wrapper {
  .main-container {
    width: 100%;
    height: 100vh;
    padding-top: var(--header-height);
    padding-left: var(--side-bar-width);

    .app-main {
      min-height: calc(100vh - var(--header-height) - #{$copyrightHeight});
      padding: 24px;
    }
    .copyright {
      height: $copyrightHeight;
      line-height: $copyrightHeight;
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
