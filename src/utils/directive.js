/**
 * 关键字标颜色
 * @param {*} el
 * @param {*} binding
 */
export function hightLight(el, binding) {
  const match = binding.arg
  let txt = binding.value

  if (match && txt) {
    let keys = Array.from(new Set(match.split(',')))
    keys.forEach((key) => {
      const reg = new RegExp(key, 'g')
      txt = txt.replace(reg, `<span style="color:#3390FF">${key}</span>`)
    })
  }
  el.innerHTML = txt
}

/**
 * 添加千分号
 * @param {*} el
 * @param {*} binding
 */
export function addQFH(el, binding) {
  if (binding.value || binding.value === 0) {
    const value = binding.value + ''
    let re = /\d{1,3}(?=(\d{3})+$)/g
    let res = value.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
      return s1.replace(re, '$&,') + s2
    })
    el.innerText = res
  } else {
    el.innerText = ''
  }
}
