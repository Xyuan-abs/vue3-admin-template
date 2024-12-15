/**
 * @returns
 */
export default function () {
  /**
   * 表单 ref
   */
  const InsFormRef = ref(null)

  /**
   *  服务记录信息 head
   */
  const dynamicForm = reactive({
    form: [
      { name: 'sn', label: 'SN', element: 'text', value: '' },
      { name: 'warranty', label: '保修时间', element: 'text', value: '' },
      { name: 'isWarranty', label: '是否在保', element: 'text', value: '' },
      { name: 'shopName', label: '店铺名称', element: 'text', value: '' },
      { name: 'category', label: '机器类别', element: 'text', value: '' },
      { name: 'modelNo', label: '机器型号', element: 'text', value: '' },
      { name: 'orderNo', label: '网店订单号', element: 'text', value: '' },
      { name: 'realName', label: '客户名称', element: 'text', value: '' },
      { name: 'phone', label: '客户电话', element: 'text', value: '' },
    ],
  })

  /**
   * 回显数据
   * @param {Object} data
   */
  function setData(data) {
    const dataResult = Object.assign({}, data, {
      isWarranty:
        data.warranty && new Date(data.warranty).getTime() > new Date().getTime() ? '是' : '否',
    })

    dynamicForm.form.forEach((d) => {
      const value = dataResult[d.name]
      if (value || value === 0) {
        d.value = value
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
