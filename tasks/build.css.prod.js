#!/usr/bin/env node
/* *****************************************************************************
 *
 * Creates the production CSS files.
 *
 * build:css:prod.js script copies the CSS file in the production folder.
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous css production file(s),
 *  . _docss                      creates the css production file(s),
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
    , { dist }    = config
    , { license } = config
    , { cssdir }  = config
    , { bundle }  = config
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
    '                     creates the css production file(s)',
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
    fs.rm(`${dist}/css`, { force: true, recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      fs.mkdir(`${dist}/css`, { recursive: true }, (err2) => {
        if (err2) throw new Error(err2);

        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
        resolve();
      });
    });
  });
}

/**
 * Creates the css production file(s).
 *
 * @function (arg1)
 * @private
 * @param {Function}      the function to call at the completion,
 * @returns {}            -,
 * @since 0.0.0
 */
function _docss(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdocss\x1b[89m\x1b[0m\'...\n');

  fs.readFile(`${cssdir}/${bundle}.min.css`, 'utf8', (err1, data) => {
    if (err1) throw new Error(err1);

    fs.writeFile(`${dist}/css/${bundle}.min.css`, `${license}${data}`, { encoding: 'utf8' }, (err2) => {
      if (err2) throw new Error(err2);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mdocss\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
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
  process.stdout.write('Starting \'\x1b[36mbuild:css:prod\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function done() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:css:prod\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    }
  }

  await _clean();
  _docss(done);
}


// Start script.
run();


// -- oOo --
