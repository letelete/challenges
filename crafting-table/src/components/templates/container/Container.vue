<template>
  <div class="container" :class="`container--${props.type}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  type: 'centered';
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: var(--container--flex-flow, row);
  &--centered {
    justify-content: center;
    align-items: center;
  }
}
</style>
