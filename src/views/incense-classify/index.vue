<!-- 
  名称：分类
 -->
<script setup>
import InsFormInline from '@/components/ins-form-inline/index'
import InsTable from '@/components/ins-table/index'
import InsPager from '@/components/ins-pager/index'

import { Plus } from '@element-plus/icons-vue'

import EditDialog from './EditDialog'

import useSearch from './composables/useSearch'
import useTable from './composables/useTable'
import usePager from '@/hooks/usePager'

// 新增编辑弹窗
const EditDialogRef = ref(null)

const { dynamicForm, searchParams } = useSearch()
const { pagerParams } = usePager()
const {
  tableHead,
  tableData,
  loading,
  fetchData: fetchTableData,
  handleAdd,
} = useTable(EditDialogRef)

// 点击搜索
const handleSearch = () => {
  pagerParams.page = 1
  fetchData()
}

// 查询表格数据
const fetchData = async () => {
  const { page, size } = pagerParams
  const params = { pageIndex: page, pageCount: size, search: toRaw(searchParams) }

  const res = await fetchTableData(params)
  if (res?.success) {
    pagerParams.total = res.total ?? 0
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="follow-container">
    <!-- 查询表单 -->
    <ins-form-inline
      v-model:searchParams="searchParams"
      class="direction-row"
      :dynamic-form="dynamicForm"
      :label-width="80"
      @submit="handleSearch"
    />

    <!-- 操作 -->
    <div class="direction-row">
      <el-button :icon="Plus" type="primary" @click="handleAdd">添加</el-button>
    </div>

    <!-- 表格 -->
    <ins-table
      class="direction-row"
      :loading="loading"
      :table-data="tableData"
      :table-head="tableHead"
    />

    <!-- 分页 -->
    <ins-pager :pager-params="pagerParams" @change="fetchData" />

    <!-- 新增、编辑弹窗 -->
    <edit-dialog ref="EditDialogRef" @save="fetchData" />
  </div>
</template>

<style lang="scss">
.follow-container {
}
</style>
