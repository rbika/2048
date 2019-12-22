import * as actions from './action-types';

/**
 * Increments the current score
 *
 * @param {number} value value to be incremented
 */
export const updateScore = (value) => ({
  type: actions.UPDATE_SCORE,
  payload: value,
});
