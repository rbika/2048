import { NEW_GAME, GAME_OVER, VICTORY, KEEP_PLAYING } from '../actions/action-types';
import { GAME_STATES } from '../../constants';

const initialState = GAME_STATES.IN_PROGRESS;

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME: {
      return GAME_STATES.IN_PROGRESS;
    }
    case KEEP_PLAYING: {
      return GAME_STATES.IN_PROGRESS_AFTER_VICTORY;
    }
    case GAME_OVER: {
      return GAME_STATES.GAME_OVER;
    }
    case VICTORY: {
      return GAME_STATES.VICTORY;
    }
    default:
      return state;
  }
};

export default gameReducer;
