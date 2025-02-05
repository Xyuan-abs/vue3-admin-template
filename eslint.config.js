// eslint.config.js
import globals from 'globals'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    ignores: ['node_modules', 'dist', 'public'],
  },

  ...eslintPluginVue.configs['flat/recommended'],

  /**
   * javascript 规则
   */
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    rules: {
      // 禁止声明未使用的变量。
      'no-unused-vars': [
        'error',
        {
          vars: 'all', // 检查所有变量
          args: 'none', // 不检查函数参数
        },
      ],
      'prefer-const': 'error', // 如果变量不会被重新赋值，则使用 const。
      eqeqeq: 'error', // 要求使用全等运算符（=== 和 !==）。
    },
  },

  /**
   * 配置全局变量
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser,

        /** 追加一些其他自定义全局规则 */
        wx: true,
      },
    },
  },

  /**
   * vue 规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 在这里追加 vue 规则
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
    },
  },

  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended,
]
