<!-- 
  名称：text
 -->
<script setup>
import { getLabelByOptionsValue } from '@/utils'

import useFetchData from '../../composables/useFetchData'

const props = defineProps({
  formItem: {
    type: Object,
    default: () => {},
  },
  value: {
    type: [String, Number, Array],
    default: null,
  },
})

useFetchData(props.formItem)
</script>

<template>
  <span>
    {{
      formItem.options ? getLabelByOptionsValue(formItem.value, formItem.options) : formItem.value
    }}
  </span>
</template>

<style lang="scss"></style>
