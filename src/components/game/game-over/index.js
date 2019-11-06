import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { newGame, keepPlaying } from '../../../redux/actions/game';
import GameOver from './GameOver';

function GameOverContainer() {
  const dispatch = useDispatch();
  const score = useSelector(state => state.score);
  const gameState = useSelector(state => state.game);

  const handleNewGame = useCallback(() => {
    dispatch(newGame());
  }, [dispatch]);

  const handleKeepPlaying = useCallback(() => {
    dispatch(keepPlaying());
  }, [dispatch]);

  return (
    <GameOver
      score={score}
      gameState={gameState}
      onNewGameClick={handleNewGame}
      onKeepPlayingClick={handleKeepPlaying}
    />
  );
}

export default GameOverContainer;
