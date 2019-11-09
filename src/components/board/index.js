import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { flatten } from 'lodash';

import { moveTiles } from '../../redux/actions/tiles';
import { ARROWS, GAME_STATES } from '../../constants';
import Board from './Board';

const BoardContainer = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.game);
  const tilesMoving = useSelector(state => state.tiles.tilesMoving);
  const tiles = useSelector(state => {
    const tiles = [];
    flatten(state.tiles.grid).forEach(tile => {
      if (tile) {
        tiles.push(tile);

        if (tile.willMergeWith) {
          tiles.push(tile.willMergeWith);
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
    const endGame = gameState === GAME_STATES.VICTORY || gameState === GAME_STATES.GAME_OVER;
    if (tilesMoving || endGame) return;

    const direction = ARROWS[e.keyCode];

    if (direction) {
      dispatch(moveTiles(direction));
    }
  };

  return <Board tiles={tiles} />;
};

export default BoardContainer;
