/**
 * 分页
 * @returns
 */
export default function ({ page = 1, size = 10, total = 0 } = {}) {
  const pagerParams = reactive({
    page,
    size,
    total,
  })

  /**
   * 重置页码
   */
  function resetPager() {
    pagerParams.page = 1
    pagerParams.total = 0
  }

  /**
   * 设置页码
   */
  function setPagerTotal(total) {
    pagerParams.total = total ?? 0
  }

  return {
    pagerParams,
    resetPager,
    setPagerTotal,
  }
}
