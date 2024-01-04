<!-- 
  名称：checkbox
  版本：1.0.0 
  作者：Xyuan
  时间：2021年11月4日09:39:42
 -->
<script setup>
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

  useFetchData(props.formItem)

  const emit = defineEmits(['update:modelValue', 'change'])

  /* 值的双向绑定 */
  const modelValue = useVModel(props, 'modelValue', emit) // 值的双向绑定

  function handleChange() {
    emit('change')
  }
</script>

<template>
  <el-checkbox-group v-model="modelValue" class="ins-checkbox" v-bind="$attrs" @change="handleChange">
    <el-checkbox v-for="option in formItem.options" :key="option.value" :label="option.value">
      {{ option.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<style lang="scss"></style>
