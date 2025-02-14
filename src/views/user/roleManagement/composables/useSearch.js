/**
 * 查询表单
 * @returns
 */

export default function () {
  const dynamicForm = reactive({
    form: [
      {
        name: 'roleName',
        label: '角色名称',
        element: 'input',
      },
      {
        name: 'createTime',
        label: '创建时间',
        element: 'date-picker',
        attrs: { type: 'daterange', valueFormat: 'YYYY-MM-DD' },
        valueMap: ['createTimeStart', 'createTimeEnd'],
      },
    ],
  })

  const searchParams = ref({})

  return {
    dynamicForm,
    searchParams,
  }
}
