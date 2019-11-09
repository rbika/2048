import React from 'react';

import { useSelector } from 'react-redux';

import Game from './Game';

function GameContainer() {
  const gameState = useSelector(state => state.game.gameState);

  return <Game gameState={gameState} />;
}

export default GameContainer;