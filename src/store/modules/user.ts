import type { LoginData, UserInfo } from '@/api/user';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { postLoginAPI } from '@/api/user';

export const useUserStore = defineStore(
  'userStore',
  () => {
    /**
     * 登录token
     */
    const token = ref<string>('');

    /**
     * 用户信息
     */
    const userInfo = ref<UserInfo | null>(null);

    /**
     * 是否登录
     */
    const isLogin = computed(() => !!token.value);

    /**
     * 设置token
     * @param value token
     */
    const setToken = (value: string) => {
      token.value = value;
    };

    /**
     * 设置用户信息
     * @param value 用户信息
     */
    const setUserInfo = (value: UserInfo) => {
      userInfo.value = value;
    };

    /**
     * 登录
     * @param loginForm 登录表单
     */
    const login = async (loginForm: LoginData) => {
      const { username, password } = loginForm;

      return new Promise<void>((resolve, reject) => {
        postLoginAPI({ username: username.trim(), password })
          .then(({ user, token }) => {
            setToken(token); // 保存用户token
            setUserInfo(user); // 保存用户信息
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    /**
     * 退出登录
     */
    const logout = () => {
      token.value = ''; // 清除用户token
      userInfo.value = null; // 清除用户信息
    };

    return {
      token,
      userInfo,
      isLogin,
      setToken,
      setUserInfo,
      login,
      logout,
    };
  },
  {
    persist: true, // 进行持久化存储
  },
);
