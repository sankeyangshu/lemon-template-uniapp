<template>
  <view class="default-layout">
    <slot />
    <WdToast />
    <WdMessageBox />
  </view>
</template>

<style lang="scss">
.default-layout {
  height: 100vh;

  /* #ifdef H5 */
  padding-bottom: 50px;
  overflow: auto;

  /* #endif */
}
</style>
