import React from 'react';

import PropTypes from 'prop-types';

import { GAME_STATES } from '../../constants';
import styles from './EndGamePanel.module.css';

const propTypes = {
  gameState: PropTypes.string.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
  onKeepPlayingClick: PropTypes.func.isRequired,
};

const GameOverPanel = (props) => {
  const { onNewGameClick } = props;

  return (
    <div className={styles.endGamePanel}>
      <h1>GAME OVER!</h1>
      <button type="button" className={styles.panelBtn} onClick={onNewGameClick}>
        Try Again
      </button>
    </div>
  );
};
GameOverPanel.propTypes = {
  onNewGameClick: PropTypes.func.isRequired,
};

const VictoryPanel = (props) => {
  const { onKeepPlayingClick, onNewGameClick } = props;

  return (
    <div className={styles.endGamePanel}>
      <h1>YOU WIN!</h1>
      <div>
        <button type="button" className={styles.panelBtn} onClick={onKeepPlayingClick}>
          Keep Playing
        </button>
        <button type="button" className={styles.panelBtn} onClick={onNewGameClick}>
          Try Again
        </button>
      </div>
    </div>
  );
};
VictoryPanel.propTypes = {
  onKeepPlayingClick: PropTypes.func.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
};

function EndGamePanelView(props) {
  const { onNewGameClick, onKeepPlayingClick, gameState } = props;
  let content = null;

  if (gameState === GAME_STATES.GAME_OVER) {
    content = <GameOverPanel onNewGameClick={onNewGameClick} />;
  } else if (gameState === GAME_STATES.VICTORY) {
    content = (
      <VictoryPanel onNewGameClick={onNewGameClick} onKeepPlayingClick={onKeepPlayingClick} />
    );
  }

  return <div className={styles.container}>{content}</div>;
}

EndGamePanelView.propTypes = propTypes;
export default EndGamePanelView;
