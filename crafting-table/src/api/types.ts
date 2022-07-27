import type { CountableItem, RecipeTypes } from '@/composables/types';
import type { DatabaseProvider, ItemId } from '@/db/types';

import type { Item } from '@/composables/types/index';

export type ApiConfig = {
  db: DatabaseProvider;
};

export interface ApiEndpoint<T> {
  (config: ApiConfig): T;
}

export type RecipeEndpoint = ApiEndpoint<{
  getRecipeResult(recipe: RecipeTypes.Recipe): CountableItem;
}>;

export type ItemEndpoint = ApiEndpoint<{
  getItem(itemId: ItemId): Item;
}>;

export type Endpoints = {
  item: ItemEndpoint;
  recipe: RecipeEndpoint;
};

export type Api<E extends Endpoints> = {
  [Endpoint in keyof E]: E[Endpoint] extends ApiEndpoint<infer P> ? P : unknown;
};
