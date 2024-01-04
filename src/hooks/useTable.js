import { mock } from '@/api/mock.js'

/**
 * 表格
 * @returns
 */
export default function ({ fetchDataApi = mock, deleteApi = mock }, EditDialogRef) {
  const $baseConfirm = inject('$baseConfirm')
  const $baseMessage = inject('$baseMessage')

  // 获取表格数据
  const loading = ref(false)
  const tableData = ref([])

  // 获取表格数据
  const fetchData = async (params) => {
    loading.value = true
    const res = await fetchDataApi(params).catch((e) => console.error(e))
    loading.value = false

    if (res?.success) {
      tableData.value = res?.data ?? []
    } else {
      tableData.value = []
    }

    return res
  }

  // 新建
  const handleAdd = (...arg) => {
    EditDialogRef.value.open(undefined, ...arg)
  }

  // 编辑
  const handleEdit = (row, ...arg) => {
    EditDialogRef.value.open(row, ...arg)
  }

  // 查看
  const handleShowDetail = (row) => {
    EditDialogRef.value.open(row, true /* isDetail */)
  }

  // 多选框切换事件
  const selection = []
  const handleSelectionChange = (selectionList) => {
    selection.length = 0
    selection.push(...selectionList)
  }

  // 删除
  const handleDelete = async (id) => {
    return new Promise((resolve) => {
      $baseConfirm('你确定要删除当前项吗', null, async () => {
        const params = [{ id }]
        const res = await deleteApi(params).catch((e) => console.error(e))
        if (res?.success) {
          $baseMessage('已删除', 'success')
        } else {
          $baseMessage(res?.msg || '删除失败', 'error')
        }
        resolve(res?.success)
      })
    })
  }

  // 批量操作
  const handleMultiOpt = (api, name = '') => {
    // 判断是否有勾选
    if (!selection.length) {
      $baseMessage('至少勾选一项', 'warning')
      return false
    }

    return new Promise((resolve, reject) => {
      $baseConfirm(`你确定要${name}勾选的这${selection.length}项吗`, null, async () => {
        const params = selection.map((d) => ({
          id: d.id,
        }))
        const res = await api(params).catch((e) => console.error(e))
        if (res?.success) {
          $baseMessage(`已${name}`, 'success')
          resolve(res)
        } else {
          $baseMessage(res?.msg || `${name}失败`, 'error')
          reject(res)
        }
      })
    })
  }

  return {
    tableData,
    loading,
    selection,
    fetchData,
    handleAdd,
    handleEdit,
    handleShowDetail,
    handleSelectionChange,
    handleDelete,
    handleMultiOpt,
  }
}
