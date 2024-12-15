<!-- 
  名称：表格项
 -->
<script setup>
import { parseTime } from '@/utils/date'
import { isFunction } from '@/utils/validate'

defineProps({
  /**
   * 表格头部配置
   */
  head: { type: Object, default: () => ({}), required: true },
  /**
   * 表格数据配置
   */
  row: { type: Object, default: () => ({}), required: true },
})

// 获取 对应字典数据的label
const getOptionsLabel = (options, value) => {
  let valueList = value
  if (!Array.isArray(value)) {
    valueList = [value]
  }

  return valueList.map((d) => options.find((v) => v.value === d)?.label ?? d).join('、')
}

// 格式化时间
const formatterDate = (fmt, value) => {
  return value ? parseTime(value, fmt) : ''
}

/**
 * 自定义格式化
 * @param { string | Function } fmt 格式化 string -> xx{value}xx  Function -> (row)=>xxx
 * @param {*} value 值
 * @param {*} row 整条行数据
 */
const formatterCustom = (fmt, value, row) => {
  if (typeof fmt === 'string') {
    if (!value && value !== 0) return ''
    return fmt.replace('{value}', value)
  } else if (isFunction(fmt)) {
    return fmt(row)
  } else {
    return value
  }
}

// 获取 row 对应的值  prop 支持 a.b.c 格式
const getData = (row, prop) => {
  try {
    return eval(`row.${prop}`)
  } catch (error) {
    return ''
  }
}
</script>

<template>
  <span class="ins-table-item">
    <!-- options -->
    <template v-if="head.options">{{
      getOptionsLabel(head.options, getData(row, head.prop))
    }}</template>
    <!-- 日期 -->
    <template v-else-if="head.date">{{
      formatterDate(head.date, getData(row, head.prop))
    }}</template>
    <!-- 自定义格式 -->
    <template v-else-if="head.fmt">{{
      formatterCustom(head.fmt, getData(row, head.prop), row)
    }}</template>
    <!-- 其他 -->
    <template v-else>{{ getData(row, head.prop) }}</template>
  </span>
</template>

<style lang="scss" scoped></style>
