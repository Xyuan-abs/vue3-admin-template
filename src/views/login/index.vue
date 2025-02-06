<script setup>
import systemConfig from '@/config/system.js'

import { useUserStore } from '@/store/modules/user'
import LoginBgImage from '@/assets/login_images/login_banner.webp'

import { getLocalStorage, setLocalStorage } from '@/utils/storage'

const $baseMessage = inject('$baseMessage')

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const formRef = ref(null)
const form = ref({
  account: '',
  password: '',
  isRememberPassword: false,
})

const loading = ref(false)
const redirect = ref()

const handleRoute = () => {
  return redirect.value === '/404' || redirect.value === '/403' ? '/' : redirect.value
}

const handleLogin = async () => {
  const { account, password, isRememberPassword } = form.value

  if (!account || !password) {
    return $baseMessage({ message: `账号或密码为空`, type: 'warning' })
  }

  loading.value = true
  const res = await userStore.login({ account, password }).catch(() => {})
  loading.value = false

  if (res?.success) {
    await router.push(handleRoute())

    const accountInfo = { account, isRememberPassword }
    if (isRememberPassword) {
      Object.assign(accountInfo, { password })
    }
    setLocalStorage('accountInfo', accountInfo)
  }
}
onBeforeMount(() => {
  const {
    account = '',
    password = '',
    isRememberPassword = false,
  } = getLocalStorage('accountInfo') || {}

  form.value = {
    account,
    password,
    isRememberPassword,
  }
})

watchEffect(() => {
  redirect.value = (route.query && route.query.redirect) || '/'
})
</script>

<template>
  <div class="login-container">
    <div class="login">
      <div class="cover">
        <img alt="" :src="LoginBgImage" />
      </div>
      <el-form ref="formRef" class="login-form" label-position="left" :model="form">
        <div class="title">{{ systemConfig.title }}</div>
        <el-form-item prop="account">
          <el-input v-model.trim="form.account" placeholder="请输入账号" tabindex="1" type="text" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="form.password"
            autocomplete="new-password"
            placeholder="请输入密码"
            tabindex="2"
            type="password"
            show-password
            @keyup.enter="handleLogin"
          >
          </el-input>
        </el-form-item>
        <div class="opt">
          <el-checkbox v-model="form.isRememberPassword" label="记住密码" size="large" />
        </div>

        <el-button class="login-btn" :loading="loading" type="primary" @click="handleLogin">
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$row-height: 42px;
$font-size: 16px;

.login-container {
  position: relative;
  height: 100vh;
  background: url('@/assets/login_images/bg.webp') no-repeat;
  background-size: cover;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 350px;
  max-width: 750px;
  padding: 15px;
  background-color: #fbfbfb;
  border-radius: 10px;
  box-shadow:
    0 1px 2px -2px #00000029,
    0 3px 6px #0000001f,
    0 5px 12px 4px #00000017;
  transform: translate(-50%, -50%);
  .cover {
    padding: 32px 20px;
    img {
      width: 323px;
    }
  }

  .login-form {
    width: 300px;

    padding-right: 20px;
    .title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 500;
      line-height: 2.4;
      color: rgba(106, 106, 106, 1);
      text-align: center;
    }

    .login-btn {
      display: inherit;
      width: 100%;
      height: $row-height;
      margin-top: 20px;
      font-size: 15px;
      line-height: $row-height;
      border: 0;
      letter-spacing: 2px;
    }
    .opt {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1;
    }

    .show-password {
      position: absolute;
      top: 50%;
      right: 0;
      width: $font-size;
      height: $font-size;
      font-size: $font-size;
      transform: translateY(-50%);
    }

    :deep() {
      .el-form-item {
        padding-right: 0;
        margin-bottom: 20px;
      }

      .el-input {
        position: relative;
        &__wrapper {
          width: 100%;
        }
        input {
          height: $row-height;
          padding-left: 10px;
          font-size: $font-size;
          line-height: $row-height;
          border: 0;
        }

        &__suffix-inner {
          .el-input__password {
            font-size: 16px;
          }
        }
      }
      .el-button {
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button__text--expand {
          letter-spacing: 0;
        }
        .is-loading {
          font-size: $font-size;
        }
      }

      .el-checkbox {
        height: 16px;
      }
    }
  }
}
</style>
