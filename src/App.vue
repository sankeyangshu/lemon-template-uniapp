<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { AppVersionNotification } from './utils';

onLaunch(() => {
  // #ifdef MP-WEIXIN
  AppVersionNotification();
  // #endif
});
onShow(() => {
  // eslint-disable-next-line no-console
  console.log('App Show');
});
onHide(() => {
  // eslint-disable-next-line no-console
  console.log('App Hide');
});
</script>

<style></style>
