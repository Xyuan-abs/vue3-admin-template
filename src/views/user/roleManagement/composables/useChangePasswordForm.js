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
    ],
  })

  return {
    dynamicForm,
    ...useForm(mock, { name: '修改' }),
  }
}
