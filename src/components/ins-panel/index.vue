<!-- 
  名称：panel
 -->
<script setup></script>

<template>
  <div class="ins-panel">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.ins-panel {
  padding: 24px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
