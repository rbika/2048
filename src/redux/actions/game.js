import { NEW_GAME, GAME_OVER } from './action-types';

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
