<!-- 
  名称：input
  版本：1.0.0 
  作者：Xyuan
  时间：2021年11月4日09:39:42
 -->
<script setup>
  import { useVModel } from '@vueuse/core'

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

  /* 值的双向绑定 */
  const modelValue = useVModel(props, 'modelValue', emit) // 值的双向绑定

  const handleChange = debounce(() => {
    emit('change')
  }, 200)

  onMounted(() => {})
</script>

<template>
  <div class="ins-input">
    <el-input v-model="modelValue" type="text" v-bind="$attrs" @input="handleChange">
      <template #suffix v-if="formItem.attrs?.suffix || formItem.attrs?.unit">
        {{ formItem.attrs.suffix || formItem.attrs?.unit }}
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
