/**
 * session 存储
 * @param {*} key
 * @param {*} val
 */
export const setSessionStorage = (key, val) => {
  window.sessionStorage.setItem(key, JSON.stringify(val))
}

/**
 * session 获取
 * @param {*} key
 */
export const getSessionStorage = (key) => {
  const res = window.sessionStorage.getItem(key)
  return JSON.parse(res)
}

/**
 * local 存储
 * @param {*} key
 * @param {*} val
 */
export const setLocalStorage = (key, val) => {
  window.localStorage.setItem(key, val ? JSON.stringify(val) : '')
}

/**
 * local 获取
 * @param {*} key
 */
export const getLocalStorage = (key) => {
  const res = window.localStorage.getItem(key)
  return res ? JSON.parse(res) : ''
}
