/**
 * 产品
 */

import request from '@/utils/request'

/**
 * 分页获取列表
 * @param {Object} params
 */
export function getListByPage(params) {
  return request({
    url: '/api/production/getListByPage',
    method: 'get',
    params,
  })
}

/**
 * 获取列表
 * @param {Object} params
 */
export function getList(params) {
  return request({
    url: '/api/production/getList',
    method: 'get',
    params,
  })
}

/**
 * 添加产品
 * @param {Object} data
 */
export function addProduction(data) {
  return request({
    url: '/api/production/add',
    method: 'post',
    data,
  })
}

/**
 * 编辑产品
 * @param {Object} data
 */
export function editProduction(data) {
  return request({
    url: '/api/production/edit',
    method: 'put',
    data,
  })
}

/**
 * 删除产品
 * @param {Object} params
 */
export function deleteProduction(params) {
  return request({
    url: '/api/production/delete',
    method: 'delete',
    params,
  })
}

/**
 * 上下架
 * @param {Object} data
 */
export function changeStatus(data) {
  return request({
    url: '/api/production/changeStatus',
    method: 'put',
    data,
  })
}

/**
 * 文件上传
 * @param {Object} data
 */
export function upload(data) {
  return request({
    url: '/api/production/upload',
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data,
  })
}
