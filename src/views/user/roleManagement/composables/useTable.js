import useTable from '@/hooks/useTable'

import { mock } from '@/api/mock'

const mockFetch = () => {
  return mock(
    {},
    {
      list: [
        {
          id: 1,
          roleName: '管理员',
          updatedTime: '2021-01-01 12:00:00',
        },
      ],
      total: 0,
    },
  )
}

/**
 * 表格
 * @returns
 */
export default function (searchParams) {
  // 表格
  const tableHead = reactive([
    { label: '角色名称', prop: 'roleName' },
    { label: '更新时间', prop: 'updatedTime' },
    { label: '操作', prop: 'opt', attrs: { width: 240 } },
  ])

  return {
    tableHead,
    ...useTable(mockFetch, searchParams),
  }
}
