<!-- 
  名称：维修单 - 服务记录信息
 -->
<script setup>
import InsCard from '@/components/ins-card/index'
import InsForm from '@/components/ins-form/index'

import useAddressInfo from './composables/useAddressInfo'

const props = defineProps({
  isDetail: {
    type: Boolean,
    default: false,
  },
})

const { InsFormRef, dynamicForm, setData, getData, reset } = useAddressInfo(props)

defineExpose({
  setData,
  getData,
  reset,
})
</script>

<template>
  <ins-card class="address-info" title="地址信息">
    <ins-form ref="InsFormRef" :cols="3" :dynamic-form="dynamicForm" :label-width="95" />
  </ins-card>
</template>

<style lang="scss" scoped>
.address-info {
  :deep() {
  }
}
</style>
