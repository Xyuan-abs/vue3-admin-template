import { mock } from '@/api/mock'

import useForm from '@/hooks/useForm'
import { DIALOG_TYPE } from '@/hooks/useDialog'
import { ELEMENT } from '@/components/ins-form/composables/useElement'

/**
 * 弹窗-表单
 * @returns
 */
export default function (row, dialogType) {
  const validatePassword = (rule, value, callback) => {
    const password = dynamicForm.form.find((item) => item.name === 'password').value
    const confirmPassword = dynamicForm.form.find((item) => item.name === 'confirmPassword').value

    if (password && confirmPassword && password !== confirmPassword) {
      return callback('两次密码不一致')
    }
    callback()
  }

  // 表单
  const dynamicForm = reactive({
    form: [
      {
        name: 'roleName',
        label: '角色名称',
        value: '',
        element: ELEMENT.INPUT,
        rules: [{ required: true }],
        componentProps: { isTrim: true },
      },
      {
        name: 'rules',
        label: '权限',
        value: [],
        element: ELEMENT.SLOT,
        rules: [{ required: true }],
      },
      {
        name: 'remark',
        label: '描述',
        value: '',
        element: ELEMENT.INPUT,
      },
    ],
  })

  // 保存接口
  function saveFun(data) {
    const apiMap = {
      [DIALOG_TYPE.ADD]: mock,
      [DIALOG_TYPE.EDIT]: mock,
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
