<!-- 
  名称：带单位的input-number
 -->
<script setup>
import { toRefs } from 'vue'

import useSetAttrs from './composables/useSetAttrs'
import useSetRules from './composables/useSetRules'

const props = defineProps({
  formItem: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue', 'change'])
const modelValueVM = ref([])

watch(
  () => props.modelValue,
  (newVal) => {
    modelValueVM.value = [...newVal]
  },
  { immediate: true, deep: true },
)

// 单位下拉选项
const { options } = toRefs(props.formItem)

/* attrs */
const { $inputAttrs, $unitAttrs } = useSetAttrs(props.formItem)

/* rules */
const { inputRules, unitRules } = useSetRules(props.formItem)

/* 统一change事件 */
const handleChange = () => {
  emit('update:modelValue', modelValueVM.value)

  emit('change')
}
</script>

<template>
  <div class="ins-input-number__with-unit">
    <!-- 值 -->
    <el-form-item
      class="number-with-unit-input"
      :prop="'form[' + index + '].value[0]'"
      :rules="inputRules"
    >
      <el-input-number
        v-model:model-value="modelValueVM[0]"
        class="hidden-crease"
        v-bind="$inputAttrs"
        @change="handleChange"
      />
    </el-form-item>

    <!-- 单位 -->
    <el-form-item
      class="number-with-unit-select"
      :prop="'form[' + index + '].value[1]'"
      :rules="unitRules"
    >
      <el-select v-model="modelValueVM[1]" v-bind="$unitAttrs" @change="handleChange">
        <el-option
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<style lang="scss">
.ins-input-number__with-unit {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-family: inherit;
  width: 100%;

  .el-input-number {
    width: 100%;
    .el-input-number__decrease,
    .el-input-number__increase {
      display: none;
    }
    .el-input {
      .el-input__wrapper {
        padding: 1px 11px;
        .el-input__inner {
          text-align: left;
        }
      }
    }
  }

  .number-with-unit-input {
    flex: 1;
  }

  .number-with-unit-select {
    flex-shrink: 0;
    width: 30%;
    min-width: 100px;
    margin-left: 5px;
    .el-select {
      width: 100%;
      .el-input__validateIcon {
        display: none;
      }
    }
  }

  .number-with-unit-input,
  .number-with-unit-select {
    margin-bottom: 0;
  }

  .el-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
