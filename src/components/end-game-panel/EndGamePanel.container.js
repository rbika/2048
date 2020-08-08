import React, { useCallback, useContext } from 'react';

import EndGamePanelView from './EndGamePanel.view';
import { GameContext } from '../../contexts/GameContext';

function EndGamePanelContainer() {
  const { state, newGame, endlessMode } = useContext(GameContext);

  const handleNewGameClick = useCallback(() => {
    newGame();
  }, [newGame]);

  const handleKeepPlayingClick = useCallback(() => {
    endlessMode();
  }, [endlessMode]);

  return (
    <EndGamePanelView
      gameState={state.gameState}
      onNewGameClick={handleNewGameClick}
      onKeepPlayingClick={handleKeepPlayingClick}
    />
  );
}

export default EndGamePanelContainer;
