import { NEW_TILE, MOVE_TILES, MERGE_TILES, NEW_GAME } from '../actions/action-types';
import { GRID_SIZE, RIGHT, DOWN } from '../../constants';
import uuid from 'uuid/v4';

const initialState = {
  tiles: [],
  validLastMove: true,
};

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
  const randomValue = Math.random() > 0.9 ? 4 : 2;
  const newMerged = !!value;
  const newRandom = !value;

  return {
    id: uuid(),
    value: value ? value : randomValue,
    row: coords[0],
    col: coords[1],
    newMerged: newMerged,
    newRandom: newRandom,
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
const moveTiles = (state, direction) => {
  const newGrid = generateGrid();
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

      const tile = state.tiles[row][col];

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
          newGrid[updatedTile.row][updatedTile.col].willMergeWith = updatedTile;
        } else {
          newGrid[updatedTile.row][updatedTile.col] = updatedTile;
        }
      }
    }
  }
  return { newGrid, validMove };
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
      if (!state.validLastMove) {
        return state;
      }
      const coords = getRandomEmptyCoords(state.tiles);
      const tile = generateNewTile(coords);
      const newState = { ...state, tiles: addTile(state.tiles, tile) };
      return newState;
    }
    case MOVE_TILES: {
      const { newGrid, validMove } = moveTiles(state, action.payload.direction);
      if (validMove) {
        return { ...state, tiles: newGrid, validLastMove: validMove };
      } else {
        return { ...state, validLastMove: validMove };
      }
    }
    case MERGE_TILES: {
      let newState = { ...state, tiles: mergeTiles(state.tiles) };
      return newState;
    }
    case NEW_GAME: {
      let newGrid = generateGrid();

      let coords = getRandomEmptyCoords(newGrid);
      let tile = generateNewTile(coords);
      newGrid = addTile(newGrid, tile);

      coords = getRandomEmptyCoords(newGrid);
      tile = generateNewTile(coords);
      newGrid = addTile(newGrid, tile);

      return { ...state, tiles: newGrid };
    }
    default:
      return state;
  }
};

export default tilesReducer;
