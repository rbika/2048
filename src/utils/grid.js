import uuid from 'uuid/v4';

import { GRID_SIZE, DIRECTIONS, VICTORY_TILE } from '../constants';

// Movement vector direction
const VECTOR = {
  UP: { row: -1, col: 0 },
  DOWN: { row: 1, col: 0 },
  LEFT: { row: 0, col: -1 },
  RIGHT: { row: 0, col: 1 },
};

// Actions that can generate a new tile
export const TILE_ORIGINS = {
  MERGE: 'MERGE',
  MOVE: 'MOVE',
};

/**
 * Generates a grid with empty cells
 *
 * @param {number} gridSize
 * @returns {number[][]}
 */
export const generateEmptyGrid = gridSize => {
  const grid = [];

  for (let i = 0; i < gridSize; i += 1) {
    const row = Array(gridSize).fill(null);
    grid.push(row);
  }

  return grid;
};

/**
 * Returns a grid with moved tiles
 *
 * @param {number[][]} grid
 * @param {string} direction
 * @returns {number[][]}
 */
export const moveTiles = (grid, direction) => {
  const newGrid = generateEmptyGrid(GRID_SIZE);
  const vector = VECTOR[direction];
  let validMove = false;

  const movementAllowed = (nextPos, tileValue) => {
    let result = true;

    result = result && nextPos.row >= 0;
    result = result && nextPos.col >= 0;
    result = result && nextPos.row < GRID_SIZE;
    result = result && nextPos.col < GRID_SIZE;

    if (result) {
      const newPosition = newGrid[nextPos.row][nextPos.col];
      const emptyCell = newPosition === null;
      const sameValueCell = newPosition && newPosition.value === tileValue;
      const unmergedCell = newPosition && !newPosition.mergeWithTile;
      result = (result && emptyCell) || (sameValueCell && unmergedCell);
    }

    return result;
  };

  for (let i = 0; i < GRID_SIZE; i += 1) {
    for (let j = 0; j < GRID_SIZE; j += 1) {
      let row = i;
      let col = j;

      // Reverse row iterate tiles from bottom to top
      if (direction === DIRECTIONS.DOWN) row = GRID_SIZE - i - 1;

      // Reverse col iterate tiles from right to left
      if (direction === DIRECTIONS.RIGHT) col = GRID_SIZE - j - 1;

      const tile = grid[row][col];

      if (tile !== null) {
        const updatedTile = { ...tile };
        const nextPos = {
          row: tile.row + vector.row,
          col: tile.col + vector.col,
        };

        updatedTile.newMerged = false;
        updatedTile.newRandom = false;

        while (movementAllowed(nextPos, updatedTile.value)) {
          updatedTile.row = nextPos.row;
          updatedTile.col = nextPos.col;

          nextPos.row += vector.row;
          nextPos.col += vector.col;

          if (updatedTile.row !== tile.row || updatedTile.col !== tile.col) {
            validMove = true;
          }
        }

        if (newGrid[updatedTile.row][updatedTile.col] !== null) {
          newGrid[updatedTile.row][updatedTile.col].mergeWithTile = updatedTile;
        } else {
          newGrid[updatedTile.row][updatedTile.col] = updatedTile;
        }
      }
    }
  }
  return { newGrid, validMove };
};

/**
 * Checks if there are available moves in the grid
 *
 * @param {number[][]} grid
 * @returns {boolean}
 */
export const hasAvailableMoves = grid => {
  const flatGrid = grid.flat();
  const gridSize = grid.length;

  // Checks if there are any empty cell
  if (flatGrid.some(cell => cell === null)) {
    return true;
  }

  // Checks if there are adjacent cells with the same value
  for (const tile of flatGrid) {
    const { row, col, value } = tile;

    if (row + 1 < gridSize && grid[row + 1][col].value === value) {
      return true;
    }

    if (col + 1 < gridSize && grid[row][col + 1].value === value) {
      return true;
    }
  }

  return false;
};

/**
 * Creates a tile object
 *
 * @param {number} row
 * @param {number} col
 * @param {number} value
 * @param {string} origin
 * @returns {Object}
 */
export const generateTile = (row, col, value, origin) => {
  const newMerged = origin === TILE_ORIGINS.MERGE;
  const newRandom = origin === TILE_ORIGINS.MOVE;

  return {
    id: uuid(),
    value,
    row,
    col,
    newRandom,
    newMerged,
    mergeWithTile: null,
  };
};

/**
 * Creates a tile object with random value and random position
 * The value may be 2 or 4 and the position randomly picked empty cell
 *
 * @param {number[][]} grid
 * @returns {Object}
 */
export const generateRandomTile = grid => {
  const randomValue = Math.random() > 0.9 ? 4 : 2;
  const { row, col } = getRandomEmptyCell(grid);
  return generateTile(row, col, randomValue, TILE_ORIGINS.MOVE);
};

/**
 * Gets the coordinates of all empty cells in the grid
 *
 * @param {number[][]} grid
 * @returns {{row: number, col: number}[]}
 */
export const getEmptyCells = grid => {
  const emptyCells = [];

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (!cell) {
        emptyCells.push({ row: i, col: j });
      }
    });
  });
  return emptyCells;
};

/**
 * Gets the coordinates of a empty random cell in the grid
 *
 * @param {number[][]} grid
 * @returns {{row: number, col: number}}
 */
export const getRandomEmptyCell = grid => {
  const emptyCells = getEmptyCells(grid);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

/**
 * Returns a grid with the new tile added
 *
 * @param {number[][]} grid
 * @param {Object} tile
 * @returns {number[][]}
 */
export const addTile = (grid, tile) => {
  const updatedGrid = grid.map((row, i) => {
    if (i !== tile.row) {
      return row;
    } else {
      return row.map((col, j) => {
        if (j !== tile.col) {
          return col;
        } else {
          return tile;
        }
      });
    }
  });

  return updatedGrid;
};

/**
 * Returns a grid with the new merged tiles
 *
 * @param {number[][]} grid
 * @returns {number[][]}
 */
export const mergeTiles = grid => {
  const updatedGrid = grid.map(row => {
    return row.map(tile => {
      if (tile && tile.mergeWithTile) {
        const { row, col, value } = tile;
        return generateTile(row, col, value * 2, TILE_ORIGINS.MERGE);
      } else {
        return tile;
      }
    });
  });

  return updatedGrid;
};

/**
 * Checks if the victory tile is present in the grid
 *
 * @param {number[][]} grid
 * @returns {boolean}
 */
export const hasVictoryTile = grid => {
  return grid
    .flat()
    .filter(cell => cell !== null)
    .some(cell => cell.value === VICTORY_TILE);
};

/**
 * Calculates the score of the last move
 *
 * @param {number[][]} grid
 * @returns {number}
 */
export const calculateMoveScore = grid => {
  const tiles = grid.flat().filter(cell => cell !== null);
  const reducer = (score, tile) => {
    return tile.newMerged ? score + tile.value : score;
  };
  return tiles.reduce(reducer, 0);
};
