import { NEW_GAME, GAME_OVER } from '../actions/action-types';
import { GAME_STATES } from '../../constants';

const initialState = GAME_STATES.IN_PROGRESS;

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME: {
      return initialState;
    }
    case GAME_OVER: {
      return GAME_STATES.GAME_OVER;
    }
    default:
      return state;
  }
};

export default gameReducer;
