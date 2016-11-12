import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from 'containers/App';
import { ipcRenderer } from 'electron';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

ipcRenderer.on('test results', (event, data) => {
  console.log(data);
});

ipcRenderer.on('test error', (event, err) => {
  console.log('Oh noes there was an error!');
  console.error(err);
});
