<!-- 
  名称：cascader
 -->
<script setup>
/**
 *  element: 'cascader',
 *  options: [],
 *  componentProps: {
 *    api: function, // 接口函数
 *    params:{}, // 参数
 *    keywordKey:'', // 远程搜索时 keyword 对应的属性名
 *    resultField:'',// 接口返回值 options 对应的 数组 在 res 的属性  多级用 . 拼接  如: 'data.list'
 *    labelKey:'', // options label 对应的属性名
 *    valueKey:'', // options value 对应的属性名
 *  },
 *  attrs: { remote: true },// el-cascader 的属性
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
const modelValue = useVModel(props, 'modelValue', emit) // 值的双向绑定

function handleChange() {
  emit('change')
}
</script>

<template>
  <el-cascader
    v-model="modelValue"
    class="ins-cascader"
    clearable
    v-bind="$attrs"
    :options="formItem.options"
    @change="handleChange"
  />
</template>

<style lang="scss"></style>
