import type { Recipe, UseRecipe } from './types';

import type { CountableItem } from '../types';
import { api } from '@/api';
import { ref } from 'vue';

export const useRecipe: UseRecipe = () => {
  const result = ref<CountableItem | null>(null);

  const search = (recipe: Recipe): void => {
    let searchResult: CountableItem | null = null;
    try {
      searchResult = api.recipe.getRecipeResult(recipe);
    } catch (error) {
      console.error(
        'useRecipe/error. Recipe:',
        JSON.stringify(recipe),
        'not found'
      );
    } finally {
      result.value = searchResult;
    }
    console.log(
      'recipe found!',
      searchResult,
      'recipe',
      JSON.parse(JSON.stringify(recipe))
    );
  };

  return { result, search };
};
