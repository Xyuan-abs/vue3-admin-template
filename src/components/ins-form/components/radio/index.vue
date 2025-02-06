<!-- 
  名称：radio
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
    type: [String, Number],
    default: null,
  },
})

useFetchData(props.formItem)

const emit = defineEmits(['update:modelValue', 'change'])

/* 值的双向绑定 */
const modelValueVM = useVModel(props, 'modelValue', emit) // 值的双向绑定

function handleChange() {
  emit('change')
}
</script>

<template>
  <el-radio-group v-model="modelValueVM" class="ins-radio" v-bind="$attrs" @change="handleChange">
    <el-radio v-for="option in formItem.options" :key="option.value" :value="option.value">{{
      option.label
    }}</el-radio>
  </el-radio-group>
</template>

<style lang="scss"></style>
