<!-- 
  名称：带单位的input-number
 -->
<script setup>
import { useVModel } from '@vueuse/core'

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
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

/* 值的双向绑定 */
const modelValueVM = useVModel(props, 'modelValue', emit) // 值的双向绑定

const handleChange = () => {
  emit('change')
}

onMounted(() => {})
</script>

<template>
  <div class="input-password">
    <el-input
      v-model="modelValueVM"
      v-bind="$attrs"
      autocomplete="new-password"
      :show-password="true"
      :type="'password'"
      @input="handleChange(formItem, index)"
    />
  </div>
</template>

<style lang="scss">
.input-password {
  width: 100%;
}
</style>
