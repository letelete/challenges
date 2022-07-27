import type { ComputedRef } from 'vue';
import type { CraftingItem, PositionInCrafting, Item } from '../types';

export interface State {
  items: CraftingItem[];
}

export type NewCraftingItemProps = {
  item: Item;
  position: PositionInCrafting;
  amount: CraftingItem['amount'];
};

export type UseCrafting = () => {
  items: ComputedRef<CraftingItem[]>;
  addItem: (props: NewCraftingItemProps) => void;
  clear: () => void;
};
