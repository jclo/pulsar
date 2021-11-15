/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules
const { watch, series } = require('gulp')
    , connect = require('gulp-connect')
    , open    = require('open')
    ;


// -- Local Modules
const config = require('./tasks/config')
    ;


// -- Local Constants
const filesToWatch = ['public/src/**/*.js', 'public/src/**/*.css']
    ;


// -- Local Variables


// -- Gulp Private Tasks
const build    = require('./tasks/build')
    , makedist = require('./tasks/makedist')
    ;


// -- Gulp watch
function fwatch() {
  watch(filesToWatch, series(build));
}

// -- Gulp connect dev
function devserver(done) {
  connect.server({
    host: '0.0.0.0', // (allows remote access)
    root: config.root,
    port: 8888,
    livereload: true,
  });
  open('http://localhost:8888/');
  done();
}

// -- Gulp connect prod
function appserver(done) {
  connect.server({
    host: '0.0.0.0', // (allows remote access)
    root: config.dist,
    port: 8889,
    livereload: true,
  });
  open('http://localhost:8889/');
  done();
}


// Gulp Public Tasks:
exports.build = build;
exports.watch = fwatch;
exports.rundev = devserver;
exports.makedist = makedist;
exports.runapp = appserver;
exports.default = series(build, makedist);
