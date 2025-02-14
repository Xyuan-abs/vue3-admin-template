<script setup>
import { mock } from '@/api/mock'
import useFetch from '@/hooks/useFetch'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const treeRef = ref(null)

const menuOption = ref([])

watch(
  () => props.modelValue,
  (val) => {
    if (val && val.length > 0) {
      treeRef.value?.setCheckedKeys(val)
    }
  },
  {
    immediate: true,
  },
)

const mockApi = () =>
  mock(null, [
    {
      menuId: 1,
      title: '菜单1',
      children: [
        { menuId: 2, title: '菜单1-1' },
        { menuId: 4, title: '菜单1-2' },
      ],
    },
    {
      menuId: 3,
      title: '菜单2',
    },
  ])

const { isFetching, executeFetch } = useFetch(mockApi, {
  name: '获取菜单列表',
  onSuccess: (res) => {
    const list = res.data ?? []
    menuOption.value = [...list]
  },
})

const onCheckChange = () => {
  const list = treeRef.value.getCheckedKeys()
  emit('update:modelValue', list)
}

onMounted(() => {
  executeFetch()
})
</script>

<template>
  <div class="menu-tree vab-tree-border">
    <el-tree
      ref="treeRef"
      v-loading="isFetching"
      :data="menuOption"
      node-key="menuId"
      show-checkbox
      @check-change="onCheckChange"
    >
      <template #default="{ data }">
        <span>{{ data.title }}</span>
      </template>
    </el-tree>
  </div>
</template>

<style>
.menu-tree {
  width: 100%;
}
</style>
