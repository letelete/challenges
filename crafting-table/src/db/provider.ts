import type {
  DatabaseProvider,
  DatabaseProviderBuilder,
  DatabaseSchema,
} from '@/db/types';
import { itemRepository, recipeRepository } from './repositories';

export const getDatabaseProvider: DatabaseProviderBuilder = (
  database: DatabaseSchema
) => {
  const item = itemRepository(database);
  const recipe = recipeRepository(database);
  return {
    item,
    recipe,
  } as DatabaseProvider;
};
