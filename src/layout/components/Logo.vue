<!-- 
  名称：logo
 -->
<script setup>
import systemConfig from '@/config/system.js'
</script>

<template>
  <div class="logo">{{ systemConfig.title }}</div>
</template>

<style lang="scss" scoped>
.logo {
  width: var(--side-bar-width);
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  color: var(--primary-color);
  font-weight: bold;
}
</style>
