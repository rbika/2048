import React from 'react';

import PropTypes from 'prop-types';

import { GRID_SIZE } from '../../../constants';
import styles from './Board.module.css';

const propTypes = {
  tiles: PropTypes.array.isRequired,
  onNewTile: PropTypes.func.isRequired,
};

const BoardGrid = () => {
  const cells = [];

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i += 1) {
    cells.push(<div key={i} className={styles.BoardGridCell}></div>);
  }
  return <div className={styles.BoardGrid}>{cells}</div>;
};

const Tiles = props => {
  const tiles = props.tiles;

  return (
    <div className={styles.TilesContainer}>
      {tiles.map(tile => {
        const positionStyles = {
          top: tile.row * (100 + 10),
          left: tile.col * (100 + 10),
        };

        return (
          <div className={styles.Tile} style={positionStyles}>
            {tile.value}
          </div>
        );
      })}
    </div>
  );
};

function Board(props) {
  const { tiles, onNewTile } = props;

  return (
    <div className={styles.BoardContainer}>
      <BoardGrid />
      <Tiles tiles={tiles} />

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
