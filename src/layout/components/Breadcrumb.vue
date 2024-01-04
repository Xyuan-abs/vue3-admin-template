<!-- 
  名称：面包屑
 -->
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'

const routes = useRoute()

const breadcrumbList = computed(() => {
  console.log('routes.matched', routes.matched)

  const list = routes.matched
    .filter((d, i) => {
      if (routes.matched[i + 1]?.path === d.path) {
        return false
      } else {
        return true
      }
    })
    .map((d) => ({
      title: d.meta?.title,
      path: d.path,
      icon: d.meta?.icon,
    }))

  return list
})
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(d, i) in breadcrumbList" :key="i" :to="{ path: d.path }">
      <el-icon v-if="d.icon" :size="14">
        <component :is="d.icon"></component>
      </el-icon>
      <span class="el-breadcrumb__text">
        {{ d.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
:deep() {
  .el-breadcrumb {
    &__inner {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &.is-link {
        font-weight: 400 !important;
      }
    }
    &__item:last-child {
      opacity: 0.7;
    }
    &__text {
      margin-left: 5px;
    }
  }
}
</style>
