import { defineStore } from 'pinia';
import { ref } from 'vue';

type ConfigProviderTheme = 'light' | 'dark';

export const useSettingStore = defineStore(
  'settingState',
  () => {
    const darkMode = ref<ConfigProviderTheme>('light');

    const setThemeDark = (value: ConfigProviderTheme) => {
      darkMode.value = value;
    };

    return {
      darkMode,
      setThemeDark,
    };
  },
  {
    persist: true, // 进行持久化存储
  }
);
