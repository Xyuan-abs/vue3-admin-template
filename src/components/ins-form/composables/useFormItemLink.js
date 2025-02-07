import { isFunction } from 'lodash'
import EventBus from '@/utils/event-bus'

/* *
 * 示例
 * {
 *   name: 'name',
 *   value:'1',
 *   linkage: {
 *    age: {
 *      disabled: (newVal) => newVal === '1',
 *      required: (newVal) => newVal === '1',
 *      hidden: (newVal) => newVal === '1',
 *      isShow: (newVal) => newVal === '1',
 *      custom: (newVal) => {
 *        if (newVal === '1') {
 *          return {
 *            attrs: {
 *              placeholder: '请输入年龄'
 *            }
 *          }
 *        }else{
 *          return {}
 *        }
 *      }
 *    }
 *  }
 * }
 */

/**
 * 表单联动
 * @param {*} dynamicForm 动态表单配置对象
 * @returns
 */
export default function (dynamicForm, clearValidate) {
  let isSettingFormValue = false
  const linkablePropList = ['required', 'value', 'params', 'disabled', 'hidden', 'isShow', 'custom']

  dynamicForm.form.forEach((formItem) => {
    if (formItem.linkage) {
      watch(
        () => formItem.value,
        (newVal) => {
          handleFormItemValueChange(formItem, newVal)
        },
        {
          immediate: true,
        },
      )
    }
  })

  function handleFormItemValueChange(formItem, newVal) {
    Object.keys(formItem.linkage).forEach(async (key) => {
      const linkageFormItem = dynamicForm.form.find((item) => item.name === key)
      if (!linkageFormItem) return

      const linkage = formItem.linkage[key]

      for (let i = 0; i < linkablePropList.length; i++) {
        const prop = linkablePropList[i]
        if (linkage[prop] && isFunction(linkage[prop])) {
          // 禁用
          if (prop === 'disabled') {
            await handleDisabled(linkageFormItem, linkage, prop, newVal)
          }
          // 必填
          else if (prop === 'required') {
            await handleRequired(linkageFormItem, linkage, prop, newVal)
          }
          // 选项请求参数
          else if (prop === 'params') {
            await handleParams(linkageFormItem, linkage, prop, newVal)
          }
          // 自定义
          else if (prop === 'custom') {
            await handleCustom(linkageFormItem, linkage, prop, newVal)
          }
          // 表单项值
          else if (prop === 'value' && !isSettingFormValue) {
            linkageFormItem[prop] = await linkage[prop](newVal)
          }
          // 其他
          else {
            linkageFormItem[prop] = await linkage[prop](newVal)
          }
        }
      }
    })
  }

  /**
   * 禁用
   * @param {*} linkageFormItem 联动的表单项
   * @param {*} linkage 联动配置
   * @param {*} prop 联动属性键名
   * @param {*} newVal 当前表单项的值
   */
  async function handleDisabled(linkageFormItem, linkage, prop, newVal) {
    if (!linkageFormItem.attrs) {
      console.error(`表单项 ${linkageFormItem.name}未配置 attrs 属性`)
      return
    }

    if (linkageFormItem.attrs.disabled === undefined) {
      console.error(`表单项 ${linkageFormItem.name}未配置 attrs.disabled 属性`)
      return
    }
    linkageFormItem.attrs.disabled = await linkage[prop](newVal)
  }

  /**
   * 必填
   * @param {*} linkageFormItem 联动的表单项
   * @param {*} linkage 联动配置
   * @param {*} prop 联动属性键名
   * @param {*} newVal 当前表单项的值
   */
  async function handleRequired(linkageFormItem, linkage, prop, newVal) {
    if (!linkageFormItem.rules) {
      console.error(`表单项 ${linkageFormItem.name}未配置 rules 属性`)
      return
    }
    const requiredRuleItem = linkageFormItem.rules.find((d) => d.required !== undefined)

    if (!requiredRuleItem) {
      console.error(`表单项 ${linkageFormItem.name} rules 未找到存在 required 属性的对象`)
      return
    }

    requiredRuleItem.required = await linkage[prop](newVal)
    if (!requiredRuleItem.required) {
      nextTick(() => {
        clearValidate(linkageFormItem.name)
      })
    }
  }

  /**
   * 选项查询参数
   * @param {*} linkageFormItem 联动的表单项
   * @param {*} linkage 联动配置
   * @param {*} prop 联动属性键名
   * @param {*} newVal 当前表单项的值
   */
  async function handleParams(linkageFormItem, linkage, prop, newVal) {
    if (!linkageFormItem.componentProps) {
      console.error(`表单项 ${linkageFormItem.name}未配置 componentProps 属性`)
      return
    }

    if (linkageFormItem.componentProps.params === undefined) {
      console.error(`表单项 ${linkageFormItem.name}未配置 componentProps.params 属性`)
      return
    }

    linkageFormItem.componentProps.params = await linkage[prop](
      newVal,
      linkageFormItem.componentProps.params,
    )
  }

  /**
   * 自定义
   * @param {*} linkageFormItem 联动的表单项
   * @param {*} linkage 联动配置
   * @param {*} prop 联动属性键名
   * @param {*} newVal 当前表单项的值
   */
  async function handleCustom(linkageFormItem, linkage, prop, newVal) {
    const config = linkage[prop](newVal)
    if (Object.prototype.toString.call(config) !== '[object Object]') {
      console.error(`linkage.${prop} 必须返回一个对象`)
      return
    }
    Object.assign(linkageFormItem, config)
  }

  EventBus.on('is-setting-form-value', (flag) => {
    isSettingFormValue = flag
  })

  return {}
}
