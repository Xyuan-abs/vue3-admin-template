# InsForm

## 一、使用示例

```vue
<script setup>
import InsForm from '@/components/ins-form/index'
import { ELEMENT } from '@/components/ins-form/composables/useElement'


const InsFormRef = ref(null)

const dynamicForm = reactive({
  form: [
    {
      name: 'name',
      label: '网点名称',
      value: '',
      element: ELEMENT.INPUT,
      rules: [{ required: true }],
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
      events: {},
      linkage: {
        person: {
          value: () => '',
          // hidden: (value) => value === '2',
          required: (value) => value === '2',
          disabled: (value) => value === '1',
          // isShow: (value) => value === '1',
          params: (value,oldParams) => {
            ...oldParams,
            keyword:value
          },
          custom: (value) => ({ value: '' }),
        },
      },
    },
    {
      name: 'person',
      label: '维修人',
      value: '',
      element: ELEMENT.SELECT,
      options: [],
      componentProps: {
        // 模拟请求接口
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
  ],
})

// 设置表单值
function setFormValue() {
  const data = {
    name: '网点1',
    companyId: '1',
    person: '1',
  }
  InsFormRef.value.setFormValue(data)
}

// 校验整个表单
function validateForm() {
  InsFormRef.value.validateForm()

}

// 校验指定 name 的表单项
function validateField() {
  InsFormRef.value.validateField('name')
}


// 清除指定 name 的校验
function clearValidate() {
  InsFormRef.value.clearValidate('name')
}


// 重置指定 name 的表单项
function resetFields() {
  InsFormRef.value.resetFields('name')
}

// 重置表单
function resetForm() {
  InsFormRef.value.resetForm()
}

// 校验表单并获取值
function validateAndGetFormValue(){
  const formData = await InsFormRef.value.toSaveData() // 校验不通过 返回false
}
</script>

<template>
  <ins-form ref="InsFormRef" :cols="2" :dynamic-form="dynamicForm" :label-width="133" />
</template>
```

## 二、InsForm 的 props

| 属性名      | 类型   | 说明                |
| ----------- | ------ | ------------------- |
| dynamicForm | Object | 表单项配置          |
| labelWidth  | Number | label宽度           |
| cols        | Number | 表单项列数，默认为1 |

## 三、具体表单项配置

### 3.1 通用配置

| 属性名         | 类型                | 说明                                                                     |
| -------------- | ------------------- | ------------------------------------------------------------------------ |
| name           | String              | 表单项名称                                                               |
| label          | String              | 表单项标签                                                               |
| value          | String              | 表单项值                                                                 |
| valueMap       | Array               | value为数组时的 value格式化 value:[1,2],valueMap:['a','b'] -> { a:1,b:2} |
| valueFmt       | Function            | (value)=>({a:value}), 在提交时 格式化value                               |
| element        | Object              | 表单项类型                                                               |
| options        | Array\<OptionsItem> | 选项                                                                     |
| rules          | Array               | 表单项校验规则                                                           |
| cols           | Number \| 'max'     | 多列表单时，当前表单项占据的列数。传'max'占一整行                        |
| attrs          | Object/Array        | 表单项属性（element原生属性）                                            |
| componentProps | Object              | 表单项属性（组件自定义）                                                 |
| events         | Object              | 表单项事件                                                               |
| linkage        | Object              | 表单项联动配置                                                           |
| hidden         | Boolean             | 是否隐藏当前表单项 ，隐藏后获取formData时忽略                            |
| isShow         | Boolean             | 是否展示当前表单项 ，隐藏后获取formData时不忽略                          |
| ignoreOnSave   | Boolean             | 是否在提交时忽略当前字段                                                 |
| tip            | String              | 表单项说明                                                               |
| hiddenLabel    | Boolean             | 是否不展示label                                                          |

---

#### element

| 类型              | 说明                   |
| ----------------- | ---------------------- |
| SLOT              | 插槽                   |
| TEXT              | 纯文本                 |
| INPUT             | 输入框                 |
| PASSWORD          | 密码框                 |
| SELECT            | 下拉选择框             |
| CASCADER          | 级联选择框             |
| TREE_SELECT       | 树形选择框             |
| DATE_PICKER       | 日期选择框             |
| NUMBER_WITH_UNIT  | 带单位选项的数字输入框 |
| RADIO             | 单选框                 |
| CHECKBOX          | 复选框                 |
| FILE_LIST         | 文件列表上传           |
| SWITCH            | 开关                   |
| CITY              | 城市选择框             |
| RATE              | 评分                   |
| SINGLE_IMG_UPLOAD | 单张图片上传           |

---

#### OptionsItem

| 字段     | 说明           |
| -------- | -------------- |
| label    | 展示的值       |
| value    | 赋值给表单的值 |
| children | 子选项         |

---

#### componentProps

不同类型的表单项支持的自定义属性不同，详情参开对应的表单项说明。

---

#### events

支持 element-plus 对应的事件，示例如下：

```js
{
  name: 'name',
  label: '网点名称',
  value: '',
  element: ELEMENT.INPUT,
  events:{
    change:(formItem,index,...arg) => {},
    blur:(formItem,index,...arg) => {},
  }
}
```

---

#### linkage

表单联动，示例如下：

```js
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
  linkage: {
    // 要联动的表单项 name
    person: {
      // 联动的属性
      value: () => '',
      hidden: (value) => value === '2',
      required: (value) => value === '2',
      disabled: (value) => value === '1',
      isShow: (value) => value === '1',
      params: (value,oldParams) => {
        ...oldParams,
        keyword:value
      },
      custom: (value) => ({ value: '' }),
    },
  },
}
```

---

### 3.2 INPUT

#### componentProps

| 属性名 | 类型    | 说明             |
| ------ | ------- | ---------------- |
| isTrim | Boolean | 是否移除左右空格 |

---

### 3.3 SELECT、CASCADER、TREE_SELECT、RADIO、CHECKBOX

#### componentProps

| 属性名      | 类型     | 说明                                                                            |
| ----------- | -------- | ------------------------------------------------------------------------------- |
| api         | Function | 获取选项的接口，可返回对象或者数组                                              |
| params      | Object   | 获取选项的接口参数                                                              |
| keywordKey  | String   | 远程搜索时，输入关键字对应的key                                                 |
| immediate   | Boolean  | 是否立即获取                                                                    |
| resultField | String   | api返回对象时，获取到选项数组的key, 默认为data,多个层级以 . 拼接，如：data.list |
| labelKey    | String   | 选项 label 对应的 key                                                           |
| valueKey    | String   | 选项 value 对应的 key                                                           |
| childrenKey | String   | 选项 children 对应的 key                                                        |

---

### 3.4 SINGLE_IMG_UPLOAD、FILE_LIST

#### componentProps

| 属性名      | 类型     | 说明                                                                             |
| ----------- | -------- | -------------------------------------------------------------------------------- |
| api         | Function | 上传接口                                                                         |
| resultField | String   | 上传后的图片地址对应的key, 获取到选项数组的key, 默认为data.url,多个层级以 . 拼接 |
| baseUrl     | String   | import.meta.env.VUE_APP_BASE_URL,图片地址前缀                                    |

---

## 四、InsForm 的 expose

| 方法名           | 参数                       | 说明                            |
| ---------------- | -------------------------- | ------------------------------- |
| setFormItemValue | (name:string, data:Object) | 回显单个表单项                  |
| setFormValue     | (data:Object)              | 回显整个表单                    |
| getSaveData      |                            | 获取表单提交数据                |
| toSaveData       |                            | 校验表单并获取值                |
| submitForm       |                            | 校验表单,通过后触发 submit 事件 |
| validateField    | (name:string)              | 校验指定 name 的表单项          |
| validateForm     |                            | 表单校验                        |
| clearValidate    | (name:string)              | 清除指定 name 的校验            |
| resetFields      | (name:string)              | 重置指定 name 的表单项          |
| resetForm        |                            | 重置表单                        |
