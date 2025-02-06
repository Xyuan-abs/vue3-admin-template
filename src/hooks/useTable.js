import useFetch from './useFetch'
import { isRef } from 'vue'

/**
 * 表格
 * @returns
 */
export default function (
  fetchDataApi,
  searchParams = {},
  { hasPage = true, page = 1, size = 10 } = {},
) {
  /** 分页 */
  const pagerParams = reactive({
    page,
    size,
    total: 0,
  })

  /** 表格数据 */
  const tableData = ref([])

  /** 获取表格数据 */
  const { isFetching, executeFetch } = useFetch(fetchDataApi, {
    onSuccess: (res) => {
      if (hasPage) {
        tableData.value = res.data?.list ?? []
        pagerParams.total = res.data?.total ?? 0
      } else {
        tableData.value = res.data
      }
    },
    onError: () => {
      tableData.value = []
      pagerParams.total = 0
    },
  })

  /** 重置分页 搜索数据 */
  function searchData() {
    pagerParams.page = 1
    fetchData()
  }

  /** 执行 获取表格数据 */
  function fetchData() {
    const { page, size } = pagerParams

    const params = {
      ...(hasPage ? { page, pageSize: size } : {}),
      ...(isRef(searchParams) ? searchParams.value : searchParams),
    }

    return executeFetch(params)
  }

  return {
    tableData,
    loading: isFetching,
    pagerParams,
    fetchData,
    searchData,
  }
}
