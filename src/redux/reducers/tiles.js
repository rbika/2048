import * as actions from '../actions/action-types';

const initialState = {
  grid: [],
  tilesMoving: false,
};

const tilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.TILES_MOVING: {
      return { ...state, tilesMoving: action.payload };
    }
    case actions.UPDATE_GRID: {
      return { ...state, grid: action.payload };
    }
    default:
      return state;
  }
};

export default tilesReducer;
