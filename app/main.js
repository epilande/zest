import menubar from 'menubar';
import electron, { ipcMain } from 'electron';

import runMocha from './lib/start';
import createPathWatcher from './lib/watch';
import { getProjects, updateProject } from './lib/storage';

import {
  INIT_APP,
  SET_PROJECTS,
} from './src/ipc-events';

const app = electron.app;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS',
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) { // eslint-disable-line
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

// menubar
const mb = menubar({
  width: 500,
  height: 700,
  preloadWindow: true,
  resizable: false,
  transparent: true,
});

mb.on('ready', async () => {
  await installExtensions();

  console.log('app is ready'); // eslint-disable-line
  // your app code here
});

const pathWatchers = {};
/**
 * Runs the tests for a project path
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
function runTest(projectPath, callback = function noop() {}) {
  return runMocha(projectPath, (err, data) => {
    callback(err, data);
    if (err) {
      return mb.window.webContents.send('test error', err);
    }
    const payload = {
      projectPath,
      results: data,
    };
    const persistedStats = {
      ...data.stats,
      updatedAt: new Date(),
    };
    return updateProject(projectPath, persistedStats, (/* err */) => {
      return mb.window.webContents.send('test results', payload);
    });
  });
}

mb.on('ready', () => {
  console.log('app is ready'); // eslint-disable-line
  // your app code here

  // ====================================================================
  // This is where the data gets passed to `src/index.js`,
  // Move to a function call triggered by the frontend.
  // ====================================================================
  ipcMain.on(INIT_APP, function () {
    return getProjects((err, projects) => {
      return mb.window.webContents.send(SET_PROJECTS, projects);
    });
  });

  ipcMain.on('watch directory', (event, path) => {
    let watcher;
    let running = false;
    if (!pathWatchers[path]) {
      watcher = createPathWatcher(path, (/* filepath */) => {
        if (!running) {
          running = true;
          runTest(path, (/* err, results */) => {
            running = false;
          });
        }
      });

      pathWatchers[path] = watcher;
    }
  });

  ipcMain.on('execute test', (event, path) => {
    runTest(path);
  });
  // ====================================================================
});

// ipc communication
ipcMain.on('quit', () => {
  for (const watcher in pathWatchers) {
    if ({}.hasOwnProperty.call(pathWatchers, watcher)) {
      pathWatchers[watcher].close();
    }
  }
  app.quit();
});
