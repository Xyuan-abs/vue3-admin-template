import { changePassword } from '@/api/user.ts'
/**
 *  修改密码
 * @returns
 */
export default function (passwordFormRef) {
  const $baseMessage = inject('$baseMessage')

  const loading = ref(false)

  /* 密码 */
  const passwordForm = reactive({
    password: '',
    passwordConfirm: '',
  })

  // 密码格式
  const validatePsw = function (rule, value, callback) {
    if (!(value.match(/[A-Za-z]/) && value.match(/[0-9]/))) {
      callback(new Error(`密码格式不正确,由字母+数字组成`))
    }

    callback()
  }

  // 密码 前后一致
  const validatePswSame = function (rule, value, callback) {
    if (
      passwordForm.password &&
      passwordForm.passwordConfirm &&
      passwordForm.password !== passwordForm.passwordConfirm
    ) {
      callback(new Error(`前后密码不一致`))
    }

    callback()
  }

  // 表单
  const dynamicForm = reactive({
    form: [
      {
        name: 'password',
        label: '密码',
        element: 'password',
        attrs: {},
        rules: [
          { required: true },
          { min: 6, message: '密码长度不能小于6位' },
          { validator: validatePsw },
          { validator: validatePswSame },
        ],
      },
      {
        name: 'passwordConfirm',
        label: '确认密码',
        element: 'password',
        attrs: {},
        rules: [
          { required: true },
          { min: 6, message: '密码长度不能小于6位' },
          { validator: validatePsw },
          { validator: validatePswSame },
        ],
      },
    ],
  })

  // 表单change事件
  const handleChange = () => {
    if (passwordForm.password) {
      passwordFormRef.value.validateField('password')
    }

    if (passwordForm.passwordConfirm) {
      passwordFormRef.value.validateField('passwordConfirm')
    }
  }

  // 提交
  const submit = async (userId) => {
    // 校验
    const isValidate = await passwordFormRef.value.validateForm()
    if (!isValidate) return

    // 提交数据
    const params = { password: passwordForm.password, id: userId || undefined }
    loading.value = true
    const res = await changePassword(params).catch((e) => console.error(e))
    loading.value = false

    if (res?.success) {
      $baseMessage({ message: '已修改', type: 'success' })
    } else {
      const errorMsg = res?.msg || ''
      $baseMessage({ message: `保存失败${errorMsg && ':'}${errorMsg}`, type: 'error' })
    }

    return !!res?.success
  }

  return {
    passwordForm,
    dynamicForm,
    loading,
    handleChange,
    submit,
  }
}
