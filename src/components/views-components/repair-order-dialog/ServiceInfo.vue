<!-- 
  名称：维修单 - 服务记录信息
 -->
<script setup>
import InsCard from '@/components/ins-card/index'
import InsForm from '@/components/ins-form/index'

import useServiceInfo from './composables/useServiceInfo'

const props = defineProps({
  isDetail: {
    type: Boolean,
    default: false,
  },
})

const { InsFormRef, dynamicForm, setData, getData, reset } = useServiceInfo(props)

defineExpose({
  setData,
  getData,
  reset,
})
</script>

<template>
  <ins-card class="service-info" title="服务记录信息">
    <ins-form ref="InsFormRef" :cols="3" :dynamic-form="dynamicForm" :label-width="95" />
  </ins-card>
</template>

<style lang="scss" scoped>
.service-info {
  :deep() {
  }
}
</style>
