import Sortable from 'sortablejs'

/**
 *  拖拽 事件
 * @returns
 */
export default function (elTableRef, props, emit) {
  /* 拖拽 */
  const rowDrag = () => {
    const tbody = elTableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
    Sortable.create(tbody, {
      handle: '.el-table__row',
      animation: 300,
      onEnd({ newIndex, oldIndex }) {
        if (oldIndex === newIndex) return

        const currRow = props.tableData.splice(oldIndex, 1)[0]
        props.tableData.splice(newIndex, 0, currRow)

        nextTick(() => {
          emit('drag', newIndex, oldIndex)
        })
      },
    })
  }

  return {
    rowDrag,
  }
}
