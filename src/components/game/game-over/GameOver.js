import React from 'react';

import PropTypes from 'prop-types';

import styles from './GameOver.module.css';

const propTypes = {
  score: PropTypes.number.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
};

function GameOver(props) {
  const { score, onNewGameClick } = props;

  return <h1>GAME OVER</h1>;
}

GameOver.propTypes = propTypes;
export default GameOver;
