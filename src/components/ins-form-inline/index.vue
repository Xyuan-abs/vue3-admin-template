<!-- 
  名称：行内表单（查询搜索表单）
  版本：1.0.0 
  作者：Xyuan
  时间：2023年2月13日13:23:44
 -->
<script setup>
import insSelect from '../ins-form/components/select/index.vue'
import SelectLoadmore from '../ins-form/components/select-loadmore/index.vue'

import useSetPlaceholder from '../ins-form/composables/useSetPlaceholder'

import { Search } from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'

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
    required: true,
  },
  labelWidth: { type: Number, default: 70 },
  showLabel: { type: Boolean, default: true },
})

const dynamicFormRef = ref(null)
const emit = defineEmits(['update:searchParams', 'submit'])
const searchParamsVM = useVModel(props, 'searchParams', emit) // 值的双向绑定
const { getPlaceholder } = useSetPlaceholder()

// 提交
const submit = () => {
  const formData = props.dynamicForm.form.reduce(
    (prev, cur) => Object.assign(prev, { [cur.name]: toRaw(cur.value) }),
    {}
  )

  Object.keys(formData).forEach((key) => {
    const value = formData[key]
    if (value || value === 0) {
      searchParamsVM.value[key] = value
    } else {
      delete searchParamsVM.value[key]
    }
  })

  // emit('update:searchParams', formData)
  emit('submit', formData)
  console.log('formData', formData)
}

// 重置
const resetForm = () => {
  dynamicFormRef.value.resetFields()
}

// 是否折叠
const foldLimit = 3
const isFold = ref(true)
const handleChangeFold = () => {
  isFold.value = !isFold.value
}
</script>

<template>
  <div class="form-inline">
    <el-form ref="dynamicFormRef" inline :model="dynamicForm">
      <el-form-item
        v-for="(formItem, index) in dynamicForm.form"
        v-show="index < foldLimit || !isFold"
        :key="'formItem' + index"
        :label="showLabel ? formItem.label : ''"
        :prop="'form[' + index + '].value'"
      >
        <!-- input -->
        <el-input
          v-if="formItem.element === 'input'"
          v-model="formItem.value"
          :placeholder="getPlaceholder(formItem)"
          v-bind="formItem.attrs"
        />

        <!-- select -->
        <ins-select
          v-if="formItem.element === 'select'"
          v-model:modelValue="formItem.value"
          :form-item="formItem"
          :placeholder="getPlaceholder(formItem)"
          v-bind="formItem.attrs"
        />

        <!-- 分页、远程搜索 select -->
        <select-loadmore
          v-if="formItem.element === 'select-loadmore'"
          v-model:modelValue="formItem.value"
          :form-item="formItem"
          :index="index"
          :placeholder="getPlaceholder(formItem)"
          v-bind="formItem.attrs"
        />

        <!-- date-picker -->
        <el-date-picker
          v-if="formItem.element === 'date-picker'"
          v-model="formItem.value"
          clearable
          end-placeholder="终止日期"
          :placeholder="getPlaceholder(formItem)"
          start-placeholder="起始日期"
          type="date"
          v-bind="formItem.attrs"
        />
      </el-form-item>

      <el-form-item :class="{ 'is-full': dynamicForm.form.length > foldLimit && !isFold }">
        <el-button :icon="Search" type="primary" @click="submit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button
          v-if="dynamicForm.form.length > foldLimit"
          text
          type="primary"
          @click="handleChangeFold"
        >
          <span v-if="isFold">展开</span>
          <span v-else>合并</span>
          <vab-icon
            class="vab-dropdown"
            :class="{ 'vab-dropdown-active': isFold }"
            icon="arrow-up-s-line"
          />
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
