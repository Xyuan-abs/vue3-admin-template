<!-- 
  名称：新建、编辑弹窗
  版本：1.0.0 
  作者：Xyuan
  时间：2023年2月14日16:09:06
 -->
<script setup>
import InsForm from '@/components/ins-form/index.vue'

import useDialog from '@/hooks/useDialog'
import useEditForm from './composables/useEditForm'

import { cloneDeep } from 'lodash'

const InsFormRef = ref(null)
const row = ref()

const { dialogVisible, handleOpenDialog, handleCloseDialog } = useDialog()
const { dynamicForm, loading, setFormValue, submit } = useEditForm(InsFormRef, row)

const emit = defineEmits(['save'])

// 标题
const title = computed(() => `${!row.value ? '添加' : '编辑'}关注`)

// 打开弹窗
const open = (rowData) => {
  row.value = cloneDeep(rowData)

  handleOpenDialog()
  nextTick(() => {
    setFormValue()
  })
}

// 弹窗关闭事件
const onClose = () => {
  InsFormRef.value.resetForm()
}

// 保存
const save = async () => {
  const success = await submit()
  if (success) {
    close()
    emit('save')
  }
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    class="case-classify-edit-dialog"
    :title="title"
    width="500px"
    @close="onClose"
  >
    <!-- 表单 -->
    <ins-form ref="InsFormRef" :dynamic-form="dynamicForm" :label-width="110" />

    <template #footer>
      <el-button @click="handleCloseDialog">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.case-classify-edit-dialog {
}
</style>
