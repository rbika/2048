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
    return flatten(state.tiles)
      .filter(tile => tile !== null)
      .sort((tile1, tile2) => (tile1.id > tile2.id ? 1 : -1));
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
      setTimeout(() => {
        dispatch(newTile());
      }, 100);
    }
  };

  return <Board tiles={tiles} onNewTile={handleNewTile} />;
}

export default BoardContainer;
