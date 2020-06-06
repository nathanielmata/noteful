import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import STORE from './store';

ReactDOM.render(
  <BrowserRouter>
    <App store={STORE}/>
  </BrowserRouter>,
  document.getElementById('root')
);

