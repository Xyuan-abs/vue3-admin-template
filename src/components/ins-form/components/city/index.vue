<!-- 
  名称：city
 -->
<script setup>
  import { useVModel } from '@vueuse/core'

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

  let id = 0
  const cascaderProps = {
    lazy: true,
    lazyLoad(node, resolve) {
      const { level } = node
      setTimeout(() => {
        const nodes = Array.from({ length: level + 1 }).map((item) => ({
          value: ++id,
          label: `Option - ${id}`,
          leaf: level >= 2,
        }))
        // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
        resolve(nodes)
      }, 100)
    },
  }
</script>

<template>
  <el-cascader v-model="value" class="ins-city" clearable :props="cascaderProps" @change="handleChange" />
</template>

<style lang="scss">
  .ins-city {
    width: 100%;
  }
</style>
