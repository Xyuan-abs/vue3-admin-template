import { isNotEmpty } from '@/utils'

import EventBus from '@/utils/event-bus'

/**
 * 回显表单数据
 * @param {*} dynamicForm 动态表单配置对象
 * @returns
 */
export default function (dynamicForm) {
  function getValue(formItem, data) {
    let value

    if (Object.prototype.toString.call(data) !== '[object Object]') {
      data = {
        [formItem.name]: data,
      }
    }

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
  async function setFormItemValue(key, data) {
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

  /**
   * 回显整个表单
   * @param {*} data
   */
  async function setFormValue(data) {
    EventBus.emit('is-setting-form-value', true)
    if (data) {
      for (let i = 0; i < dynamicForm.form.length; i++) {
        const formItem = dynamicForm.form[i]
        setFormItemValue(formItem.name, data)
        await new Promise((resolve) => setTimeout(resolve, 0))

        if (formItem.events?.change) {
          await formItem.events.change(formItem)
        }
      }
    }
    EventBus.emit('is-setting-form-value', false)
  }

  return {
    setFormItemValue,
    setFormValue,
  }
}
