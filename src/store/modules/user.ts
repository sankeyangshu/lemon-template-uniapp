import { defineStore } from 'pinia';
import { ref } from 'vue';
import { postLoginAPI } from '@/api/user';
import type { loginDataType } from '@/api/user';

interface userStoreType {
  token: string;
}

export const useUserStore = defineStore(
  'userStore',
  () => {
    /**
     * 用户信息
     */
    const userState = ref<userStoreType>({
      token: '',
    });

    /**
     * 设置token
     * @param value token
     */
    const setToken = (value: string) => {
      userState.value.token = value;
    };

    /**
     * 登录
     * @param loginForm 登录表单
     */
    const login = async (loginForm: loginDataType) => {
      const { username, password } = loginForm;

      return new Promise<void>((resolve, reject) => {
        postLoginAPI({ username: username.trim(), password })
          .then(({ data }) => {
            setToken(data.token); // 保存用户token
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
      userState.value.token = '';
    };

    return {
      userState,
      setToken,
      login,
      logout,
    };
  },
  {
    persist: true, // 进行持久化存储
  }
);
