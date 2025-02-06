<!-- 
  名称：ins-chart
 -->
<script setup>
import * as echarts from 'echarts'

import useResize from './composables/useResize'

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const { watchResize, cancelWatchResize } = useResize()

/** 渲染标签ref */
const InsChartRef = ref(null)

/** echarts 实例 */
let myChart

/**
 * 设置options
 */
function setOption(...arg) {
  myChart.setOption(...arg)
}

watch(
  () => props.loading,
  (newValue) => {
    if (newValue) {
      myChart.showLoading({
        color: '#316c72',
        lineWidth: 3,
        spinnerRadius: 12,
      })
    } else {
      myChart.hideLoading()
    }
  },
)

onMounted(() => {
  myChart = markRaw(echarts.init(InsChartRef.value))
  myChart.setOption(toRaw(props.options))

  watchResize(InsChartRef.value, () => {
    myChart.resize()
  })
})

onBeforeUnmount(() => {
  cancelWatchResize(InsChartRef.value)
})

defineExpose({
  setOption,
})
</script>

<template>
  <div ref="InsChartRef" class="ins-chart"></div>
</template>

<style lang="scss">
.ins-chart {
  width: 100%;
  height: 100%;
}
</style>
