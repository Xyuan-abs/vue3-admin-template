<!-- 
  名称：表格项
  版本：1.0.0 
  作者：Xyuan
  时间：2023年2月13日14:58:14
 -->
<script setup>
  import { parseTime } from '@/utils/date'

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

  // 自定义格式化  xx{value}xx
  const formatterCustom = (fmt, value) => {
    if (typeof fmt !== 'string') return value
    if (!value && value !== 0) return ''
    return fmt.replace('{value}', value)
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
    <template v-if="head.options">{{ getOptionsLabel(head.options, getData(row, head.prop)) }}</template>
    <!-- 日期 -->
    <template v-else-if="head.date">{{ formatterDate(head.date, getData(row, head.prop)) }}</template>
    <!-- 自定义格式  xx{value}xx -->
    <template v-else-if="head.fmt">{{ formatterCustom(head.fmt, getData(row, head.prop)) }}</template>
    <!-- 其他 -->
    <template v-else>{{ getData(row, head.prop) }}</template>
  </span>
</template>

<style lang="scss" scoped></style>
