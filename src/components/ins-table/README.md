# InsTable

## 一、使用示例

```vue
<script setup>
import InsForm from '@/components/ins-form/index'
import { ELEMENT } from '@/components/ins-form/composables/useElement'

const InsFormRef = ref(null)

/** 表格 */
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

/** 表格数据 */
const tableData = ref([])
</script>

<template>
  <ins-table class="direction-row" :table-data="tableData" :table-head="tableHead"></ins-table>
</template>
```

## 二、InsTable 的 props

| 属性名    | 类型    | 默认值 | 说明         |
| --------- | ------- | ------ | ------------ |
| tableHead | Array   | null   | 表格头部配置 |
| tableData | Array   | null   | 表格数据配置 |
| loading   | Boolean | false  | loading      |
| selection | Boolean | false  | 多选         |
| hasIndex  | Boolean | false  | 序号         |
| expand    | Boolean | false  | 展开行       |
| drag      | Boolean | false  | 是否可拖拽   |
| align     | String  | center | 对齐         |

## 三、具体表单项配置

### 3.1 tableHead

| 属性名  | 类型                | 说明                                                     |
| ------- | ------------------- | -------------------------------------------------------- |
| label   | String              | 表头名称                                                 |
| prop    | String              | 表单项名称                                               |
| attrs   | Object              | el-table-column 的属性                                   |
| tags    | Object              | 是否以标签形式展示                                       |
| tooltip | Boolean             | 是否超出隐藏                                             |
| copy    | Boolean             | 是否点击拷贝                                             |
| options | Array\<OptionsItem> | 选项格式化                                               |
| date    | String              | 格式化为日期，默认格式化模板为 '{y}-{m}-{d} {h}:{i}:{s}' |
| fmt     | Function            | 自定义格式化，()=>''                                     |

---

#### tags

一般配合 options 使用

| key          | value                                                      |
| ------------ | ---------------------------------------------------------- |
| 表格单元的值 | el-tag 的 type 值(primary、success、info、warning、danger) |

eg:

```js
const tableHead = reactive([
  {
    label: '状态',
    prop: 'status',
    options:[
      { label:'成功', value:1 },
      { label:'失败', value:2 },
    ]
    tag:{
      1:'success',
      2:'danger'
    }
  },
])
```

---

#### OptionsItem

| 字段  | 说明           |
| ----- | -------------- |
| label | 展示的值       |
| value | 赋值给表单的值 |

---

## 四、InsTable 的 expose

| 方法名   | 参数                  | 说明                                                             |
| -------- | --------------------- | ---------------------------------------------------------------- |
| dispatch | (name:string, ...arg) | 调用 el-table 暴露的方法，name 为事件名，...arg 为方法所需的参数 |

## 五、插槽

| 五、插槽名 | 说明           |
| ---------- | -------------- |
| empty      | 表格数据为空时 |
