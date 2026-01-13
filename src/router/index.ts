import type { App } from 'vue';
import { createRouter } from '@wot-ui/router';
import { pages, subPackages } from 'virtual:uni-pages';
import { routeGuard } from './guards';

/**
 * 生成路由表
 */
export function generateRoutes() {
  // 主包路由
  const routes = pages.map((page) => ({
    ...page,
    path: `/${page.path}`,
  }));

  // 分包路由
  if (subPackages && subPackages.length > 0) {
    subPackages.forEach((subPackage) => {
      const subRoutes = subPackage.pages.map((page: any) => ({
        ...page,
        path: `/${subPackage.root}/${page.path}`,
      }));

      routes.push(...subRoutes);
    });
  }

  return routes;
}

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 */
const router = createRouter({
  routes: generateRoutes(), // 路由表信息
});

/**
 * 配置路由器
 * @param app vue实例
 */
export function setupRouter(app: App<Element>) {
  app.use(router);
  app.use(routeGuard);
}

export { router };
