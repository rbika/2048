import * as actions from './action-types';

/**
 * Starts a new game
 */
export const newGame = () => ({
  type: actions.NEW_GAME,
});

/**
 * Ends the game when the player lose
 */
export const gameOver = () => ({
  type: actions.GAME_OVER,
});

/**
 * Ends the game when the player win
 */
export const victory = () => ({
  type: actions.VICTORY,
});

/**
 * Allows player to keep playing after victory
 */
export const keepPlaying = () => ({
  type: actions.KEEP_PLAYING,
});
