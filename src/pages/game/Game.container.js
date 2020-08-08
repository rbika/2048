import React, { useEffect, useContext } from 'react';

import { Swipeable } from 'react-swipeable';

import { DIRECTIONS } from '../../constants';
import GameView from './Game.view';
import { GameContext } from '../../contexts/GameContext';

function GameContainer() {
  const { state, newGame, moveTiles } = useContext(GameContext);

  // Starts a new game
  useEffect(() => {
    newGame();
  }, [newGame]);

  const handleSwipe = (e) => {
    const direction = DIRECTIONS[e.dir.toUpperCase()];

    if (direction) {
      moveTiles(direction);
    }
  };

  return (
    <Swipeable onSwiped={handleSwipe}>
      <GameView gameState={state.gameState} />
    </Swipeable>
  );
}

export default GameContainer;
