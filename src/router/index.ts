import { createRouter } from 'uni-mini-router';
import pagesJsonToRoutes from 'uni-parse-pages';
import pagesJson from '../pages.json';
import type { App } from 'vue';

// 生成路由表
const routes = pagesJsonToRoutes(pagesJson);

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 */
const router = createRouter({
  routes: [...routes], // 路由表信息
});

/**
 * 配置路由器
 * @param app vue实例
 */
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export { router };
