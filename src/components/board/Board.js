import React from 'react';

import PropTypes from 'prop-types';

// import styles from './Board.module.css';

const propTypes = {
  tiles: PropTypes.array.isRequired,
  onNewTile: PropTypes.func.isRequired,
};

function Board(props) {
  const { tiles, onNewTile } = props;

  return (
    <div>
      <p>Board Component</p>
      <button onClick={onNewTile}>New Tile</button>
      {tiles.map((tile, i) => {
        if (!tile) {
          return <p>Empty</p>;
        } else {
          return (
            <p key={tile.id}>
              tile {tile.id} - value: {tile.value}: {tile.row}, {tile.col}
            </p>
          );
        }
      })}
    </div>
  );
}

Board.propTypes = propTypes;
export default Board;
