import * as actions from './action-types';

/**
 * Moves all tiles to a given direction
 *
 * @param {String} direction UP, DOWN, LEFT or RIGHT
 */
export const moveTiles = (direction) => ({
  type: actions.MOVE_TILES,
  payload: direction,
});

/**
 * Merges the tiles in the same cell
 */
export const mergeTiles = () => ({
  type: actions.MERGE_TILES,
});
