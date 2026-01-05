import uniHelper from '@uni-helper/eslint-config';
import pluginTailwindcss from 'eslint-plugin-better-tailwindcss';

export default uniHelper(
  {
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
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/no-empty-component-block': 'error',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
    },
  },
  {
    plugins: {
      'better-tailwindcss': pluginTailwindcss,
    },
    rules: {
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
  },
);
