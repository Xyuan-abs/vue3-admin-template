import { mock } from '@/api/mock'

import useForm from '@/hooks/useForm'
import { DIALOG_TYPE } from '@/hooks/useDialog'

const mockAdd = (...arg) => {
  return mock(...arg)
}

const mockEdit = (...arg) => {
  return mock(...arg)
}

/**
 * 弹窗-表单
 * @returns
 */
export default function (row, dialogType) {
  // 表单
  const dynamicForm = reactive({
    form: [
      {
        name: 'name',
        label: '网点名称',
        value: '',
        element: 'input',
        rules: [{ required: true }],
      },
      {
        name: 'company',
        label: '网点公司名称',
        value: '',
        element: 'input',
        rules: [{ required: true }],
      },
      {
        name: 'phone',
        label: '网点负责人电话',
        value: '',
        element: 'input',
        rules: [{ required: true }],
      },
      {
        name: 'number',
        label: '维修人数',
        value: '',
        element: 'input',
        attrs: { type: 'number' },
        rules: [{ required: true }],
      },
    ],
  })

  // 保存接口
  function saveFun(data) {
    const apiMap = {
      [DIALOG_TYPE.ADD]: mockAdd,
      [DIALOG_TYPE.EDIT]: mockEdit,
    }

    const params = {
      ...(dialogType.value === DIALOG_TYPE.EDIT ? { id: row.value.id } : {}),
      ...data,
    }

    return apiMap[dialogType.value](params)
  }

  return {
    dynamicForm,
    ...useForm(saveFun),
  }
}
