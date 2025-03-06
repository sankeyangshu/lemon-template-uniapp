<route lang="json5">
{
  style: {
    navigationBarTitleText: '主题设置',
  },
}
</route>

<template>
  <view class="box-border w-full p-40rpx">
    <wd-divider>{{ $t('themeSetting.themeMode') }}</wd-divider>

    <wd-cell-group border>
      <wd-cell :title="`🌓 ${$t('example.darkMode')}`" value="内容">
        <switch-dark />
      </wd-cell>
    </wd-cell-group>

    <wd-divider>{{ $t('themeSetting.systemTheme') }}</wd-divider>
    <view class="flex-x-center">
      <view class="grid cols-8 gap-16rpx">
        <view
          v-for="item in themeColorList"
          :key="item"
          class="h-60rpx w-60rpx flex-center border-4rpx border-[#e5ebe7] rounded-12rpx border-solid"
          :style="{ 'background-color': item }"
          @click="onChangeThemeColor(item)"
        >
          <wd-icon v-if="item === themeColor" name="check" size="40rpx" color="#fff"></wd-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store/modules/setting';

// 预定义主题颜色
const themeColorList = [
  '#4D80F0',
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

const settingStore = useSettingStore();

const { themeColor } = storeToRefs(settingStore);

const onChangeThemeColor = (color: string) => {
  settingStore.setThemeColor(color);
};
</script>

<style lang="scss" scoped></style>
