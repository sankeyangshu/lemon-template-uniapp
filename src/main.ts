import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './locale';
import { setupStore } from './store';
import './styles/global.css';

export function createApp() {
  const app = createSSRApp(App);

  // 配置 store
  setupStore(app);

  // 配置 i18n 国际化
  setupI18n(app);

  return {
    app,
  };
}
