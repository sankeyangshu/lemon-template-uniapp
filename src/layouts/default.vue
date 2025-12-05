<template>
  <slot />
</template>

<script lang="ts" setup>
defineOptions({
  addGlobalClass: true,
  virtualHost: true,
  styleIsolation: 'shared',
});
</script>
