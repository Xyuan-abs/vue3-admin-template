<!-- 
  名称：详情页面
 -->
<script setup>
import { handleActivePath } from '@/utils/routes'
import { useTabsStore } from '@/store/modules/tabs'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  title: {
    type: String,
    default: '详情页',
  },
  backUrl: {
    type: String,
    default: '/',
  },
})

/* 返回上一级 */
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore

const goBack = async () => {
  const detailPath = await handleActivePath(route, true)
  await router.push(props.backUrl)
  await delVisitedRoute(detailPath)
}

onMounted(() => {})

defineExpose({
  goBack,
})
</script>

<template>
  <div class="ins-detail-page-container">
    <el-page-header :content="title" @back="goBack" />

    <slot></slot>
  </div>
</template>

<style lang="scss">
.ins-detail-page-container {
}
</style>
