// Tile needed to win the game
export const VICTORY_TILE = 2048;

// Game states
export const GAME_STATES = {
  IN_PROGRESS: 'IN_PROGRESS',
  VICTORY: 'VICTORY',
  GAME_OVER: 'GAME_OVER',
  IN_PROGRESS_AFTER_VICTORY: 'IN_PROGRESS_AFTER_VICTORY',
};

// Board grid size
export const GRID_SIZE = 4;

// Directions
export const DIRECTIONS = {
  UP: 'UP',
  LEFT: 'LEFT',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
};

// Keyboard arrows codes
export const ARROWS = {
  38: DIRECTIONS.UP,
  37: DIRECTIONS.LEFT,
  40: DIRECTIONS.DOWN,
  39: DIRECTIONS.RIGHT,
};
