import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import autoImport from './.eslintrc-auto-import.json' assert { type: 'json' }

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules', 'dist', 'public'],
    files: ['**/*.{js,mjs,cjs,vue}'],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: autoImport,
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
      // 在这里追加 vue 规则
      'vue/multi-word-component-names': 'off',
    },
  },

  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended,
]
