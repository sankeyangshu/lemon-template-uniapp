<template>
  <wd-config-provider :theme="darkMode">
    <view class="default-layout">
      <slot />
      <wd-toast />
      <wd-message-box />
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const { darkMode } = storeToRefs(settingStore);
</script>

<style lang="scss">
.default-layout {
  min-height: calc(100vh - var(--window-bottom));
  box-sizing: border-box;
  color: #323233;
  background-color: #f0f2f5;
}

.wot-theme-dark {
  .default-layout {
    color: #f5f5f5;
    background-color: #222222;
  }
}
</style>
