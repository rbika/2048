import { NEW_TILE, NEW_GAME } from '../actions/action-types';

// Helper functions
const generateCells = () => {
  return [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];
};

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

const getRandomEmptyCoords = cells => {
  const emptyCells = getEmptyCells(cells);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

const generateNewTile = coords => {
  nextId += 1;

  return {
    id: nextId,
    value: Math.random() > 0.9 ? 4 : 2,
    row: coords[0],
    col: coords[1],
  };
};

const initialState = generateCells();
let nextId = 0;

// Reducers
export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_TILE: {
      const coords = getRandomEmptyCoords(state);
      const newState = state.map((row, i) => {
        if (i !== coords[0]) {
          return row;
        } else {
          return row.map((col, j) => {
            if (j !== coords[1]) {
              return col;
            } else {
              return generateNewTile(coords);
            }
          });
        }
      });
      return newState;
    }
    case NEW_GAME: {
      nextId = 0;
      return initialState;
    }
    default:
      return state;
  }
}
