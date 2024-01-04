module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none',
      },
    ],
  },
}
