/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */


// -- Vendor Modules
const { src, dest, parallel } = require('gulp')
    , header  = require('gulp-header')
    , replace = require('gulp-replace')
    , uglify  = require('gulp-uglify-es').default
    ;


// -- Local Modules
const config = require('./config')
    , pack   = require('../package.json')
    ;


// -- Local Constants
const { dist }     = config
    , { root }     = config
    , { cssdir }   = config
    , { imgdir }   = config
    , { fontsdir } = config
    , { vendor }   = config
    , { libname }  = config
    , { bundle }   = config
    , { license }  = config
    ;


// -- Local Variables


// -- Gulp Private Tasks

// Copies the image files.
function doimg() {
  return src(`${imgdir}/**/*`)
    .pipe(dest(`${dist}/img`));
}

// Copies the font files.
function dofonts() {
  return src(`${fontsdir}/**/*`)
    .pipe(dest(`${dist}/fonts`));
}

// Copies the sofware worker script.
function dosw() {
  return src(`${dist}/sw.js`)
    .pipe(replace(`js/${bundle}.js`, `js/${bundle}.min.js`))
    .pipe(replace(`js/${bundle}.mjs`, `js/${bundle}.min.mjs`))
    .pipe(uglify())
    .pipe(dest(dist))
  ;
}

// Copies index.html
function doindex() {
  return src([`${root}/index.html`, `${root}/offline.html`])
    .pipe(replace('{{app:name}}', `${libname}`))
    .pipe(replace('{{app:version}}', pack.version))
    .pipe(replace('{{app:canonical-link}}', config.app.canonical))
    .pipe(replace('{{app:title}}', config.app.title))
    .pipe(replace('{{app:description}}', config.app.description))
    .pipe(replace('{{company:copyright}}', config.company.copyright))
    .pipe(replace('{{company:name}}', config.company.name))
    .pipe(replace('{{company:slogan}}', config.company.slogan))
    .pipe(replace(`js/${bundle}.js`, `js/${bundle}.min.js`))
    .pipe(replace(`js/${bundle}.mjs`, `js/${bundle}.min.mjs`))
    .pipe(dest(dist))
  ;
}

// Copies the CSS file.
function copycss() {
  return src(`${cssdir}/${bundle}.min.css`)
    .pipe(header(license))
    .pipe(dest(`${dist}/css`))
  ;
}

// Copies vendor libs.
function copyvendor() {
  return src(vendor)
    .pipe(dest(`${dist}/vendor`))
  ;
}


// -- Gulp Public Task(s):

module.exports = parallel(dosw, doimg, dofonts, doindex, copycss, copyvendor);
