<!-- 
  名称：checkbox
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
    type: Array,
    default: () => [],
  },
  hasCheckAll: {
    type: Boolean,
    default: false,
  },
})

useFetchData(props.formItem)

const emit = defineEmits(['update:modelValue', 'change'])

/* 值的双向绑定 */
const checkboxValue = useVModel(props, 'modelValue', emit) // 值的双向绑定

const checkAll = computed(() => {
  if (props.formItem.options.length === 0) return false
  return checkboxValue.value.length === props.formItem.options.length
})

const isIndeterminate = computed(() => {
  return (
    checkboxValue.value.length > 0 && checkboxValue.value.length < props.formItem.options.length
  )
})

function handleCheckAllChange(val) {
  checkboxValue.value = val ? props.formItem.options.map((item) => item.value) : []
  emit('change')
}

function handleChange() {
  emit('change')
}
</script>

<template>
  <el-checkbox
    v-if="hasCheckAll"
    :model-value="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </el-checkbox>
  <el-checkbox-group
    v-model="checkboxValue"
    class="ins-checkbox"
    v-bind="$attrs"
    @change="handleChange"
  >
    <el-checkbox
      v-for="option in formItem.options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </el-checkbox-group>
</template>

<style lang="scss"></style>
