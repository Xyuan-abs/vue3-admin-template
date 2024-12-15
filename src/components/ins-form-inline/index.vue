<!-- 
  名称：行内表单（查询搜索表单）
 -->
<script setup>
import InsSelect from '../ins-form/components/select/index.vue'

import useSetPlaceholder from '../ins-form/composables/useSetPlaceholder'

const props = defineProps({
  dynamicForm: {
    type: Object,
    default: () => ({
      form: [
        {
          name: 'input',
          label: '标题',
          value: '12121',
          element: 'input',
        },
        {
          name: 'select',
          label: '标题',
          element: 'select',
          value: null,
          options: [
            {
              label: '标题',
              value: 'input',
            },
          ],
        },
      ],
    }),
  },
  searchParams: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: { type: Number, default: 70 },
  showLabel: { type: Boolean, default: true },
})
const emit = defineEmits(['update:searchParams', 'submit'])

const searchParamsVM = ref({})
const dynamicFormRef = ref(null)
const { getPlaceholder } = useSetPlaceholder()

watch(
  () => props.searchParams,
  (newValue) => {
    searchParamsVM.value = props.dynamicForm.form.reduce((prev, cur) => {
      const key = cur.name
      let value

      if (cur.valueMap) {
        value = cur.valueMap.map((d) => newValue[d])
      } else {
        value = newValue[key]
      }

      return Object.assign({}, prev, {
        [key]: value,
      })
    }, {})
  },
  { deep: true, immediate: true }
)

// 更新v-model
const updateValue = () => {
  const result = props.dynamicForm.form.reduce((prev, cur) => {
    const key = cur.name
    const value = searchParamsVM.value[key]
    let data

    if (value || value === 0) {
      if (Array.isArray(value) && cur.valueMap) {
        data = cur.valueMap.reduce(
          (p, c, i) =>
            Object.assign({}, p, {
              [c]: value[i],
            }),
          {}
        )
      } else {
        data = {
          [key]: value,
        }
      }
    }

    return Object.assign({}, prev, data)
  }, {})

  console.log('result', result)

  emit('update:searchParams', result)
}

// 提交
const submit = () => {
  updateValue()
  emit('submit')
}

// 重置
const resetForm = () => {
  dynamicFormRef.value.resetFields()
  updateValue()
}

// 是否折叠
const foldLimit = 3
const isFold = ref(true)
const handleChangeFold = () => {
  isFold.value = !isFold.value
}

defineExpose({
  resetForm,
})
</script>

<template>
  <div class="form-inline">
    <el-form ref="dynamicFormRef" inline :model="searchParamsVM">
      <el-form-item
        v-for="(formItem, index) in dynamicForm.form"
        v-show="(index < foldLimit || !isFold) && formItem.isShow !== false"
        :key="'formItem' + index"
        :label="showLabel ? formItem.label : ''"
        :prop="formItem.name"
      >
        <!-- input -->
        <el-input
          v-if="formItem.element === 'input'"
          v-model="searchParamsVM[formItem.name]"
          :placeholder="getPlaceholder(formItem)"
          v-bind="formItem.attrs"
        />

        <!-- select -->
        <ins-select
          v-if="formItem.element === 'select'"
          v-model="searchParamsVM[formItem.name]"
          :form-item="formItem"
          :placeholder="getPlaceholder(formItem)"
          v-bind="formItem.attrs"
        />

        <!-- date-picker -->
        <el-date-picker
          v-if="formItem.element === 'date-picker'"
          v-model="searchParamsVM[formItem.name]"
          clearable
          end-placeholder="终止日期"
          :placeholder="getPlaceholder(formItem)"
          start-placeholder="起始日期"
          type="date"
          v-bind="formItem.attrs"
        />
      </el-form-item>

      <el-form-item :class="{ 'is-full': dynamicForm.form.length > foldLimit && !isFold }">
        <el-button icon="Search" type="primary" @click="submit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button
          v-if="dynamicForm.form.length > foldLimit"
          text
          type="primary"
          @click="handleChangeFold"
        >
          <span v-if="isFold">展开</span>
          <span v-else>合并</span>

          <el-icon class="icon-dropdown" :class="{ 'icon-dropdown-active': !isFold }">
            <ArrowDown />
          </el-icon>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.form-inline {
  margin-top: -10px;
  :deep(.el-form-item) {
    margin: 10px 10px 0px 0 !important;
    .el-form-item__label {
      padding-left: 10px;
    }
    .el-input,
    .el-select {
      width: 200px;
    }
    .icon-dropdown {
      display: inline-block;
      transition: all 0.3s ease-in-out;
      &.icon-dropdown-active {
        transform: rotate(180deg);
      }
    }
  }
  .is-full {
    flex-shrink: 0;
    // width: 100%;
    :deep(.el-form-item__content) {
      justify-content: flex-end;
    }
  }
}
</style>
