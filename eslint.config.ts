import uniHelper from '@uni-helper/eslint-config';
import pluginTailwindcss from 'eslint-plugin-better-tailwindcss';

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
}, {
  plugins: {
    'better-tailwindcss': pluginTailwindcss,
  },
  rules: {
    // enable all recommended rules to report a warning
    ...pluginTailwindcss.configs['recommended-warn'].rules,
    // enable all recommended rules to report an error
    ...pluginTailwindcss.configs['recommended-error'].rules,

    // or configure rules individually
    'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
  },
  settings: {
    'better-tailwindcss': {
      entryPoint: 'src/styles/global.css',
    },
  },
});
