/**
 * 弹窗
 * @returns
 */
export default function () {
  const dialogVisible = ref(false) // 是否展示

  // 打开弹窗
  const handleOpenDialog = () => {
    dialogVisible.value = true
  }

  // 关闭弹窗
  const handleCloseDialog = () => {
    dialogVisible.value = false
  }

  return {
    dialogVisible,
    handleOpenDialog,
    handleCloseDialog,
  }
}
