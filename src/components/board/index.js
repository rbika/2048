import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { flatten } from 'lodash';

import { moveTiles } from '../../redux/actions/tiles';
import { ARROWS } from '../../constants';
import Board from './Board';

const BoardContainer = () => {
  const dispatch = useDispatch();
  const tiles = useSelector(state => {
    const tiles = [];
    flatten(state.tiles.grid).forEach(tile => {
      if (tile) {
        tiles.push(tile);

        if (tile.mergeWithTile) {
          tiles.push(tile.mergeWithTile);
        }
      }
    });

    return tiles.sort((tile1, tile2) => (tile1.id > tile2.id ? 1 : -1));
  });

  // Add keypress event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  const handleKeyPress = e => {
    const direction = ARROWS[e.keyCode];

    if (direction) {
      dispatch(moveTiles(direction));
    }
  };

  return <Board tiles={tiles} />;
};

export default BoardContainer;
