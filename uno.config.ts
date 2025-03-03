import process from 'node:process';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetApplet, presetRemRpx, transformerAttributify } from 'unocss-applet';
import type { Preset } from 'unocss';

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false;

const presets: Preset[] = [];

if (isApplet) {
  // 使用小程序预设
  presets.push(presetApplet(), presetRemRpx());
} else {
  presets.push(
    // 非小程序用官方预设
    presetUno(),
    // 支持css class属性化
    presetAttributify()
  );
}
export default defineConfig({
  presets: [
    ...presets,
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],

  shortcuts: {
    'm-0-auto': 'm-0 ma', // margin: 0 auto
    'wh-full': 'w-full h-full', // width: 100%, height: 100%
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'text-overflow': 'overflow-hidden whitespace-nowrap text-ellipsis',
    'text-break': 'whitespace-normal break-all break-words',
  },

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributify({
      // 解决与第三方框架样式冲突问题
      prefixedOnly: true,
      prefix: 'fg',
    }),
  ],

  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
});
