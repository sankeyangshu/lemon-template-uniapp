import type { Router } from 'uni-mini-router';

/**
 * 创建路由守卫
 * @param router 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 这里可以做登录检查、权限检查等
    // eslint-disable-next-line no-console
    console.log('beforeEach 前置守卫:', { to, from });

    next();
  });

  router.afterEach((to, from) => {
    // 这里可以做埋点、统计等
    // eslint-disable-next-line no-console
    console.log('afterEach 后置守卫:', { to, from });
  });
}
