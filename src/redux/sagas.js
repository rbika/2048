import { put, takeEvery, all } from 'redux-saga/effects';

import { newTile } from './actions/tiles';

function* watchNewGame() {
  function* task() {
    yield put(newTile());
    yield put(newTile());
  }
  yield takeEvery('NEW_GAME', task);
}

export default function* rootSaga() {
  yield all([watchNewGame()]);
}
