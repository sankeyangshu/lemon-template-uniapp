import Uni from '@dcloudio/vite-plugin-uni';
import UniComponents from '@uni-helper/vite-plugin-uni-components';
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import UniManifest from '@uni-helper/vite-plugin-uni-manifest';
import UniPages from '@uni-helper/vite-plugin-uni-pages';
import path from 'path';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  const { UNI_PLATFORM } = process.env;
  // mode 返回应用的环境模式 development（开发环境） 或者 production（生产环境）
  const { mode } = config;
  // loadEnv() 根据 mode 检查 root(项目根路径) 路径下 .env、.env.development 环境文件，输出 NODE_ENV 和 VITE_ 开头的键值队
  const env = loadEnv(mode, process.cwd());
  // 读取并处理所有环境变量配置文件 .env
  const { VITE_APP_PORT, VITE_DELETE_CONSOLE, VITE_SHOW_SOURCEMAP } = env;

  return {
    // 加载插件
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
      createSvgIconsPlugin({
        // 指定需要缓存的svg图标文件目录
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],

    // 配置别名
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
      },
    },

    // 跨域代理
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      // proxy: {
      //   '/api': {
      //     target: VITE_SERVER_BASEURL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },

    // 定义全局常量替换方式
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
    },

    // 打包配置
    build: {
      // 方便非h5端调试
      sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: 'es6',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: VITE_DELETE_CONSOLE === 'true',
          drop_debugger: true,
        },
      },
    },
  };
});
