import type { ItemRepository, RecipeRepository } from './repositories/types';

import type { Item } from '@/composables/types';

export type ItemId = string;

export type RecipeId = string;

export type RecipeResult = {
  itemId: ItemId;
  amount: number;
};

export type RecipesToItems = {
  [RecipeId: string]: RecipeResult;
};

export type ItemIdToItem = Record<ItemId, Item>;

export interface DatabaseSchema {
  recipesToItems: RecipesToItems;
  items: ItemIdToItem;
}

export interface DatabaseProvider {
  item: ItemRepository;
  recipe: RecipeRepository;
}

export interface DatabaseProviderBuilder {
  (databaseContext: DatabaseSchema): DatabaseProvider;
}
