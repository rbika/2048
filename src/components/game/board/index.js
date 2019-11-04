import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { flatten } from 'lodash';

import { newTile, moveTiles, mergeTiles } from '../../../redux/actions/tiles';
import { newGame } from '../../../redux/actions/game';
import { ARROWS } from '../../../constants';
import Board from './Board';

function BoardContainer() {
  const dispatch = useDispatch();
  const tiles = useSelector(state => {
    const tiles = [];

    flatten(state.tiles.tiles).forEach(tile => {
      if (tile) {
        tiles.push(tile);

        if (tile.willMergeWith) {
          tiles.push(tile.willMergeWith);
        }
      }
    });

    return tiles.sort((tile1, tile2) => (tile1.id > tile2.id ? 1 : -1));
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

  const handleKeyPress = e => {
    const direction = ARROWS[e.keyCode];
    if (direction) {
      dispatch(moveTiles(direction));

      // Wait animation finishes
      setTimeout(() => {
        dispatch(newTile());
        dispatch(mergeTiles());
      }, 200);
    }
  };

  return <Board tiles={tiles} />;
}

export default BoardContainer;
