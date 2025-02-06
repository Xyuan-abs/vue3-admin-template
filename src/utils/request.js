import axios from 'axios'

import { gp } from '@/plugins/index'

import { getToken } from '@/utils/auth'
import { useUserStore } from '@/store/modules/user'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_WEB_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = getToken()
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = token
    }

    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
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
    const userStore = useUserStore()

    const res = response.data

    res.code === 200
    res.message = res.msg

    // if (true) {
    //   res.code = 200
    // }
    // return res
    // if the custom code is not 20000, it is judged as an error.
    // 401: token无效;
    if (res.code === 401) {
      // to re-login
      gp.$baseConfirm({
        content: '账号信息已失效，请重新登录',
      }).then(() => {
        userStore.logout()
      })
    }
    return res
  },
  (error) => {
    console.log('err' + error) // for debug
    const msg = error.response?.data?.message || error.response?.data?.msg || ''

    gp.$baseMessage({
      message: msg && msg.length < 50 ? msg : error.message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default service
