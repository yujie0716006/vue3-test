module.exports = {
    root: true,
    env: {
      node: true,
      'vue/setup-compiler-macros': true // 解决definePrps报提示错误
    },
    'extends': [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/typescript/recommended',
      './.eslintrc-auto-import.json',
    ],
    parserOptions: {
      ecmaVersion: 2020
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          mocha: true
        }
      }
    ],
    // 设置的全局属性
    // "globals": {}
  }