import React from 'react';

import Header from './header';
import Board from './board';
import GameOver from './game-over';
import { GAME_STATES } from '../../constants';
import styles from './Game.module.css';

function Game(props) {
  const showGameResult = props.gameState !== GAME_STATES.PLAYING;

  return (
    <div className={styles.gameContainer}>
      <Header />
      {showGameResult && <GameOver />}

      <Board />
    </div>
  );
}

export default Game;
