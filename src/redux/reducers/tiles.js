import * as actions from '../actions/action-types';
import { GRID_SIZE } from '../../constants';
import * as gridUtils from '../../utils/grid';

const initialState = {
  grid: [],
  tilesMoving: false,
};

const addRandomTile = (grid) => {
  const tile = gridUtils.generateRandomTile(grid);
  return gridUtils.addTile(grid, tile);
};

const tilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_GAME: {
      let grid;
      grid = gridUtils.generateEmptyGrid(GRID_SIZE);
      grid = addRandomTile(grid);
      grid = addRandomTile(grid);
      return { ...state, grid };
    }
    case actions.MOVE_TILES: {
      let newState;
      if (state.tilesMoving) {
        newState = state;
      } else {
        const { newGrid, gridChanged } = gridUtils.moveTiles(state.grid, action.payload);

        if (!gridChanged) {
          newState = state;
        } else {
          newState = { ...state, tilesMoving: true, grid: newGrid };
        }
      }
      return newState;
    }
    case actions.MERGE_TILES: {
      let grid = gridUtils.mergeTiles(state.grid);
      grid = addRandomTile(grid);
      return { ...state, tilesMoving: false, grid };
    }
    default:
      return state;
  }
};

export default tilesReducer;
