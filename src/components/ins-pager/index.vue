<!-- 
  名称：分页
 -->
<script setup>
import useSetAttrs from './composables/useSetAttrs.js'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  pagerParams: { type: Object, default: () => ({}), required: true },
})
const emit = defineEmits(['update:pagerParams', 'change'])

const { $attrs } = useSetAttrs() // attrs配置
const pagerParamsVM = useVModel(props, 'pagerParams', emit) // 值的双向绑定

/* 事件 */
const handleCurrentChange = () => {
  change()
}
const handleSizeChange = () => {
  pagerParamsVM.value.page = 1
  change()
}
const change = () => {
  emit('change')
}
</script>

<template>
  <div class="ins-pager">
    <el-pagination
      v-model:current-page="pagerParamsVM.page"
      v-model:page-size="pagerParamsVM.size"
      v-bind="$attrs"
      :total="pagerParamsVM.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.ins-pager {
}
</style>
