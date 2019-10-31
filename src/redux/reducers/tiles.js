import { NEW_TILE, NEW_GAME } from '../actions/action-types';
import { GRID_SIZE } from '../../constants';

const initialState = [];

// Tiles ID counter
let nextId = 0;

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
const generateNewTile = coords => {
  nextId += 1;

  return {
    id: nextId,
    value: Math.random() > 0.9 ? 4 : 2,
    row: coords[0],
    col: coords[1],
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

// Reducer
const tilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_TILE: {
      const coords = getRandomEmptyCoords(state);
      const tile = generateNewTile(coords);
      const newState = addTile(state, tile);
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
