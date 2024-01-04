import request from '@/utils/request'

/**
 * 登录接口
 * @param {Object} data data
 */
export function login(data) {
  return request({
    url: '/api/login',
    method: 'POST',
    data,
  })
}
