import type { PluginOption } from 'vite';
import path from 'node:path';
import process from 'node:process';
import Uni from '@uni-helper/plugin-uni';
import UniComponents from '@uni-helper/vite-plugin-uni-components';
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers';
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import UniManifest from '@uni-helper/vite-plugin-uni-manifest';
import UniPages from '@uni-helper/vite-plugin-uni-pages';
import UniPlatform from '@uni-helper/vite-plugin-uni-platform';
import UniPlatformModifier from '@uni-helper/vite-plugin-uni-platform-modifier';
import UniRoot from '@uni-ku/root';
import ViteRestart from 'vite-plugin-restart';
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite';

/**
 * 配置 vite 插件
 */
export function createVitePlugins() {
  const vitePlugins: PluginOption = [
    // https://uni-helper.js.org/vite-plugin-uni-pages
    UniPages({
      exclude: ['**/components/**/*.*'],
      dts: 'src/types/uni-pages.d.ts',
    }),
    // https://uni-helper.js.org/vite-plugin-uni-layouts
    UniLayouts(),
    // https://uni-helper.js.org/vite-plugin-uni-manifest
    UniManifest(),
    // https://uni-helper.js.org/vite-plugin-uni-platform
    UniPlatform(),
    // https://uni-helper.js.org/vite-plugin-uni-platform-modifier
    UniPlatformModifier(),
    // https://github.com/uni-ku/root
    UniRoot({ excludePages: ['**/components/**/*.*'] }),
    // https://uni-helper.js.org/vite-plugin-uni-components
    UniComponents({
      dts: 'src/types/components.d.ts',
      resolvers: [WotResolver()],
    }),
    // https://uni-helper.js.org/plugin-uni
    Uni(),

    UnifiedViteWeappTailwindcssPlugin({
      rem2rpx: true,
      cssEntries: [
        path.join(process.cwd(), 'src/styles/global.css'),
      ],
    }),

    // 通过这个插件，再修改vite.config.ts文件则不需要重新运行也生效配置
    ViteRestart({
      restart: ['vite.config.ts'],
    }),
  ];

  return vitePlugins;
}
