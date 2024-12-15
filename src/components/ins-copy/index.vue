<!-- 
  名称：拷贝
 -->
<script setup>
import { clipboard } from '@/utils/clipboard'

const $baseMessage = inject('$baseMessage')

const props = defineProps({
  text: { type: String, default: '' },
})

const handleClipboard = async () => {
  const text = props.text

  const isSuccess = await clipboard(text)

  if (isSuccess) {
    $baseMessage({ message: '已复制到剪切板', type: 'success' })
  } else {
    $baseMessage({ message: '复制失败', type: 'error' })
  }
}
</script>

<template>
  <span class="ins-copy" @click="handleClipboard">
    <slot></slot>
  </span>
</template>

<style lang="scss">
.ins-copy {
  cursor: pointer;
}
</style>
