<!-- 
  名称：详情返回
 -->
<script setup>
const $baseConfirm = inject('$baseConfirm')

const router = useRouter()

defineProps({
  title: {
    type: String,
    default: '详情页',
  },
})

/* 返回上一级 */
const goBack = () => {
  router.go(-1)

  // $baseConfirm(`确认返回？`, null, () => {
  //   router.go(-1)
  // })
}

onMounted(() => {})
</script>

<template>
  <el-page-header :content="title" @back="goBack" />
</template>

<style lang="scss"></style>
