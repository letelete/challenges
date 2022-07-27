<template>
  <div class="home">
    <container class="home__container" type="centered">
      <crafting-table :items="items" />
    </container>
    <hr />
    <ul>
      <button @click="clear">
        {{ `Clear crafting table` }}
      </button>
      <li
        :key="`home-recipe-${key}`"
        v-for="[key, recipe] in Object.entries(recipes)"
      >
        <button @click="applyRecipe(recipe)">
          {{ `Apply ${key} recipe!` }}
        </button>
      </li>
    </ul>
    <p>
      Current recipe: <span class="recipe">{{ items }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Container, CraftingTable } from '@/components';
import type { PositionInCrafting, CraftingTypes } from '@/composables/types';
import { useCrafting } from '@/composables';
import { api } from '@/api';

type Recipe = CraftingTypes.NewCraftingItemProps[];

const { items, addItem, clear } = useCrafting();

const recipes = computed<Record<string, Recipe>>(() => {
  return {
    torch: [
      {
        item: api.item.getItem('coal'),
        position: { row: 2, column: 3 } as PositionInCrafting,
        amount: 1,
      },
      {
        item: api.item.getItem('stick'),
        position: { row: 3, column: 3 } as PositionInCrafting,
        amount: 1,
      },
    ],
  };
});

const applyRecipe = (recipe: Recipe) => {
  recipe.forEach(addItem);
};
</script>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
  background: url('@/assets/images/background-pattern.jpg') repeat;
  color: white;
  font-weight: bold;
}
.recipe {
  color: tomato;
}
</style>
