import {
  put, takeEvery, all, select,
} from 'redux-saga/effects';

import { endGame } from './actions/game';
import * as actions from './actions/action-types';
import * as gridUtils from '../utils/grid';
import { GAME_STATES } from '../constants';
import { updateScore } from './actions/score';
import { moveTilesEnd } from './actions/tiles';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function* moveTilesSaga() {
  function* task() {
    yield sleep(150); // Move animation time
    yield put(moveTilesEnd());
  }
  yield takeEvery(actions.MOVE_TILES, task);
}

function* moveTilesEndSaga() {
  function* task() {
    const grid = yield select((state) => state.tiles.grid);
    const score = gridUtils.calculateMoveScore(grid);
    yield put(updateScore(score));

    const gameState = yield select((state) => state.game.gameState);
    const { currentScore, bestScore } = yield select((state) => state.score);

    if (gameState !== GAME_STATES.IN_PROGRESS_AFTER_VICTORY) {
      if (gridUtils.hasVictoryTile(grid)) {
        yield put(endGame({
          gameState: GAME_STATES.VICTORY,
          bestScore: Math.max(currentScore, bestScore),
        }));
      }
    }

    if (!gridUtils.hasAvailableMoves(grid)) {
      yield put(endGame({
        gameState: GAME_STATES.GAME_OVER,
        bestScore: Math.max(currentScore, bestScore),
      }));
    }
  }
  yield takeEvery(actions.MOVE_TILES_END, task);
}

export default function* rootSaga() {
  yield all([
    moveTilesSaga(),
    moveTilesEndSaga(),
  ]);
}
