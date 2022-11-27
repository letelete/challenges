# challenge-crafting-table

Implemented my own idea to the problem of finding an item by the recipe.

An idea is to firstly create a 2D grid N x M with the minimal possible N, and M based on
the given recipe, and with each cell that is either empty or contain an item
from the recipe.

This can be done in the following steps:
1. Sort items by the row and the column they are in (with a priority set on row)
2. Find min-top min-left max-bottom max-right items' positions in the
   recipe
3. Construct the grid, by remapping recipe items to grid edges, and marking
   all non-item cells as empty

Loop over the grid from top to bottom, left to the right,  by maintaining rows/columns data.
The generated hash is generated in the following way:
1. Create a hash string 'X', initially empty
2. If cell is empty, append "#" to X
3. Else if cell contains an item, append "<item.id>;" to X
4. Additionally, If end of row, append "|" to X

Example:
Given grid 4x4:
c - id for the Coal item
s - id for the Stick item
.  .  .
.  c  .
.  s  .
.  .  .
Trimmed grid:
c
s
Hash:
c;|s;
