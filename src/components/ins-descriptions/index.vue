<!-- 
  名称：ins-descriptions
 -->
<script setup>
defineProps({
  head: { type: Array, default: () => [] },
  data: { type: Object, default: () => ({}) },
  align: { type: String, default: 'left' },
})

// 获取 对应字典数据的label
const getOptionsLabel = (options, value) => {
  let valueList = value
  if (!Array.isArray(value)) {
    valueList = [value]
  }

  return valueList.map((d) => options.find((v) => v.value === d)?.label ?? d).join('、')
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
  <el-descriptions v-bind="$attrs">
    <el-descriptions-item
      v-for="(d, i) in head"
      :key="i"
      :align="align"
      :label="d.label + (d.label ? '：' : '')"
      v-bind="d.attrs"
    >
      <slot :head="d" :name="d.prop">
        <!-- options -->
        <template v-if="d.options">{{
          getOptionsLabel(d.options, getData(data, d.prop))
        }}</template>
        <!-- 其他 -->
        <template v-else>{{ getData(data, d.prop) }}</template>
      </slot>
    </el-descriptions-item>
  </el-descriptions>
</template>

<style lang="scss" scoped></style>
