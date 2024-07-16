import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate'; // 引入持久化插件
import { App } from 'vue';

/**
 * 创建pinia实例
 */
const store = createPinia();

// 使用数据持久化插件
store.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  })
);

/**
 * 配置pinia
 * @param app vue实例
 */
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
