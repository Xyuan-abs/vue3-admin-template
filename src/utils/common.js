import { Message } from 'element-ui'

/**
 * 格式化 JSON 缩进显示
 * @param {*} jsonStr
 */
export function formatJson(jsonStr) {
  return JSON.stringify(JSON.parse(jsonStr), null, 2)
}

/**
 * 验证是否为JSON
 * @param {*} str
 */
export function isJSON(str) {
  try {
    const obj = JSON.parse(str)
    if (typeof obj === 'object' && obj) {
      return obj
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

/**
 * 用户是否有按钮权限
 * @param {String} buttonKey 按钮代码
 */
export function hasButton(buttonKey) {
  const buttons = JSON.parse(sessionStorage.getItem('buttonResources') || '[]')

  return buttons.includes(buttonKey)
}

/**
 * 用户是否有路由权限
 * @param {String} path 路由路径
 */
export function hasRoute(name, showMessage = true) {
  let result = false
  const authMenuByName = JSON.parse(sessionStorage.getItem('authMenuByName') || '{}')

  const exist = authMenuByName[name] || authMenuByName[name.split('_index')[0]]
  if (exist) {
    result = true
  } else {
    showMessage && Message.warning('没有访问权限！')
  }

  return result
}
