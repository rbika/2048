import { NEW_GAME, GAME_OVER, VICTORY } from './action-types';

/**
 * Start a new game
 */
export const newGame = () => ({
  type: NEW_GAME,
});

/**
 * Game over
 */
export const gameOver = () => ({
  type: GAME_OVER,
});

/**
 * Victory
 */
export const victory = () => ({
  type: VICTORY,
});
