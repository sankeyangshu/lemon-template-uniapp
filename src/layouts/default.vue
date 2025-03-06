<template>
  <wd-config-provider :theme="darkMode" :theme-vars="themeVars">
    <view
      class="min-h-screen min-w-screen"
      :class="darkMode === 'dark' ? 'layout-dark' : 'layout-light'"
    >
      <slot></slot>
      <wd-toast />
      <wd-message-box />
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';
import type { ConfigProviderThemeVars } from 'wot-design-uni';

const settingStore = useSettingStore();
const { darkMode, themeColor } = storeToRefs(settingStore);

const themeVars = computed<ConfigProviderThemeVars>(() => {
  return {
    colorTheme: themeColor.value,
  };
});
</script>

<style lang="scss">
.layout-light {
  --color-text: #323233;
  --color-background: #f0f2f5;
  --color-background-2: #ffffff;
  --color-block-background: #ffffff;
  --color-border: #ebedf0;

  color: var(--color-text);
  background-color: var(--color-background);
}

.layout-dark {
  --color-text: #f5f5f5;
  --color-background: #222222;
  --color-background-2: #1c1c1e;
  --color-block-background: #3a3a3c;
  --color-border: #3a3a3c;

  color: var(--color-text);
  background-color: var(--color-background);
}
</style>
