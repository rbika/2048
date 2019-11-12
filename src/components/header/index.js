import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { newGame } from '../../redux/actions/game';
import Header from './Header';

function HeaderContainer() {
  const dispatch = useDispatch();
  const { currentScore, bestScore } = useSelector(state => state.score);

  const handleNewGameClick = useCallback(() => {
    dispatch(newGame());
  }, [dispatch]);

  return <Header score={currentScore} bestScore={bestScore} onNewGameClick={handleNewGameClick} />;
}

export default HeaderContainer;
