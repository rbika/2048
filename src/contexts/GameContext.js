import React, { useReducer, useCallback } from 'react';

import PropTypes from 'prop-types';

import * as gridUtils from '../utils/grid';
import { GRID_SIZE, GAME_STATES, MOVE_ANIMATION } from '../constants';

export const GameContext = React.createContext();

const propTypes = {
  children: PropTypes.node.isRequired,
};

const addRandomTile = (grid) => {
  const tile = gridUtils.generateRandomTile(grid);
  return gridUtils.addTile(grid, tile);
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Actions
 */

const NEW_GAME = '2048/newGame';
const GAME_OVER = '2048/gameOver';
const VICTORY = '2048/victory';
const ENDLESS_MODE = '2048/endlessMode';
const MOVE_TILES = '2048/moveTiles';
const MOVE_TILES_END = '2048/moveTilesEnd';

/**
 * Reducer
 */

const initialState = {
  gameState: GAME_STATES.IN_PROGRESS,
  currentScore: 0,
  bestScore: 0,
  grid: [],
  tilesMoving: false,
};

const reducer = (state, action) => {
  if (action.type === NEW_GAME) {
    const { grid, bestScore } = action.payload;

    return {
      ...state,
      grid,
      bestScore,
      currentScore: 0,
      gameState: GAME_STATES.IN_PROGRESS,
    };
  }

  if (action.type === GAME_OVER) {
    const { bestScore } = action.payload;

    return {
      ...state,
      bestScore,
      gameState: GAME_STATES.GAME_OVER,
    };
  }

  if (action.type === VICTORY) {
    const { bestScore } = action.payload;

    return {
      ...state,
      bestScore,
      gameState: GAME_STATES.VICTORY,
    };
  }

  if (action.type === ENDLESS_MODE) {
    return {
      ...state,
      gameState: GAME_STATES.ENDLESS_MODE,
    };
  }

  if (action.type === MOVE_TILES) {
    const { newGrid } = action.payload;

    return {
      ...state,
      grid: newGrid,
      tilesMoving: true,
    };
  }

  if (action.type === MOVE_TILES_END) {
    const { grid, score } = action.payload;

    return {
      ...state,
      grid,
      currentScore: score,
      tilesMoving: false,
    };
  }

  return state;
};

/**
 * Context Provider
 */

const GameContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  const newGame = useCallback(() => {
    let grid;
    grid = gridUtils.generateEmptyGrid(GRID_SIZE);
    grid = addRandomTile(grid);
    grid = addRandomTile(grid);

    const savedBestScore = localStorage.getItem('bestScore');
    const bestScore = savedBestScore ? parseInt(savedBestScore, 10) : 0;

    dispatch({
      type: NEW_GAME,
      payload: { grid, bestScore },
    });
  }, [dispatch]);

  const moveTiles = useCallback(async (directions) => {
    const { newGrid, gridChanged } = gridUtils.moveTiles(state.grid, directions);

    if (!gridChanged) return;

    dispatch({
      type: MOVE_TILES,
      payload: { newGrid },
    });

    await sleep(MOVE_ANIMATION);

    let grid = gridUtils.mergeTiles(newGrid);
    const score = state.currentScore + gridUtils.calculateMoveScore(grid);

    if (grid.flat().some((value) => value === null)) {
      grid = addRandomTile(grid);
    }

    dispatch({
      type: MOVE_TILES_END,
      payload: { grid, score },
    });

    if (state.gameState !== GAME_STATES.ENDLESS_MODE) {
      if (gridUtils.hasVictoryTile(grid)) {
        const bestScore = Math.max(score, state.bestScore);
        localStorage.setItem('bestScore', bestScore);

        dispatch({
          type: VICTORY,
          payload: { bestScore },
        });
      }
    }

    if (!gridUtils.hasAvailableMoves(grid)) {
      const bestScore = Math.max(score, state.bestScore);
      localStorage.setItem('bestScore', bestScore);

      dispatch({
        type: GAME_OVER,
        payload: { bestScore },
      });
    }
  }, [state, dispatch]);

  const endlessMode = useCallback(() => {
    dispatch({
      type: ENDLESS_MODE,
    });
  }, [dispatch]);

  return (
    <GameContext.Provider
      value={{
        state,
        newGame,
        moveTiles,
        endlessMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameContextProvider.propTypes = propTypes;
export default GameContextProvider;
