import React from 'react';

import PropTypes from 'prop-types';

import { GAME_STATES } from '../../../constants';

import styles from './GameOver.module.css';

const propTypes = {
  score: PropTypes.number.isRequired,
  gameState: PropTypes.string.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
};

const GameOverPanel = props => {
  return (
    <div className={styles.gameOverPanel}>
      <h1>GAME OVER!</h1>
      <button className={styles.newGameBtn} onClick={props.onNewGameClick}>
        Try Again
      </button>
    </div>
  );
};

const VictoryPanel = () => {
  return (
    <div className={styles.victoryPanel}>
      <h1>YOU WIN</h1>
    </div>
  );
};

function GameOver(props) {
  const { onNewGameClick } = props;
  let content = null;
  if (props.gameState === GAME_STATES.GAME_OVER) {
    content = <GameOverPanel onNewGameClick={onNewGameClick} />;
  } else if (props.gameState === GAME_STATES.VICTORY) {
    content = <VictoryPanel />;
  }

  return <div className={styles.container}>{content}</div>;
}

GameOver.propTypes = propTypes;
export default GameOver;
