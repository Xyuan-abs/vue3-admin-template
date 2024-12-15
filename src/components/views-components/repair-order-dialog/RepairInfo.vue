<!-- 
  名称：维修单 - 维修信息
 -->
<script setup>
import InsCard from '@/components/ins-card/index'
import InsForm from '@/components/ins-form/index'

import PartList from '@/components/views-components/part-list/index'

import useRepairInfo from './composables/useRepairInfo'

const props = defineProps({
  isDetail: {
    type: Boolean,
    default: false,
  },
})

const { InsFormRef, dynamicForm, setData, getData, reset } = useRepairInfo(props)

defineExpose({
  setData,
  getData,
  reset,
})
</script>

<template>
  <ins-card class="repair-info" title="维修信息">
    <ins-form
      ref="InsFormRef"
      :dynamic-form="dynamicForm"
      :hide-required-asterisk="isDetail"
      :label-width="120"
    >
      <template #materials="{ formItem }">
        <part-list v-model="formItem.value" :is-detail="isDetail" v-bind="$attrs" />
      </template>
    </ins-form>
  </ins-card>
</template>

<style lang="scss" scoped>
.repair-info {
}
</style>
