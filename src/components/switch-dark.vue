<template>
  <wd-switch
    v-model="checked"
    size="18"
    :disabled="followSystem"
    @change="onChangeDarkMode"
  />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const followSystem = computed(() => settingStore.followSystem);
const checked = ref(settingStore.theme === 'dark');

watch(
  () => settingStore.theme,
  (value) => {
    checked.value = value === 'dark';
  },
  { immediate: true },
);

function onChangeDarkMode() {
  if (followSystem.value) {
    checked.value = settingStore.theme === 'dark';
    return;
  }
  settingStore.setThemeMode(checked.value ? 'dark' : 'light');
}
</script>
