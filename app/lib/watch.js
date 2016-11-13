import watch from 'node-watch';

function createPathWatcher(path, options = {}, callback) {
  const watchHandler = (/* filename */) => callback.bind(null, path);
  const watcher = watch(path, options, watchHandler);
  return watcher;
}

export default createPathWatcher;
