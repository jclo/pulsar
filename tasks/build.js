/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0
  no-param-reassign: 0 */


// -- Vendor Modules
const { series, parallel } = require('gulp')
    ;


// -- Local Modules
const importlib  = require('./import')
    , makejs     = require('./makejs')
    , makecss    = require('./makecss')
    , makeothers = require('./makeothers')
    ;


// -- Local Constants


// -- Local Variables


// -- Gulp Private Tasks


// -- Gulp Public Task(s)
module.exports = series(importlib, parallel(makejs, makecss, makeothers));
