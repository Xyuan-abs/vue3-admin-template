<!-- 
  名称：loading 按钮
 -->
<script setup>
import { isFunction } from '@/utils/validate'

const $baseMessage = inject('$baseMessage')

const props = defineProps({
  name: { type: String, default: '导出' },
  api: { type: Function, required: true },
  params: { type: [Object, Function], default: () => ({}) },
  onSuccess: { type: Function, default: null },
  onError: { type: Function, default: null },
  validate: { type: Function, default: null },
})

const loading = ref(false)

// 点击事件
const handleClick = async () => {
  // 检验
  if (props.validate && !(await props.validate())) {
    return
  }

  const _params = isFunction(props.params) ? props.params() : props.params
  console.log('_params', _params)

  loading.value = true
  const res = await props.api(_params).catch((e) => console.error(e))
  loading.value = false

  if (res?.success) {
    $baseMessage({ message: res?.msg || `已${props.name}`, type: 'success' })

    if (props.onSuccess) {
      props.onSuccess(res)
    }
  } else {
    props.onError && props.onError(res)
    $baseMessage({ message: res?.msg || `${props.name}失败`, type: 'error' })
  }
}
</script>

<template>
  <el-button :loading="loading" type="primary" v-bind="$attrs" @click="handleClick">
    {{ name }}
  </el-button>
</template>

<style lang="scss" scoped></style>
