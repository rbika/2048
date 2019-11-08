import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { newGame } from '../../redux/actions/game';
import Header from './Header';

function HeaderContainer() {
  const dispatch = useDispatch();
  const score = useSelector(state => state.score.currentScore);

  const handleNewGame = useCallback(() => {
    dispatch(newGame());
  }, [dispatch]);

  return <Header score={score} onNewGameClick={handleNewGame} />;
}

export default HeaderContainer;
