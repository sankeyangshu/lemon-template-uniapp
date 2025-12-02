import { defineConfig } from '@uni-helper/unh';

/**
 * unh 配置文件
 * 更多配置请参考：https://uni-helper.js.org/unh/
 */
export default defineConfig({
  platform: {
    default: 'mp-weixin',
    alias: {
      'h5': ['w', 'h'],
      'mp-weixin': 'wx',
    },
  },
  autoGenerate: {
    pages: true,
    manifest: true,
  },
});
