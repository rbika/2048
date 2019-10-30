import { UPDATE_SCORE, UPDATE_WIN_STATE } from '../actions/game';

const initialState = {
  score: 0,
  win: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SCORE: {
      const { value } = action.payload;
      return {
        ...state,
        score: value,
      };
    }
    case UPDATE_WIN_STATE: {
      const { value } = action.payload;
      return {
        ...state,
        win: value,
      };
    }
    default:
      return state;
  }
}
