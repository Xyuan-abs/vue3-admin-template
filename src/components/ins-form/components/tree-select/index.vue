<!-- 
  名称：tree-select
 -->
<script setup>
/**
 *  element: 'tree-select',
 *  options: [],
 *  attrs: { remote: true },// el-tree-select 的属性
 *
 */
import { useVModel } from '@vueuse/core'
import useFetchData from '../../composables/useFetchData'

const props = defineProps({
  formItem: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
})

const { loading } = useFetchData(props.formItem)

const emit = defineEmits(['update:modelValue', 'change'])

/* 值的双向绑定 */
const modelValueVM = useVModel(props, 'modelValue', emit) // 值的双向绑定

function handleChange() {
  emit('change')
}
</script>

<template>
  <el-tree-select
    v-model="modelValueVM"
    class="ins-tree-select"
    clearable
    v-bind="$attrs"
    :data="formItem.options"
    @change="handleChange"
  />
</template>

<style lang="scss"></style>
