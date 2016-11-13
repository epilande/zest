import storage from 'electron-json-storage';

/**
 * Gets a value from app storage.
 * @param  {String}   key      The key to store the data under.
 * @param  {Function} callback The callback function after data is retrieved.
 */
export function get(key, callback) {
  return storage.get(key, (err, value) => {
    if (err) {
      return callback(err);
    }
    // For some reason `storage.get` returns an empty object if the value is not defined.
    if (JSON.stringify(value) === JSON.stringify({})) {
      return callback(null, undefined);
    }
    return callback(null, value);
  });
}

/**
 * Stores a key value in app storage.
 * @param  {String}   key      The key to store the data under.
 * @param  {String}   value    The value to store.
 * @param  {Function} callback The callback function after data is stored.
 */
export function set(key, value, callback) {
  return storage.set(key, value, callback);
}
