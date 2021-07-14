/* eslint  one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */


// -- Vendor Modules
const { src, dest, series, parallel } = require('gulp')
    , del    = require('del')
    , rename = require('gulp-rename')
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const { root }  = config
    , { fonts } = config
    , { icons } = config
    , { img }   = config
    ;


// -- Local Variables


// -- Gulp Private Tasks

// Removes the previous versions.
function clear(done) {
  del.sync([`${root}/img`, `${root}/fonts`]);
  done();
}

// Copy.
function cpfonts(done) {
  if (fonts.length > 0) {
    return src(fonts)
      .pipe(dest(`${root}/fonts`));
  }
  done();
  return null;
}

function cpicons() {
  return src(icons)
    .pipe(dest(`${root}/img/icons`))
  ;
}

function cpimg() {
  return src(img)
    // Flatten folder structure:
    .pipe(rename({ dirname: '' }))
    .pipe(dest(`${root}/img`))
  ;
}


// -- Gulp Public Task(s)
module.exports = series(
  clear,
  parallel(cpfonts, cpicons, cpimg),
);
