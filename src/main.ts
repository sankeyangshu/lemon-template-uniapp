import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import 'virtual:svg-icons-register';

export function createApp() {
  const app = createSSRApp(App);

  // 配置 store
  setupStore(app);

  return {
    app,
  };
}
