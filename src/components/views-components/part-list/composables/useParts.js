/**
 * 配件
 */
import useFetch from '@/hooks/useFetch'

import { getSparePartPriceByName } from '@/api/spare-part'

export default function (props, keys = []) {
  /**
   * 配件下拉数据
   */
  const partsOptions = ref([])

  /**
   * 配件下拉数据 缓存选中项
   */
  const partsCacheOptions = ref([])

  /** 获取配件下拉数据 */
  const { isFetching, executeFetch } = useFetch(getSparePartPriceByName, {
    onSuccess: (res) => {
      partsOptions.value =
        res.data.map((d) =>
          Object.assign({}, d, { label: d.materialName, value: d.materialName }),
        ) ?? []
    },
  })

  /**
   * 获取配件下拉数据
   */
  function fetchPartsOptions(keyword) {
    if (keyword) {
      const params = {
        serviceRecordId: props.serviceRecordId,
        sn: props.sn,
        name: keyword,
      }
      executeFetch(params)
    } else {
      partsOptions.value = []
    }
  }

  /**
   * 监听配件切换
   */
  function onPartsOptionsChange(value, row) {
    const item = partsOptions.value.find((d) => d.value === value)
    console.log('item', item)

    // 同步 row 的其他数据
    keys.forEach((key) => {
      row[key] = item[key]
    })

    console.log('row', row)
  }

  /**
   * 缓存选中的配件项
   * @param {string|number} value
   */
  function handleCachePartsOptionsByValue(value) {
    const item = partsOptions.value.find((d) => d.value === value)
    partsCacheOptions.value.push(item)
  }

  /**
   * 删除缓存的配件项
   * @param {string|number} value
   */
  function handleRemoveCachePartsOptionsByValue(value) {
    const index = partsCacheOptions.value.findIndex((d) => d.value === value)
    partsCacheOptions.value.splice(index, 1)
  }

  /**
   * 清空缓存的配件项
   */
  function clearCachePartsOptions() {
    partsCacheOptions.value = []
  }

  return {
    isFetching,
    partsOptions,
    partsCacheOptions,
    fetchPartsOptions,
    onPartsOptionsChange,
    handleCachePartsOptionsByValue,
    handleRemoveCachePartsOptionsByValue,
    clearCachePartsOptions,
  }
}
