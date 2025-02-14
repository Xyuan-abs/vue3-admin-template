import { cloneDeep } from 'lodash'

/**
 * 弹窗类型
 */
export const DIALOG_TYPE = {
  /**
   * 默认
   */
  DEFAULT: 'default',
  /**
   * 详情
   */
  DETAIL: 'detail',
  /**
   * 新增
   */
  ADD: 'add',
  /**
   * 编辑
   */
  EDIT: 'edit',
}

/**
 * 弹窗名称前缀
 */
export const DIALOG_TYPE_PRE_TITLE = {
  [DIALOG_TYPE.DEFAULT]: '',
  [DIALOG_TYPE.DETAIL]: '详情',
  [DIALOG_TYPE.ADD]: '新增',
  [DIALOG_TYPE.EDIT]: '编辑',
}

/**
 * 弹窗
 * @returns
 */
export default function (_title, _commonDialogType = DIALOG_TYPE.DEFAULT) {
  /**
   * 行数据
   */
  const row = ref()

  /**
   * 弹窗类型
   */
  const dialogType = ref(_commonDialogType)

  /**
   * 标题
   */
  const title = computed(() => {
    const type = dialogType.value

    const preTitle = DIALOG_TYPE_PRE_TITLE[type]
    if (type === DIALOG_TYPE.DETAIL) {
      return `${_title}${preTitle}`
    } else {
      return `${preTitle}${_title}`
    }
  })

  /**
   * 是否展示
   */
  const dialogVisible = ref(false)

  /**
   * 当弹窗打开时回调
   */
  let dialogOpenCallback = null

  /**
   * 打开弹窗
   * @param {Object} rowData 行数据
   * @param {String} [_dialogType] 弹窗类型
   */
  const handleOpenDialog = (rowData, _dialogType) => {
    row.value = cloneDeep(rowData)
    if (_dialogType) {
      dialogType.value = _dialogType
    }

    dialogVisible.value = true

    nextTick(() => {
      dialogOpenCallback && dialogOpenCallback(row.value, dialogType.value)
    })
  }

  /**
   * 关闭弹窗
   */
  const handleCloseDialog = () => {
    dialogVisible.value = false
  }

  /**
   * 当弹窗打开时
   * @param {*} cb
   */
  const onDialogOpen = (cb) => {
    dialogOpenCallback = cb
  }

  return {
    dialogType,
    DIALOG_TYPE,
    row,
    title,
    dialogVisible,
    onDialogOpen,
    handleOpenDialog,
    handleCloseDialog,
  }
}
