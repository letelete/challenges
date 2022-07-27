import type { PositionInCrafting } from '@/composables/types';

export const arePositionsEqual = (
  p1: PositionInCrafting,
  p2: PositionInCrafting
): boolean => {
  return p1.row === p2.row && p1.column === p2.column;
};

/**
 * Compares two types extending @see PositionInCrafting
 * TLBR - Compares from the top left corner to the bottom right corner.
 *
 * @returns -1, if itemA is higher or on the left to the itemB in the 2D grid.
 * @returns 1, if itemA is lower or on the right to the itemB in the 2D grid.
 */
export const compareItemsInGridTLBR = <
  T extends { position: PositionInCrafting }
>(
  itemA: T,
  itemB: T
) => {
  if (itemA.position.row === itemB.position.row) {
    return itemA.position.column < itemB.position.column ? -1 : 1;
  }
  return itemA.position.row < itemB.position.row ? -1 : 1;
};

export const getCellPosition = (index: number, gridSize: number) => {
  return {
    row: Math.floor(index / gridSize),
    column: index % gridSize,
  } as PositionInCrafting;
};
