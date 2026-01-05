<template>
  <view
    class="
      box-border w-full p-4 text-black
      dark:text-white
    "
  >
    <view class="mb-3 text-lg font-bold">
      {{ $t('example.basicSetting') }}
    </view>
    <wd-cell-group border>
      <wd-cell :title="`🌓 ${$t('example.darkMode')}`">
        <switch-dark />
      </wd-cell>
      <wd-picker
        v-model="language"
        :label="`📚 ${$t('example.language')}`"
        align-right
        :columns="languageColumns"
      />
    </wd-cell-group>
  </view>
</template>

<script lang="ts" setup>
import { language } from '@/locale';

defineOptions({
  name: 'Example',
});

definePage({
  name: 'example',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '示例',
  },
});

// 语言选项
const languageColumns = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];
</script>
