import type { App } from 'vue';
import { createRouter } from 'uni-mini-router';
import { pages, subPackages } from 'virtual:uni-pages';
import { createRouterGuard } from './guards';

/**
 * 生成路由表
 */
function generateRoutes() {
  const routes = pages.map((page) => {
    const newPath = `/${page.path}`;
    return { ...page, path: newPath };
  });

  if (subPackages && subPackages.length > 0) {
    subPackages.forEach((subPackage) => {
      const subRoutes = subPackage.pages.map((page: any) => {
        const newPath = `/${subPackage.root}/${page.path}`;
        return { ...page, path: newPath };
      });
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
  createRouterGuard(router);
}

export { router };
