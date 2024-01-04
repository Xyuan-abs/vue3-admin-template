<!-- 
  名称：拷贝
  版本：1.0.0 
  作者：Xyuan
  时间：2023年2月24日09:48:43
 -->
<script setup>
import { clipboard } from '@/utils/clipboard.js'

const $baseMessage = inject('$baseMessage')

const props = defineProps({
  text: { type: String, default: '' },
})

const handleClipboard = async () => {
  const text = props.text

  const isSuccess = await clipboard(text)

  if (isSuccess) {
    $baseMessage('已复制到剪切板', 'success')
  } else {
    $baseMessage('复制失败', 'error')
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
