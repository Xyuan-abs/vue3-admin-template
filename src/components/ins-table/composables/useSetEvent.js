import { ref } from 'vue'

/**
 *  表格 事件
 * @returns
 */
export default function () {
  const elTableRef = ref(null)
  const dispatch = (eventName, ...arg) => {
    elTableRef.value[eventName](...arg)
  }

  return {
    elTableRef,
    dispatch,
  }
}
