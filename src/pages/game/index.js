import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { newGame } from '../../redux/actions/game';
import Game from './Game';

function GameContainer() {
  const gameState = useSelector(state => state.game.gameState);
  const dispatch = useDispatch();

  // Start a new game
  useEffect(() => {
    dispatch(newGame());
  }, []);

  return <Game gameState={gameState} />;
}

export default GameContainer;
