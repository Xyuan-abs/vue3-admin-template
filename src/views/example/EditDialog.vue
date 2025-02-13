<!-- 
  名称：新建、编辑弹窗

 -->
<script setup>
import InsForm from '@/components/ins-form/index.vue'
import useDialog from '@/hooks/useDialog'
import { DIALOG_TYPE } from '@/hooks/useDialog'

import useEditForm from './composables/useEditForm'

import { downloadFile } from '@/utils/index'

const { row, title, dialogType, dialogVisible, onDialogOpen, handleOpenDialog, handleCloseDialog } =
  useDialog('网点')
const { InsFormRef, dynamicForm, isSaving, setFormValue, resetForm, submit } = useEditForm(
  row,
  dialogType,
)

const emit = defineEmits(['save'])

/**
 * 打开弹窗时
 */
onDialogOpen((rowData, dialogType) => {
  if ([DIALOG_TYPE.EDIT, DIALOG_TYPE.DETAIL].includes(dialogType)) {
    nextTick(() => setFormValue(rowData))
  }
})

/**
 * 弹窗关闭事件
 */
function onClosed() {
  resetForm()
}

/**
 * 保存
 */
async function save() {
  const data = await submit()
  if (data) {
    downloadFile(data)

    handleCloseDialog()
    emit('save')
  }
}

defineExpose({
  open: handleOpenDialog,
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    class="outlets-list-edit-dialog"
    :title="title"
    width="1000px"
    @closed="onClosed"
  >
    <!-- 表单 -->
    <ins-form ref="InsFormRef" :cols="2" :dynamic-form="dynamicForm" :label-width="133" />

    <template #footer>
      <el-button @click="handleCloseDialog">取 消</el-button>
      <el-button :loading="isSaving" type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.outlets-list-edit-dialog {
  .el-checkbox__label {
    min-width: 110px;
  }
}
</style>
