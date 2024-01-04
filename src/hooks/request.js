import { reactive, toRefs } from 'vue'

/**
 * 统一请求
 * @param {promise} api
 * @param {object} params
 * @param {function} fmt
 * @returns 属性值为响应式变量的普通对象
 */
export function useRequest(api, params, fmt) {
  let result = reactive({
    loading: false,
    data: null,
    error: null,
  })

  //loading-start
  result.loading = true
  //获取前数据
  api(params)
    //成功
    .then((res) => {
      //set data
      let resData = res.data
      result.data = fmt ? fmt(resData) : resData

      //loading-end
      result.loading = false
    })
    //失败
    .catch((e) => {
      //set error
      result.error = e
      console.error(e)

      //loading-end
      result.loading = false
    })

  return toRefs(result)
}
