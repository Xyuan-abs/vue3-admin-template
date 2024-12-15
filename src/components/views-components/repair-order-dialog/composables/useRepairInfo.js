import { getDictionaryByCode } from '@/api/common.ts'
import { getOutletList } from '@/api/outlets-management.ts'

/**
 * @returns
 */
export default function (props) {
  /**
   * 维修方式
   * @readonly
   * @enum
   */
  const REPAIR_MODE = {
    /**
     * 寄回维修
     */
    RETURN_FOR_REPAIR: 0,
    /**
     * 寄配件
     */
    SEND_PART: 1,
    /**
     * 上门维修
     */
    ON_SITE_MAINTENANCE: 2,
    /**
     * 业务订制单
     */
    BUSINESS_ORDER: 3,
  }

  /**
   * 维修方式
   */
  const repairTypeOptions = [
    { label: '寄回维修', value: REPAIR_MODE.RETURN_FOR_REPAIR },
    { label: '寄配件', value: REPAIR_MODE.SEND_PART },
    { label: '上门维修', value: REPAIR_MODE.ON_SITE_MAINTENANCE },
    { label: '业务订制单', value: REPAIR_MODE.BUSINESS_ORDER },
  ]

  /**
   * 维修处理方式
   */
  const handlingTypeModeOptions = [
    { label: '检测良品', value: 0 },
    { label: '逾期退回', value: 1 },
    { label: '暂缺物料', value: 2 },
    { label: '换机-物料停采', value: 3 },
    { label: '换机-疑难问题', value: 4 },
    { label: '客户拒保', value: 5 },
    { label: '保修', value: 6 },
    { label: '付费维修', value: 7 },
    { label: '部分付费维修', value: 8 },
  ]

  /**
   * 表单 ref
   */
  const InsFormRef = ref(null)

  /**
   *  服务记录信息 head
   */
  const dynamicForm = reactive({
    form: [
      {
        name: 'source',
        label: '来源',
        value: '',
        options: [],
        componentProps: {
          api: getDictionaryByCode,
          params: 'ServiceRecordSource',
          immediate: true,
        },
        element: props.isDetail ? 'text' : 'select',
        rules: [{ required: !props.isDetail }],
      },
      {
        name: 'repairType',
        label: '维修类型',
        value: '',
        options: repairTypeOptions,
        element: props.isDetail ? 'text' : 'select',
        rules: [{ required: !props.isDetail }],
      },
      {
        name: 'branchId',
        label: '维修网点',
        value: '',
        options: [],
        attrs: { remote: true },
        componentProps: {
          api: getOutletList,
          params: {
            name: '',
          },
          keywordKey: 'name',
          labelKey: 'name',
          valueKey: 'id',
        },
        element: props.isDetail ? 'text' : 'select',
        rules: [{ required: !props.isDetail }],
        hidden: computed(() => {
          const repairType = dynamicForm.form.find((d) => d.name === 'repairType')
          return ![REPAIR_MODE.RETURN_FOR_REPAIR, REPAIR_MODE.ON_SITE_MAINTENANCE].includes(
            repairType.value
          )
        }),
      },
      {
        name: 'materials',
        label: '维修配件',
        element: 'slot',
        value: [],
        rules: [{ required: !props.isDetail }],
        hidden: computed(() => {
          const repairType = dynamicForm.form.find((d) => d.name === 'repairType')

          return ![
            REPAIR_MODE.SEND_PART,
            REPAIR_MODE.ON_SITE_MAINTENANCE,
            REPAIR_MODE.BUSINESS_ORDER,
          ].includes(repairType.value)
        }),
      },
      {
        name: 'handlingType',
        label: '维修处理方式',
        element: props.isDetail ? 'text' : 'select',
        value: '',
        options: handlingTypeModeOptions,
        rules: [{ required: !props.isDetail }],
      },
    ],
  })

  /**
   * 回显数据
   * @param {Object} data
   */
  function setData(data) {
    dynamicForm.form.forEach((d) => {
      if (data[d.name] || data[d.name] === 0) {
        d.value = data[d.name]
      }
    })
  }

  /**
   * 获取数据
   */
  async function getData() {
    return InsFormRef.value.toSaveData()
  }

  /**
   * 重置
   */
  function reset() {
    InsFormRef.value.resetForm()
  }

  return {
    InsFormRef,
    dynamicForm,
    setData,
    getData,
    reset,
  }
}
