import React from 'react';

import PropTypes from 'prop-types';

import Header from '../../components/header';
import Board from '../../components/board';
import EndGamePanel from '../../components/end-game-panel';
import { GAME_STATES } from '../../constants';
import styles from './Game.module.css';

const propTypes = {
  gameState: PropTypes.string.isRequired,
};

function Game(props) {
  const showEndGamePanel = props.gameState !== GAME_STATES.PLAYING;

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.positionRelative}>
        <Board />
        {showEndGamePanel && <EndGamePanel />}
      </div>

      <p className={styles.howToPlayText}>
        <span className={styles.boldText}>HOW TO PLAY</span>: Use your arrow keys to move the tiles. When two tiles with
        the same number touch, they merge into one!
      </p>

      <a href="https://github.com/rbika/2048" target="_blank" className={styles.viewOnGithubLink}>
        View on Github
      </a>
    </div>
  );
}

Game.propTypes = propTypes;
export default Game;
