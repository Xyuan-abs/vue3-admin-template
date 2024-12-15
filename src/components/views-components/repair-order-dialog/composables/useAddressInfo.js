/**
 * @returns
 */
export default function (props) {
  /**
   * 表单 ref
   */
  const InsFormRef = ref(null)

  /**
   *  服务记录信息 head
   */
  const dynamicForm = reactive({
    form: [
      {
        name: 'location',
        label: '所在城市',
        element: props.isDetail ? 'text' : 'city',
        value: [],
        valueMap: ['province', 'city', 'region'],
        cols: 3,
        rules: [{ required: !props.isDetail }],
      },
      {
        name: 'address',
        label: '详细地址',
        element: props.isDetail ? 'text' : 'input',
        value: '',
        cols: 3,
        rules: [{ required: !props.isDetail }],
      },
      {
        name: 'company',
        label: '公司名称',
        element: props.isDetail ? 'text' : 'input',
        value: '',
        cols: 3,
      },
    ],
  })

  /**
   * 回显数据
   * @param {Object} data
   */
  function setData(data) {
    dynamicForm.form.forEach((d) => {
      const value = data[d.name]
      if (value || value === 0) {
        d.value = value
      }
    })
  }

  /**
   * 获取数据
   */
  async function getData() {
    return InsFormRef.value.toSaveData()
  }

  /**
   * 重置
   */
  function reset() {
    InsFormRef.value.resetForm()
  }

  return {
    InsFormRef,
    dynamicForm,
    setData,
    getData,
    reset,
  }
}
