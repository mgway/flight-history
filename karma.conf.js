// Karma configuration
//
// For all available config options and default values, see:
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
  'use strict';

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['mocha', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      // loaded without require
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/es5-shim/es5-sham.js',
      'bower_components/jquery/dist/jquery.js',

      'node_modules/chai/chai.js',

      // hack to load RequireJS after the shim libs
      'node_modules/requirejs/require.js',
      'node_modules/karma-requirejs/lib/adapter.js',

      // loaded with require
      {pattern: 'bower_components/flight/**/*.js', included: false},
      {pattern: 'lib/**/*.js', included: false},
      {pattern: 'test/**/*.spec.js', included: false},

      'test/test-main.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome'
    ],

    client: {
      mocha: {
        ui: 'bdd',
        reporter: 'html'
      }
    },

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 5000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    // Karma will report all the tests that are slower than given time limit (in
    // ms).
    reportSlowerThan: 500
  });
};
