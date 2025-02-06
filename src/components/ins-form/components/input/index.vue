<!-- 
  名称：input
 -->
<script setup>
/**
 * componentProps:{
 *  isTrim:false, //移除前后空格
 * }
 */

import { debounce } from 'lodash'

const props = defineProps({
  formItem: {
    type: Object,
    default: () => ({}),
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

const emit = defineEmits(['update:modelValue', 'change'])

const inputValue = ref('')

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  },
  {
    immediate: true,
  },
)

const handleChange = debounce(() => {
  const isTrim = props.formItem.componentProps?.isTrim ?? false

  const value = isTrim ? inputValue.value.trim() : inputValue.value

  inputValue.value = value
  emit('update:modelValue', value)
  emit('change')
}, 0)

onMounted(() => {})
</script>

<template>
  <div class="ins-input">
    <el-input
      v-if="props.formItem.componentProps && props.formItem.componentProps.isTrim"
      v-model.trim="inputValue"
      :autosize="{ minRows: 4, maxRows: 6 }"
      type="text"
      v-bind="$attrs"
      @input="handleChange"
    >
      <template v-if="formItem.attrs?.suffix" #suffix>
        {{ formItem.attrs.suffix }}
      </template>
    </el-input>

    <el-input
      v-else
      v-model="inputValue"
      :autosize="{ minRows: 4, maxRows: 6 }"
      type="text"
      v-bind="$attrs"
      @input="handleChange"
    >
      <template v-if="formItem.attrs?.suffix" #suffix>
        {{ formItem.attrs.suffix }}
      </template>
    </el-input>
  </div>
</template>

<style lang="scss" scoped>
.ins-input {
  width: 100%;
  :deep(.el-input) {
    .el-input__suffix {
      margin-left: 10px;
    }
  }
}
</style>
