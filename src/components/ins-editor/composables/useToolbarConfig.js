export default function (props, key) {
  /**
   * 最终配置
   */
  const toolbarConfig = computed(() => {
    return {
      excludeKeys: ['fullScreen', 'insertImage', 'insertVideo'],
      ...props[key],
    }
  })

  return toolbarConfig
}
