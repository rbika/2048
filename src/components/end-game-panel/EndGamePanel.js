import React from 'react';

import PropTypes from 'prop-types';

import { GAME_STATES } from '../../constants';
import styles from './EndGamePanel.module.css';

const propTypes = {
  gameState: PropTypes.string.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
  onKeepPlayingClick: PropTypes.func.isRequired,
};

const GameOverPanel = props => {
  return (
    <div className={styles.endGamePanel}>
      <h1>GAME OVER!</h1>
      <button className={styles.newGameBtn} onClick={props.onNewGameClick}>
        Try Again
      </button>
    </div>
  );
};

const VictoryPanel = props => {
  return (
    <div className={styles.endGamePanel}>
      <h1>YOU WIN!</h1>
      <div>
        <button className={styles.newGameBtn} onClick={props.onKeepPlayingClick}>
          Keep Playing
        </button>
        <button className={styles.newGameBtn} onClick={props.onNewGameClick}>
          Try Again
        </button>
      </div>
    </div>
  );
};

function EndGamePanel(props) {
  const { onNewGameClick, onKeepPlayingClick } = props;
  let content = null;

  if (props.gameState === GAME_STATES.GAME_OVER) {
    content = <GameOverPanel onNewGameClick={onNewGameClick} />;
  } else if (props.gameState === GAME_STATES.VICTORY) {
    content = <VictoryPanel onNewGameClick={onNewGameClick} onKeepPlayingClick={onKeepPlayingClick} />;
  }

  return <div className={styles.container}>{content}</div>;
}

EndGamePanel.propTypes = propTypes;
export default EndGamePanel;
