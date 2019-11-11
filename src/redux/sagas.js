import { put, takeEvery, all, select } from 'redux-saga/effects';

import { newTile, mergeTiles, updateGrid, setTilesMoving } from './actions/tiles';
import { gameOver, victory } from './actions/game';
import { incrementScore } from './actions/score';
import * as actions from './actions/action-types';
import { GAME_STATES, GRID_SIZE } from '../constants';
import * as gridUtils from '../utils/grid';

const sleep = ms => new Promise(res => setTimeout(res, ms));

function* newTileSaga() {
  function* task() {
    const grid = yield select(state => state.tiles.grid);
    if (grid.length) {
      const tile = gridUtils.generateRandomTile(grid);
      const updatedGrid = gridUtils.addTile(grid, tile);
      yield put(updateGrid(updatedGrid));
    }
  }
  yield takeEvery(actions.NEW_TILE, task);
}

function* newGameSaga() {
  function* task() {
    const grid = gridUtils.generateEmptyGrid(GRID_SIZE);
    yield put(updateGrid(grid));
    yield put(newTile());
    yield put(newTile());
  }
  yield takeEvery(actions.NEW_GAME, task);
}

function* moveTilesSaga() {
  function* task(action) {
    const { grid, tilesMoving } = yield select(state => state.tiles);
    const gameState = yield select(state => state.game.gameState);
    const { newGrid, validMove } = gridUtils.moveTiles(grid, action.payload);
    const endGame = gameState === GAME_STATES.VICTORY || gameState === GAME_STATES.GAME_OVER;

    if (tilesMoving || endGame) return;

    if (!gridUtils.hasAvailableMoves(newGrid)) {
      yield put(gameOver());
    } else if (validMove) {
      yield put(setTilesMoving(true));
      yield put(updateGrid(newGrid));

      yield sleep(150);
      yield put(setTilesMoving(false));
      yield put(mergeTiles());

      yield put(newTile());
    }
  }
  yield takeEvery(actions.MOVE_TILES, task);
}

function* mergeTilesSaga() {
  function* task() {
    const gameState = yield select(state => state.game.gameState);
    const grid = yield select(state => state.tiles.grid);
    const updatedGrid = gridUtils.mergeTiles(grid);
    const score = gridUtils.calculateMoveScore(updatedGrid);

    yield put(updateGrid(updatedGrid));
    yield put(incrementScore(score));

    if (gameState !== GAME_STATES.IN_PROGRESS_AFTER_VICTORY) {
      if (gridUtils.hasVictoryTile(grid)) {
        yield put(victory());
      }
    }
  }
  yield takeEvery(actions.MERGE_TILES, task);
}

export default function* rootSaga() {
  yield all([newGameSaga(), moveTilesSaga(), mergeTilesSaga(), newTileSaga()]);
}
