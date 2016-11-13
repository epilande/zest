import path from 'path';
import childProcess from 'child_process';

/**
 * Resolves the absolute file path.
 * @param  {String} relativePath  The file path to be resolved.
 * @return {String}               The absolute file path.
 */
function resolvePath(relativePath) {
  return path.resolve(relativePath);
}

/**
 * [handleNpmTest description]
 * @param  {[type]} err    [description]
 * @param  {[type]} stdout [description]
 * @param  {[type]} stderr [description]
 * @return {[type]}        [description]
 */
function handleNpmTest(err, stdout, stderr, callback) {
  if (err &&
      stderr &&
      !stderr.match(/Test failed/)
  ) {
    return callback(err);
  }
  // Report the test results;
  let testResults;
  if (stdout.match(/karma/i)) {
    try { // Karma parser
      testResults = JSON.parse(stdout.slice(stdout.indexOf('{')));
    } catch (e) {
      return callback('Could not parse test results, use the `karma-json-reporter` module.');
    }
  } else {
    try { // Mocha parser
      testResults = JSON.parse(stdout.slice(stdout.indexOf('{')));
    } catch (e) {
      return callback('Could not parse test results, use a mocha `json` reporter.');
    }
  }
  return callback(null, testResults);
}

/**
 * Runs mocha on a given path
 * @param  {String}   _projectPath  The path the mocha project
 * @param  {Function} callback      The callback handler
 */
export default function (_projectPath, callback) {
  let projectPath;
  try {
    projectPath = resolvePath(_projectPath);
  } catch (err) {
    return callback(err);
  }

  return childProcess.exec('npm test', {
    cwd: projectPath,
  }, (err, stdout, stderr) => handleNpmTest(err, stdout, stderr, callback));
}
