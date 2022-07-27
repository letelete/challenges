import type { CraftingItem, RecipeTypes } from '@/composables/types';

import type { RecipeId } from '../types';
import { compareItemsInGridTLBR } from '@/helpers/crafting';

type MinMax = {
  min: number;
  max: number;
};

type RectBounds = { column: MinMax; row: MinMax };

const getRectBounds = (items: CraftingItem[]): RectBounds => {
  const rows = items.map((item) => item.position.row);
  const columns = items.map((item) => item.position.column);
  return {
    row: {
      min: Math.min(...rows),
      max: Math.max(...rows),
    },
    column: {
      min: Math.min(...columns),
      max: Math.max(...columns),
    },
  };
};

export const getRecipeId = (recipe: RecipeTypes.Recipe): RecipeId => {
  const bounds = getRectBounds(recipe);
  const itemsStack = recipe.sort(compareItemsInGridTLBR).reverse();
  const hash = [];
  for (let row = bounds.row.min; row <= bounds.row.max; ++row) {
    for (let col = bounds.column.min; col <= bounds.column.max; ++col) {
      const stackTop = itemsStack.length && itemsStack[itemsStack.length - 1];
      if (
        stackTop &&
        stackTop.position.column === col &&
        stackTop.position.row === row
      ) {
        hash.push(itemsStack.pop()?.id);
      } else {
        hash.push('#');
      }
    }
    if (row !== bounds.row.max) hash.push('|');
  }
  return hash.join('');
};
