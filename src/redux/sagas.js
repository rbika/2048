import { put, takeEvery, all, select } from 'redux-saga/effects';

import { newTile, mergeTiles, updateGrid, setTilesMoving } from './actions/tiles';
import { gameOver, victory, checkEndGame } from './actions/game';
import { incrementScore, updateBestScore } from './actions/score';
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
    const { newGrid, gridChanged } = gridUtils.moveTiles(grid, action.payload);
    const endGame = gameState === GAME_STATES.VICTORY || gameState === GAME_STATES.GAME_OVER;

    if (tilesMoving || endGame) return;

    if (gridChanged) {
      yield put(setTilesMoving(true));
      yield put(updateGrid(newGrid));

      yield sleep(150);
      yield put(setTilesMoving(false));
      yield put(mergeTiles());

      yield put(newTile());
      yield put(checkEndGame());
    }
  }
  yield takeEvery(actions.MOVE_TILES, task);
}

function* mergeTilesSaga() {
  function* task() {
    const grid = yield select(state => state.tiles.grid);
    const updatedGrid = gridUtils.mergeTiles(grid);
    const score = gridUtils.calculateMoveScore(updatedGrid);

    yield put(updateGrid(updatedGrid));
    yield put(incrementScore(score));
  }
  yield takeEvery(actions.MERGE_TILES, task);
}

function* checkEndGameSaga() {
  function* task() {
    const grid = yield select(state => state.tiles.grid);
    const gameState = yield select(state => state.game.gameState);
    const { currentScore, bestScore } = yield select(state => state.score);

    if (gameState !== GAME_STATES.IN_PROGRESS_AFTER_VICTORY) {
      if (gridUtils.hasVictoryTile(grid)) {
        yield put(victory());
        yield put(updateBestScore(Math.max(currentScore, bestScore)));
      }
    }

    if (!gridUtils.hasAvailableMoves(grid)) {
      yield put(gameOver());
      yield put(updateBestScore(Math.max(currentScore, bestScore)));
    }
  }
  yield takeEvery(actions.CHECK_END_GAME, task);
}

function* updateBestScoreSaga() {
  function* task() {
    const bestScore = yield select(state => state.score.bestScore);
    localStorage.setItem('bestScore', bestScore);
  }
  yield takeEvery(actions.UPDATE_BEST_SCORE, task);
}

function* getBestScoreSaga() {
  function* task() {
    const bestScore = localStorage.getItem('bestScore');

    if (bestScore) {
      yield put(updateBestScore(parseInt(bestScore)));
    }
  }
  yield takeEvery(actions.GET_BEST_SCORE, task);
}

export default function* rootSaga() {
  yield all([
    newGameSaga(),
    moveTilesSaga(),
    mergeTilesSaga(),
    newTileSaga(),
    checkEndGameSaga(),
    updateBestScoreSaga(),
    getBestScoreSaga(),
  ]);
}
