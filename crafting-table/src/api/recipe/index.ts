import type { ApiConfig, RecipeEndpoint } from '../types';
import type { CountableItem, RecipeTypes } from '@/composables/types';

export const recipe: RecipeEndpoint = (config: ApiConfig) => {
  function getRecipeResult(recipe: RecipeTypes.Recipe): CountableItem {
    return config.db.recipe.getRecipeResult(recipe, config.db.item);
  }

  return { getRecipeResult };
};
