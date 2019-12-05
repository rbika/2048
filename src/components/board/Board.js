import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { GRID_SIZE } from '../../constants';
import styles from './Board.module.css';

const propTypes = {
  tiles: PropTypes.array.isRequired,
};

const BoardGrid = () => {
  const cells = [];

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i += 1) {
    cells.push(<div key={i} className={styles.boardGridCell} />);
  }
  return <div className={styles.boardGrid}>{cells}</div>;
};

const Tiles = (props) => {
  const { tiles } = props;

  return (
    <div className={styles.tilesContainer}>
      {tiles.map((tile) => {
        const positionStyles = {
          transform: `translate(${tile.col * (75 + 10)}px, ${tile.row * (75 + 10)}px)`,
        };

        const classes = classNames(styles.tile, {
          [styles.newRandomTile]: tile.newRandom,
          [styles.newMergedTile]: tile.newMerged,
          [styles[`tile-${tile.value}`]]: true,
        });

        return (
          <div key={tile.id} className={styles.tileContainer} style={positionStyles}>
            <div className={classes}>{tile.value}</div>
          </div>
        );
      })}
    </div>
  );
};

function Board(props) {
  const { tiles } = props;

  return (
    <div className={styles.boardContainer}>
      <BoardGrid />
      <Tiles tiles={tiles} />
    </div>
  );
}

Board.propTypes = propTypes;
export default Board;
