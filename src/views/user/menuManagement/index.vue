<script setup>
import InsPanel from '@/components/ins-panel'
import InsTable from '@/components/ins-table/index'
import InsPager from '@/components/ins-pager/index'

import EditDialog from './EditDialog.vue'

import useOperation from '@/hooks/useOperation'
import useDialogOperation from '@/hooks/useDialogOperation'
import useTable from './composables/useTable'

import { mock } from '@/api/mock'

const { tableHead, tableData, loading, pagerParams, fetchData, searchData } = useTable()
const { DialogRef: EditDialogRef, handleAdd, handleEdit } = useDialogOperation()
const { handleConfirmOpt } = useOperation()

onMounted(() => {
  searchData()
})
</script>

<template>
  <div class="account-management-container">
    <ins-panel class="direction-row">
      <!-- 操作 -->
      <div class="direction-row">
        <el-button icon="Plus" type="primary" @click="handleAdd">添加</el-button>
      </div>

      <!-- 表格 -->
      <ins-table
        class="direction-row"
        :loading="loading"
        :table-data="tableData"
        :table-head="tableHead"
        row-key="menuId"
        default-expand-all
      >
        <!-- 操作 -->
        <template #opt="{ row }">
          <el-button text type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button
            text
            type="primary"
            @click="handleConfirmOpt('删除', mock, { id: row.id }).then(fetchData)"
            >删除</el-button
          >
        </template>
      </ins-table>
    </ins-panel>

    <!-- 新增、编辑弹窗 -->
    <edit-dialog ref="EditDialogRef" @save="fetchData" />
  </div>
</template>
