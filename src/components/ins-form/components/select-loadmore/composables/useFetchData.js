/**
 * 加载更多
 * @param {*} formItem 表单项配置
 * @returns
 */
export default function (formItem, selectRef) {
  const searchLoading = ref(false)
  const loadMoreLoading = ref(false)
  const isNoMore = ref(false)
  const isError = ref(false)

  const componentProps = formItem?.componentProps || {}

  const searchParams = {
    keywords: '',
    page: 1,
    size: 10,
  }

  /* 查询 */
  const handleSearch = async (keywords) => {
    const { api } = componentProps

    searchParams.keywords = keywords.trim()

    if (!searchParams.keywords || !api) return

    reset()
    resetScrollBar()

    searchLoading.value = true
    const options = await fetchOptions(keywords)
    searchLoading.value = false
    formItem.options = options
    console.log('formItem.options', formItem.options)
  }

  /* 监听 加载更多 触发 */
  const watchLoadMore = () => {
    const el = selectRef.value.$el
    const dom = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap') // 获取下拉框元素
    dom.addEventListener('scroll', function () {
      // 监听元素触底
      const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (condition && !loadMoreLoading.value) {
        console.log('触底了~')
        loadmore()
      }
    })
  }

  /* 加载更多 */
  const loadmore = async () => {
    if (searchLoading.value || loadMoreLoading.value || isNoMore.value || isError.value || !componentProps.api) return

    searchParams.page++

    loadMoreLoading.value = true
    const options = await fetchOptions()
    loadMoreLoading.value = false

    formItem.options.push(...options)
  }

  /* 获取数据 */
  const fetchOptions = async () => {
    const { keywords, page, size } = searchParams

    const { api, params, keywordsKey = 'keywords', pageKey = 'page', sizeKey = 'size' } = componentProps

    const _params = Object.assign({}, params, {
      [keywordsKey]: keywords,
      [pageKey]: page,
      [sizeKey]: size,
    })
    const res = await api(_params).catch((e) => {
      console.error(e)
      isError.value = true
    })
    const options = formatterOptions(res)

    isNoMore.value = options.length < size

    return options
  }

  /* 格式化 options */
  function formatterOptions(res) {
    if (!res) return []

    const { resultField = 'data', labelKey = 'label', valueKey = 'value' } = componentProps

    let list = []
    if (Array.isArray(res)) {
      list = res
    }
    if (Object.prototype.toString.call(res) === '[object Object]') {
      const keys = resultField.split('.')
      list = keys.reduce((prev, cur) => prev[cur], res)
    }

    return list.map((d) => ({
      label: d[labelKey],
      value: d[valueKey],
    }))
  }

  // 重置参数
  function reset() {
    searchLoading.value = false
    loadMoreLoading.value = false
    isNoMore.value = false
    isError.value = false

    searchParams.page = 1
  }

  /* 重置滚动条位置 */
  const resetScrollBar = () => {
    const el = selectRef.value.$el
    const dom = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap') // 获取下拉框元素
    const scrollBarVertical = el.querySelector('.el-scrollbar__thumb.is-vertical')
    const scrollBarHorizontal = el.querySelector('.el-scrollbar__thumb.is-horizontal')
    dom.scrollTop = 0
    scrollBarVertical && (scrollBarVertical.style.transform = '')
    scrollBarHorizontal && (scrollBarHorizontal.style.transform = '')
  }

  return {
    isNoMore,
    isError,
    searchLoading,
    handleSearch,
    loadMoreLoading,
    watchLoadMore,
    loadmore,
  }
}
