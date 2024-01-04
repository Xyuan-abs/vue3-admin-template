import { computed, useAttrs } from 'vue'

/**
 * 获取 表格 attrs
 * @param {*} attrs 外部attr
 * @returns
 */
export default function () {
  const defaultAttrs = {
    border: false,
    stripe: true,
  }

  const attrs = useAttrs()

  const $attrs = computed(() => {
    let result = {}
    result = Object.assign({}, defaultAttrs, attrs)

    return result
  })

  return {
    $attrs,
  }
}
