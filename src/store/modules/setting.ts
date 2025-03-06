import { defineStore } from 'pinia';
import { ref } from 'vue';

type ConfigProviderTheme = 'light' | 'dark';

export const useSettingStore = defineStore(
  'settingState',
  () => {
    const darkMode = ref<ConfigProviderTheme>('light');

    const themeColor = ref('#4D80F0'); // 主题颜色

    const setThemeDark = (value: ConfigProviderTheme) => {
      darkMode.value = value;
    };

    const setThemeColor = (value: string) => {
      themeColor.value = value;
    };

    return {
      darkMode,
      themeColor,
      setThemeDark,
      setThemeColor,
    };
  },
  {
    persist: true, // 进行持久化存储
  }
);
