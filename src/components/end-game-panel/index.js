import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { newGame, keepPlaying } from '../../redux/actions/game';
import EndGamePanel from './EndGamePanel';

function EndGamePanelContainer() {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.game.gameState);

  const handleNewGame = useCallback(() => {
    dispatch(newGame());
  }, [dispatch]);

  const handleKeepPlaying = useCallback(() => {
    dispatch(keepPlaying());
  }, [dispatch]);

  return <EndGamePanel gameState={gameState} onNewGameClick={handleNewGame} onKeepPlayingClick={handleKeepPlaying} />;
}

export default EndGamePanelContainer;
