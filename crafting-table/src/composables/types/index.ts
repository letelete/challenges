export * as CraftingTypes from '../crafting/types';
export * as RecipeTypes from '../recipe/types';

export type Image = {
  width: number;
  height: number;
  alt: string;
  src: string;
};

export type Item = {
  id: string;
  name: string;
  image: Image;
};

export type CountableItem = Item & {
  amount: number;
};

export type PositionInCrafting = {
  row: 1 | 2 | 3;
  column: 1 | 2 | 3;
};

export type CraftingItem = CountableItem & {
  position: PositionInCrafting;
};

export type Coordinates = { x: number; y: number };
