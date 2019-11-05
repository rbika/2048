import React from 'react';

import PropTypes from 'prop-types';

import styles from './Header.module.css';

const propTypes = {
  score: PropTypes.number.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
};

function Header(props) {
  const { score, onNewGameClick } = props;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>2048</h1>
      <div className={styles.gameInfo}>
        <div className={styles.scoreContainer}>
          <div className={styles.scoreLabel}>Score</div>
          <div className={styles.scoreValue}>{score}</div>
        </div>
        <button className={styles.newGameBtn} onClick={onNewGameClick}>
          New Game
        </button>
      </div>
    </div>
  );
}

Header.propTypes = propTypes;
export default Header;
