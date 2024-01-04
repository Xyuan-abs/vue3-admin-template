import { computed, useAttrs } from 'vue'

/**
 * 获取 分页 attrs
 * @param {*} attrs 外部attr
 * @returns
 */
export default function () {
  const defaultAttrs = {
    background: true,
    layout: 'total,sizes,jumper,->,prev, pager, next',
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
