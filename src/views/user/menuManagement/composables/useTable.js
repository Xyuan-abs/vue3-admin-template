import useTable from '@/hooks/useTable'

import { mock } from '@/api/mock'

const mockFetch = () => {
  return mock({}, [
    {
      menuId: 1,
      title: '菜单1',
      code: '/menu1',
      isMenu: '是',
      isShow: '是',
      sort: 1,
      updatedTime: '2023-01-01 12:00:00',
      children: [
        {
          menuId: 2,
          title: '菜单1-1',
          code: '/menu1-1',
          isMenu: '是',
          isShow: '是',
          sort: 1,
          updatedTime: '2023-01-01 12:00:00',
        },
      ],
    },
  ])
}

/**
 * 表格
 * @returns
 */
export default function (searchParams) {
  // 表格
  const tableHead = reactive([
    { label: '菜单ID', prop: 'menuId' },
    { label: '菜单标题', prop: 'title' },
    { label: '前端路由', prop: 'code' },
    { label: '是否菜单', prop: 'isMenu' },
    { label: '是否显示', prop: 'isShow' },
    { label: '排序', prop: 'sort' },
    { label: '更新时间', prop: 'updatedTime' },
    { label: '操作', prop: 'opt', attrs: { width: 240 } },
  ])

  return {
    tableHead,
    ...useTable(mockFetch, searchParams, { hasPage: false }),
  }
}
