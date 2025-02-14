import { mock } from '@/api/mock'

import useForm from '@/hooks/useForm'
import { DIALOG_TYPE } from '@/hooks/useDialog'
import { ELEMENT } from '@/components/ins-form/composables/useElement'

/**
 * 弹窗-表单
 * @returns
 */
export default function (row, dialogType) {
  // 表单
  const dynamicForm = reactive({
    form: [
      {
        name: 'pid',
        label: '父级菜单',
        value: '',
        element: ELEMENT.TREE_SELECT,
        options: [],
        attrs: {
          'check-strictly': true,
          'show-checkbox': true,
          'default-expanded-keys': [0],
          'node-key': 'id',
        },
        componentProps: {
          api: () =>
            Promise.resolve({
              data: [
                {
                  id: 0,
                  label: '顶层',
                  children: [
                    { label: '一级菜单', id: 1, children: [{ label: '二级菜单', id: 2 }] },
                    { label: '二级菜单', id: 3 },
                    { label: '三级菜单', id: 4 },
                  ],
                },
              ],
            }),
          immediate: true,
        },
        rules: [{ required: true }],
      },
      {
        name: 'title',
        label: '菜单标题',
        value: '',
        element: ELEMENT.INPUT,
        rules: [{ required: true }],
        componentProps: { isTrim: true },
      },
      {
        name: 'url',
        label: '路由组件',
        value: '',
        element: ELEMENT.INPUT,
        componentProps: { isTrim: true },
        rules: [{ required: true }],
      },
      {
        name: 'code',
        label: '路由标识',
        value: '',
        element: ELEMENT.INPUT,
        componentProps: { isTrim: true },
        rules: [{ required: true }],
      },
      {
        name: 'isMenu',
        label: '是否菜单',
        value: 1,
        element: ELEMENT.RADIO,
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
        rules: [{ required: true }],
      },
      {
        name: 'isShow',
        label: '是否显示',
        value: 1,
        element: ELEMENT.RADIO,
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
        rules: [{ required: true }],
      },
      {
        name: 'icon',
        label: '菜单图标',
        value: '',
        element: ELEMENT.INPUT,
        componentProps: { isTrim: true },
      },
      {
        name: 'sort',
        label: '排序',
        value: '',
        element: ELEMENT.INPUT,
        attrs: { type: 'number' },
      },
      {
        name: 'remark',
        label: '备注',
        value: '',
        element: ELEMENT.INPUT,
      },
    ],
  })

  // 保存接口
  function saveFun(data) {
    const apiMap = {
      [DIALOG_TYPE.ADD]: mock,
      [DIALOG_TYPE.EDIT]: mock,
    }

    const params = {
      ...(dialogType.value === DIALOG_TYPE.EDIT ? { id: row.value.id } : {}),
      ...data,
    }

    return apiMap[dialogType.value](params)
  }

  return {
    dynamicForm,
    ...useForm(saveFun),
  }
}
