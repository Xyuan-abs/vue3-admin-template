/**
 * 首字母大写
 * @param {String} source 源
 * @returns {String} result
 */
export function firstUpperCase(source) {
  return source.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}
