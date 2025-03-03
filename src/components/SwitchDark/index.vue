<template>
  <wd-switch v-model="checked" size="20px" @change="onChangeDarkMode" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();

const checked = ref(settingStore.darkMode === 'dark');

const onChangeDarkMode = ({ value }: { value: boolean }) => {
  settingStore.setThemeDark(value ? 'dark' : 'light');
};
</script>

<style lang="scss" scoped></style>
