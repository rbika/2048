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

      <p className={styles.howToPlay}>
        <span className={styles.boldText}>HOW TO PLAY</span>: Use your arrow keys to move the tiles. When two tiles with
        the same number touch, they merge into one!
      </p>

      <a href="#" className={styles.viewOnGithub}>
        View on Github
      </a>
    </div>
  );
}

export default Game;
