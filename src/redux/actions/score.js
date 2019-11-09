import * as actions from './action-types';

/**
 * Increments the current score
 *
 * @param {Number} value value to be incremented
 */
export const incrementScore = value => ({
  type: actions.INCREMENT_SCORE,
  payload: value,
});

/**
 * Sets the current score to 0 (zero)
 */
export const resetScore = () => ({
  type: actions.RESET_SCORE,
});
