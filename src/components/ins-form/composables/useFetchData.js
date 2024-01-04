/**
 * 获取表单项数据
 * @param {*} formItem 表单项配置
 * @returns
 */
export default function (formItem) {
  const loading = ref(false)

  const componentProps = formItem?.componentProps

  /* 监听参数变化 获取表单项数据 */
  if (componentProps) {
    const immediate = componentProps.immediate
    !componentProps.params && (componentProps.params = {})

    watch(() => componentProps.params, handleFetchOptions, { deep: true, immediate })
  }

  /* 获取options */
  async function handleFetchOptions() {
    const { api, params } = componentProps

    if (!api) return

    loading.value = true
    const res = await api(params).catch((e) => console.error(e))
    loading.value = false

    formItem.options = formatterOptions(res) || []
  }

  /* 格式化 options */
  function formatterOptions(res) {
    if (!res) return []

    const { resultField = 'data', labelKey = 'label', valueKey = 'value' } = componentProps

    let list = []
    if (Array.isArray(res)) {
      list = res
    }
    if (Object.prototype.toString.call(res) === '[object Object]') {
      const keys = resultField.split('.')
      list = keys.reduce((prev, cur) => prev[cur], res)
    }

    return list.map((d) => ({
      label: d[labelKey],
      value: d[valueKey],
    }))
  }

  return {
    loading,
    handleFetchOptions,
  }
}
