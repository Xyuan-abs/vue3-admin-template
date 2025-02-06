<!-- 
  名称：文件上传
 -->
<script setup>
/**
 * componentProps:{
 *  api:()=>{}, //上传接口
 *  resultFields:'data.url', // 上传后的图片地址对应的key ,多个层级以 . 拼接
 *  baseUrl:process.env.VUE_APP_BASE_URL,图片地址前缀
 * }
 */

import { Plus } from '@element-plus/icons-vue'

const $baseMessage = inject('$baseMessage')

const props = defineProps({
  formItem: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

/**
 * 已上传的文件列表
 */
const fileList = ref([])

/**
 * 监听 modelValue 值变化
 */
watch(
  () => props.modelValue.length,
  (newValue) => {
    /* 数量不一致时（一般在初始化）更新 fileList，避免 直接对 fileList.value 赋值触发动画 */
    if (newValue !== fileList.value.length) {
      const { baseUrl = process.env.VUE_APP_BASE_URL } = props.formItem.componentProps ?? {}
      fileList.value = props.modelValue.map((d) => ({
        name: d,
        url:
          d.startsWith('http') || d.startsWith('blob')
            ? d
            : `${baseUrl}${d.startsWith('/') ? '' : '/'}${d} `,
      }))

      console.log(' fileList.value', fileList.value)
    }
  },
  {
    immediate: true,
  },
)

/**
 * 自定义文件上传
 */
async function uploadFile(options) {
  console.log('options', options)
  const { api, resultFields = 'data.url' } = props.formItem.componentProps
  if (!api) return new Error('componentProps.api 不能为空')

  const { data, file, filename } = options

  // 参数
  const formData = new FormData()
  formData.append(filename, file)
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })

  const res = await api(formData).catch((e) => console.error(e))
  if (res?.success) {
    // 获取地址
    const url = resultFields.split('.').reduce((prev, cur) => {
      return prev[cur]
    }, res)
    // const url = URL.createObjectURL(file)

    // 更新v-model
    const value = [...props.modelValue]
    value.push(url)
    emit('update:modelValue', value)

    return Promise.resolve(res)
  } else {
    $baseMessage({ message: res?.msg || '上传失败', type: 'error' })
    return Promise.reject(res)
  }
}

/**
 * 预览
 */
const previewImage = ref(false)
function handlePreview(file) {
  previewImage.value = file.url
}
function onClosePreview() {
  previewImage.value = ''
}

/**
 * 删除
 */

function handleDelete(file, fileList) {
  const { baseUrl = process.env.VUE_APP_BASE_URL } = props.formItem.componentProps ?? {}

  const list = fileList.map((d) => {
    return d.url.split(baseUrl)[1]
  })

  emit('update:modelValue', list)
}

onMounted(() => {})
</script>

<template>
  <div class="ins-file-list">
    <el-upload
      v-model:file-list="fileList"
      action
      class="file-list"
      :http-request="uploadFile"
      v-bind="$attrs"
      :on-preview="handlePreview"
      :on-remove="handleDelete"
    >
      <el-icon v-if="formItem.attrs && formItem.attrs['list-type'] === 'picture-card'"
        ><Plus
      /></el-icon>
      <el-button v-else text type="primary">点击上传</el-button>
    </el-upload>

    <el-image-viewer v-if="!!previewImage" :url-list="[previewImage]" @close="onClosePreview" />
  </div>
</template>

<style lang="scss" scoped>
.ins-file-list {
  width: 100%;
  .file-list {
    line-height: 1;
    :deep() {
      .el-upload-list.el-upload-list--picture-card {
        margin-top: -8px;

        .el-upload-list__item,
        .el-upload {
          margin-top: 8px;
          margin-bottom: 0;
        }
      }
      .el-icon--close-tip {
        display: none;
      }
    }
  }
}
</style>
