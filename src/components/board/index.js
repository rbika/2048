import React, { useCallback, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { flatten } from 'lodash';

import { newTile } from '../../redux/actions/tiles';
import Board from './Board';

function BoardContainer() {
  const dispatch = useDispatch();
  const tiles = useSelector(state => {
    return flatten(state.tiles);
  });

  useEffect(() => {
    dispatch(newTile());
    dispatch(newTile());
  }, []);

  const handleNewTile = useCallback(() => {
    dispatch(newTile());
  }, [dispatch]);

  return <Board tiles={tiles} onNewTile={handleNewTile} />;
}

export default BoardContainer;
