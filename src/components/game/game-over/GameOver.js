import React from 'react';

import PropTypes from 'prop-types';

import { GAME_STATES } from '../../../constants';

// import styles from './GameOver.module.css';

const propTypes = {
  score: PropTypes.number.isRequired,
  gameState: PropTypes.string.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
};

function GameOver(props) {
  // const { score, onNewGameClick } = props;
  if (props.gameState === GAME_STATES.GAME_OVER) {
    return <h1>GAME OVER</h1>;
  } else if (props.gameState === GAME_STATES.VICTORY) {
    return <h1>YOU WIN</h1>;
  } else {
    return '';
  }
}

GameOver.propTypes = propTypes;
export default GameOver;
