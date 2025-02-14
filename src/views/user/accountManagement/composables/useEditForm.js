import { mock } from '@/api/mock'

import useForm from '@/hooks/useForm'
import { DIALOG_TYPE } from '@/hooks/useDialog'
import { ELEMENT } from '@/components/ins-form/composables/useElement'

const mockAdd = (...arg) => {
  return mock(
    ...arg,
    'https://fastly.picsum.photos/id/20/200/300.jpg?hmac=DFzxrn8j8N0vtdAloI4hYTGWP-nNrDqMbVcWjF2BLwA',
  )
}

const mockEdit = (...arg) => {
  return mock(
    ...arg,
    'https://fastly.picsum.photos/id/20/200/300.jpg?hmac=DFzxrn8j8N0vtdAloI4hYTGWP-nNrDqMbVcWjF2BLwA',
  )
}

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
        name: 'userName',
        label: '账号',
        value: '',
        element: ELEMENT.INPUT,
        rules: [{ required: true }],
        componentProps: { isTrim: true },
      },
      {
        name: 'password',
        label: '密码',
        value: '',
        element: ELEMENT.INPUT,
        attrs: {
          type: 'password',
          'show-password': true,
          autocomplete: 'new-password',
        },
        events: {
          change: () => {
            console.log('password change ')
          },
        },
        rules: [{ required: true }, { validator: validatePassword, trigger: 'change' }],
        componentProps: { isTrim: true },
        hidden: computed(() => dialogType.value === DIALOG_TYPE.EDIT),
        linkage: {
          confirmPassword: {
            validate: () =>
              !!dynamicForm.form.find((item) => item.name === 'confirmPassword').value,
          },
        },
      },
      {
        name: 'confirmPassword',
        label: '确认密码',
        value: '',
        element: ELEMENT.INPUT,
        attrs: {
          type: 'password',
          'show-password': true,
          autocomplete: 'new-password',
        },
        events: {
          change: () => {
            console.log('confirmPassword change ')
          },
        },
        rules: [{ required: true }, { validator: validatePassword, trigger: 'change' }],
        componentProps: { isTrim: true },
        hidden: computed(() => dialogType.value === DIALOG_TYPE.EDIT),
        linkage: {
          password: {
            validate: () => !!dynamicForm.form.find((item) => item.name === 'password').value,
          },
        },
      },
      {
        name: 'nickName',
        label: '姓名',
        value: '',
        element: ELEMENT.INPUT,
        rules: [{ required: true }],
        componentProps: { isTrim: true },
      },
      {
        name: 'phone',
        label: '联系号码',
        value: '',
        element: ELEMENT.INPUT,
        attrs: { type: 'number' },
        rules: [{ required: true }],
      },
      {
        name: 'role',
        label: '角色',
        value: '',
        element: ELEMENT.SELECT,
        options: [],
        componentProps: {
          api: () =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  data: [
                    { label: '管理员', value: 1 },
                    { label: '普通用户', value: 2 },
                  ],
                })
              }, 1000)
            }),
          params: {},
          immediate: true,
        },
        rules: [{ required: true }],
      },
      {
        name: 'email',
        label: 'email',
        value: '',
        element: ELEMENT.INPUT,
        componentProps: { isTrim: true },
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
