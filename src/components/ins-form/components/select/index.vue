<!-- 
  名称：select
 -->
<script setup>
/**
 *  element: 'select',
 *  options: [],
 *  componentProps: {
 *    api: function, // 接口函数
 *    params:{}, // 参数
 *    keywordKey:'', // 远程搜索时 keyword 对应的属性名
 *    resultField:'',// 接口返回值 options 对应的 数组 在 res 的属性  多层用 . 拼接  如: 'res.data.list'
 *    labelKey:'', // options label 对应的属性名
 *    valueKey:'', // options value 对应的属性名
 *    subLabelKey:'', // options subLabelKey 对应的属性名
 *  },
 *  attrs: { remote: true },// el-cascader 的属性
 *
 */
import { debounce } from 'lodash'

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

// 远程搜索
const handleRemote = debounce((keyword) => {
  const { keywordKey = 'keyword', params } = props.formItem.componentProps ?? {}
  if (keyword) {
    params[keywordKey] = keyword
  }
}, 200)
</script>

<template>
  <el-select
    v-model="modelValue"
    class="ins-select"
    clearable
    filterable
    :loading="loading"
    :remote="false"
    :remote-method="handleRemote"
    remote-show-suffix
    v-bind="$attrs"
    @change="handleChange"
  >
    <el-option
      v-for="option in formItem.options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    >
      <span style="float: left">{{ option.label }}</span>
      <span
        v-if="formItem.componentProps && formItem.componentProps.subLabelKey"
        style="float: right; font-size: 13px; color: var(--el-text-color-secondary)"
      >
        {{ option[formItem.componentProps.subLabelKey] }}
      </span>
    </el-option>
  </el-select>
</template>

<style lang="scss"></style>
