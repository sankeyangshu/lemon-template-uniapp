<template>
  <wd-config-provider
    :theme="theme"
    :theme-vars="themeVars"
    :custom-class="theme"
    :style="cssVars"
    class="box-border min-h-[calc(100vh-var(--window-top))] bg-background"
  >
    <KuRootView />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app';
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount, onUnmounted } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const { theme, themeVars, followSystem, themeColor } = storeToRefs(settingStore);
let themeChangeHandler: UniApp.OnThemeChangeCallback | null = null;

// 计算 CSS 变量
const cssVars = computed(() => ({
  '--app-color-primary': themeColor.value,
}));

onBeforeMount(() => {
  settingStore.initTheme();

  // 监听系统主题变化
  if (typeof uni !== 'undefined' && uni.onThemeChange) {
    themeChangeHandler = (res) => {
      if (followSystem.value) {
        settingStore.setThemeMode(res.theme as 'light' | 'dark', true);
      }
    };
    uni.onThemeChange(themeChangeHandler);
  }
});

onUnmounted(() => {
  if (typeof uni !== 'undefined' && uni.offThemeChange && themeChangeHandler) {
    uni.offThemeChange(themeChangeHandler);
    themeChangeHandler = null;
  }
});

onShow(() => {
  settingStore.setNavigationBarColor();
});
</script>
