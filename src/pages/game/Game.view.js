import React from 'react';

import PropTypes from 'prop-types';

import Header from '../../components/header';
import Board from '../../components/board';
import EndGamePanel from '../../components/end-game-panel';
import { GAME_STATES } from '../../constants';
import { ReactComponent as GithubLogo } from '../../assets/github.svg';
import styles from './Game.module.css';

const propTypes = {
  gameState: PropTypes.string.isRequired,
};

function GameView(props) {
  const { gameState } = props;
  const showEndGamePanel = gameState !== GAME_STATES.PLAYING;

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.positionRelative}>
        <Board />
        {showEndGamePanel && <EndGamePanel />}
      </div>

      <p className={styles.howToPlayText}>
        <span className={styles.boldText}>HOW TO PLAY: </span>
        Use your arrow keys or swipe to move the tiles. When two
        tiles with the same number touch, they merge into one!
      </p>

      <div>
        <a href="https://github.com/rbika/2048" className={styles.viewOnGithubLink} target="_blank" rel="noopener noreferrer">
          <GithubLogo className={styles.githubLogo} />
          View on Github
        </a>
      </div>
    </div>
  );
}

GameView.propTypes = propTypes;
export default GameView;
