import React from 'react';

import Header from './header';
import Board from './board';
import GameOver from './game-over';
import { GAME_STATES } from '../../constants';
import styles from './Game.module.css';

function Game(props) {
  const gameOver = props.gameState === GAME_STATES.GAME_OVER;

  return (
    <div className={styles.Game}>
      <Header />
      {gameOver && <GameOver />}

      <Board />
    </div>
  );
}

export default Game;
