<!-- 
  名称：上传、导入
 -->
<script setup>
import { Upload } from '@element-plus/icons-vue'

const $baseMessage = inject('$baseMessage')

const props = defineProps({
  name: { type: String, default: '导入' },
  api: { type: Function, required: true },
  onSuccess: { type: Function, default: null },
})

const emit = defineEmits(['success'])

const loading = ref(false)
const uploadRef = ref(null)

// 上传之前
const beforeUpload = () => {
  loading.value = true
}

// 成功
const handleSuccess = () => {
  loading.value = false
  $baseMessage({ message: `已${props.name}`, type: 'success' })
  emit('success')
}

// 失败
const handleError = (res) => {
  loading.value = false
  $baseMessage({ message: res?.msg || `${props.name}失败`, type: 'error' })
}

/**
 * 自定义文件上传
 */
async function uploadFile(options) {
  const { data, file, filename } = options

  // 参数
  const formData = new FormData()
  formData.append(filename, file)
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })

  const res = await props.api(formData).catch((e) => console.error(e))
  if (res?.success) {
    if (props.onSuccess) {
      try {
        props.onSuccess(res.data)
      } catch (e) {
        console.error(e)
      }
    }
    return Promise.resolve(res)
  } else {
    return Promise.reject(res)
  }
}
</script>

<template>
  <el-upload
    ref="uploadRef"
    :before-upload="beforeUpload"
    class="ins-upload"
    :http-request="uploadFile"
    :on-error="handleError"
    :on-success="handleSuccess"
    :show-file-list="false"
    v-bind="$attrs"
  >
    <el-button :disabled="$attrs.disabled" :icon="Upload" :loading="loading" type="primary">{{
      name
    }}</el-button>
  </el-upload>
</template>

<style lang="scss" scoped>
.ins-upload {
  display: inline-block;
}
</style>
