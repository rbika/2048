export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_WIN_STATE = 'UPDATE_WIN_STATE';

export const updateScore = value => ({
  type: UPDATE_SCORE,
  payload: { value },
});

export const updateWinState = value => ({
  type: UPDATE_WIN_STATE,
  payload: { value },
});
