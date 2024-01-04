<!-- 
  名称：cascader
  版本：1.0.0 
  作者：Xyuan
  时间：2021年11月4日09:39:42
 -->
<script setup>
  /**
   *  element: 'cascader',
   *  options: [],
   *  componentProps: {
   *    api: function, // 接口函数
   *    params:{}, // 参数
   *    keywordsKey:'', // 远程搜索时 keyword 对应的属性名
   *    resultField:'',// 接口返回值 options 对应的 数组 在 res 的属性  多层用 . 拼接  如: 'res.data.list'
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

  // 远程搜索
  function handleRemote(keywords) {
    const { keywordsKey = 'keywords', params } = props.formItem.componentProps ?? {}
    if (keywords) {
      params[keywordsKey] = keywords
    }
  }
</script>

<template>
  <el-cascader
    v-model="modelValue"
    class="ins-cascader"
    clearable
    v-bind="$attrs"
    :loading="loading"
    :options="formItem.options"
    :remote="false"
    :remote-method="handleRemote"
    @change="handleChange"
  />
</template>

<style lang="scss"></style>
