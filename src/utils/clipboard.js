// 复制文本到剪切板
export function clipboard(text) {
  return new Promise((resolve) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          resolve(true)
        })
        .catch(() => {
          resolve(false)
        })
    } else if (document.execCommand) {
      const copyDom = document.createElement('div')
      copyDom.innerText = text
      copyDom.style.position = 'absolute'
      copyDom.style.top = '0px'
      copyDom.style.right = '-9999px'
      document.body.appendChild(copyDom)
      //创建选中范围
      const range = document.createRange()
      range.selectNode(copyDom)
      //移除剪切板中内容
      window.getSelection()?.removeAllRanges()
      //添加新的内容到剪切板
      window.getSelection()?.addRange(range)
      //复制
      const successful = document.execCommand('copy')
      copyDom.parentNode?.removeChild(copyDom)
      try {
        const msg = successful ? 'successful' : 'failed'
        console.log(`Copy command was : ${msg}`)
      } catch (err) {
        console.log('Oops , unable to copy!')
      }

      resolve(successful)
    } else {
      resolve(false)
    }
  })
}
