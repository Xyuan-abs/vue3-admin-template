import { mock } from '@/api/mock.js'

import useTable from '@/hooks/useTable'

/**
 * 表格
 * @returns
 */
export default function (EditDialogRef) {
  // 表格
  const tableHead = reactive([
    { label: '添加时间', prop: '添加时间' },
    { label: '关注人姓名', prop: '关注人姓名' },
    { label: '关注人手机', prop: '关注人手机' },
    { label: '被关机机器SN', prop: '被关机机器SN' },
    { label: '被关注物流单号', prop: '被关注物流单号' },
    { label: '备注', prop: '备注' },
  ])

  const api = {
    fetchDataApi: mock,
  }

  return {
    tableHead,
    ...useTable(api, EditDialogRef),
  }
}
