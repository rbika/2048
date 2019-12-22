import {
  put, takeEvery, all, select,
} from 'redux-saga/effects';

import { mergeTiles } from './actions/tiles';
import { gameOver, victory, checkEndGame } from './actions/game';
import { incrementScore, updateBestScore } from './actions/score';
import * as actions from './actions/action-types';
import { GAME_STATES } from '../constants';
import * as gridUtils from '../utils/grid';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function* moveTilesSaga() { // TODO rename to move start
  function* task() {
    const { tilesMoving } = yield select((state) => state.tiles);

    if (tilesMoving) {
      yield sleep(150); // Move animation time
      yield put(mergeTiles()); // TODO rename to move end
      yield put(checkEndGame()); // TODO rename to check move results
    }
  }
  yield takeEvery(actions.MOVE_TILES, task);
}

function* checkEndGameSaga() {
  function* task() {
    const grid = yield select((state) => state.tiles.grid);
    const score = gridUtils.calculateMoveScore(grid);
    yield put(incrementScore(score));
    const gameState = yield select((state) => state.game.gameState);
    const { currentScore, bestScore } = yield select((state) => state.score);

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
    const bestScore = yield select((state) => state.score.bestScore);
    localStorage.setItem('bestScore', bestScore);
  }
  yield takeEvery(actions.UPDATE_BEST_SCORE, task);
}

function* getBestScoreSaga() {
  function* task() {
    const bestScore = localStorage.getItem('bestScore');

    if (bestScore) {
      yield put(updateBestScore(parseInt(bestScore, 10)));
    }
  }
  yield takeEvery(actions.GET_BEST_SCORE, task);
}

export default function* rootSaga() {
  yield all([
    moveTilesSaga(),
    checkEndGameSaga(),
    updateBestScoreSaga(),
    getBestScoreSaga(),
  ]);
}
