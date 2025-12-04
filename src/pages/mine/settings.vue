<template>
  <view class="box-border p-5 text-text">
    <wd-divider>{{ $t('settings.themeMode') }}</wd-divider>
    <wd-cell-group border>
      <wd-cell :title="`🌓 ${$t('example.darkMode')}`">
        <switch-dark />
      </wd-cell>
      <wd-cell :title="`📱 ${$t('settings.followSystem')}`">
        <wd-switch v-model="followSystem" size="18" />
      </wd-cell>
    </wd-cell-group>

    <wd-divider>{{ $t('settings.systemTheme') }}</wd-divider>
    <view class="flex justify-center">
      <view class="grid grid-cols-8 gap-2">
        <view
          v-for="item in PRIMARY_COLORS"
          :key="item"
          class="
            flex size-7.5 cursor-pointer items-center justify-center rounded-md border border-solid
          "
          :style="{ 'background-color': item }"
          @click="settingStore.setThemeColor(item)"
        >
          <wd-icon v-if="item === themeColor" name="check" size="20" color="#fff" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { PRIMARY_COLORS, useSettingStore } from '@/store/modules/setting';

defineOptions({
  name: 'Settings',
});

definePage({
  name: 'settings',
  style: {
    navigationBarTitleText: '设置',
  },
});

const settingStore = useSettingStore();
const { themeColor } = storeToRefs(settingStore);

const followSystem = computed({
  get: () => settingStore.followSystem,
  set: (value: boolean) => settingStore.setFollowSystem(value),
});
</script>
