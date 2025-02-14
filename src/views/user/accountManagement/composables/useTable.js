import useTable from '@/hooks/useTable'

import { mock } from '@/api/mock'

const mockFetch = () => {
  return mock(
    {},
    {
      list: [
        {
          id: 1,
          userName: 'admin',
          roleName: '管理员',
          nickName: '张三',
          phone: '123456789',
          email: 'admin@163.com',
          status: 0,
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
    { label: '账号', prop: 'userName' },
    { label: '角色', prop: 'roleName' },
    { label: '用户名', prop: 'nickName' },
    { label: '电话', prop: 'phone' },
    { label: '邮件', prop: 'email' },
    { label: '状态', prop: 'status' },
    { label: '更新时间', prop: 'updatedTime' },
    { label: '操作', prop: 'opt', attrs: { width: 240 } },
  ])

  return {
    tableHead,
    ...useTable(mockFetch, searchParams),
  }
}
