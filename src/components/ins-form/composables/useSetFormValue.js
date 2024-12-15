import { isNotEmpty } from '@/utils'

/**
 * 回显表单数据
 * @param {*} dynamicForm 动态表单配置对象
 * @returns
 */
export default function (dynamicForm) {
  function getValue(formItem, data) {
    let value
    if (formItem.valueMap) {
      value = formItem.valueMap.map((key) => data[key])
      if (value.every((v) => !isNotEmpty(v))) {
        value = []
      }
    } else {
      value = data[formItem.name]
    }

    return value
  }

  /**
   * 回显单个表单项
   * @param {*} key
   * @param {*} data
   */
  function setFormItemValue(key, data) {
    if (data) {
      const formItem = dynamicForm.form.find((d) => d.name === key)
      if (formItem) {
        const value = getValue(formItem, data)

        if (isNotEmpty(value)) {
          formItem.value = value
          if (formItem.onSetData) {
            formItem.onSetData(data, formItem)
          }
        }
      }
    }
  }

  /**
   * 回显整个表单
   * @param {*} data
   */
  function setFormValue(data) {
    if (data) {
      dynamicForm.form.forEach((formItem) => {
        setFormItemValue(formItem.name, data)
      })
    }
  }

  return {
    setFormItemValue,
    setFormValue,
  }
}
