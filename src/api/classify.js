/**
 * 分类
 */

import request from '@/utils/request'

/**
 * 分页获取列表
 * @param {Object} params
 */
export function getListByPage(params) {
  return request({
    url: '/api/classify/getListByPage',
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
    url: '/api/classify/getList',
    method: 'get',
    params,
  })
}

/**
 * 添加分类
 * @param {Object} data
 */
export function addClassify(data) {
  return request({
    url: '/api/classify/add',
    method: 'post',
    data,
  })
}

/**
 * 编辑分类
 * @param {Object} data
 */
export function editClassify(data) {
  return request({
    url: '/api/classify/edit',
    method: 'put',
    data,
  })
}

/**
 * 删除分类
 * @param {Object} params
 */
export function deleteClassify(params) {
  return request({
    url: '/api/classify/delete',
    method: 'delete',
    params,
  })
}

/**
 * 文件上传
 * @param {Object} data
 */
export function upload(data) {
  return request({
    url: '/api/classify/upload',
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data,
  })
}
