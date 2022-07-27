<template>
  <figure class="crafting-table">
    <img
      class="crafting-table__overlay"
      src="@/assets/images/crafting-table.png"
      :width="OVERLAY_WIDTH_PX"
      :height="OVERLAY_HEIGHT_PX"
    />
    <div class="crafting-table__grid">
      <crafting-table-cell
        v-for="{ item, coordinates } in cells"
        :key="item ? item.id : `ct-cell-${coordinates.x}-${coordinates.y}`"
        :x="coordinates.x"
        :y="coordinates.y"
        :item="item ?? null"
        :width="48"
        :height="48"
      />
      <crafting-table-cell
        v-if="craftingItemResult"
        :key="craftingItemResult.item.id"
        :x="craftingItemResult.coordinates.x"
        :y="craftingItemResult.coordinates.y"
        :item="craftingItemResult.item ?? null"
        :width="48"
        :height="48"
      />
    </div>
  </figure>
</template>

<script setup lang="ts">
import type { Coordinates, CraftingItem } from '@/composables/types';
import { useRecipe } from '@/composables';
import { CraftingTableCell } from '@/components';
import { computed, onMounted, watch } from 'vue';
import {
  arePositionsEqual,
  compareItemsInGridTLBR,
  getCellPosition,
} from '@/helpers';

export interface Props {
  items: CraftingItem[];
}

export type PositionedCraftingItem = {
  coordinates: Coordinates;
  item: CraftingItem;
};

const GRID_SIZE = 3;
const OVERLAY_HEIGHT_PX = 494;
const OVERLAY_WIDTH_PX = 524;
const TABLE_CELLS_COORDINATES: Coordinates[] = [
  { x: 90, y: 51 },
  { x: 143, y: 51 },
  { x: 197, y: 51 },
  { x: 90, y: 104 },
  { x: 143, y: 104 },
  { x: 197, y: 104 },
  { x: 90, y: 157 },
  { x: 143, y: 157 },
  { x: 197, y: 157 },
];

const props = defineProps<Props>();

const { result: searchRecipeResult, search: searchRecipe } = useRecipe();

const craftingItemResult = computed<PositionedCraftingItem | null>(() => {
  if (!searchRecipeResult.value) return null;
  const item = searchRecipeResult.value;
  return {
    coordinates: { x: 367, y: 104 },
    item,
  } as PositionedCraftingItem;
});

const cells = computed(() => {
  const items = [...props.items].sort(compareItemsInGridTLBR);
  return TABLE_CELLS_COORDINATES.map((coordinates, index) => {
    const cellPosition = getCellPosition(index, GRID_SIZE);
    const queuedItemPosition = items[0]?.position;

    const item =
      queuedItemPosition && arePositionsEqual(queuedItemPosition, cellPosition)
        ? items.shift()
        : null;

    return { coordinates, item } as PositionedCraftingItem;
  });
});

watch(
  () => props.items,
  (value) => value.length && searchRecipe(value)
);

onMounted(() => {
  searchRecipe(props.items);
});
</script>

<style lang="scss" scoped>
.crafting-table {
  position: relative;
  line-height: 0;
  &__grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }
  &__row {
    display: flex;
    flex-flow: row;
    flex-wrap: nowrap;
    flex: 1 1 33.33%;
  }
}
</style>
