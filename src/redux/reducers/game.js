import { NEW_GAME } from '../actions/action-types';

const initialState = {
  win: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_GAME: {
      return initialState;
    }
    default:
      return state;
  }
}
