import { combineReducers } from 'redux';

import game from './game';
import tiles from './tiles';
import score from './score';

export default combineReducers({ game, tiles, score });
