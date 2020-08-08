import React, { useContext } from 'react';

import HeaderView from './Header.view';
import { GameContext } from '../../contexts/GameContext';

function HeaderContainer() {
  const { state, newGame } = useContext(GameContext);

  return (
    <HeaderView
      score={state.currentScore}
      bestScore={state.bestScore}
      onNewGameClick={newGame}
    />
  );
}

export default HeaderContainer;
