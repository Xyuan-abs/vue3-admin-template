import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

import store from '@/store'
import vueRouter from '@/router'
import { getToken } from '@/utils/auth'

const _Message = Message
let MessageBoxIndex = null

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }

    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data

    res.code === 200
    res.message = res.msg

    // if (true) {
    //   res.code = 200
    // }
    // return res
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      // 301: token无效;
      if (res.code === 301) {
        // to re-login
        if (!MessageBoxIndex) {
          MessageBoxIndex = MessageBox.confirm('账号信息已失效，请重新登录', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              MessageBoxIndex = null
              store.dispatch('user/resetToken').then(() => {
                vueRouter.push({
                  path: '/login',
                })
              })
            })
            .catch(() => {
              MessageBoxIndex = null
            })
        }
      } else {
        _Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000,
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (res.data?.login_status === 4) {
        store.commit('user/SET_STATUS', res.data.login_status)
        store.commit('user/SET_STATUS_MSG', res.msg)
      }
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    let msg = error.response?.data?.message || error.response?.data?.msg || ''

    _Message({
      message: msg && msg.length < 50 ? msg : error.message,
      type: 'error',
      duration: 2 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
