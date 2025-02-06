import useTable from '@/hooks/useTable'

import { mock } from '@/api/mock'

const mockFetch = () => {
  return mock(
    {},
    {
      list: [
        {
          id: 1,
          name: '网点名称',
          company: '公司1',
          companyId: '1',
          city: '地址',
          principal: '网点负责人',
          phone: '网点负责人电话',
          serviceScopeTextList: ['服务范围1', '服务范围2'],
          number: 10,
          person: '1',
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
    { label: '网点名称', prop: 'name' },
    { label: '网点公司名称', prop: 'company' },
    {
      label: '地址',
      prop: 'city',
      fmt: ({ province = '', city = '', region = '', address = '' }) =>
        `${province}${city}${region}${address}`,
    },
    { label: '网点负责人', prop: 'principal' },
    { label: '网点负责人电话', prop: 'phone' },
    {
      label: '服务范围',
      prop: 'serviceScopeTextList',
      fmt: ({ serviceScopeTextList }) => serviceScopeTextList?.join('、') ?? '',
    },
    { label: '维修员人数', prop: 'number' },
    { label: '操作', prop: 'opt', isSlot: true, attrs: { width: 240 } },
  ])

  return {
    tableHead,
    ...useTable(mockFetch, searchParams),
  }
}
