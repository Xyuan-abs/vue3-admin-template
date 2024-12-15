/**
 * 轮播图
 */

import request from '@/utils/request'

/**
 * 获取列表
 * @param {Object} params
 */
export function getList(params) {
  return request({
    url: '/api/banner/getList',
    method: 'get',
    params,
  })
}

/**
 * 添加轮播图
 * @param {Object} data
 */
export function addBanner(data) {
  return request({
    url: '/api/banner/add',
    method: 'post',
    data,
  })
}

/**
 * 编辑轮播图
 * @param {Object} data
 */
export function editBanner(data) {
  return request({
    url: '/api/banner/edit',
    method: 'put',
    data,
  })
}

/**
 * 删除轮播图
 * @param {Object} params
 */
export function deleteBanner(params) {
  return request({
    url: '/api/banner/delete',
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
    url: '/api/banner/changeStatus',
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
    url: '/api/banner/upload',
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data,
  })
}
