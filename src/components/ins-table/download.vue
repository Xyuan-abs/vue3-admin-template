<!-- 
  名称：下载 、 导出
 -->
<script setup>
  import { Download } from '@element-plus/icons-vue'

  import { downloadFile } from '@/utils/index.ts'

  const $baseMessage = inject('$baseMessage')

  const props = defineProps({
    name: { type: String, default: '导出' },
    api: { type: Function, required: true },
    params: { type: Object, default: () => ({}) },
    urlKey: { type: String, default: 'url' },
  })

  const loading = ref(false)

  // 下载/导出
  const handleExport = async () => {
    loading.value = true
    const res = await props.api(props.params).catch((e) => console.error(e))
    loading.value = false

    if (res?.success) {
      const url = props.urlKey.split('.').reduce((prev, cur) => prev?.[cur], res.data ?? {})

      if (url && url?.startsWith('http')) {
        downloadFile(url)
      } else {
        $baseMessage(`${props.name}地址不存在或不正确`, 'error')
      }
    } else {
      $baseMessage(res?.msg || `${props.name}失败`, 'error')
    }
  }
</script>

<template>
  <el-button :icon="Download" :loading="loading" type="primary" @click="handleExport">
    {{ loading ? `${name}中` : name }}
  </el-button>
</template>

<style lang="scss" scoped></style>
