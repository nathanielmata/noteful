import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import STORE from './store';

ReactDOM.render(
  <App store={STORE}/>,
  document.getElementById('root')
);

