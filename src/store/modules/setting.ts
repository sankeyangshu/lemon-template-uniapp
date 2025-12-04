import type { ConfigProviderThemeVars } from 'wot-design-uni';
import { defineStore } from 'pinia';
import { ref } from 'vue';

type ThemeMode = 'light' | 'dark';

/**
 * 预定义主题颜色
 */
export const PRIMARY_COLORS = [
  '#009688',
  '#daa96e',
  '#0c819f',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6',
];

export const useSettingStore = defineStore(
  'settingState',
  () => {
    const theme = ref<ThemeMode>('light'); // 当前主题

    const followSystem = ref(false); // 跟随系统主题

    const userPreferredTheme = ref<ThemeMode>('light'); // 用户上一次手动选择的主题

    const themeColor = ref(PRIMARY_COLORS[0]); // 主题颜色

    const themeVars = ref<ConfigProviderThemeVars>({
      colorTheme: themeColor.value,
    });

    /**
     * 设置导航栏颜色
     */
    function setNavigationBarColor() {
      uni.setNavigationBarColor({
        frontColor: theme.value === 'light' ? '#000000' : '#ffffff',
        backgroundColor: theme.value === 'light' ? '#ffffff' : '#000000',
      });
    };

    /**
     * 切换主题模式
     * @param mode 指定主题模式，不传则自动切换
     * @param isFollow 是否是跟随系统
     */
    function setThemeMode(mode?: ThemeMode, isFollow = false) {
      const nextTheme = mode ?? (theme.value === 'light' ? 'dark' : 'light');
      theme.value = nextTheme;
      if (!isFollow) {
        userPreferredTheme.value = nextTheme;
        followSystem.value = false;
      }
      setNavigationBarColor();
    };

    /**
     * 设置是否跟随系统主题
     * @param value 是否跟随系统
     */
    function setFollowSystem(value: boolean) {
      followSystem.value = value;
      initTheme();
    };

    /**
     * 设置主题颜色
     * @param color 主题颜色
     */
    function setThemeColor(color: string) {
      themeColor.value = color;
      themeVars.value.colorTheme = color;
    };

    /**
     * 设置主题变量
     * @param value 主题变量
     */
    function setThemeVars(value: ConfigProviderThemeVars) {
      themeVars.value = value;
    };

    /**
     * 获取系统主题
     */
    function getSystemTheme(): ThemeMode {
      try {
        // #ifdef MP-WEIXIN
        const appBaseInfo = uni.getAppBaseInfo();
        if (appBaseInfo.theme) {
          return appBaseInfo.theme as ThemeMode;
        }
        // #endif

        // #ifndef MP-WEIXIN
        const systemInfo = uni.getSystemInfoSync();
        if (systemInfo.theme) {
          return systemInfo.theme as ThemeMode;
        }
        // #endif
      } catch (error) {
        console.error(error);
      }

      return 'light';
    }

    /**
     * 初始化主题
     */
    function initTheme() {
      if (followSystem.value) {
        const systemTheme = getSystemTheme();
        setThemeMode(systemTheme, true);
        return;
      }

      theme.value = userPreferredTheme.value;
      setNavigationBarColor();
    }

    return {
      theme,
      followSystem,
      userPreferredTheme,
      themeColor,
      themeVars,
      setNavigationBarColor,
      setThemeMode,
      setFollowSystem,
      setThemeColor,
      setThemeVars,
      initTheme,
    };
  },
  {
    persist: true, // 进行持久化存储
  },
);
