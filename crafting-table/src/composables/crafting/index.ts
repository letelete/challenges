import { arePositionsEqual } from '@/helpers';
import { computed, reactive } from 'vue';
import type { CraftingItem } from '../types';
import type { NewCraftingItemProps, State, UseCrafting } from './types';

const state = reactive<State>({ items: [] });

export const useCrafting: UseCrafting = () => {
  const items = computed(() => state.items);

  const addItem = ({
    item: { id, name, image },
    position,
    amount,
  }: NewCraftingItemProps) => {
    const newItem = { id, name, image, amount, position } as CraftingItem;
    const collisionIndex = state.items.findIndex((item) =>
      arePositionsEqual(item.position, newItem.position)
    );
    if (collisionIndex !== -1) {
      state.items.splice(collisionIndex, 1);
    }
    state.items.push(newItem);
  };

  const clear = () => {
    state.items.splice(0, state.items.length);
  };

  return { items, addItem, clear };
};
