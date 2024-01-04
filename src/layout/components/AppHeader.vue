<!-- 
  名称：页面顶部
 -->
<script setup>
import Breadcrumb from './Breadcrumb.vue'
import UserCenter from './UserCenter.vue'
import PageTabs from './PageTabs.vue'
</script>

<template>
  <div class="app-header">
    <div class="top">
      <breadcrumb />
      <user-center />
    </div>
    <div class="bottom">
      <page-tabs />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  right: 0;
  left: var(--side-bar-width);
  height: var(--header-height);

  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 50px;
    border-top: 1px solid #f6f6f6;
  }
}
</style>
