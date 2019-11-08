import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Game from './pages/game';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Game />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
