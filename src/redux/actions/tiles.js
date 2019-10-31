import { NEW_TILE } from './action-types';

/**
 * Create a new tile with a random position
 */
export const newTile = () => ({
  type: NEW_TILE,
});
