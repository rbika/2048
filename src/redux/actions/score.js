import * as actions from './action-types';

/**
 * Increments the current score
 *
 * @param {number} value value to be incremented
 */
export const incrementScore = (value) => ({
  type: actions.INCREMENT_SCORE,
  payload: value,
});

/**
 * Update best score
 *
 * @param {number} value
 */
export const updateBestScore = (value) => ({
  type: actions.UPDATE_BEST_SCORE,
  payload: value,
});

/**
 * Get best score
 */
export const getBestScore = () => ({
  type: actions.GET_BEST_SCORE,
});
