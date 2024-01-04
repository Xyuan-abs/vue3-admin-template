<!-- 
  名称：tree-select
  版本：1.0.0 
  作者：Xyuan
  时间：2021年11月4日09:39:42
 -->
<script setup>
  /**
   *  element: 'tree-select',
   *  options: [],
   *  attrs: { remote: true },// el-tree-select 的属性
   *
   */
  import { useVModel } from '@vueuse/core'

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

  const emit = defineEmits(['update:modelValue', 'change'])

  /* 值的双向绑定 */
  const modelValue = useVModel(props, 'modelValue', emit) // 值的双向绑定

  function handleChange() {
    emit('change')
  }
</script>

<template>
  <el-tree-select
    v-model="modelValue"
    class="ins-tree-select"
    clearable
    v-bind="$attrs"
    :data="formItem.options"
    @change="handleChange"
  />
</template>

<style lang="scss"></style>
