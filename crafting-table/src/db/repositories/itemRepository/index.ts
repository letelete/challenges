import type { CraftingTypes, Item } from '@/composables/types/index';
import type { DatabaseSchema, ItemId } from '@/db/types';
import type { ItemRepository, Repository } from '../types';

export const itemRepository: Repository<ItemRepository> = (
  database: DatabaseSchema
) => {
  function getItemById(itemId: ItemId): Item {
    if (!(itemId in database.items)) {
      throw new Error(`Item with id "${itemId}" not found in the database.`);
    }
    return database.items[itemId];
  }

  function getItemRecipe(itemId: ItemId): CraftingTypes.NewCraftingItemProps[] {
    throw new Error('Function not implemented');
  }

  return { getItemById, getItemRecipe };
};
