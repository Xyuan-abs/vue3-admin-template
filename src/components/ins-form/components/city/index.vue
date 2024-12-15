<!-- 
  名称：city
 -->
<script setup>
import { useVModel } from '@vueuse/core'

import { getCity } from '@/api/common'

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
    type: [String, Number, Array],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

/* 值的双向绑定 */
const value = useVModel(props, 'modelValue', emit) // 值的双向绑定

function handleChange() {
  emit('change')
}

const cascaderProps = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node
    const params = {
      id: level === 0 ? 0 : node.data.id,
    }
    getCity(params)
      .then((res) => {
        const nodes = res.data.map((d) => ({
          value: d.name,
          id: d.id,
          label: d.name,
          leaf: level >= 2,
        }))
        // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
        resolve(nodes)
      })
      .catch((e) => console.error(e))
  },
}
</script>

<template>
  <el-cascader
    v-model="value"
    class="ins-city"
    clearable
    :props="cascaderProps"
    @change="handleChange"
  />
</template>

<style lang="scss">
.ins-city {
  width: 100%;
}
</style>
