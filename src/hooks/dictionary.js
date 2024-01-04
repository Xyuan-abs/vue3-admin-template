import store from '../store'

let { dictionary, staticDic } = store.getters ?? {}

/**
 * 字典数据及方法
 * @class Dictionary
 * @constructor
 */
class Dictionary {
  constructor() {
    this.dictionary = dictionary
    this.staticDic = staticDic
  }

  /* 获取options */
  getOptions(codeName) {
    let result = null
    let dictionary = this.dictionary
    let staticDic = this.staticDic
    // 获取到目标options
    let dictionaryOptions = staticDic[codeName] || dictionary.filter((d) => d.dicType === codeName)
    // 转换格式
    if (dictionaryOptions) {
      result = dictionaryOptions.map((d) => {
        d.label = d.dicName
        d.value = d.dicCode
        return d
      })
    }

    return result
  }
  /* 获取optionItem的label */
  getOptionLabel(codeName, value) {
    // 获取options
    let options = this.getOptions(codeName)
    // 获取label
    let label = options?.find((d) => d.value === value)?.label
    return label
  }
}

let dictionary_t = new Dictionary()

/**
 * 获取字典实例
 * @returns Dictionary实例
 */
export function useDictionary() {
  return dictionary_t
}
