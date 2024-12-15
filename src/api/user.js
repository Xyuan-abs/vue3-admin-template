import request from '@/utils/request'

/**
 * 登录接口
 * @param {Object} data data
 */
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}

/**
 * 获取用户信息
 * @param {Object} data data
 */
export function getUserInfo() {
  return request({
    url: '/api/user/getUserInfo',
    method: 'get',
  })
}
