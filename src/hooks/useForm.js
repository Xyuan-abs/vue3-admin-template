/**
 * 表单
 */
import { isFunction } from '@/utils/validate'

import useFetch from './useFetch'

export default function (api) {
  /** 表单实例 */
  const InsFormRef = ref(null)

  /** 保存 */
  const { isFetching: isSaving, executeFetch: executeSave } = useFetch(api, {
    name: '保存',
    showSuccessMsg: true,
  })

  // 设置默认值（编辑）
  function setFormValue(data) {
    if (!data) return
    InsFormRef.value.setFormValue(data)
  }

  // 重置表单
  function resetForm() {
    InsFormRef.value.resetForm()
  }

  // 提交
  async function submit(formatParams) {
    // 校验
    const formData = await InsFormRef.value.toSaveData()
    if (!formData) return false

    let params = { ...formData }
    // 格式化参数
    if (formatParams && isFunction(formatParams)) {
      params = formatParams(params)
    }

    // 提交
    const res = await executeSave(params)

    return res?.success || false
  }

  return {
    InsFormRef,
    isSaving,
    setFormValue,
    resetForm,
    submit,
  }
}
