/**
 * 查询表单
 * @returns
 */
export default function () {
  const dynamicForm = reactive({
    form: [
      {
        name: 'name',
        label: '网点名称',
        element: 'input',
      },
      {
        name: 'searchKey',
        label: '地址',
        element: 'input',
      },
      {
        name: 'principal',
        label: '网点负责人',
        element: 'input',
      },
      {
        name: 'phone',
        label: '网点负责人电话',
        element: 'input',
      },
    ],
  })

  const searchParams = ref({})

  return {
    dynamicForm,
    searchParams,
  }
}
