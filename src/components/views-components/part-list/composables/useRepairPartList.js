export default function (props) {
  /**
   * 表单 ref
   */
  const ruleFormRef = ref(null)

  const valueByParts = ['materialNo', 'price', 'stock', 'materialProperty']

  /**
   * 表头
   */
  const tableHead = computed(() => {
    const list = [
      { label: '配件', prop: 'materialName', required: !props.isDetail },
      { label: '配件料号', prop: 'materialNo' },
      { label: '价格', prop: 'price' },
      { label: '库存', prop: 'stock' },
      { label: '属性', prop: 'materialProperty' },
      { label: '旧贵重件SN', prop: 'oldSN' },
      { label: '新贵重件SN', prop: 'newSN' },
      { label: '消耗数量', prop: 'quantity', required: !props.isDetail },
    ]

    if (!props.isDetail) {
      list.push({ label: '操作', prop: 'opt' })
    }

    return list
  })

  /**
   * 表格数据
   */
  const tableData = ref([])

  /**
   * 回显 tableData
   */
  watch(
    () => props.modelValue,
    (newValue) => {
      tableData.value = props.isDetail ? [...(newValue ?? [])] : [{}, ...(newValue ?? [])]
    },
    { immediate: true },
  )

  /**
   * 添加
   */
  async function handleAdd() {
    return new Promise((resolve) => {
      ruleFormRef.value
        .validate()
        .then((isValidate) => {
          if (isValidate) {
            tableData.value.unshift({})

            resolve()
            setTimeout(() => {
              ruleFormRef.value.clearValidate()
            }, 0)
          }
        })
        .catch(() => {})
    })
  }

  /**
   * 删除
   */
  function handleDelete(index) {
    tableData.value.splice(index, 1)
  }

  return {
    ruleFormRef,
    tableHead,
    tableData,
    valueByParts,
    handleAdd,
    handleDelete,
  }
}
