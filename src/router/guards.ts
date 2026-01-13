/* eslint-disable no-console */

/**
 * 解析 URL 为路径和查询参数
 * @param url 完整的 URL
 */
export function parseUrl(url: string) {
  const [path, queryString] = url.split('?');
  const query: Record<string, string> = {};

  if (queryString) {
    queryString.split('&').forEach((item) => {
      const [key, value] = item.split('=');
      if (key) {
        query[key] = decodeURIComponent(value || '');
      }
    });
  }

  return { path, query };
}

/**
 * 是否开启路由日志
 */
const ROUTE_LOG_ENABLE = false;

/**
 * 路由拦截器
 */
export const routeInterceptor = {
  invoke({ url }: { url?: string }) {
    // url 为 undefined 时，直接返回不做处理
    if (url === undefined) {
      ROUTE_LOG_ENABLE && console.warn('路由拦截器: url 为 undefined');

      return;
    }

    ROUTE_LOG_ENABLE && console.log('路由拦截器: url ==>', url);

    // 插件页面直接放行
    if (url.startsWith('plugin://')) {
      ROUTE_LOG_ENABLE && console.log('路由拦截器: 插件页面，放行 ==>', url);
      return true;
    }

    const { path } = parseUrl(url);
    ROUTE_LOG_ENABLE && console.log('路由拦截器: path ==>', path);

    // 白名单页面直接放行
    // const whiteList = ['/pages/auth/login'];
    // if (whiteList.includes(path)) {
    //   ROUTE_LOG_ENABLE && console.log('路由拦截器: 白名单页面，放行 ==>', path);
    //   return true;
    // }

    // 检查用户是否已登录
    // const userStore = useUserStore();
    // if (!userStore.isLogin) {
    //   ROUTE_LOG_ENABLE && console.log('路由拦截器: 未登录，拦截跳转 ==>', path);
    //   uni.showToast({
    //     title: '请先登录',
    //     icon: 'none',
    //     success: () => {
    //       uni.navigateTo({
    //         url: '/pages/auth/login',
    //       });
    //     },
    //   });
    //   return false; // 阻止原始跳转
    // }

    return true; // 允许跳转
  },
  fail(err: any) {
    // 路由跳转失败时的处理
    if (ROUTE_LOG_ENABLE) {
      console.error('路由跳转失败:', err);
    }
  },
};

/**
 * 路由拦截器插件
 */
export const routeGuard = {
  install() {
    uni.addInterceptor('navigateTo', routeInterceptor);
    uni.addInterceptor('reLaunch', routeInterceptor);
    uni.addInterceptor('redirectTo', routeInterceptor);
    uni.addInterceptor('switchTab', routeInterceptor);
  },
};
