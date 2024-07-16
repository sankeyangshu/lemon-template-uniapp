<template>
  <!-- svg图标组件 开始 -->
  <svg aria-hidden="true">
    <use :xlink:href="iconName" :fill="color"></use>
  </svg>
  <!-- svg图标组件 结束 -->
</template>

<script lang="ts" setup>
import { computed } from 'vue';

// 获取父组件传递的值
const props = withDefaults(
  defineProps<{
    icon: string;
    color?: string;
  }>(),
  {
    icon: '',
    color: '#333',
  }
);

/**
 * 项目内图标
 */
const iconName = computed(() => {
  return props.icon ? `#icon-${props.icon}` : '#icon';
});
</script>
