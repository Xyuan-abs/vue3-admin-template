/**
 * 查询表单
 * @returns
 */
export default function () {
  const dynamicForm = reactive({
    form: [
      {
        name: '添加时间',
        label: '添加时间',
        value: [],
        element: 'date-picker',
        attrs: { type: 'daterange' },
      },
      {
        name: '被关注机器SN',
        label: '被关注机器SN',
        value: '',
        element: 'input',
      },
      {
        name: '关注人姓名',
        label: '关注人姓名',
        value: '',
        element: 'input',
      },
      {
        name: '关注人电话',
        label: '关注人电话',
        value: '',
        element: 'input',
      },
      {
        name: '被关注物流单号',
        label: '被关注物流单号',
        value: '',
        element: 'input',
      },
    ],
  })

  const searchParams = reactive({})

  return {
    dynamicForm,
    searchParams,
  }
}
