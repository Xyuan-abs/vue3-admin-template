export default function () {
  let resizeObserver

  /**
   * 监听尺寸变化
   */
  function watchResize(dom, cb) {
    resizeObserver = new ResizeObserver((entries) => {
      cb()
    })
    resizeObserver.observe(dom)
  }

  /**
   * 取消监听尺寸变化
   */
  function cancelWatchResize(dom) {
    resizeObserver.unobserve(dom)
  }
  return {
    watchResize,
    cancelWatchResize,
  }
}
