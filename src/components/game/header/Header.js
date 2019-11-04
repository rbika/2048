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
    <div className={styles.Game}>
      <header className={styles.GameHeader}>
        <p>Score: {score}</p>
        <button onClick={onNewGameClick}>New Game</button>
      </header>
    </div>
  );
}

Header.propTypes = propTypes;
export default Header;
