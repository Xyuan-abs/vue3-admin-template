<script setup>
import InsPanel from '@/components/ins-panel'
import InsFormInline from '@/components/ins-form-inline/index'
import InsTable from '@/components/ins-table/index'
import InsPager from '@/components/ins-pager/index'

import EditDialog from './EditDialog.vue'
import ChangeAccountStatus from './components/ChangeAccountStatus.vue'
import ChangePasswordDialog from './components/ChangePasswordDialog.vue'

import useOperation from '@/hooks/useOperation'
import useDialogOperation from '@/hooks/useDialogOperation'
import useSearch from './composables/useSearch'
import useTable from './composables/useTable'

import { mock } from '@/api/mock'

const { dynamicForm, searchParams } = useSearch()
const { tableHead, tableData, loading, pagerParams, fetchData, searchData } = useTable(searchParams)
const { DialogRef: EditDialogRef, handleAdd, handleEdit } = useDialogOperation()
const { DialogRef: ChangePasswordDialogRef, handleOpen } = useDialogOperation()
const { handleConfirmOpt } = useOperation()

onMounted(() => {
  searchData()
})
</script>

<template>
  <div class="account-management-container">
    <!-- 查询表单 -->
    <ins-panel class="direction-row">
      <ins-form-inline
        v-model:search-params="searchParams"
        class="direction-row"
        :dynamic-form="dynamicForm"
        @submit="searchData"
      />
    </ins-panel>

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
      >
        <template #status="{ row }">
          <change-account-status :id="row.id" v-model="row.status" />
        </template>

        <!-- 操作 -->
        <template #opt="{ row }">
          <el-button text type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button text type="primary" @click="handleOpen(row)">修改密码</el-button>
          <el-button
            text
            type="primary"
            @click="handleConfirmOpt('删除', mock, { id: row.id }).then(fetchData)"
            >删除</el-button
          >
        </template>
      </ins-table>

      <!-- 分页 -->
      <ins-pager v-model:pager-params="pagerParams" class="direction-row" @change="fetchData" />
    </ins-panel>

    <!-- 新增、编辑弹窗 -->
    <edit-dialog ref="EditDialogRef" @save="fetchData" />

    <!-- 修改密码弹窗 -->
    <change-password-dialog ref="ChangePasswordDialogRef" />
  </div>
</template>
