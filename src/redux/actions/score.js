import { INCREMENT_SCORE, RESET_SCORE } from './action-types';

/**
 * Increment the current score
 *
 * @param {Number} value value to be incremented
 */
export const incrementScore = value => ({
  type: INCREMENT_SCORE,
  payload: { value },
});

/**
 * Set the current score to 0 (zero)
 */
export const resetScore = () => ({
  type: RESET_SCORE,
});
