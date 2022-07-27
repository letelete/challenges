import type { CountableItem, CraftingItem } from '../types';

import type { Ref } from 'vue';

export type Recipe = CraftingItem[];

export type UseRecipe = () => {
  result: Ref<CountableItem | null>;
  search: (recipe: Recipe) => void;
};
