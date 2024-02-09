#!/usr/bin/env node
/* *****************************************************************************
 *
 * Imports vendor libs & fonts.
 *
 * import:libs:fonts.js script imports external libraries and fonts
 * listed in config.js.
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous build,
 *  . _importFonts                imports external fonts,
 *  . _importvlibs                imports vendor libraries,
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
const fs   = require('fs')
    , nopt = require('nopt')
    , path = require('path')
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
    , { root }    = config
    , { fonts }   = config
    , { vlibs }   = config
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
    '                       imports vendor libs and fonts defined in config.js',
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
 * Removes the previous build.
 *
 * @function ([arg1])
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {Object}        returns a promise,
 * @since 0.0.0
 */
function _clean(done) {
  const PENDING = 2;
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclean\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  const _next = function(resolve) {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      resolve();
      if (done) done();
    }
  };

  return new Promise((resolve) => {
    fs.rm(vlibs.dest, { force: true, recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      fs.mkdir(vlibs.dest, { recursive: true }, (err2) => {
        if (err2) throw new Error(err2);
        _next(resolve);
      });
    });

    fs.rm(`${root}/fonts`, { force: true, recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      fs.mkdir(`${root}/fonts`, { recursive: true }, (err2) => {
        if (err2) throw new Error(err2);
        _next(resolve);
      });
    });
  });
}

/**
 * Imports external fonts.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _importFonts(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mimport:fonts\x1b[89m\x1b[0m\'...\n');

  if (!fonts || !Array.isArray(fonts) || fonts.length === 0) {
    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mimport:fonts\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  }

  /**
   * Wait all the processes are completed.
   */
  let pending = fonts.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mimport:fonts\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  for (let i = 0; i < fonts.length; i++) {
    fs.cp(fonts[i], `${root}/fonts`, { recursive: true }, (err) => {
      if (err) throw new Error(err);
      _next();
    });
  }
}

/**
 * Imports exernal libraries.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _importvlibs(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mimport:libs\x1b[89m\x1b[0m\'...\n');

  if (!vlibs || !Array.isArray(vlibs.lib) || vlibs.lib.length === 0) {
    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mimport:libs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  }

  /**
   * Wait all the processes are completed.
   */
  let pending = vlibs.lib.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mimport:libs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  let filename;
  for (let i = 0; i < vlibs.lib.length; i++) {
    filename = path.basename(vlibs.lib[i]);
    fs.copyFile(vlibs.lib[i], `${vlibs.dest}/${filename}`, (err) => {
      if (err) throw new Error(err);
      _next();
    });
  }
}


// -- Main ---------------------------------------------------------------------

/**
 * Executes the script.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
async function run() {
  const PENDING = 2;

  if (parsed.help) {
    _help();
    return;
  }

  if (parsed.version) {
    process.stdout.write(`version: ${parsed.version}\n`);
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mimport:libs:fonts\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function done() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mimport:libs:fonts\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    }
  }

  _clean(() => {
    _importFonts(done);
    _importvlibs(done);
  });
}


// Start script.
run();


// -- oOo --
