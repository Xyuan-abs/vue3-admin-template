<!-- 
  名称：侧边导航 - item
 -->
<script setup>
const props = defineProps({
  item: { type: Object, default: () => ({}) },
})

const targetRoute = computed(() => {
  const children = props.item.children?.filter((d) => d.hidden !== true)

  if (children) {
    if (children.length > 1) {
      return props.item
    } else {
      return children[0] || props.item
    }
  } else {
    return props.item
  }
})
</script>

<script>
export default defineComponent({
  name: 'SideBarItem',
})
</script>

<template>
  <view class="side-bar-item">
    <el-sub-menu v-if="targetRoute.children" :index="targetRoute.path">
      <template #title>
        <el-icon v-if="targetRoute.meta && targetRoute.meta.icon" :size="16">
          <component :is="targetRoute.meta.icon"></component>
        </el-icon>
        <span>{{ targetRoute.meta.title }} </span>
      </template>

      <side-bar-item v-for="(d, i) in targetRoute.children" :key="i" :item="d" />
    </el-sub-menu>
    <el-menu-item v-else :key="targetRoute.path" :index="targetRoute.path">
      <el-icon v-if="targetRoute.meta && targetRoute.meta.icon" :size="16">
        <component :is="targetRoute.meta.icon"></component>
      </el-icon>
      <span>{{ targetRoute.meta.title }} </span>
    </el-menu-item>
  </view>
</template>

<style lang="scss" scoped>
.side-bar-item {
}
</style>
