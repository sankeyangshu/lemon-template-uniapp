import Uni from '@dcloudio/vite-plugin-uni';
import UniComponents from '@uni-helper/vite-plugin-uni-components';
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import UniManifest from '@uni-helper/vite-plugin-uni-manifest';
import UniPages from '@uni-helper/vite-plugin-uni-pages';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // @see https://github.com/uni-helper/vite-plugin-uni-pages
    UniPages({
      dts: 'src/types/uni-pages.d.ts',
      exclude: ['**/components/**/**.*'],
      homePage: 'pages/index/index',
      subPackages: ['src/pages-sub'],
    }),
    // @see https://github.com/uni-helper/vite-plugin-uni-layouts
    UniLayouts(),
    // https://github.com/uni-helper/vite-plugin-uni-manifest
    UniManifest(),
    // @see https://github.com/uni-helper/vite-plugin-uni-components
    UniComponents({
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    Uni(),
  ],
});
