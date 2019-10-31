import { INCREMENT_SCORE, NEW_GAME } from '../actions/action-types';

const initialState = 0;

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_SCORE: {
      return state + action.payload.value;
    }
    case NEW_GAME: {
      return initialState;
    }
    default:
      return state;
  }
};

export default scoreReducer;
