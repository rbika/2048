import React from 'react';
import ReactDOM from 'react-dom';

import Game from './pages/game';
import GameContextProvider from './contexts/GameContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
