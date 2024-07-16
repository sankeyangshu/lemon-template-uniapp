import { defineStore } from 'pinia';
import { ref } from 'vue';

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
     * 退出登录
     */
    const logout = () => {
      userState.value.token = '';
    };

    return {
      userState,
      setToken,
      logout,
    };
  },
  {
    persist: true, // 进行持久化存储
  }
);
