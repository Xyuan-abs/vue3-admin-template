import useIconList from './useIconList'

export default function () {
  const { iconList } = useIconList() // 所有icon

  // 过滤后的iconList
  const iconFilterList = ref([])
  // 关键字
  const keyword = ref('')
  // 分页
  const pageParams = reactive({
    page: 1,
    limit: 16,
    total: 0,
  })
  // 过滤
  const handleFilterIcon = () => {
    const { page, limit } = toRaw(pageParams)
    let list = iconList

    if (keyword.value) {
      list = iconList.filter((icon) => icon.includes(keyword.value))
    }

    pageParams.total = list.length
    iconFilterList.value = list.slice((page - 1) * limit, page * limit)
  }

  // 查询
  const handleSearch = () => {
    pageParams.page = 1
    handleFilterIcon()
  }

  /* 重置iconList */
  const handleReset = () => {
    keyword.value = ''
    handleSearch()
  }

  return {
    iconFilterList,
    keyword,
    pageParams,
    handleFilterIcon,
    handleSearch,
    handleReset,
  }
}
