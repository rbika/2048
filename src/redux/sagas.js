import { put, takeEvery, all, select } from 'redux-saga/effects';

import { flatten } from 'lodash';
import uuid from 'uuid/v4';

import { newTile, mergeTiles, updateGrid, tilesMoving } from './actions/tiles';
import { gameOver, victory } from './actions/game';
import { incrementScore } from './actions/score';
import * as actions from './actions/action-types';
import { GRID_SIZE, VICTORY_TILE, GAME_STATES, DIRECTIONS } from '../constants';

const sleep = ms => new Promise(res => setTimeout(res, ms));

// Movement vector direction
const VECTOR = {
  UP: { row: -1, col: 0 },
  DOWN: { row: 1, col: 0 },
  LEFT: { row: 0, col: -1 },
  RIGHT: { row: 0, col: 1 },
};

/**
 * Watchers
 */

function* watchNewTile() {
  function* task() {
    const grid = yield select(state => state.tiles.grid);
    if (grid.length) {
      const coords = getRandomEmptyCoords(grid);
      const tile = generateNewTile(coords);
      const updatedGrid = addTile(grid, tile);
      yield put(updateGrid(updatedGrid));
    }
  }
  yield takeEvery(actions.NEW_TILE, task);
}

function* watchNewGame() {
  function* task() {
    const grid = generateGrid();
    yield put(updateGrid(grid));
    yield put(newTile());
    yield put(newTile());
  }
  yield takeEvery(actions.NEW_GAME, task);
}

function* watchMoveTiles() {
  function* task(action) {
    const grid = yield select(state => state.tiles.grid);
    const { newGrid, validMove } = moveTiles(grid, action.payload);

    if (!availableMoves(newGrid)) {
      yield put(gameOver());
    } else if (validMove) {
      yield put(tilesMoving(true));
      yield put(updateGrid(newGrid));

      yield sleep(150);
      yield put(tilesMoving(false));
      yield put(mergeTiles());

      yield put(newTile());
    }
  }
  yield takeEvery(actions.MOVE_TILES, task);
}

function* watchMergeTiles() {
  function* task() {
    const gameState = yield select(state => state.game.gameState);
    const grid = yield select(state => state.tiles.grid);
    const score = calculateScore(grid);
    const updatedGrid = mergePendingTiles(grid);

    yield put(updateGrid(updatedGrid));
    yield put(incrementScore(score));

    if (containsVictoryTile(gameState, grid)) {
      yield put(victory());
    }
  }
  yield takeEvery(actions.MERGE_TILES, task);
}

// Helper functions

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
 * Returns a new grid with the new tiles positions
 *
 * @param {Array} grid
 * @param {Object} direction
 * @returns {Array}
 */
const moveTiles = (grid, direction) => {
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
          newGrid[updatedTile.row][updatedTile.col].willMergeWith = updatedTile;
        } else {
          newGrid[updatedTile.row][updatedTile.col] = updatedTile;
        }
      }
    }
  }
  return { newGrid, validMove };
};

const availableMoves = grid => {
  // Checks if there are empty cells
  if (flatten(grid).some(cell => cell === null)) return true;

  // Checks if there are adajacent cells with the same value
  let result = false;
  flatten(grid).forEach(tile => {
    const { row, col, value } = tile;
    if (row + 1 < GRID_SIZE) {
      if (grid[row + 1][col].value === value) result = true;
    }
    if (col + 1 < GRID_SIZE) {
      if (grid[row][col + 1].value === value) result = true;
    }
  });
  return result;
};

/**
 * Creates a new tile
 *
 * @param {Array} coords
 * @param {Array} value
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
 * Returns a new grid with the new merged tiles from the last move
 *
 * @param {Array} grid
 * @returns {Array}
 */
const mergePendingTiles = grid => {
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

const containsVictoryTile = (gameState, grid) => {
  if (gameState === GAME_STATES.IN_PROGRESS_AFTER_VICTORY) return;
  return flatten(grid)
    .filter(cell => cell)
    .some(cell => cell.value === VICTORY_TILE);
};

const calculateScore = grid => {
  const tiles = flatten(grid).filter(cell => cell !== null);
  let value = 0;

  for (const tile of tiles) {
    if (tile.newMerged) {
      value += tile.value;
    }
  }
  return value;
};

export default function* rootSaga() {
  yield all([watchNewGame(), watchMoveTiles(), watchMergeTiles(), watchNewTile()]);
}
