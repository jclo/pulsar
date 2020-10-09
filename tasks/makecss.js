/* eslint  one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */


// -- Vendor Modules
const { src, dest, series } = require('gulp')
    , del      = require('del')
    , cleanCSS = require('gulp-clean-css')
    , concat   = require('gulp-concat')
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const destination = config.cssdir
    , { css }     = config
    , { bundle }  = config
    ;


// -- Local Variables


// -- Gulp Private Tasks

// Removes the previous version.
function clean(cb) {
  del.sync(destination);
  cb();
}

// Creates the library css file.
function docss() {
  return src(css)
    .pipe(cleanCSS({
      specialComments: 1,
      format: 'keep-breaks',
    }))
    .pipe(concat(`${bundle}.min.css`))
    .pipe(dest(destination));
}


// -- Gulp Public Task(s)
module.exports = series(clean, docss);
