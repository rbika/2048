import { INCREMENT_SCORE, RESET_SCORE } from './action-types';

export const incrementScore = value => ({
  type: INCREMENT_SCORE,
  payload: { value },
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
