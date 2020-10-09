/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */


// -- Vendor Modules
const { src, dest, series, parallel } = require('gulp')
    , del     = require('del')
    , concat  = require('gulp-concat')
    , header  = require('gulp-header')
    , replace = require('gulp-replace')
    , uglify  = require('gulp-uglify-es').default
    ;


// -- Local Modules
const config     = require('./config')
    , distothers = require('./makedistothers')
    ;


// -- Local Constants
const { dist }     = config
    , libdir       = config.jsdir
    , { webfiles } = config
    , { bundle }   = config
    , { license }  = config
    ;


// -- Local Variables


// -- Gulp Private Tasks

// Removes the previous dist.
function deldist(done) {
  del.sync(dist);
  done();
}

// Copies README and LICENSE.
function doskeleton() {
  return src(webfiles)
    .pipe(dest(dist))
  ;
}

// Copies the development version.
function copydev() {
  return src(`${libdir}/${bundle}.js`)
    .pipe(header(license))
    .pipe(dest(`${dist}/js`))
  ;
}

// Copies the module development version.
function copydevm() {
  return src(`${libdir}/${bundle}.mjs`)
    .pipe(header(license))
    .pipe(dest(`${dist}/js`))
  ;
}

// Creates the minified version.
function makeminified() {
  return src(`${libdir}/${bundle}.js`)
    .pipe(replace('/*! ***', '/** ***'))
    .pipe(uglify())
    .pipe(header(license))
    .pipe(concat(`${bundle}.min.js`))
    .pipe(dest(`${dist}/js`))
  ;
}

// Creates the module minified version.
function makeminifiedm() {
  return src(`${libdir}/${bundle}.mjs`)
    .pipe(replace('/*! ***', '/** ***'))
    .pipe(uglify())
    .pipe(header(license))
    .pipe(concat(`${bundle}.min.mjs`))
    .pipe(dest(`${dist}/js`))
  ;
}


// -- Gulp Public Task(s):

module.exports = series(
  deldist,
  parallel(doskeleton, /* copydev, copydevm, */ makeminified, makeminifiedm),
  distothers,
);
