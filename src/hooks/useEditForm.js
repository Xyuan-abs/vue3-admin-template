import { isFunction } from '@/utils/validate.js'

/**
 * 新增编辑弹窗-表单
 * @returns
 */
export default function (form, HprtFormRef, row, addApi, editApi = addApi, idKey = 'id') {
  const $baseMessage = inject('$baseMessage')

  // 保存loading
  const loading = ref(false)

  // 表单
  const dynamicForm = reactive({
    form: form,
  })

  // 设置默认值（编辑）
  const setFormValue = () => {
    const rowData = row.value

    if (rowData) {
      dynamicForm.form.forEach((d) => {
        const value = rowData[d.name]
        if (value || value === 0) {
          d.value = value
        }
      })
    }
  }

  // 提交
  const submit = async (formatParams) => {
    const formData = await HprtFormRef.value.toSaveData()
    if (!formData) return false

    const rowData = row.value

    let params = {
      ...formData,
      ...(rowData ? { [idKey]: rowData?.[idKey] } : {}),
    }

    if (formatParams && isFunction(formatParams)) {
      params = formatParams(params)
    }

    console.log('params', params)

    const submitFun = rowData ? editApi : addApi

    loading.value = true
    const res = await submitFun(params).catch((e) => console.error(e))
    loading.value = false

    if (res?.success) {
      $baseMessage('已保存', 'success')
    } else {
      const errorMsg = res?.msg || ''
      $baseMessage(`保存失败${errorMsg && ':'}${errorMsg}`, 'error')
    }

    return res?.success || false
  }

  return {
    loading,
    dynamicForm,
    setFormValue,
    submit,
  }
}
