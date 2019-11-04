import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { flatten } from 'lodash';

import { newTile, moveTiles, mergeTiles } from '../../../redux/actions/tiles';
import { newGame, gameOver } from '../../../redux/actions/game';
import { ARROWS, GRID_SIZE } from '../../../constants';
import Board from './Board';

const BoardContainer = () => {
  const [moving, setMoving] = useState(false);
  const dispatch = useDispatch();
  const grid = useSelector(state => {
    return state.tiles.tiles;
  });
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
  });

  // Checks for avalilable moves
  const availableMoves = () => {
    // Checks if there are empty cells
    if (flatten(grid).some(cell => cell === null)) return true;

    // Checks if there are adajacent cells with the same value
    let aux = false;
    flatten(grid).forEach(tile => {
      const { row, col, value } = tile;
      if (row + 1 < GRID_SIZE) {
        if (grid[row + 1][col].value === value) aux = true;
      }
      if (col + 1 < GRID_SIZE) {
        if (grid[row][col + 1].value === value) aux = true;
      }
    });
    return aux;
  };

  const handleKeyPress = e => {
    if (moving) return;

    const direction = ARROWS[e.keyCode];

    if (direction) {
      setMoving(true);
      dispatch(moveTiles(direction));

      if (!availableMoves()) {
        dispatch(gameOver());
      } else {
        // Wait animation finishes
        setTimeout(() => {
          setMoving(false);
          dispatch(newTile());
          dispatch(mergeTiles());
        }, 200);
      }
    }
  };

  return <Board tiles={tiles} />;
};

export default BoardContainer;
