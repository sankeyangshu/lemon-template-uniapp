<route lang="json5">
{
  layout: 'tabbar',
  name: 'example',
  style: {
    navigationBarTitleText: '示例',
  },
}
</route>

<template>
  <view class="box-border w-full p-40rpx">
    <div class="mb-24rpx mt-8rpx text-32rpx font-bold">
      {{ $t('example.basicSetting') }}
    </div>

    <wd-cell-group border>
      <wd-cell :title="`🌓 ${$t('example.darkMode')}`" value="内容">
        <switch-dark />
      </wd-cell>
      <wd-picker
        v-model="currentLanguage"
        :label="`📚 ${$t('example.language')}`"
        align-right
        :columns="languageColumns"
        @confirm="onConfirmLanguage"
      />
    </wd-cell-group>

    <div class="mb-24rpx mt-60rpx text-32rpx font-bold">
      {{ $t('example.exampleComponent') }}
    </div>
    <wd-cell-group border>
      <template v-for="item in menuItems" :key="item.route">
        <wd-cell :title="item.title" :to="item.route" is-link />
      </template>
    </wd-cell-group>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { language } from '@/locales';

const { t } = useI18n();

const menuItems = computed(() => [{ title: `🎨 ${t('route.icon')}`, route: 'icon' }]);

// 语言选项
const languageColumns = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

const currentLanguage = ref(language.value);

const onConfirmLanguage = ({ value }: { value: string }) => {
  language.value = value;
};
</script>

<style lang="scss" scoped></style>
