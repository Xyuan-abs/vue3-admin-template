<!-- 
  名称：上传、导入
 -->
<script setup>
  import { Upload } from '@element-plus/icons-vue'

  const $baseMessage = inject('$baseMessage')

  const props = defineProps({
    name: { type: String, default: '导入' },
  })

  const emit = defineEmits(['success'])

  const loading = ref(false)

  // 超出上限
  const handleExceed = (...arg) => {
    console.log('arg', arg)
  }

  // 上传之前
  const beforeUpload = (file) => {
    console.log('file', file)
    loading.value = true
  }

  // 成功
  const handleSuccess = () => {
    loading.value = false
    $baseMessage(`已${props.name}`, 'success')
    emit('success')
  }

  // 失败
  const handleError = (res) => {
    loading.value = false
    $baseMessage(res?.msg || `${props.name}失败`, 'error')
  }
</script>

<template>
  <el-upload
    ref="upload"
    :before-upload="beforeUpload"
    class="ins-upload"
    :limit="1"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :show-file-list="false"
    v-bind="$attrs"
  >
    <el-button :icon="Upload" :loading="loading" type="primary">{{ loading ? `${name}中` : name }}</el-button>
  </el-upload>
</template>

<style lang="scss" scoped>
  .ins-upload {
    display: inline-block;
  }
</style>
