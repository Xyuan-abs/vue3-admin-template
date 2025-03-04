import { mock } from '@/api/mock'

import useForm from '@/hooks/useForm'
import { DIALOG_TYPE } from '@/hooks/useDialog'
import { ELEMENT } from '@/components/ins-form/composables/useElement'

const mockAdd = (...arg) => {
  return mock(
    ...arg,
    'https://fastly.picsum.photos/id/20/200/300.jpg?hmac=DFzxrn8j8N0vtdAloI4hYTGWP-nNrDqMbVcWjF2BLwA',
  )
}

const mockEdit = (...arg) => {
  return mock(
    ...arg,
    'https://fastly.picsum.photos/id/20/200/300.jpg?hmac=DFzxrn8j8N0vtdAloI4hYTGWP-nNrDqMbVcWjF2BLwA',
  )
}

/**
 * 弹窗-表单
 * @returns
 */
export default function (row, dialogType) {
  // 表单
  const dynamicForm = reactive({
    form: [
      {
        name: 'name',
        label: '网点名称',
        value: '',
        element: ELEMENT.INPUT,
        rules: [
          { required: true },
          {
            validator: (rule, value, callback) => {
              if (value.length < 2) {
                callback(new Error('长度不能小于2'))
              } else if (value.length > 10) {
                callback(new Error('长度不能大于10'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        componentProps: {
          isTrim: false,
        },
      },
      {
        name: 'companyId',
        label: '网点公司',
        value: '',
        element: ELEMENT.SELECT,
        options: [
          { label: '公司1', value: '1' },
          { label: '公司2', value: '2' },
          { label: '公司3', value: '3' },
        ],
        rules: [{ required: true }],
        events: {
          change: (value) => {
            console.log('change', value)
          },
          blur: (value) => {
            console.log('blur', value)
          },
        },
        linkage: {
          person: {
            value: () => '',
            // hidden: (value) => value === '2',
            required: (value) => value === '2',
            disabled: (value) => value === '1',
            // isShow: (value) => value === '1',
            custom: (value) => ({ value: '' }),
            params: (value) => value,
          },
        },
      },

      {
        name: 'phone',
        label: '负责人电话',
        value: '',
        element: ELEMENT.INPUT,
        attrs: { type: 'number' },
        rules: [{ required: true }],
      },
      {
        name: 'person',
        label: '维修人',
        value: '',
        element: ELEMENT.SELECT,
        options: [],
        componentProps: {
          api: (params) => {
            return Promise.resolve([
              { label: '维修人1', value: '1' },
              { label: '维修人2', value: '2' },
            ])
          },
          params: '',
        },
        attrs: { type: 'number', disabled: false },
        rules: [{ required: true }],
      },
      {
        name: 'count',
        label: '数量',
        value: [],
        valueMap: ['count', 'unit'],
        element: ELEMENT.NUMBER_WITH_UNIT,
        options: [
          { label: '个', value: '1' },
          { label: '箱', value: '2' },
        ],
        attrs: [{ max: 100, min: 0 }],
        rules: [{ required: true }],
      },
      {
        name: 'address',
        label: '地址',
        value: '',
        element: ELEMENT.TREE_SELECT,
        options: [],
        componentProps: {
          api: (params) => {
            return Promise.resolve([
              {
                label: '福建省',
                value: 'fjs',
                children1: [
                  {
                    label: '福州市',
                    value: 'fz',
                    children1: [
                      { label: '鼓楼区', value: 'gl' },
                      { label: '台江区', value: 'tj' },
                    ],
                  },
                ],
              },
            ])
          },
          params: '',
          immediate: true,
          childrenKey: 'children1',
        },
        attrs: { type: 'number', disabled: false },
        rules: [{ required: true }],
      },
    ],
  })

  // 保存接口
  function saveFun(data) {
    const apiMap = {
      [DIALOG_TYPE.ADD]: mockAdd,
      [DIALOG_TYPE.EDIT]: mockEdit,
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
