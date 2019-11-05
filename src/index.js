import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Game from './components/game';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <Game />
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
