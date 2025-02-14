<script setup>
import { mock } from '@/api/mock'
import useFetch from '@/hooks/useFetch'

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
})

const status = ref(0)

watch(
  () => props.modelValue,
  (newVal) => {
    status.value = newVal
    console.log('status.value ', status.value)
  },
  {
    immediate: true,
  },
)

const emit = defineEmits(['update:modelValue'])

const { isFetching: loading, executeFetch } = useFetch(() => mock(null, null, false), {
  name: '切换账号状态',
  onSuccess: (res) => {
    emit('update:modelValue', status.value)
  },
  onError: (e) => {
    status.value = status.value === 1 ? 0 : 1
  },
})

const onSwitchChange = () => {
  executeFetch()
}
</script>

<template>
  <el-switch
    v-model="status"
    active-text="启用"
    :active-value="0"
    inactive-text="禁用"
    :inactive-value="1"
    :loading="loading"
    @change="onSwitchChange()"
  />
</template>

<style></style>
