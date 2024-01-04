<!-- 
  名称：icon-select
  版本：1.0.0 
  作者：Xyuan
  时间：2021年11月4日09:39:42
 -->
<script setup>
  import { useVModel } from '@vueuse/core'
  import { ClickOutside as vClickOutside } from 'element-plus'

  import useSearch from './composables/useSearch'
  import useProper from './composables/useProper'

  const props = defineProps({
    formItem: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
    modelValue: {
      type: String,
      default: null,
    },
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  /* 值的双向绑定 */
  const modelValue = useVModel(props, 'modelValue', emit) // 值的双向绑定

  /* proper 展示 隐藏 */
  const { visible, handleOpen, handleClose } = useProper()

  /* 前端查询 */
  const { iconFilterList, keyword, pageParams, handleFilterIcon, handleSearch, handleReset } = useSearch()

  //选择图标事件
  const handleSelectIcon = (icon) => {
    modelValue.value = icon
    handleChange()
    handleClose()
  }

  /* change 事件 */
  const handleChange = () => {
    emit('change')
  }

  onMounted(() => {
    handleReset()
  })
</script>

<template>
  <div class="ins-icon-selector">
    <el-popover
      placement="bottom-start"
      popper-class="icon-selector-popper"
      trigger="click"
      :visible="visible"
      :width="292"
      @hide="handleReset"
    >
      <template #reference>
        <el-input v-model="modelValue" v-bind="$attrs" @click="handleOpen" />
      </template>
      <el-row v-click-outside="handleClose" :gutter="20">
        <el-col :span="24">
          <vab-query-form>
            <vab-query-form-top-panel>
              <el-form inline label-width="0" @submit.prevent>
                <el-form-item label="">
                  <el-input v-model="keyword" />
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button native-type="submit" type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
              </el-form>
            </vab-query-form-top-panel>
          </vab-query-form>
        </el-col>

        <el-col v-for="(icon, index) in iconFilterList" :key="index" :span="6">
          <vab-card :class="{ 'is-active': modelValue === icon }" shadow="hover" @click="handleSelectIcon(icon)">
            <vab-icon :icon="icon" />
          </vab-card>
        </el-col>

        <el-col :span="24">
          <el-pagination
            v-model:current-page="pageParams.page"
            v-model:page-size="pageParams.limit"
            :background="true"
            :layout="'total, prev, next'"
            :total="pageParams.total"
            @current-change="handleFilterIcon"
          />
        </el-col>
      </el-row>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
  .ins-icon-selector {
    width: 100%;
  }
</style>
<style lang="scss">
  .icon-selector-popper {
    .is-active {
      border-color: var(--el-color-primary);
    }
    .el-card__body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 20px;
      cursor: pointer;

      i {
        font-size: 28px;
        color: var(--el-color-grey);
        text-align: center;
        vertical-align: middle;
        pointer-events: none;
        cursor: pointer;
      }
    }

    .el-pagination {
      margin: 0;
    }
  }
</style>
