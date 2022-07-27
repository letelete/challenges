import type { CountableItem, RecipeTypes } from '@/composables/types';
import type { DatabaseSchema, RecipeId } from '@/db/types';
import type { ItemRepository, RecipeRepository, Repository } from '../types';

import { getRecipeId } from '@/db/utils/getRecipeHash';

export const recipeRepository: Repository<RecipeRepository> = (
  database: DatabaseSchema
) => {
  function getRecipeResult(
    recipe: RecipeTypes.Recipe,
    itemRepository: ItemRepository
  ): CountableItem {
    const recipeId = getRecipeId(recipe);
    if (!recipeId) {
      throw new Error(`Recipe ${JSON.stringify(recipe)} not found.`);
    }
    return getRecipeResultById(recipeId, itemRepository);
  }

  function getRecipeResultById(
    recipeId: RecipeId,
    itemRepository: ItemRepository
  ): CountableItem {
    if (!(recipeId in database.recipesToItems)) {
      throw new Error(
        `Recipe with id "${recipeId}" not found in the database.`
      );
    }
    const { amount, itemId } = database.recipesToItems[recipeId];
    const item = itemRepository.getItemById(itemId);
    return { ...item, amount } as CountableItem;
  }

  return { getRecipeResult, getRecipeResultById };
};
