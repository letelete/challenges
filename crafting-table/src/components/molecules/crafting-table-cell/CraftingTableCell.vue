<template>
  <div
    :aria-label="props.item ? props.item.name : 'empty'"
    class="crafting-table-cell"
    :class="{ 'crafting-table-cell--empty': props.item }"
  >
    <img
      :width="props.item.image.width"
      :height="props.item.image.height"
      :alt="props.item.image.alt"
      :src="props.item.image.src"
      v-if="props.item"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Item } from '@/composables/types';
import { computed } from 'vue';

export interface Props {
  item: Item | null;
  width: number;
  height: number;
  x: number;
  y: number;
}

const props = defineProps<Props>();

const cssLeft = computed(() => `${props.x}px`);
const cssTop = computed(() => `${props.y}px`);
const cssWidth = computed(() => `${props.width}px`);
const cssHeight = computed(() => `${props.height}px`);
</script>

<style lang="scss" scoped>
.crafting-table-cell {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: v-bind(cssWidth);
  height: v-bind(cssHeight);
  left: v-bind(cssLeft);
  top: v-bind(cssTop);
  background: transparent;
  line-height: 1.6;
  &:hover {
    background: yellow;
  }
}
</style>
