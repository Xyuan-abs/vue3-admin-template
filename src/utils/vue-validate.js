/**
 * vue 表单验证规则
 */
const zuoji = /^0\d{2,3}-?\d{7,8}$/
const shouji = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
export function validatTelAndPhone(rule, value, callback) {
  const label = rule.label || '座机号'
  if (value) {
    if (!zuoji.test(value)) {
      // callback(new Error(`请输入正确的${label}`))
      if (!shouji.test(value)) {
        callback(new Error(`请输入正确的${label}`))
      } else {
        callback()
      }
    } else {
      // console.log('fdfd')
      callback()
    }
  } else {
    callback()
  }
}

/* 座机 */
export function validatTel(rule, value, callback) {
  const label = rule.label || '座机号'
  if (value) {
    const reg = zuoji
    if (!reg.test(value)) {
      callback(new Error(`请输入正确的${label}`))
    }
    callback()
  } else {
    callback()
  }
}

/* 手机号码 */
export function validatPhone(rule, value, callback) {
  const label = rule.label || '手机号'
  if (value) {
    const reg = shouji
    if (!reg.test(value)) {
      callback(new Error(`请输入正确的${label}`))
    }
    callback()
  } else {
    callback(new Error(`请输入${label}`))
  }
}

/* 邮箱 */
export function validatEmail(rule, value, callback) {
  const label = rule.label || '邮箱'
  if (!value) {
    callback()
  } else {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!reg.test(value)) {
      callback(new Error(`请输入正确的${label}`))
    }
    callback()
  }
}

/* 身份证 */
export function validatIdCard(rule, value, callback) {
  const label = rule.label || '身份证号码'
  if (!value) {
    callback(new Error(`请输入${label}`))
  } else {
    const reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    if (!reg.test(value)) {
      callback(new Error(`请输入正确的${label}`))
    }
    callback()
  }
}

/* 合法uri*/
export function validateURL(rule, value, callback) {
  const label = rule.label || 'URL'
  if (!value) {
    callback(new Error(`请输入${label}`))
  } else {
    const urlregex =
      /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    if (!urlregex.test(value)) {
      callback(new Error(`请输入正确的${label}`))
    }
    callback()
  }
}
/**合法ip */
export function validateIP(rule, value, callback) {
  const label = rule.label || 'IP'
  if (!value) {
    callback(new Error(`请输入${label}`))
  } else {
    const urlregex = /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/
    if (!urlregex.test(value)) {
      callback(new Error(`请输入正确的${label}`))
    }
    callback()
  }
}

/* 小写字母*/
export function validateLowerCase(rule, value, callback) {
  const label = rule.label || '值'
  if (!value) {
    callback(new Error(`请输入${label}`))
  } else {
    const reg = /^[a-z]+$/
    if (!reg.test(value)) {
      callback(new Error(`请输入正确的${label}`))
    }
    callback()
  }
}

/* 大写字母*/
export function validateUpperCase(rule, value, callback) {
  const label = rule.label || '值'
  if (!value) {
    callback(new Error(`请输入${label}`))
  } else {
    const reg = /^[A-Z]+$/
    if (!reg.test(value)) {
      callback(new Error(`请输入正确的${label}`))
    }
    callback()
  }
}

/* 大小写字母*/
export function validatAlphabets(rule, value, callback) {
  const label = rule.label || '值'
  if (!value) {
    callback(new Error(`请输入${label}`))
  } else {
    const reg = /^[A-Za-z]+$/
    if (!reg.test(value)) {
      callback(new Error(`请输入正确的${label}`))
    }
    callback()
  }
}

/**合法ip */
export function validatBankCard(rule, value, callback) {
  const label = rule.label || '银行卡号'
  if (!value) {
    callback(new Error(`请输入${label}`))
  } else {
    const reg = /^([1-9]{1})(\d{14}|\d{18})$/
    if (!reg.test(value)) {
      callback(new Error(`${label}格式不正确`))
    }
    callback()
  }
}

/**前后空格 */
export function validatSpaceFB(rule, value, callback) {
  if (!value) {
    callback()
  } else {
    const allSpaceReg = /^\s+$/
    const fbSpaceReg = /^\s+|\s+$/
    if (allSpaceReg.test(value)) {
      callback(new Error(`不能全为空格`))
    } else if (fbSpaceReg.test(value)) {
      callback(new Error(`前后不能存在空格`))
    }
    callback()
  }
}
