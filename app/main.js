import menubar from 'menubar';
import electron, { ipcMain } from 'electron';

import runMocha from './lib/start';

const TEST_PROJECT_PATH = '../../zest-target';

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('ready-to-show', () => {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
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

mb.on('after-create-window', function () {
  // ====================================================================
  // This is where the data gets passed to `src/index.js`,
  // Move to a function call triggered by the frontend.
  // ====================================================================
  mb.window.webContents.on('dom-ready', () => {
    runMocha(TEST_PROJECT_PATH, (err, data) => {
      if (err) {
        return mb.window.webContents.send('test error', err);
      }
      return mb.window.webContents.send('test results', data);
    });
  });
  // ====================================================================
});

// ipc communication
ipcMain.on('quit', () => {
  app.quit();
});
