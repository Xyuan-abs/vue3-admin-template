import { DIALOG_TYPE } from '@/hooks/useDialog'

/**
 * 表格
 * @returns
 */
export default function () {
  // 弹窗
  const DialogRef = ref(null)

  // 无类型打开弹窗
  const handleOpen = (row) => {
    DialogRef.value.open(row, DIALOG_TYPE.DEFAULT)
  }

  // 新建
  const handleAdd = (...arg) => {
    DialogRef.value.open(undefined, DIALOG_TYPE.ADD, ...arg)
  }

  // 编辑
  const handleEdit = (row, ...arg) => {
    DialogRef.value.open(row, DIALOG_TYPE.EDIT, ...arg)
  }

  // 查看
  const handleShowDetail = (row) => {
    DialogRef.value.open(row, DIALOG_TYPE.DETAIL)
  }

  return {
    DialogRef,
    handleOpen,
    handleAdd,
    handleEdit,
    handleShowDetail,
  }
}
