/**
 * 整合表单值、提交、重置
 * @param {*} dynamicFormRef 表单ref实例
 * @param {*} dynamicForm 动态表单配置对象
 * @param {*} emit
 * @returns
 */
export default function (dynamicFormRef, dynamicForm, emit) {
  /**
   * 转换表单 到 保存数据
   * hidden=true 和 isShow=false 的区别
   * hidden不展示/不生成值，isShow不展示/生成值
   */
  function toSaveData() {
    let result = {}
    return new Promise((resolve) => {
      dynamicFormRef.value.validate((valid) => {
        if (valid) {
          dynamicForm?.form.forEach((d) => {
            // 隐藏的 不生成属性值
            if (d.hidden) return

            let value = d.value
            //值的格式化
            typeof d.value === 'string' && (value = d.value.trim())

            result[d.name] = value
          })
        } else {
          result = {}
        }
        resolve(Object.keys(result).length > 0 && JSON.parse(JSON.stringify(result)))
      })
    })
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

  // 重置整个表单
  function resetForm() {
    dynamicFormRef.value.resetFields()
    dynamicForm.form.forEach((formItem) => {
      if (formItem.element === 'upload') {
        formItem.attr.fileList = []
      }
    })
    emit('reset')
  }

  // 校验字段
  function validateField(props, callback) {
    dynamicFormRef.value.validateField(props, callback).catch((e) => {})
  }

  // 表单项 change 事件
  const handleChange = (formItem, index) => {
    validateField(`form[${index}].value`)
    if (formItem.events?.change) {
      formItem.events?.change(formItem)
    }
    emit('change', formItem, index)
  }

  return {
    toSaveData,
    submitForm,
    resetFields,
    resetForm,
    validateField,
    handleChange,
  }
}
