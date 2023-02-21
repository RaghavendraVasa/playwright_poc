module.exports = {
  extends: ['plugin:playwright/playwright-test', 'standard-with-typescript'],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {}
}
