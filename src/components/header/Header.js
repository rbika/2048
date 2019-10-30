import React from 'react';
import styles from './Header.module.css';

function Header(props) {
  const { score, handleNewGame } = props;

  return (
    <div className={styles.Game}>
      <header className={styles.GameHeader}>
        <p>Score: {score}</p>
        <p>Win State: </p>
        <button onClick={handleNewGame}>New Game</button>
      </header>
    </div>
  );
}

export default Header;
