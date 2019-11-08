import { INCREMENT_SCORE, NEW_GAME } from '../actions/action-types';

const initialState = {
  currentScore: 0,
};

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME: {
      return { ...state, currentScore: 0 };
    }
    case INCREMENT_SCORE: {
      const newScore = state.currentScore + action.payload;
      return { ...state, currentScore: newScore };
    }
    default:
      return state;
  }
};

export default scoreReducer;
