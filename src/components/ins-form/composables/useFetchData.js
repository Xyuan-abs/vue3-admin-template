/**
 * 获取表单项数据  select,cascader，radio,checkbox
 * @param {Object} formItem 表单项配置
 * @param { object }  componentProps
 * @example
 *   componentProps:{
 *     api:()=>{}, // 获取选项的接口
 *     params:{},  // 参数
 *     keywordKey:'keyword', // 远程搜索时 输入的关键字在参数中对应的key
 *     immediate:false, // 是否立即执行
 *     resultField:'data', // 获取到的值对应的key,多个层级以 . 拼接，如：data.list
 *     labelKey:'label', // 选项 label 对应的 key
 *     valueKey:'value', // 选项 value 对应的 key
 *   }
 */
export default function (formItem) {
  const loading = ref(false)

  const componentProps = formItem?.componentProps

  /* 监听参数变化 获取表单项数据 */
  if (componentProps) {
    const immediate = !!componentProps.immediate
    if (componentProps.params === undefined && immediate) {
      handleFetchOptions()
    } else {
      watch(() => componentProps.params, handleFetchOptions, { deep: true, immediate })
    }
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

    const {
      resultField = 'data',
      labelFmt,
      labelKey = 'label',
      valueKey = 'value',
    } = componentProps

    let list = []
    if (Array.isArray(res)) {
      list = res
    }
    if (Object.prototype.toString.call(res) === '[object Object]') {
      const keys = resultField.split('.')
      list = keys.reduce((prev, cur) => prev[cur], res) ?? []
    }

    return list.map((d) => ({
      ...d,
      label: labelFmt ? labelFmt(d) : d[labelKey],
      value: d[valueKey],
    }))
  }

  return {
    loading,
    handleFetchOptions,
  }
}
