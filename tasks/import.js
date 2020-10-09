/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0
  no-param-reassign: 0 */


// -- Vendor Modules
const { src, dest, series } = require('gulp')
    , del = require('del')
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const { vlibs } = config
    ;


// -- Local Variables


// -- Gulp Private Tasks

// Removes the previous version.
function clean(done) {
  del.sync(vlibs.dest);
  done();
}

// Imports vendor libraries:
function importvlibs(done) {
  if (vlibs.lib.length > 0) {
    return src(vlibs.lib)
      .pipe(dest(vlibs.dest));
  }
  done();
  return null;
}


// -- Gulp Public Task(s)
module.exports = series(clean, importvlibs);
