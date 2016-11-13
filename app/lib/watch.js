import watch from 'node-watch';
import debounce from 'lodash-debounce';

const DEFAULT_DEBOUNCE_RATE = 1 * 1000;  // 1 second

function createPathWatcher(path, options = {}, callback) {
  const DEBOUNCE_RATE = options.DEBOUNCE_RATE || DEFAULT_DEBOUNCE_RATE;

  const watchHandler = (/* filename */) => debounce(callback.bind(null, path), DEBOUNCE_RATE);
  const watcher = watch(path, options, watchHandler);
  return watcher;
}

export default createPathWatcher;
