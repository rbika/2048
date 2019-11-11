import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Swipeable } from 'react-swipeable';

import { newGame } from '../../redux/actions/game';
import { moveTiles } from '../../redux/actions/tiles';
import { DIRECTIONS } from '../../constants';
import Game from './Game';

function GameContainer() {
  const gameState = useSelector(state => state.game.gameState);
  const dispatch = useDispatch();

  // Starts a new game
  useEffect(() => {
    dispatch(newGame());
  }, []);

  const handleSwipe = e => {
    const direction = DIRECTIONS[e.dir.toUpperCase()];

    if (direction) {
      dispatch(moveTiles(direction));
    }
  };

  return (
    <Swipeable onSwiped={handleSwipe}>
      <Game gameState={gameState} />
    </Swipeable>
  );
}

export default GameContainer;
