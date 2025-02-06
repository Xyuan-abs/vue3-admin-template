import { isFunction } from '@/utils/validate'

import useFetch from './useFetch'

/**
 * 新增编辑弹窗-表单
 * @returns
 */
export default function (form, _InsFormRef, row, addApi, editApi = addApi, idKey = 'id') {
  const _InsFormRef_ = ref(null)

  const InsFormRef = _InsFormRef || _InsFormRef_

  // 表单
  const dynamicForm = reactive({
    form: form,
  })

  /** 保存 */
  const { isFetching: loading, executeFetch: executeSave } = useFetch(
    (params) => (row?.value ? editApi(params) : addApi(params)),
    {
      name: '保存',
      showSuccessMsg: true,
    },
  )

  // 设置默认值（编辑）
  function setFormValue(rowData = row?.value) {
    rowData && InsFormRef.value.setFormValue(rowData)
  }

  // 提交
  async function submit(formatParams) {
    // 校验
    const formData = await InsFormRef.value.toSaveData()
    if (!formData) return false

    // 合并参数
    const rowData = row?.value
    let params = {
      ...formData,
      ...(rowData ? { [idKey]: rowData?.[idKey] } : {}),
    }
    if (formatParams && isFunction(formatParams)) {
      params = formatParams(params)
    }
    console.log('params', params)

    // 提交
    const res = await executeSave(params)

    return res?.success || false
  }

  return {
    InsFormRef,
    loading,
    dynamicForm,
    setFormValue,
    submit,
  }
}
