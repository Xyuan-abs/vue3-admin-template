<!-- 
  名称：ins-descriptions
  版本：1.0.0 
  作者：Xyuan
  时间：2023年12月21日11:48:50
 -->
<script setup>
  defineProps({
    head: { type: Array, default: () => [] },
    data: { type: Object, default: () => ({}) },
    align: { type: String, default: 'left' },
  })
</script>

<template>
  <el-descriptions v-bind="$attrs">
    <el-descriptions-item
      v-for="(d, i) in head"
      :key="i"
      :align="align"
      :label="d.label + (d.label ? '：' : '')"
      v-bind="d.attrs"
    >
      {{ data[d.prop] || '' }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style lang="scss" scoped></style>
