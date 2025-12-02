import uniHelper from '@uni-helper/eslint-config';

export default uniHelper({
  vue: true,
  formatters: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
  ignores: [
    '**/uni_modules/',
    'auto-import.d.ts',
    'uni-pages.d.ts',
    'src/pages.json',
    'src/manifest.json',
  ],
  isInEditor: false,
  rules: {
    'style/arrow-parens': ['error', 'always'], // 箭头函数参数始终添加括号
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }], // 括号样式
    'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
  },
});
