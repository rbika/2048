import { NEW_TILE, MOVE_TILES, MERGE_TILES, NEW_GAME } from '../actions/action-types';
import { GRID_SIZE, RIGHT, DOWN } from '../../constants';

const initialState = [];

// Tiles ID counter
let nextId = 0;

// Movement vector direction
const VECTOR = {
  UP: { row: -1, col: 0 },
  DOWN: { row: 1, col: 0 },
  LEFT: { row: 0, col: -1 },
  RIGHT: { row: 0, col: 1 },
};

/**
 * Generates the initial cell grid with empty cells
 */
const generateGrid = () => {
  const grid = [];
  for (let i = 0; i < GRID_SIZE; i += 1) {
    const row = [];
    for (let j = 0; j < GRID_SIZE; j += 1) {
      row.push(null);
    }
    grid.push(row);
  }

  return grid;
};

/**
 * Returns the coordinates of all empty cells in the grid
 *
 * @param {Array} cells
 * @returns {Array}
 */
const getEmptyCells = cells => {
  const emptyCells = [];

  cells.forEach((row, i) => {
    row.forEach((col, j) => {
      if (!col) {
        emptyCells.push([i, j]);
      }
    });
  });
  return emptyCells;
};

/**
 * Returns the coordinates of a random picked cell
 *
 * @param {Array} cells List of empty cells
 * @returns {Array}
 */
const getRandomEmptyCoords = cells => {
  const emptyCells = getEmptyCells(cells);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

/**
 * Creates a new tile
 *
 * @param {Array} coords
 * @returns {Object}
 */
const generateNewTile = (coords, value = null) => {
  nextId += 1;
  const randomValue = Math.random() > 0.9 ? 4 : 2;

  return {
    id: nextId,
    value: value ? value : randomValue,
    row: coords[0],
    col: coords[1],
    merged: false,
    willMergeWith: null,
  };
};

/**
 * Returns a new grid with the added tile
 *
 * @param {Array} grid
 * @param {Object} tile
 * @returns {Array}
 */
const addTile = (grid, tile) => {
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
 * Returns a new grid with the new tiles positions
 *
 * @param {Array} grid
 * @param {Object} direction
 * @returns {Array}
 */
const moveTiles = (grid, direction) => {
  const newGrid = generateGrid();
  const vector = VECTOR[direction];
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
      const unmergedCell = newPosition && !newPosition.willMergeWith;
      result = (result && emptyCell) || (sameValueCell && unmergedCell);
    }

    return result;
  };

  for (let i = 0; i < GRID_SIZE; i += 1) {
    for (let j = 0; j < GRID_SIZE; j += 1) {
      let row = i;
      let col = j;

      // Reverse row iterate tiles from bottom to top
      if (direction === DOWN) row = GRID_SIZE - i - 1;

      // Reverse col iterate tiles from right to left
      if (direction === RIGHT) col = GRID_SIZE - j - 1;

      const tile = grid[row][col];

      if (tile !== null) {
        const updatedTile = { ...tile };
        const nextPos = {
          row: tile.row + vector.row,
          col: tile.col + vector.col,
        };

        while (movementAllowed(nextPos, updatedTile.value)) {
          updatedTile.row = nextPos.row;
          updatedTile.col = nextPos.col;

          nextPos.row += vector.row;
          nextPos.col += vector.col;
        }

        if (newGrid[updatedTile.row][updatedTile.col] !== null) {
          newGrid[updatedTile.row][updatedTile.col].willMergeWith = updatedTile;
        } else {
          newGrid[updatedTile.row][updatedTile.col] = updatedTile;
        }
      }
    }
  }
  return newGrid;
};

/**
 * Returns a new grid with the new merged tiles from the last move
 *
 * @param {Array} grid
 * @returns {Array}
 */
const mergeTiles = grid => {
  const updatedGrid = grid.map(row => {
    return row.map(tile => {
      if (tile && tile.willMergeWith) {
        const coords = [tile.row, tile.col];
        const value = tile.value * 2;
        return generateNewTile(coords, value);
      } else {
        return tile;
      }
    });
  });
  return updatedGrid;
};

// Reducer
const tilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_TILE: {
      const coords = getRandomEmptyCoords(state);
      const tile = generateNewTile(coords);
      const newState = addTile(state, tile);
      return newState;
    }
    case MOVE_TILES: {
      let newState = moveTiles(state, action.payload.direction);
      return newState;
    }
    case MERGE_TILES: {
      let newState = mergeTiles(state);
      return newState;
    }
    case NEW_GAME: {
      nextId = 0;
      let newState = generateGrid();

      let coords = getRandomEmptyCoords(newState);
      let tile = generateNewTile(coords);
      newState = addTile(newState, tile);

      coords = getRandomEmptyCoords(newState);
      tile = generateNewTile(coords);
      newState = addTile(newState, tile);

      return newState;
    }
    default:
      return state;
  }
};

export default tilesReducer;
