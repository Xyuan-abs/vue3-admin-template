<!-- 
  名称：触底加载的 select
  版本：1.0.0 
  作者：Xyuan
  时间：2023年5月23日13:36:52
 -->
<script setup>
  import { useVModel } from '@vueuse/core'
  import useFetchData from './composables/useFetchData'

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
      type: [String, Number],
      default: null,
    },
  })
  const selectRef = ref(null)

  const { isNoMore, isError, searchLoading, handleSearch, loadMoreLoading, watchLoadMore } = useFetchData(
    props.formItem,
    selectRef
  )
  const emit = defineEmits(['update:modelValue', 'change'])

  /* 值的双向绑定 */
  const modelValue = useVModel(props, 'modelValue', emit) // 值的双向绑定

  onMounted(() => {
    if (!props.formItem.componentProps.api) return
    watchLoadMore()
  })
</script>

<template>
  <div class="select-loadmore">
    <el-select
      ref="selectRef"
      v-model="modelValue"
      clearable
      v-bind="Object.assign({}, $attrs, formItem.attrs)"
      :filterable="true"
      :loading="searchLoading"
      :remote="true"
      :remote-method="handleSearch"
      :teleported="false"
    >
      <el-option v-for="option in formItem.options" :key="option.value" :label="option.label" :value="option.value" />
      <div class="tip">
        <span v-if="isError">请求异常了 -。-</span>
        <span v-else-if="isNoMore && formItem.options.length">没有更多了~</span>
        <span v-else v-show="loadMoreLoading" class="loadmore-loading">
          <el-icon class="is-loading">
            <Loading />
          </el-icon>
          加载中
        </span>
      </div>
    </el-select>
  </div>
</template>

<style lang="scss">
  .select-loadmore {
    width: 100%;
    .tip {
      padding-top: 5px;
      padding-bottom: 2px;
      font-size: 12px;
      text-align: center;
      .loadmore-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        .is-loading {
          margin-right: 5px;
        }
      }
    }
  }
</style>
