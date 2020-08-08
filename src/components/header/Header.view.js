import React from 'react';

import PropTypes from 'prop-types';

import styles from './Header.module.css';

const propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
};

function HeaderView(props) {
  const { score, bestScore, onNewGameClick } = props;

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>2048</h1>
        <h2 className={styles.subTitle}>Join the numbers and get to the 2048 tile!</h2>
      </div>

      <div className={styles.gameInfo}>
        <div className={styles.scoresContainer}>
          <div className={styles.scoreContainer}>
            <div className={styles.scoreLabel}>Score</div>
            <div className={styles.scoreValue}>{score}</div>
          </div>

          <div className={styles.scoreContainer}>
            <div className={styles.scoreLabel}>Best</div>
            <div className={styles.scoreValue}>{bestScore}</div>
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <button type="button" className={styles.newGameBtn} onClick={onNewGameClick}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

HeaderView.propTypes = propTypes;
export default HeaderView;
