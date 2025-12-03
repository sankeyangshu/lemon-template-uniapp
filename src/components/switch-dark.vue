<template>
  <wd-switch v-model="checked" size="20" @change="onChangeDarkMode" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const checked = ref(settingStore.theme === 'dark');

function onChangeDarkMode() {
  settingStore.setThemeMode(checked.value ? 'dark' : 'light');
}
</script>
