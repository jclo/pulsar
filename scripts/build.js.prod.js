#!/usr/bin/env node
/* *****************************************************************************
 *
 * Creates the production JS files.
 *
 * build:js:prod.js script minifies JS files and copies them in the
 * production folder.
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous js production files,
 *  . _copydev                    builds the js production file,
 *  . _copydevm                   builds the ES6 module production file,
 *  . _makeminified               builds and minifies the js production file,
 *  . _makeminifiedm              builds and minifies the ES6 module production file,
 *  . _doLibs                     builds the js production libraries,
 *
 *
 * Public Static Methods:
 *  . run                         executes the script,
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0,
  import/no-extraneous-dependencies: 0 */


// -- Vendor Modules
const fs         = require('fs')
    , nopt       = require('nopt')
    , { minify } = require('terser')
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const VERSION     = '0.0.0-alpha.0'
    , opts        = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts   = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed      = nopt(opts, shortOpts, process.argv, 2)
    , { dist }    = config
    , { libdir }  = config
    , { name }    = config
    , { license } = config
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Dispays the help message.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    '                       creates the js production files',
    '',
    'Options:',
    '',
    '-h, --help             output usage information',
    '-v, --version          output the version number',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
}

/**
 * Removes the previous js production build.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {object}        returns a promise,
 * @since 0.0.0
 */
function _clean(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclean\x1b[89m\x1b[0m\'...\n');

  return new Promise((resolve) => {
    fs.rm(`${dist}/js`, { force: true, recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      fs.mkdir(`${dist}/js`, { recursive: true }, (err2) => {
        if (err2) throw new Error(err2);

        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
        resolve();
        if (done) done();
      });
    });
  });
}

/**
 * Builds the js production file.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copydev(done) {
  const d1 = new Date();
  process.stdout.write("Starting '\x1b[36mcopy:umd\x1b[89m\x1b[0m'...\n");

  fs.readFile(`${libdir}/${name}.js`, 'utf8', (err1, data) => {
    if (err1) throw new Error(err1);

    let content = license;
    content += data;
    fs.writeFile(`${dist}/js/${name}.js`, content, { encoding: 'utf8' }, (err2) => {
      if (err2) throw new Error(err2);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mcopy:umd\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
}

/**
 * Builds the ES6 module production file.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copydevm(done) {
  const d1 = new Date();
  process.stdout.write("Starting '\x1b[36mcopy:es6\x1b[89m\x1b[0m'...\n");

  fs.readFile(`${libdir}/${name}.mjs`, 'utf8', (err1, data) => {
    if (err1) throw new Error(err1);

    let content = license;
    content += data;
    fs.writeFile(`${dist}/js/${name}.mjs`, content, { encoding: 'utf8' }, (err2) => {
      if (err2) throw new Error(err2);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mcopy:es6\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
}

/**
 * Builds and minifies the js production file.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _makeminified(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mmake:minified:umd\x1b[89m\x1b[0m\'...\n');

  fs.readFile(`${libdir}/${name}.js`, 'utf8', (err1, data) => {
    if (err1) throw new Error(err1);

    let content = license;
    content += data.replace(/\/\*! \*\*\*/g, '/** ***');

    minify(content, {})
      .then((result) => {
        fs.writeFile(`${dist}/js/${name}.min.js`, result.code, { encoding: 'utf8' }, (err2) => {
          if (err2) throw new Error(err2);

          const d2 = new Date() - d1;
          process.stdout.write(`Finished '\x1b[36mmake:minified:umd\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
          done();
        });
      });
  });
}

/**
 * Builds and minifies the ES6 module production file.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _makeminifiedm(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mmake:minified:es6\x1b[89m\x1b[0m\'...\n');

  fs.readFile(`${libdir}/${name}.mjs`, 'utf8', (err1, data) => {
    if (err1) throw new Error(err1);

    let content = license;
    content += data.replace(/\/\*! \*\*\*/g, '/** ***');

    minify(content, {})
      .then((result) => {
        fs.writeFile(`${dist}/js/${name}.min.mjs`, result.code, { encoding: 'utf8' }, (err2) => {
          if (err2) throw new Error(err2);

          const d2 = new Date() - d1;
          process.stdout.write(`Finished '\x1b[36mmake:minified:es6\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
          done();
        });
      });
  });
}

/**
 * Builds the js production libraries.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doLibs(done) {
  let pending = 4;
  /**
   * Executes done until completion.
   */
  function _next() {
    pending -= 1;
    if (!pending) {
      done();
    }
  }

  _copydev(_next);
  _copydevm(_next);
  _makeminified(_next);
  _makeminifiedm(_next);
}


// -- Public Static Methods ----------------------------------------------------

const Lib = {

  /**
   * Executes the script.
   *
   * @method ()
   * @public
   * @param {}                -,
   * @returns {}              -,
   * @since 0.0.0
  */
  async run() {
    const PENDING = 1;

    if (parsed.help) {
      _help();
      return;
    }

    if (parsed.version) {
      process.stdout.write(`version: ${parsed.version}\n`);
      return;
    }

    const d1 = new Date();
    process.stdout.write('Starting \'\x1b[36mbuild:js:prod\x1b[89m\x1b[0m\'...\n');

    let pending = PENDING;
    /**
     * Executes done until completion.
     */
    function done() {
      pending -= 1;
      if (!pending) {
        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mbuild:js:prod\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      }
    }

    await _clean();
    _doLibs(done);
  },
};


// -- Where the script starts --------------------------------------------------
Lib.run();


// -- oOo --
