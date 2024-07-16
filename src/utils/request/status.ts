import { i18n } from '@/locales';
import { useUserStore } from '@/store/modules/user';

/**
 * 校验网络请求状态码
 * @param {number} status 状态码
 * @param {string | string[]} message 错误提示信息
 */
export const checkStatus = (status: number, message?: string | Array<string>): void => {
  // user store
  const userStore = useUserStore();
  let errMsg = ''; // 错误提示信息

  switch (status) {
    case 400:
      uni.showToast({
        icon: 'none',
        title: i18n.global.t('api.errMsg400'),
      });
      break;
    case 401:
      uni.showToast({
        icon: 'none',
        title: i18n.global.t('api.errMsg401'),
      });
      // 退出登录
      userStore.logout();
      break;
    case 403:
      if (message) {
        errMsg = typeof message === 'string' ? message : message[0];
      }
      uni.showToast({
        icon: 'none',
        title: errMsg || i18n.global.t('api.errMsg403'),
      });
      break;
    case 404:
      uni.showToast({
        icon: 'none',
        title: i18n.global.t('api.errMsg404'),
      });
      break;
    case 405:
      uni.showToast({
        icon: 'none',
        title: i18n.global.t('api.errMsg405'),
      });
      break;
    case 408:
      uni.showToast({
        icon: 'none',
        title: i18n.global.t('api.errMsg408'),
      });
      break;
    case 500:
      uni.showToast({
        icon: 'none',
        title: i18n.global.t('api.errMsg500'),
      });
      break;
    case 502:
      uni.showToast({
        icon: 'none',
        title: i18n.global.t('api.errMsg502'),
      });
      break;
    case 503:
      uni.showToast({
        icon: 'none',
        title: i18n.global.t('api.errMsg503'),
      });
      break;
    case 504:
      uni.showToast({
        icon: 'none',
        title: i18n.global.t('api.errMsg504'),
      });
      break;
    default:
      if (message) {
        errMsg = typeof message === 'string' ? message : message[0];
      }
      uni.showToast({
        icon: 'none',
        title: errMsg || '网络错误，换个网络试试',
      });
  }
};
