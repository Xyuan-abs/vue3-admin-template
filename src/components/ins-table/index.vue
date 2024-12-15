<!-- 
  名称：表格
 -->
<script setup>
import TableItem from './components/table-item/index'
import InsCopy from '@/components/ins-copy/index'

import useSetAttrs from './composables/useSetAttrs.js'
import useSetEvent from './composables/useSetEvent.js'
import useDrag from './composables/useDrag.js'

const props = defineProps({
  /**
   * 表格头部配置
   */
  tableHead: { type: Array, default: null, required: true },
  /**
   * 表格数据配置
   */
  tableData: { type: Array, default: null, required: true },
  /**
   * loading
   */
  loading: { type: Boolean, default: false },
  /**
   * 多选
   */
  selection: { type: Boolean, default: false },
  /**
   * 序号
   */
  hasIndex: { type: Boolean, default: false },
  /**
   * 展开行
   */
  expand: { type: Boolean, default: false },
  /**
   * 是否可编辑
   */
  isEdit: { type: Boolean, default: false },
  /**
   * 拖拽
   */
  drag: { type: Boolean, default: false },
  /**
   * 对齐
   */
  align: { type: String, default: 'center' },
})

const emit = defineEmits(['drag'])

const { $attrs } = useSetAttrs() // attrs配置
const { elTableRef, dispatch } = useSetEvent() // el-table 方法
const elIndexColumnRef = ref(null)

const { rowDrag } = useDrag(elTableRef, props, emit)

onMounted(() => {
  props.drag && rowDrag()
})

/* 暴露出去的属性和方法 */
defineExpose({
  elTableRef,
  dispatch,
})
</script>

<template>
  <div class="ins-table" :class="{ towable: drag }">
    <el-table ref="elTableRef" v-loading="loading" :data="tableData" v-bind="$attrs">
      <!-- 展开行 -->
      <el-table-column v-if="expand" align="center" type="expand" width="50">
        <template #default="{ ...attrs }">
          <slot name="expand" v-bind="attrs"></slot>
        </template>
      </el-table-column>

      <!-- 多选框列 -->
      <el-table-column v-if="selection" align="center" type="selection" width="50" />

      <!-- 序号列 -->
      <el-table-column
        v-if="hasIndex"
        ref="elIndexColumnRef"
        align="center"
        label="序号"
        type="index"
        width="55"
      />

      <!-- 其他 -->
      <template v-for="(head, index) in tableHead" :key="`ins-table${index}`">
        <!-- 自定义列 动态组件 -->
        <component :is="head.component" v-if="head.component" :head="head" />

        <!-- 


         -->
        <!-- 默认列 -->
        <el-table-column
          v-else
          :align="align"
          :label="head.label"
          v-bind="head.attrs"
          :label-class-name="head.required ? 'is-required' : ''"
          :prop="head.prop"
        >
          <template #default="{ row, column, $index }">
            <slot :column="column" :head="head" :index="$index" :name="head.prop" :row="row">
              <!-- tags -->
              <el-tag v-if="head.tags" :type="head.tags?.[row[head.prop]]">
                <table-item :head="head" :row="row" />
              </el-tag>

              <!-- tooltip -->
              <el-tooltip
                v-else-if="head.tooltip"
                :content="row[head.tooltip]"
                effect="dark"
                placement="top"
              >
                <table-item :head="head" :row="row" />
              </el-tooltip>

              <!-- 点击拷贝 -->
              <!-- head.copy 值为 true 时 复制当前字段的值  为字符串时 复制 row[当前字符串的值]  -->
              <ins-copy
                v-else-if="head.copy"
                class="copy-text"
                :text="row[head.copy === true ? head.prop : head.copy]"
              >
                <table-item :head="head" :row="row" />
              </ins-copy>

              <!-- 其他 -->
              <table-item v-else :head="head" :row="row" />
            </slot>
          </template>
        </el-table-column>
      </template>

      <!-- 空数据 -->
      <template #empty>
        <slot name="empty">
          <el-empty class="vab-data-empty" description="暂无数据" />
        </slot>
      </template>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.ins-table {
  width: 100%;
  font-family: inherit;

  &.towable {
    :deep(.el-table) {
      .el-table__row {
        cursor: move;
      }
    }
  }
  & + .ins-pager {
    margin-top: 15px;
  }
  :deep(.el-button) {
    &.is-text {
      padding: 0;
    }
  }

  :deep(.el-table) {
    .el-table__header {
      .is-required {
        .cell {
          &::before {
            display: inline;
            margin-right: 4px;
            font-size: 14px;
            color: var(--el-color-danger);
            content: '*';
          }
        }
      }
    }

    .el-table__cell {
      // z-index: unset;
    }
    &.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
      // $color: var(--el-color-primary-light-9);
      $color: #fff;
      background: fade-in($color, 0.5);
    }
  }

  .copy-text {
    position: relative;
    display: inline-block;
    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      display: inline-block;
      height: 2px;
      content: '';
      background-color: var(--el-color-primary);
      transition: transform 0.2s ease-in-out;
      transform: scaleX(0);
      transform-origin: right center;
    }
    &:hover::after {
      transform: scaleX(1);
      transform-origin: left center;
    }
  }
}
:deep(.el-popper) {
  max-width: min(50vw, 300px);
  white-space: pre-wrap;
}
</style>
