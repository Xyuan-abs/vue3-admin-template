/**
 * 格式化 required rules
 * @returns
 */
export default function () {
  const getPlaceholder = ({ label, element, attrs }) => {
    const elementTypeMap = [
      ['input', 'inputNumber'],
      ['select', 'date-picker', 'icon-select', 'cascader', 'tree-select'],
      ['upload'],
      ['select-loadmore'],
    ]
    const placeholderMap = {
      '-1': `请输入${label}`,
      0: `请输入${label}`,
      1: `请选择${label}`,
      2: `请上传${label}`,
      3: attrs?.['remote-method'] ? `请输入关键词` : `请选择${label}`,
    }

    const elementType = elementTypeMap.findIndex((d) => d.includes(element))

    return placeholderMap[elementType]
  }
  return {
    getPlaceholder,
  }
}
