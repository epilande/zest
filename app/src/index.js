import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import 'sanitize.css/sanitize.css';
import routes from './routes';
import configureStore from './store';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root'),
);
