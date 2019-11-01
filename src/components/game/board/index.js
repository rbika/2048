import React, { useCallback, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { flatten } from 'lodash';

import { newTile, moveTiles } from '../../../redux/actions/tiles';
import { newGame } from '../../../redux/actions/game';
import { ARROWS } from '../../../constants';
import Board from './Board';

function BoardContainer() {
  const dispatch = useDispatch();
  const tiles = useSelector(state => {
    return flatten(state.tiles).filter(tile => tile !== null);
  });

  // Start a new game
  useEffect(() => {
    dispatch(newGame());
  }, []);

  // Add keypress event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleNewTile = useCallback(() => {
    dispatch(newTile());
  }, [dispatch]);

  const handleKeyPress = e => {
    const direction = ARROWS[e.keyCode];
    if (direction) {
      dispatch(moveTiles(direction));
    }
  };

  return <Board tiles={tiles} onNewTile={handleNewTile} />;
}

export default BoardContainer;
