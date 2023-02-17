module.exports = {
  extends: ['plugin:playwright/playwright-test', 'standard-with-typescript'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [],
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
