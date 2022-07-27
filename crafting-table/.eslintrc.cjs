/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'comma-dangle': [2, 'only-multiline'],
    'vue/multi-word-component-names': 'off',
    semi: [2, 'always'],
  },
};
