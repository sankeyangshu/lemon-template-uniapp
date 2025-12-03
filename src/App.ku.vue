<template>
  <wd-config-provider :theme="theme" :theme-vars="themeVars">
    <view :class="[theme]" class="bg-background">
      <KuRootView />
      <wd-toast />
      <wd-message-box />
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const { theme, themeVars } = storeToRefs(settingStore);
</script>
