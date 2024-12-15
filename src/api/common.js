import request from '@/utils/request'

/* -------------- 行政区域 -------------- */

/**
 * 获取行政区域列表
 */
export function getCity(params) {
  return request({
    url: `/api/sysRegion/list`,
    method: 'get',
    params,
  })
}

/* -------------- 字典 -------------- */

/**
 * 根据字典类型编码获取字典值集合
 * @param {string} code
 * @returns
 */
export function getDictionaryByCode(code) {
  return new Promise((resolve) => {
    request({
      url: `/api/sysDictData/dataList/${code}`,
      method: 'get',
    })
      .then((res) => {
        if (res?.success) {
          resolve(
            res?.data?.map((d) => ({
              label: d.value,
              value: d.code,
            })) ?? []
          )
        } else {
          resolve([])
        }
      })
      .catch((e) => {
        console.error(e)
        resolve([])
      })
  })
}
