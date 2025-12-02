import type { ConfigEnv, UserConfig } from 'vite';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { createProxy, wrapperEnv } from './build/config';
import { createVitePlugins } from './build/plugins';

// https://vite.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const { mode } = config;

  const viteEnv = wrapperEnv(loadEnv(mode, root));

  return {
    base: viteEnv.VITE_BASE_URL || '/',

    // 加载插件
    plugins: createVitePlugins(),

    // 路径别名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // 跨域代理
    server: {
      host: true,
      port: viteEnv.VITE_PORT,
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: createProxy(viteEnv.VITE_PROXY),
    },

    esbuild: {
      // 使用 esbuild 压缩 剔除 console 和 debugger
      drop: viteEnv.VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
  };
});
