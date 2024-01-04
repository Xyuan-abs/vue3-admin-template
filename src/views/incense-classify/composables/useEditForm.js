import { mock } from '@/api/mock.js'

import useEditForm from '@/hooks/useEditForm.js'

/**
 * 弹窗-表单
 * @returns
 */
export default function (InsFormRef, row) {
  // 表单
  const form = [
    {
      name: '关注人姓名',
      label: '关注人姓名',
      value: '',
      element: 'input',
      rules: [{ required: true }],
    },
    {
      name: '关注人手机',
      label: '关注人手机',
      value: '',
      element: 'input',
      rules: [{ required: true }],
      tip: '注：不是客户手机号，是关注人（填写人的手机号）',
    },
    {
      name: '被关注机器SN',
      label: '被关注机器SN',
      value: '',
      element: 'input',
      rules: [{ required: true }],
    },
    {
      name: '被关注物流单号',
      label: '被关注物流单号',
      value: '',
      element: 'input',
    },
    {
      name: '备注',
      label: '备注',
      value: [],
      element: 'input',
      attrs: { type: 'textarea', autosize: { minRows: 3, maxRows: 5 } },
    },
  ]

  return {
    ...useEditForm(form, InsFormRef, row, mock),
  }
}
