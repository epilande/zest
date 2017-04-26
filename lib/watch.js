import watch from 'node-watch';
import debounce from 'lodash.debounce';

const DEFAULT_DEBOUNCE_RATE = 1 * 1000;  // 1 second

function createPathWatcher(path, options = {}, callback) {
  const DEBOUNCE_RATE = options.DEBOUNCE_RATE || DEFAULT_DEBOUNCE_RATE;

  const watchHandler = filename => callback(null, filename);
  const watcher = watch(path, options, debounce(watchHandler, DEBOUNCE_RATE));
  return watcher;
}

export default createPathWatcher;
