<!-- 
  名称：单文件上传
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
    type: String,
    default: '',
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
  () => props.modelValue,
  (newValue) => {
    const { baseUrl = import.meta.env.VUE_APP_BASE_URL } = props.formItem.componentProps ?? {}
    const list = newValue
      ? [
          {
            name: newValue,
            url:
              newValue.startsWith('http') || newValue.startsWith('blob')
                ? newValue
                : `${baseUrl}${newValue.startsWith('/') ? '' : '/'}${newValue} `,
          },
        ]
      : []

    fileList.value = list
  },
  {
    immediate: true,
  }
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
    emit('update:modelValue', url)

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
function handlePreview() {
  previewImage.value = props.modelValue
}
function onClosePreview() {
  previewImage.value = ''
}

/**
 * 删除
 */

function handleDelete(file, fileList) {
  emit('update:modelValue', '')
}

onMounted(() => {})
</script>

<template>
  <div class="ins-single-img-upload">
    <el-upload
      v-model:file-list="fileList"
      action
      class="upload"
      :http-request="uploadFile"
      v-bind="$attrs"
      :show-file-list="false"
      :on-preview="handlePreview"
      :on-remove="handleDelete"
    >
      <data v-if="modelValue" class="thumbnail">
        <img :src="modelValue" class="thumbnail-image" />
        <div class="opt">
          <el-icon class="icon" @click.stop="handlePreview()"><View /></el-icon>
          <el-icon class="icon" @click.stop="handleDelete()">
            <Delete />
          </el-icon>
        </div>
      </data>
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <el-image-viewer v-if="!!previewImage" :url-list="[previewImage]" @close="onClosePreview" />
  </div>
</template>

<style lang="scss" scoped>
.ins-single-img-upload {
  width: 120px;
  height: 120px;
  .upload {
    width: 100%;
    height: 100%;
    line-height: 1;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    :deep() {
      .el-upload {
        width: 100%;
        height: 100%;

        &:hover {
          border-color: var(--el-color-primary);
        }
      }
    }

    .el-icon.avatar-uploader-icon {
      font-size: 24px;
      color: #8c939d;
      width: 100%;
      height: 100%;
      text-align: center;
    }

    .thumbnail {
      width: 100%;
      padding-bottom: 100%;
      &-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: scale-down;
      }
      .opt {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;

        .el-icon {
          color: #fff;
          font-size: 20px;
          margin: 0 5px;
        }
      }

      &:hover {
        .opt {
          opacity: 1;
        }
      }
    }
  }
}
</style>
