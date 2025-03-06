<route lang="json5">
{
  name: 'icon',
  style: {
    navigationBarTitleText: 'Icon 示例',
  },
}
</route>

<template>
  <view class="box-border w-full p-40rpx">
    <view
      class="mb-24rpx border-l-[6rpx] border-l-[var(--wot-color-theme)] border-l-solid pl-24rpx leading-54rpx"
    >
      <view class="my-[4px] text-[18px] font-bold">Iconify Icon</view>
    </view>
    <view>
      <iconify-icon
        v-for="item in iconifyList"
        :key="item"
        :icon="item"
        :class="`mr-20rpx text-48rpx ${item}`"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const iconifyList = reactive([
  'i-mdi-github',
  'i-mdi-palette',
  'i-mdi-book-open-variant',
  'i-mdi-cellphone-settings-variant',
  'i-mdi-logout',
]);
</script>

<style lang="scss" scoped></style>
