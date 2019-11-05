import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { GRID_SIZE } from '../../../constants';
import styles from './Board.module.css';

const propTypes = {
  tiles: PropTypes.array.isRequired,
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

        let classes = classNames(styles.Tile, {
          [styles.newRandomTile]: tile.newRandom,
          [styles.newMergedTile]: tile.newMerged,
        });

        return (
          <div key={tile.id} className={classes} style={positionStyles}>
            {tile.value}
          </div>
        );
      })}
    </div>
  );
};

function Board(props) {
  const tiles = props.tiles;

  return (
    <div className={styles.BoardContainer}>
      <BoardGrid />
      <Tiles tiles={tiles} />
    </div>
  );
}

Board.propTypes = propTypes;
export default Board;
