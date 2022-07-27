import type {
  CountableItem,
  CraftingTypes,
  Item,
  RecipeTypes,
} from '@/composables/types';
import type { DatabaseSchema, ItemId, RecipeId } from '../types';

export interface Repository<T> {
  (database: DatabaseSchema): T;
}

export interface RecipeRepository {
  getRecipeResultById(
    recipeId: RecipeId,
    itemRepository: ItemRepository
  ): CountableItem;
  getRecipeResult(
    recipe: RecipeTypes.Recipe,
    itemRepository: ItemRepository
  ): CountableItem;
}

export interface ItemRepository {
  getItemById(itemId: ItemId): Item;
  getItemRecipe(itemId: ItemId): CraftingTypes.NewCraftingItemProps[];
}
