<!-- 
  名称：配件列表
 -->
<script setup>
import { useFormItem } from 'element-plus'

import InsTable from '@/components/ins-table/index'

import { getLabelByOptionsValue } from '@/utils/index'

import useRepairPartList from './composables/useRepairPartList'
import useParts from './composables/useParts'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  isDetail: { type: Boolean, default: false },
  serviceRecordId: { type: [Number, String], default: null },
  sn: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'change'])

const { formItem } = useFormItem()

const { ruleFormRef, tableHead, tableData, valueByParts, handleAdd, handleDelete } =
  useRepairPartList(props)

const {
  isFetching,
  partsOptions,
  partsCacheOptions,
  fetchPartsOptions,
  onPartsOptionsChange,
  handleCachePartsOptionsByValue,
  handleRemoveCachePartsOptionsByValue,
} = useParts(props, valueByParts)

/**
 * update:modelValue
 */
function updateModelValue() {
  emit('update:modelValue', tableData.value.slice(1))
  emit('change', tableData.value.slice(1))

  // 触发表单校验
  formItem?.validate('blur').catch(() => {})
}
</script>

<template>
  <el-form ref="ruleFormRef" class="part-list" :model="tableData[0]">
    <ins-table border max-height="230px" :table-data="tableData" :table-head="tableHead">
      <!-- 配件 -->
      <template #materialName="{ row, index, head }">
        <template v-if="!isDetail">
          <el-form-item v-if="index === 0" :prop="head.prop" :required="true">
            <el-select
              v-model="row[head.prop]"
              clearable
              filterable
              :loading="isFetching"
              :multiple="false"
              placeholder=" "
              remote
              :remote-method="fetchPartsOptions"
              @change="onPartsOptionsChange($event, row)"
            >
              <el-option
                v-for="item in partsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <template v-else>{{
            getLabelByOptionsValue(row[head.prop], partsCacheOptions)
          }}</template>
        </template>
      </template>

      <!-- 旧贵重件SN -->
      <template #oldSN="{ row, index, head }">
        <el-form-item v-if="!isDetail && index === 0" class="always-right" :prop="head.prop">
          <el-input v-model="row[head.prop]" />
        </el-form-item>
      </template>

      <!-- 新贵重件SN -->
      <template #newSN="{ row, index, head }">
        <el-form-item v-if="!isDetail && index === 0" class="always-right" :prop="head.prop">
          <el-input v-model="row[head.prop]" />
        </el-form-item>
      </template>

      <!-- 消耗数量 -->
      <template #quantity="{ row, index, head }">
        <el-form-item v-if="!isDetail && index === 0" :prop="head.prop" :required="true">
          <el-input v-model="row[head.prop]" min="0" type="number" />
        </el-form-item>
      </template>

      <template #opt="{ row, index }">
        <el-button
          v-if="index === 0"
          text
          type="primary"
          @click="handleAdd().then(updateModelValue), handleCachePartsOptionsByValue(row['配件'])"
        >
          添加
        </el-button>
        <el-button
          v-else
          text
          type="primary"
          @click="
            handleDelete(index),
              updateModelValue(),
              handleRemoveCachePartsOptionsByValue(row['配件'])
          "
        >
          删除
        </el-button>
      </template>
      <template #empty>暂无数据</template>
    </ins-table>
  </el-form>
</template>

<style lang="scss" scoped>
.part-list {
  width: 100%;
  :deep() {
    .el-form-item {
      margin-bottom: 0 !important;
      &__error {
        display: none;
      }
    }
    .el-table {
      .el-table__body-wrapper {
        .el-table__cell {
          height: 49px;
        }
      }
    }
  }
}
</style>
