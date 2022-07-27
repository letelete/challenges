import type { ApiConfig, ItemEndpoint } from '../types';

import type { Item } from '@/composables/types';
import type { ItemId } from '@/db/types';

export const item: ItemEndpoint = (config: ApiConfig) => {
  function getItem(itemId: ItemId): Item {
    return config.db.item.getItemById(itemId);
  }

  return { getItem };
};
