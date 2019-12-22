import * as actions from './action-types';

/**
 * Starts a new game
 */
export const newGame = () => ({
  type: actions.NEW_GAME,
});

/**
 * Ends the game
 */
export const endGame = (payload) => ({
  type: actions.NEW_GAME,
  payload,
});

/**
 * Allows player to keep playing after victory
 */
export const keepPlaying = () => ({
  type: actions.KEEP_PLAYING,
});
