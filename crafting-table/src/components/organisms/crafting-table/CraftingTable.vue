<template>
  <figure class="crafting-table">
    <img
      class="crafting-table__overlay"
      src="@/assets/crafting-table.png"
      :width="OVERLAY_WIDTH_PX"
      :height="OVERLAY_HEIGHT_PX"
    />
    <div class="crafting-table__grid">
      <div
        class="crafting-table__row"
        :key="`crafting-table-row-${index}`"
        v-for="(rowOfCells, index) in cells"
      >
        <CraftingItemInput
          class="crafting-table__cell"
          :data-x="cell.coordinates"
          :data-y="cell.coordinates.y"
          :key="(cell.item && cell.item.id) || `cell-empty-${colIndex}`"
          :item="cell.item"
          v-for="(cell, colIndex) in rowOfCells"
        />
      </div>
    </div>
  </figure>
</template>

<script setup lang="ts">
import type { Item } from '@/composables/types';
import { computed } from 'vue';

export type PositionInCrafting = {
  row: 1 | 2 | 3;
  column: 1 | 2 | 3;
};

export type CraftingItem = {
  position: PositionInCrafting;
  id: Item['id'];
  name: Item['name'];
  image: Item['image'];
  amount: number;
};

export type Coordinates = { x: number; y: number };

export interface Props {
  items: CraftingItem[];
}

const OVERLAY_HEIGHT_PX = 494;
const OVERLAY_WIDTH_PX = 524;
const TABLE_CELLS_COORDINATES: Coordinates[][] = [
  [
    { x: 90, y: 51 },
    { x: 143, y: 51 },
    { x: 197, y: 51 },
  ],
  [
    { x: 90, y: 104 },
    { x: 143, y: 104 },
    { x: 197, y: 104 },
  ],
  [
    { x: 90, y: 151 },
    { x: 143, y: 151 },
    { x: 197, y: 151 },
  ],
];

const props = defineProps<Props>();

const cells = computed(() => {
  const sortedPropsItems = [...props.items].sort((a, b) => {
    const { column: columnA, row: rowA } = a.position;
    const { column: columnB, row: rowB } = b.position;
    return columnA < columnB ? -1 : rowA < rowB ? -1 : 1;
  });
  return TABLE_CELLS_COORDINATES.map((row, rowIndex) => {
    const rowNumber = rowIndex + 1;
    return row.map((coordinates, columnIndex) => {
      const columnNumber = columnIndex + 1;
      const candidate = sortedPropsItems.length ? sortedPropsItems[0] : null;
      const item =
        (candidate?.position?.row === rowNumber &&
          candidate?.position?.column === columnNumber &&
          sortedPropsItems.shift()) ||
        null;
      return { coordinates, item };
    });
  });
});
</script>

<style lang="scss" scoped>
.crafting-table {
  position: relative;
  &__overlay {
  }
  &__items {
  }
}
</style>
