import * as actions from './action-types';

/**
 * Creates a new tile with a random position
 */
export const newTile = () => ({
  type: actions.NEW_TILE,
});

/**
 * Moves all tiles to a given direction
 *
 * @param {String} direction UP, DOWN, LEFT or RIGHT
 */
export const moveTiles = direction => ({
  type: actions.MOVE_TILES,
  payload: direction,
});

/**
 * Merges the tiles in the same cell
 */
export const mergeTiles = () => ({
  type: actions.MERGE_TILES,
});

/**
 * Updates board grid
 *
 * @param {Array} grid
 */
export const updateGrid = grid => ({
  type: actions.UPDATE_GRID,
  payload: grid,
});

/**
 * Sets if tiles are moving or not
 *
 * @param {Boolean} value
 */
export const setTilesMoving = value => ({
  type: actions.SET_TILES_MOVING,
  payload: value,
});
