<!-- 
  名称：页面标签栏
 -->
<script setup>
const routes = useRoute()
const router = useRouter()

const currentPageTab = ref('2')
const pageTabs = ref([])

// 添加tab
const addTab = () => {
  pageTabs.value.push({
    title: routes.meta.title,
    name: routes.path,
  })
  currentPageTab.value = routes.path
}

// 删除
const removeTab = (targetName) => {
  const tabs = pageTabs.value
  const currentName = currentPageTab.value

  const currentIndex = tabs.findIndex((d) => d.name === currentName)
  const nextName = (tabs[currentIndex + 1] || tabs[currentIndex - 1]).name

  // 更新list
  pageTabs.value = tabs.filter((tab) => tab.name !== targetName)

  // 如果删除的tab为当前选中tab  选中下一个tab
  if (currentName === targetName) {
    changeTab(nextName)
  }
}

// 切换 tab
const changeTab = (name) => {
  router.push({
    path: name,
  })
}

watch(
  () => routes.path,
  () => {
    if (pageTabs.value.some((d) => d.name === routes.path)) {
      currentPageTab.value = routes.path
    } else {
      addTab()
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="page-tabs">
    <el-tabs v-model="currentPageTab" type="card" @tab-remove="removeTab" @tab-change="changeTab">
      <el-tab-pane
        v-for="item in pageTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="pageTabs.length > 1"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.page-tabs {
  :deep() {
    .el-tabs {
      &__header {
        border-bottom: none;
        margin-bottom: 0 !important;
        height: fit-content;
      }
      &__nav {
        border: none !important;
      }
      &__item {
        border: 1px solid var(--el-border-color-light) !important;
        height: 34px;
        margin-right: 5px;
        line-height: 34px;
        &.is-active {
          border-color: var(--primary-color) !important;
          background-color: var(--el-color-primary-light-9);
        }
        &:hover {
          border-color: var(--primary-color) !important;
        }
      }
    }
  }
}
</style>
