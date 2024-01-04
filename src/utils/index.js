/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * 版本号
 */
export function versionNum() {
  let d = new Date()
  return `${d.getFullYear()}${d.getMonth() < 9 ? '0' : ''}${d.getMonth() + 1}${
    d.getDate() < 10 ? '0' : ''
  }${d.getDate()}${d.getHours() < 10 ? '0' : ''}${d.getHours()}${
    d.getMinutes() < 10 ? '0' : ''
  }${d.getMinutes()}${d.getSeconds() < 10 ? '0' : ''}${d.getSeconds()}`
}

export function processUserList(data, user) {
  return data.map((o) => {
    return {
      label: o.id === user ? `${o.realName}（本人）` : o.realName,
      value: o.id,
    }
  })
}

/**
 * 生成ws
 * @param {*} baseUrl
 * @param {*} url
 * @param {*} onopen
 * @param {*} onmessage
 * @param {*} onclose
 */
export function initWebSocket(baseUrl, url, onopen, onmessage, onclose = null) {
  // const baseUrl = 'http://192.168.22.142:8080' //window.location.origin
  const baseWsUrl = baseUrl.replace(/http|https/g, 'ws')
  const instance = new WebSocket(baseWsUrl + url)
  instance.onopen = onopen
  instance.onmessage = onmessage
  instance.onerror = () => {
    try {
      this.initWebSocket(url, onopen, onmessage, (onclose = null))
    } catch (e) {
      console.log('websoket error:', e)
    }
  }
  instance.onclose = function () {}
  return instance
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function formatFloat(num, fixed = 6) {
  if (typeof num !== 'number') {
    num = parseFloat(num) || 0
  }
  const parseIntNum = Number.parseInt(num)
  if (isNaN(parseIntNum)) {
    return 0
  } else {
    if (parseIntNum === num) {
      return num
    } else {
      return num.toFixed(fixed)
    }
  }
}
