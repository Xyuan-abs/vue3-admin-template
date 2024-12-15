/**
 * 表格
 * @returns
 */
export default function () {
  const $baseConfirm = inject('$baseConfirm')
  const $baseMessage = inject('$baseMessage')

  // 多选框切换事件
  const selection = []
  const handleSelectionChange = (selectionList) => {
    selection.length = 0
    selection.push(...selectionList)
  }

  // Confirm操作
  const handleConfirmOpt = (name = '操作', api, params) => {
    return new Promise((resolve) => {
      $baseConfirm({
        content: `是否确认${name}？`,
      })
        .then(async () => {
          const res = await api(params).catch((e) => console.error(e))
          if (res?.success) {
            $baseMessage({ message: `已${name}`, type: 'success' })
            resolve(true)
          } else {
            $baseMessage({ message: res?.msg || `${name}失败`, type: 'error' })
            resolve(false)
          }
        })
        .catch(() => {})
    })
  }

  // 批量操作
  const handleMultiOpt = (api, name = '批量操作') => {
    // 判断是否有勾选
    if (!selection.length) {
      $baseMessage({ message: '至少勾选一项', type: 'warning' })
      return false
    }

    return new Promise((resolve, reject) => {
      $baseConfirm({
        content: `你确定要${name}勾选的这${selection.length}项吗`,
      })
        .then(async () => {
          const params = {
            ids: selection.map((d) => d.id),
          }
          const res = await api(params).catch((e) => console.error(e))
          if (res?.success) {
            $baseMessage({ message: `已${name}`, type: 'success' })
            resolve(res)
          } else {
            $baseMessage({ message: res?.msg || `${name}失败`, type: 'error' })
            reject(res)
          }
        })
        .catch(() => {})
    })
  }

  return {
    selection,
    handleSelectionChange,
    handleConfirmOpt,
    handleMultiOpt,
  }
}
