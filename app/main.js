import menubar from 'menubar';
import electron, { ipcMain } from 'electron';

import runMocha from './lib/start';

const app = electron.app;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// menubar
const mb = menubar({
  width: 500,
  height: 700,
  preloadWindow: true,
  resizable: false,
  transparent: true,
});

mb.on('ready', () => {
  console.log('app is ready'); // eslint-disable-line
  // your app code here
});

mb.on('after-create-window', () => {
  // ====================================================================
  // This is where the data gets passed to `src/index.js`,
  // Move to a function call triggered by the frontend.
  // ====================================================================
  mb.window.webContents.on('dom-ready', () => {
    ipcMain.on('execute test', (event, path) => {
      runMocha(path, (err, data) => {
        if (err) {
          return mb.window.webContents.send('test error', err);
        }
        return mb.window.webContents.send('test results', data);
      });
    });
  });
  // ====================================================================
});

// ipc communication
ipcMain.on('quit', () => {
  app.quit();
});
