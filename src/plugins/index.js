export let gp
import { ElMessage, ElMessageBox } from 'element-plus'

const plugins = {
  install(app) {
    gp = {
      /**
       * @description 全局Message
       * @param {Object} options 配置
       * @param {string} options.message 消息文字
       * @param {'success'|'warning'|'info'|'error'} options.type 主题
       * @param {string} options.customClass 自定义类名
       * @param {boolean} options.dangerouslyUseHTMLString 是否将message属性作为HTML片段处理
       */
      $baseMessage: ({
        message,
        type = 'info',
        customClass = `ins-message-${type}`,
        dangerouslyUseHTMLString,
        duration = 2000,
      } = {}) => {
        ElMessage({
          message,
          type,
          customClass,
          duration,
          dangerouslyUseHTMLString,
          showClose: true,
        })
      },
      /**
       * @description 全局Confirm
       * @param {Object} options 配置
       * @param {string|VNode} options.content 消息正文内容
       * @param {string} options.title 标题
       * @param {string} options.confirmButtonText 确定按钮的文本内容
       * @param {string} options.cancelButtonText 取消按钮的自定义类名
       * @param {'success'|'warning'|'info'|'error'} options.type 类型
       */
      $baseConfirm: ({
        content,
        title,
        confirmButtonText = '确定',
        cancelButtonText = '取消',
        type = 'warning',
      }) => {
        return ElMessageBox.confirm(content, title || '温馨提示', {
          confirmButtonText,
          cancelButtonText,
          closeOnClickModal: true,
          type,
          autofocus: false,
          lockScroll: false,
        })
      },
    }

    Object.keys(gp).forEach((key) => {
      app.provide(key, gp[key])
    })
  },
}

export function setupPlugins(app) {
  // 加载插件
  plugins.install(app)
}
