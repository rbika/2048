import React from 'react';

import { connect } from 'react-redux';

import { updateWinState } from '../../redux/actions/game';
import Header from './Header';

function HeaderContainer(props) {
  const { score, updateWinState } = props;

  const handleNewGame = () => {
    updateWinState(null);
  };

  return <Header score={score} handleNewGame={handleNewGame} />;
}

const mapStateToProps = state => {
  const { score } = state.game;
  return { score };
};

const mapDispatchToProps = {
  updateWinState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
