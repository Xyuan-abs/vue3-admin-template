export let gp
import { ElMessage } from 'element-plus'

const plugins = {
  install(app) {
    gp = {
      /**
       * @description 全局Message
       * @param {string} message 消息文字
       * @param {'success'|'warning'|'info'|'error'} type 主题
       * @param {string} customClass 自定义类名
       * @param {boolean} dangerouslyUseHTMLString 是否将message属性作为HTML片段处理
       */
      $baseMessage: (
        message,
        type = 'info',
        customClass = `ins-message-${type}`,
        dangerouslyUseHTMLString
      ) => {
        ElMessage({
          message,
          type,
          customClass,
          duration: 2000,
          dangerouslyUseHTMLString,
          showClose: true,
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
