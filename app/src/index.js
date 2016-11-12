import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ipcRenderer } from 'electron';
import 'sanitize.css/sanitize.css';
import App from 'containers/App';
import configureStore from './store';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

ipcRenderer.on('test results', (event, data) => {
  console.log(data);
});

ipcRenderer.on('test error', (event, err) => {
  console.log('Oh noes there was an error!');
  console.error(err);
});
