import { isFunction } from '@/utils/validate'

/**
 * 接口请求
 * @param { Promise<any>} api
 * @param {Object} options
 */
export default function (
  api,
  {
    name = '请求',
    params = {},
    immediate = false,
    showSuccessMsg = false,
    customSuccessMsg = '',
    showErrorMsg = true,
    customErrorMsg = '',
    onSuccess,
    onError,
  } = {},
) {
  const $baseMessage = inject('$baseMessage')

  /** 是否请求中 */
  const isFetching = ref(false)
  /** 是否请求成功 */
  const isSuccess = ref(false)
  /** isFetching状态改变的延迟  */
  const fetchingDelay = 66
  /** 延迟实例 */
  let timer = null

  function executeFetch(_params) {
    console.log('params ', _params)
    // 延迟loading
    timer = setTimeout(() => {
      isFetching.value = true
    }, fetchingDelay)

    return new Promise((resolve) => {
      api(_params)
        .then((res) => res)
        .catch((e) => ({ success: false, msg: e.message }))
        .then((res) => {
          resolve(res)
          console.log('res ', res)

          isFetching.value = false
          isSuccess.value = !!res.success
          clearTimeout(timer)

          if (res.success) {
            if (showSuccessMsg) {
              $baseMessage({ message: customSuccessMsg || `已${name}`, type: 'success' })
            }
            onSuccess && isFunction(onSuccess) && onSuccess(res, _params)
          } else {
            if (showErrorMsg) {
              $baseMessage({ message: res?.msg || customErrorMsg || `${name}失败`, type: 'error' })
            }
            onError && isFunction(onError) && onError(res)
          }
        })
    })
  }

  if (immediate) {
    executeFetch(params)
  }

  return {
    isFetching,
    isSuccess,
    executeFetch,
  }
}
