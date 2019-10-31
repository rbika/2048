import { NEW_GAME } from '../actions/action-types';
import { GAME_STATES } from '../../constants';

const initialState = GAME_STATES.IN_PROGRESS;

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME: {
      return initialState;
    }
    default:
      return state;
  }
};

export default gameReducer;
