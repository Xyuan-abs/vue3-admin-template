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

  return {
    pagerParams,
  }
}
