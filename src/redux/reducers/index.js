import { combineReducers } from 'redux';

import gameReducer from './game';
import tilesReducer from './tiles';
import scoreReducer from './score';

export default combineReducers({
  game: gameReducer,
  tiles: tilesReducer,
  score: scoreReducer,
});
