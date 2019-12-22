import * as actions from '../actions/action-types';

const initialState = {
  currentScore: 0,
  bestScore: 0,
};

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_GAME: {
      const savedBestScore = localStorage.getItem('bestScore');
      const bestScore = savedBestScore ? parseInt(savedBestScore, 10) : 0;
      return { ...state, bestScore, currentScore: 0 };
    }
    case actions.UPDATE_SCORE: {
      const newScore = state.currentScore + action.payload;
      return { ...state, currentScore: newScore };
    }
    case actions.END_GAME: {
      localStorage.setItem('bestScore', action.payload.bestScore);
      return { ...state, bestScore: action.payload.bestScore };
    }
    default:
      return state;
  }
};

export default scoreReducer;
