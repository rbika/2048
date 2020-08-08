import React, { useEffect, useContext } from 'react';

import BoardView from './Board.view';
import { ARROWS } from '../../constants';
import { GameContext } from '../../contexts/GameContext';

const parseGrid = (grid) => {
  const array = [];
  grid.flat().forEach((tile) => {
    if (tile) {
      array.push(tile);

      if (tile.mergeWithTile) {
        array.push(tile.mergeWithTile);
      }
    }
  });

  return array.sort((tile1, tile2) => (tile1.id > tile2.id ? 1 : -1));
};

const BoardContainer = () => {
  const { state, moveTiles } = useContext(GameContext);
  const tiles = parseGrid(state.grid);

  // Add keypress event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  const handleKeyPress = (e) => {
    const direction = ARROWS[e.keyCode];

    if (direction && !state.tilesMoving) {
      moveTiles(direction);
    }
  };

  return <BoardView tiles={tiles} />;
};

export default BoardContainer;
