import React from 'react';

import Header from './header';
import Board from './board';
import styles from './Game.module.css';

function Game() {
  return (
    <div className={styles.Game}>
      <Header />
      <Board />
    </div>
  );
}

export default Game;
