import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest';
import { loadEnv } from 'vite';

// 获取环境变量
const env = loadEnv(process.env.NODE_ENV!, process.cwd());
const {
  VITE_APP_TITLE,
  VITE_UNI_APPID,
  VITE_WX_APPID,
  VITE_APP_PUBLIC_BASE,
  VITE_FALLBACK_LOCALE,
} = env;

export default defineManifestConfig({
  name: VITE_APP_TITLE,
  appid: VITE_UNI_APPID,
  description: '',
  versionName: '1.0.0',
  versionCode: '100',
  transformPx: false,
  locale: VITE_FALLBACK_LOCALE, // 国际化默认语言
  /* 5+App特有相关 */
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    /* 模块配置 */
    modules: {},
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
        ],
      },
      /* ios打包配置 */
      ios: {},
      /* SDK配置 */
      sdkConfigs: {},
    },
  },
  /* 快应用特有相关 */
  quickapp: {},
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: VITE_WX_APPID,
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
    darkmode: true,
    themeLocation: 'theme.json',
  },
  'mp-alipay': {
    usingComponents: true,
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  h5: {
    darkmode: true,
    themeLocation: 'theme.json',
    router: {
      base: VITE_APP_PUBLIC_BASE,
    },
  },
  uniStatistics: {
    enable: false,
  },
  vueVersion: '3',
});
