import { computed } from 'vue'

/**
 * 获取表单项 attrs
 * @param {*} formItem 表单项配置
 * @returns
 */
export default function (formItem) {
  const inputRules = computed(() => {
    return setRules(0)
  })
  const unitRules = computed(() => {
    return setRules(1)
  })
  function setRules(index) {
    const attrs = formItem.attrs?.[index] ?? {}
    const rules = formItem.attrs?.rules?.[index] ?? []

    if (formItem.required) {
      rules.push({
        required: true,
        message: `${index ? '请选择' : '请输入'}${attrs.label || ''}`,
        trigger: index ? 'change' : 'blur',
      })
    }

    return rules
  }

  return {
    inputRules,
    unitRules,
  }
}
