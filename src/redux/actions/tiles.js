import { NEW_TILE, MOVE_TILES, MERGE_TILES } from './action-types';

/**
 * Create a new tile with a random position
 */
export const newTile = () => ({
  type: NEW_TILE,
});

/**
 * Move all tiles to a given direction
 *
 * @param {String} direction
 */
export const moveTiles = direction => ({
  type: MOVE_TILES,
  payload: { direction },
});

/**
 * Merge the tiles from the last move
 */
export const mergeTiles = () => ({
  type: MERGE_TILES,
});
