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
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

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

const followSystem = computed({
  get: () => settingStore.followSystem,
  set: (value: boolean) => settingStore.setFollowSystem(value),
});
</script>
