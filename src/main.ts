import { createSSRApp } from 'vue';
import { setupI18n } from '@/locales'; // 导入i18n
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';
import 'virtual:svg-icons-register';
import 'virtual:uno.css';
import '@unocss/reset/normalize.css';

export function createApp() {
  const app = createSSRApp(App);

  // 配置 store
  setupStore(app);

  // 配置路由
  setupRouter(app);

  // 导入i18n国际化
  setupI18n(app);

  return {
    app,
  };
}
