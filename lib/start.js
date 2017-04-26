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
 * Formats a karma error object into the ones used by mocha
 * @param  {Object} err  The karma error object
 * @return {Object}      The mocha error object
 */
function formatKarmaTestErrorToMocha(err) {
  return {
    message: err.message,
    showDif: err.showDiff,
    actual: null, // Don't want to figure this out
    expected: null, // Don't want to figure this out
    stack: null, // Don't want to figure this out
  };
}

/**
 * Formats a karma test object into the ones used by mocha
 * @param  {Object} test  The karma test object
 * @return {Object}       The mocha test object
 */
function formatKarmaTestToMocha(test) {
  let errorObject = {};
  if (!test.success) {
    errorObject = Object.assign(errorObject, formatKarmaTestErrorToMocha(test.assertionErrors[0]));
  }
  return {
    title: test.description,
    fullTitle: [].concat(test.suite, test.description).join(' '),
    duration: test.time,
    currentRetry: null, // Don't want to figure this out
    err: formatKarmaTestErrorToMocha(errorObject),
    success: test.success, // polluting, but makes it easier to sort later
    skipped: test.skipped, // plluting, but makes it easier to sort later
  };
}

function karmaFormatter(jsonObject) {
  const formattedObject = {};
  let browserId;
  let targetBrowser;
  let targetBrowserResult;
  for (let id in jsonObject.browsers) {
    if ({}.hasOwnProperty.call(jsonObject.browsers, id)) {
      browserId = id;
      targetBrowser = jsonObject.browsers[browserId];
      targetBrowserResult = jsonObject.result[browserId];
    }
    break; // Just take 1 id;
  }
  formattedObject.stats = {
    suites: null, // could do, but not needed.
    tests: targetBrowser.lastResult.total,
    passes: targetBrowser.lastResult.success,
    pending: targetBrowser.lastResult.skipped,
    failures: targetBrowser.lastResult.failed,
    start: null, // could figure out if needed
    end: null, // could figure out if needed
    duration: targetBrowser.totalTime,
  };
  formattedObject.tests = targetBrowserResult.map(formatKarmaTestToMocha);
  formattedObject.pending = formattedObject.tests.filter(test => test.skipped);
  formattedObject.failures = formattedObject.tests.filter(test => !test.success);
  formattedObject.passes = formattedObject.tests.filter(test => test.success);
  return formattedObject;
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
    testResults = karmaFormatter(testResults);
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
