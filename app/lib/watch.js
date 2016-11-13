import watch from 'node-watch';
import debounce from 'lodash-debounce';

function createPathWatcher(path, options = {}, callback) {
  const { DEBOUNCE_RATE } = options;

  const watchHandler = (/* filename */) => debounce(callback.bind(null, path), DEBOUNCE_RATE);
  const watcher = watch(path, options, watchHandler);
  return watcher;
}

export default createPathWatcher;
