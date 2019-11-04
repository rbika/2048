import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { newGame } from '../../../redux/actions/game';
import GameOver from './GameOver';

function GameOverContainer() {
  const dispatch = useDispatch();
  const score = useSelector(state => state.score);
  const gameState = useSelector(state => state.game);

  const handleNewGame = useCallback(() => {
    dispatch(newGame());
  }, [dispatch]);

  return <GameOver score={score} gameState={gameState} onNewGameClick={handleNewGame} />;
}

export default GameOverContainer;
