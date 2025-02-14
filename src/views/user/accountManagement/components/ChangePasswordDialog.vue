<!-- 
  名称：新建、编辑弹窗

 -->
<script setup>
import InsForm from '@/components/ins-form/index.vue'
import useDialog from '@/hooks/useDialog'

import useChangePasswordForm from '../composables/useChangePasswordForm'

const { row, title, dialogType, dialogVisible, handleOpenDialog, handleCloseDialog } =
  useDialog('修改密码')
const { InsFormRef, dynamicForm, isSaving, resetForm, submit } = useChangePasswordForm(
  row,
  dialogType,
)

const emit = defineEmits(['save'])

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
  const success = await submit()
  if (success) {
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
    width="500px"
    @closed="onClosed"
  >
    <!-- 表单 -->
    <ins-form ref="InsFormRef" :dynamic-form="dynamicForm" :label-width="103" />

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
