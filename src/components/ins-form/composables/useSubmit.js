/**
 * 整合表单值、提交、重置
 * @param {*} dynamicFormRef 表单ref实例
 * @param {*} dynamicForm 动态表单配置对象
 * @param {*} emit
 * @returns
 */
export default function (dynamicFormRef, dynamicForm, emit) {
  /**
   * 表单校验
   * @returns
   */
  function validateForm() {
    return dynamicFormRef.value.validate().catch(() => {})
  }

  /**
   * 获取表单提交数据
   * hidden=true 和 isShow=false 的区别
   * hidden不展示/不生成值，isShow不展示/生成值
   *
   * @returns
   */
  function getSaveData() {
    const result = dynamicForm?.form.reduce((prev, cur) => {
      // 隐藏的 不生成属性值
      if (cur.hidden) return prev
      // 忽略的 不生成属性值
      if (cur.ignoreOnSave) return prev

      let data = {}

      let value = cur.value
      //值的格式化
      typeof cur.value === 'string' && (value = cur.value.trim())

      if (cur.valueFmt) {
        data = { ...cur.valueFmt(cur.value) }
      } else if (Array.isArray(value) && cur.valueMap) {
        data = cur.valueMap.reduce((p, c, i) => Object.assign({}, p, { [c]: value[i] }), {})
      } else {
        data = { [cur.name]: value }
      }

      return Object.assign({}, prev, data)
    }, {})

    return result
  }

  /**
   * 转换表单 到 保存数据
   */
  async function toSaveData() {
    const isValidate = await validateForm()
    if (!isValidate) return false

    return getSaveData()
  }

  // 提交表单
  function submitForm() {
    const result = toSaveData()
    result && emit('submit', result)
  }

  // 重置表单项
  function resetFields(name) {
    const index = dynamicForm.form.findIndex((d) => d.name === name)
    if (index >= 0) {
      dynamicFormRef.value.resetFields(`form[${index}].value`)
    }
  }

  // 清除表单项校验
  function clearValidate(name) {
    const index = dynamicForm.form.findIndex((d) => d.name === name)
    if (index >= 0) {
      dynamicFormRef.value.clearValidate(`form[${index}].value`)
    }
  }

  // 重置整个表单
  function resetForm() {
    dynamicFormRef.value.resetFields()
    emit('reset')
  }

  // 校验字段
  function validateField(props, callback) {
    dynamicFormRef.value.validateField(props, callback).catch(() => {})
  }

  return {
    getSaveData,
    validateField,
    validateForm,
    toSaveData,
    submitForm,
    resetFields,
    resetForm,
    clearValidate,
  }
}
