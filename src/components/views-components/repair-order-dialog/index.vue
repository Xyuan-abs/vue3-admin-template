<!-- 
  名称：维修单弹窗
 -->
<script setup>
import ServiceInfo from './ServiceInfo'
import RepairInfo from './RepairInfo'
import AddressInfo from './AddressInfo'

import useDialog from '@/hooks/useDialog'
import useFetch from '@/hooks/useFetch'

import { addRepairOrder, getRepairOrderDetail } from '@/api/common'

const emit = defineEmits(['save'])

/**
 * 弹窗
 */
const { row, title, dialogVisible, handleOpenDialog, handleCloseDialog } = useDialog('维修单')

/**
 * 是否是详情
 */
const isDetail = computed(() => Boolean(row.value.repairId || row.value.repairId === 0))

/**
 * 服务记录信息 ref
 */
const ServiceInfoRef = ref(null)
/**
 * 维修信息 ref
 */
const RepairInfoRef = ref(null)
/**
 * 地址信息 ref
 */
const AddressInfoRef = ref(null)

/** 查询详情 */
const { isFetching, executeFetch } = useFetch(getRepairOrderDetail, {
  onSuccess: (res) => {
    const data = res.data || {}
    const { province, city, region } = data
    data.location = `${province ?? ''} ${city ? '/' : ''} ${city ?? ''} ${region ? '/' : ''} ${
      region ?? ''
    }`

    nextTick(() => {
      ServiceInfoRef.value.setData(data)
      RepairInfoRef.value.setData(data)
      AddressInfoRef.value.setData(data)
    })
  },
})

/** 保存 */
const { isFetching: isSaving, executeFetch: executeSave } = useFetch(addRepairOrder, {
  name: '保存',
  showSuccessMsg: true,
  onSuccess: () => {
    emit('save')
    handleCloseDialog()
  },
})

/**
 * 打开弹窗
 * @param {Object} rowData
 */
function open(rowData = {}) {
  const data = { ...rowData, repairId: rowData.repairId || null }

  handleOpenDialog(data)
  console.log('data', data)

  if (data.repairId) {
    executeFetch({ id: data.repairId })
  } else {
    nextTick(() => {
      ServiceInfoRef.value.setData(data)
    })
  }
}

/**
 * 提交
 */
async function handleSubmit() {
  const [serviceInfoData, repairInfoData] = await Promise.all([
    ServiceInfoRef.value.getData(),
    RepairInfoRef.value.getData(),
    AddressInfoRef.value.getData(),
  ])
  if (serviceInfoData && repairInfoData) {
    const { source, sn, serviceRecordId, activeRecordId } = row.value

    executeSave({
      source,
      sn,
      serviceRecordId,
      activeRecordId,
      ...serviceInfoData,
      ...repairInfoData,
    })
  }
}

/**
 * 重置
 */
function reset() {
  ServiceInfoRef.value.reset()
  RepairInfoRef.value.reset()
  AddressInfoRef.value.reset()
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    append-to-body
    class="repair-order-dialog"
    :title="title"
    top="40px"
    width="1200px"
    @closed="reset"
  >
    <div v-loading="isFetching">
      <!-- 服务记录信息 -->
      <service-info ref="ServiceInfoRef" />

      <!-- 维修信息 -->
      <repair-info
        ref="RepairInfoRef"
        :is-detail="isDetail"
        :service-record-id="row.serviceRecordId"
        :sn="row.sn"
      />

      <!-- 地址信息 -->
      <address-info ref="AddressInfoRef" :is-detail="isDetail" />
    </div>

    <template #footer>
      <el-button v-if="!isDetail" :loading="isSaving" type="primary" @click="handleSubmit"
        >确 认</el-button
      >
      <el-button @click="handleCloseDialog">关 闭</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.repair-order-dialog {
  .el-dialog__body {
    padding-top: 10px;
  }

  .el-card {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
