/**
 * 格式化 required rules
 * @returns
 */
export default function () {
  const setRules = (formItem) => {
    let rules = formItem.rules

    // 隐藏当前 formItem 的 required ,由 子表单项 展示 required
    const hindRequiredMessageMap = {
      'number-with-unit': 1,
    }

    if (hindRequiredMessageMap[formItem.element] && formItem.required) {
      rules = [{ required: true, message: '', trigger: 'change' }]
    } else if (rules) {
      const requiredRule = rules.find((d) => d.required)

      // 设置默认提示
      if (requiredRule && !requiredRule.message) {
        // 不同类型 表单项对应不同的默认提示语
        const elementTypeMap = [
          ['input', 'inputNumber'],
          ['select', 'radio', 'checkbox', 'date-picker', 'city', 'rate'],
          ['upload'],
        ]
        const messageMap = {
          '-1': `${formItem.label}不能为空`,
          0: `请输入${formItem.label}`,
          1: `请选择${formItem.label}`,
          2: `请上传${formItem.label}`,
        }
        const elementType = elementTypeMap.findIndex((types) =>
          types.some((d) => d === formItem.element),
        )

        const message = messageMap[elementType]
        requiredRule.message = message
      }
    }

    return rules
  }

  return {
    setRules,
  }
}
