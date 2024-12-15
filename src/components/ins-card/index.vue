<!-- 
  名称：card
 -->
<script setup>
defineProps({
  title: { type: String, default: '' },
  showFooter: { type: Boolean, default: false },
})
</script>

<template>
  <el-card class="ins-card">
    <template #header>
      <div class="ins-card__header">
        <span>{{ title }}</span>
        <div class="opt">
          <slot name="opt"></slot>
        </div>
      </div>
    </template>

    <div class="ins-card__content">
      <slot></slot>
    </div>

    <template v-if="showFooter" #footer>
      <slot name="footer"></slot>
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.ins-card {
  &__header {
  }
  :deep(.el-card__header) {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>
