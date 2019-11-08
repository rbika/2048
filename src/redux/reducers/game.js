import * as actions from '../actions/action-types';
import { GAME_STATES } from '../../constants';

const initialState = {
  gameState: GAME_STATES.IN_PROGRESS,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_GAME: {
      return { ...state, gameState: GAME_STATES.IN_PROGRESS };
    }
    case actions.KEEP_PLAYING: {
      return { ...state, gameState: GAME_STATES.IN_PROGRESS_AFTER_VICTORY };
    }
    case actions.GAME_OVER: {
      return { ...state, gameState: GAME_STATES.GAME_OVER };
    }
    case actions.VICTORY: {
      return { ...state, gameState: GAME_STATES.VICTORY };
    }
    default:
      return state;
  }
};

export default gameReducer;
