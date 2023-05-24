#!/usr/bin/env node
/* *****************************************************************************
 *
 * Imports external libraries.
 *
 * import:libs.js script imports external libraries listed in config.js.
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      empties the vendor libraries folder,
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
    , path = require('path')
    , nopt = require('nopt')
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const VERSION = '0.0.0-alpha.0'
    , opts = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed = nopt(opts, shortOpts, process.argv, 2)
    , { vlibs } = config
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Dispays the help message.
 *
 * @function ()
 * @private
 * @param {}              -,
 * @returns {}            -,
 * @since 0.0.0
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    '                     imports external libraries defined into config.js',
    '',
    'Options:',
    '',
    '-h, --help           output usage information',
    '-v, --version        output the version number',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
}

/**
 * Removes the previous build.
 *
 * @function ()
 * @private
 * @param {}              -,
 * @returns {Object}      returns a promise,
 * @since 0.0.0
 */
function _clean() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclean\x1b[89m\x1b[0m\'...\n');

  return new Promise((resolve) => {
    fs.rm(vlibs.dest, { force: true, recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      fs.mkdir(vlibs.dest, { recursive: true }, (err2) => {
        if (err2) throw new Error(err2);

        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
        resolve();
      });
    });
  });
}

/**
 * Imports exernal libraries.
 *
 * @function (arg1)
 * @private
 * @param {Function}      the function to call at the completion,
 * @returns {}         -,
 * @since 0.0.0
 */
function _importvlibs(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mimportvlibs\x1b[89m\x1b[0m\'...\n');

  if (!vlibs || !Array.isArray(vlibs.lib) || vlibs.lib.length === 0) {
    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mimportvlibs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
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
      process.stdout.write(`Finished '\x1b[36mimportvlibs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  let filename;
  for (let i = 0; i < vlibs.lib.length; i++) {
    filename = path.basename(vlibs.lib[i]);
    fs.copyFile(vlibs.lib[i], `${vlibs.dest}/${filename}`, { encoding: 'utf8' }, (err) => {
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
 * @puublic
 * @param {}           -,
 * @returns {}         -,
 * @since 0.0.0
 */
async function run() {
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
  process.stdout.write('Starting \'\x1b[36mimport:libs\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function done() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mimport:libs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    }
  }

  await _clean();
  _importvlibs(done);
}


// Start script.
run();


// -- oOo --
