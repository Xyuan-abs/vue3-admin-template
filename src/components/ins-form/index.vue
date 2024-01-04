<!-- 
  名称：表单
  版本：1.0.0 
  作者：Xyuan
  时间：2023年2月13日13:23:44
 -->
<script setup>
import insInput from './components/input/index.vue'
import insSelect from './components/select/index.vue'
import insCheckbox from './components/checkbox/index.vue'
import insRadio from './components/radio/index.vue'
import insCascader from './components/cascader/index.vue'
import insTreeSelect from './components/tree-select/index.vue'
import insCity from './components/city/index.vue'

import InputNumberWithUnit from './components/input-number-with-unit/index.vue'
import SelectLoadmore from './components/select-loadmore/index.vue'
import InputPassword from './components/input-password/index.vue'
import IconSelect from './components/icon-select/index.vue'

import useSetRules from './composables/useSetRules'
import useSetPlaceholder from './composables/useSetPlaceholder'
import useSubmit from './composables/useSubmit'
import useElement from './composables/useElement'

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
  labelWidth: { type: Number, default: 70 },
  cols: {
    type: Number,
    default: 1,
  },
})
const dynamicFormRef = ref(null)
const emit = defineEmits(['submit', 'reset', 'change'])

const colStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${props.cols},1fr)`,
}))

const { elements } = useElement()
const { setRules } = useSetRules()
const { getPlaceholder } = useSetPlaceholder()

const { toSaveData, submitForm, resetFields, resetForm, validateField, handleChange } = useSubmit(
  dynamicFormRef,
  props.dynamicForm,
  emit
)

// 暴露出去的 属性和方法
defineExpose({
  dynamicFormRef,
  toSaveData,
  submitForm,
  resetFields,
  resetForm,
  validateField,
})
</script>

<template>
  <div class="ins-form">
    <el-form
      ref="dynamicFormRef"
      v-bind="$attrs"
      :label-width="labelWidth + 'px'"
      :model="dynamicForm"
      :style="{
        ...colStyle,
      }"
      @submit.prevent
    >
      <template v-for="(formItem, index) in dynamicForm.form">
        <el-form-item
          v-if="!formItem.hidden"
          v-show="formItem.isShow !== false"
          :key="'formItem' + index"
          :label="formItem.hiddenLabel ? '' : formItem.labelShow || formItem.label"
          :label-width="formItem.hiddenLabel ? '0px' : labelWidth + 'px'"
          :prop="'form[' + index + '].value'"
          :required="formItem.required"
          :rules="setRules(formItem)"
          :style="{
            ...formItem.style,
            ...(formItem.cols
              ? {
                  'grid-column-start': `span ${formItem.cols}`,
                }
              : {}),
          }"
        >
          <!-- slot -->
          <slot
            v-if="formItem.element === elements.slot"
            :form-item="formItem"
            :index="index"
            :name="formItem.name"
          ></slot>

          <span v-else-if="formItem.element === elements.text">{{ formItem.value }}</span>

          <!-- input -->
          <template v-else-if="formItem.element === elements.input">
            <ins-input
              v-if="
                formItem.isTrim !== false && (!formItem.attrs || formItem.attrs.type !== 'textarea')
              "
              v-model.trim="formItem.value"
              :form-item="formItem"
              :placeholder="getPlaceholder(formItem)"
              v-bind="formItem.attrs"
              @change="handleChange(formItem, index)"
            />
            <ins-input
              v-else
              v-model="formItem.value"
              :form-item="formItem"
              :placeholder="getPlaceholder(formItem)"
              v-bind="formItem.attrs"
              @change="handleChange(formItem, index)"
            />
          </template>

          <!-- password -->
          <input-password
            v-else-if="formItem.element === elements.password"
            v-model="formItem.value"
            :placeholder="getPlaceholder(formItem)"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- select -->
          <ins-select
            v-else-if="formItem.element === elements.select"
            v-model:modelValue="formItem.value"
            :form-item="formItem"
            :placeholder="getPlaceholder(formItem)"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- cascader -->
          <ins-cascader
            v-else-if="formItem.element === elements.cascader"
            v-model:modelValue="formItem.value"
            :form-item="formItem"
            :placeholder="getPlaceholder(formItem)"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- tree-select -->
          <ins-tree-select
            v-else-if="formItem.element === elements['tree-select']"
            v-model:modelValue="formItem.value"
            :form-item="formItem"
            :placeholder="getPlaceholder(formItem)"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- 分页、远程搜索 select -->
          <select-loadmore
            v-else-if="formItem.element === elements['select-loadmore']"
            v-model:modelValue="formItem.value"
            :form-item="formItem"
            :index="index"
            :placeholder="getPlaceholder(formItem)"
            @change="handleChange(formItem, index)"
          />

          <!-- date-picker -->
          <el-date-picker
            v-else-if="formItem.element === elements['date-picker']"
            v-model="formItem.value"
            clearable
            :placeholder="getPlaceholder(formItem)"
            type="date"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- 带单位的input-number -->
          <input-number-with-unit
            v-else-if="formItem.element === elements['number-with-unit']"
            v-model:modelValue="formItem.value"
            :form-item="formItem"
            :index="index"
            @change="handleChange(formItem, index)"
          />

          <!-- checkbox -->
          <ins-checkbox
            v-else-if="formItem.element === elements['checkbox']"
            v-model:modelValue="formItem.value"
            :form-item="formItem"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- radio -->
          <ins-radio
            v-else-if="formItem.element === elements['radio']"
            v-model:modelValue="formItem.value"
            :form-item="formItem"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- fileList -->
          <el-upload
            v-else-if="formItem.element === elements['fileList']"
            v-model:file-list="formItem.value"
            v-bind="formItem.attrs"
            action
            class="file-list"
            multiple
            :on-change="() => handleChange(formItem, index)"
          >
            <el-button text type="primary">点击上传</el-button>
          </el-upload>

          <!-- switch -->
          <el-switch
            v-else-if="formItem.element === elements['switch']"
            v-model="formItem.value"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- icon-select -->
          <icon-select
            v-else-if="formItem.element === elements['icon-select']"
            v-model="formItem.value"
            :placeholder="getPlaceholder(formItem)"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- city -->
          <ins-city
            v-else-if="formItem.element === elements['city']"
            v-model="formItem.value"
            v-bind="formItem.attrs"
            @change="handleChange(formItem, index)"
          />

          <!-- 提示 -->
          <div v-if="formItem.tip" class="form-item-tip">{{ formItem.tip }}</div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.ins-form {
  width: 100%;
  :deep(.el-form) {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
    .el-form-item {
      flex-grow: 0;
      flex-shrink: 0;
      width: 100%;
      .el-input,
      .el-select,
      .el-cascader,
      .el-date-picker {
        width: 100%;
        // max-width: 400px;
        .el-input__wrapper {
          width: 100%;
        }
      }

      .file-list {
        line-height: 1;
        .el-upload-list.el-upload-list--picture-card {
          margin-top: -8px;

          .el-upload-list__item,
          .el-upload {
            margin-top: 8px;
            margin-bottom: 0;
          }
        }

        .el-icon--close-tip,
        .el-upload-list__item-preview {
          display: none;
        }
        .el-upload-list__item-delete {
          margin-left: 0;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
      &.is-error {
        .el-select .el-input__wrapper,
        .el-input__wrapper {
          box-shadow: 0 0 0 1px var(--el-color-danger) inset;
        }
      }
      .el-form-item {
        margin-bottom: 18px;
      }
      .form-item-tip {
        margin-top: 5px;
        font-size: 12px;
        line-height: 1.5;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
