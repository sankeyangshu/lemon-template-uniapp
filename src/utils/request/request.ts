import { un } from '@uni-helper/uni-network';
import { useUserStore } from '@/store/modules/user';
import { checkStatus } from './status';
import type { UnError, UnResponse } from '@uni-helper/uni-network';

// 创建新的实例
const service = un.create({
  // 公共接口
  baseUrl: import.meta.env.VITE_SERVER_BASEURL,
  // 超时时间 单位是ms，这里设置了5s的超时时间
  timeout: 5000,
});

// 添加一个请求拦截器
service.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断pinia中是否存在token,如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    const userStore = useUserStore();
    const token = userStore.userState.token;

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    // 请求错误，这里可以用全局提示框进行提示
    uni.showToast({
      icon: 'none',
      title: '请求错误，请稍后再试',
    });
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  (response: UnResponse<CustomSuccessData<any>>) => {
    const { status, data } = response;
    if (status === 200) {
      // 接口网络请求成功，关闭等待提示
      if (data.code === 0) {
        // 接口请求结果正确
        return data.data;
      } else {
        checkStatus(data.code, data.message);
        return Promise.reject(data);
      }
    }
  },
  (error: UnError) => {
    const { response } = error;
    // 根据响应的错误状态码，做不同的处理
    if (response) {
      checkStatus(response.status);
    }
    return Promise.reject(error);
  }
);

export default service;
